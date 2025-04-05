"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onIdTokenChanged,
  UserCredential,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import db, { auth } from "@/Services/firebaseConfig";
import User from "../model/User";
import { getUserByEmail } from "../service/users_projects";
import { catchError } from "../components/auth/FirebaseErrosPT-BR";
import { toastType } from "../utils/toastType";
import { ThemeContext } from "./ThemeContext";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  logado: boolean;
  cadastrarUsuario: (name: string, email: string, password: string) => Promise<void>;
  usuario?: User;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<User>();
  const [logado, setLogado] = useState(false);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const pathname = usePathname();

  const createToken = useCallback(async (userFirebase: UserCredential): Promise<User> => {
    const { user } = userFirebase;
    const token = await user.getIdToken();
    return {
      uid: user.uid,
      email: user.email || undefined,
      token,
    };
  }, []);

  const gerenciarCookie = useCallback((token: string) => {
    if (token) {
      Cookies.set("digitaliza-auth", token, { expires: 30 });
    } else {
      Cookies.remove("digitaliza-auth");
    }
  }, []);

  const configurarSessao = useCallback(async (userFirebase: UserCredential) => {
    if (userFirebase.user?.email) {
      const tokenUsuario = await createToken(userFirebase);
      setUsuario(tokenUsuario);
      setLogado(true);
      setLoading(false);
      gerenciarCookie(tokenUsuario.token);
      return tokenUsuario.email;
    }
    gerenciarCookie("");
    setLogado(false);
    setLoading(false);
    return false;
  }, [createToken, gerenciarCookie]);

  const cadastrarUsuario = useCallback(async (nome: string, email: string, senha: string) => {
    try {
      const ref = await createUserWithEmailAndPassword(auth, email, senha);
      const emailS = await getUserByEmail(email);

      if (emailS?.id) {
        const finalRef = doc(db, "users", emailS.id);
        await updateDoc(finalRef, {
          name: nome,
          email_user: ref.user.email,
          accepted: true,
          user_id: ref.user.uid,
        });
      }

      await configurarSessao(ref);
      router.push("/Home");
    } catch (error: any) {
      const erroTraduzido = catchError(error.code, error.message);
      toastType("error", erroTraduzido, theme);
    }
  }, [configurarSessao, router, theme]);

  const login = useCallback(async (email: string, senha: string) => {
    try {
      const userLogged = await signInWithEmailAndPassword(auth, email, senha);
      if (userLogged.user?.email) {
        await configurarSessao(userLogged);
        toastType("success", "Sessão iniciada com sucesso.", theme);
        router.push("/projects");
      }
    } catch (error: any) {
      const erroTraduzido = catchError(error.code, error.message);
      toastType("error", erroTraduzido, theme);
    }
  }, [configurarSessao, router, theme]);

  const isLogged = useCallback(async () => {
    try {
      onIdTokenChanged(auth, async (user: FirebaseUser | null) => {
        console.log(user);
        
        const cookieToken = Cookies.get("digitaliza-auth");
        if(user){
          setLogado(true);
        }else{
          setLogado(false);
        }
        
        
        setLoading(false);

        
      });
    } catch (e) {
      console.error("Auth state change error:", e);
    }
  }, [pathname, router]);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setLogado(false);
      setUsuario(undefined);
      toastType("success", "Sessão encerrada com sucesso.", theme);
      router.push("/login");
    } catch (error) {
      toastType("error", "Erro ao encerrar sessão.", theme);
    }
  }, [router, theme]);

  // 🔍 Executa a verificação assim que o contexto é montado
  useEffect(() => {
    isLogged();
  }, [isLogged]);

  const value = {
    login,
    logout,
    logado,
    cadastrarUsuario,
    usuario,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
