"use client";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import db, { auth } from "@/Services/firebaseConfig";
import User from "../model/User";
import { doc, updateDoc } from "firebase/firestore";

import { getUserByEmail } from "../service/users_projects";
import { catchError } from "../components/auth/FirebaseErrosPT-BR";
import { toastType } from "../utils/toastType";
import { ThemeContext } from "./ThemeContext";
import { usePathname } from "next/navigation";

interface AuthContextProps {
  login?: (email: string, senha: string) => Promise<void>;
  logout?: () => Promise<void>;
  isLogged?: () => Promise<void>;
  logado?: boolean;
  cadastrarUsuario?: (
    nome: string,
    email: string,
    senha: string
  ) => Promise<void>;
  usuario?: User;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({});

async function createToken(userFirebase: UserCredential): Promise<User> {
  const { user } = userFirebase;
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    token: token,
  };
}

function gerenciarCookie(logado: string) {
  if (logado) {
    Cookies.set("digitaliza-auth", logado, {
      expires: 30,
    });
  } else {
    Cookies.remove("digitaliza-auth");
  }
}

export function AuthProvider(props: AuthProviderProps) {
  const [usuario, setUsuario] = useState<User>();
  const [logado, setLogado] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const pathname = usePathname();

  async function configurarSessao(userFirebase: UserCredential) {
    if (userFirebase.user?.email) {
      const tokenUsuario = await createToken(userFirebase);
      setUsuario(tokenUsuario);
      gerenciarCookie(tokenUsuario.token);
      return usuario?.email;
    } else {
      gerenciarCookie("");
      return false;
    }
  }

  async function cadastrarUsuario(nome: string, email: string, senha: string) {
    try {
      const ref = await createUserWithEmailAndPassword(auth, email, senha);
      const emailS = await getUserByEmail(email);

      const finalRef = doc(db, "users", emailS?.id);

      await updateDoc(finalRef, {
        name: nome,
        email_user: ref.user.email,
        accepted: true,
        user_id: ref.user.uid,
      });

      await configurarSessao(ref);

      router.push("/Home");
    } catch (error: any) {
      const erroTraduzido = catchError(error.code, error.message);
      toastType("error", erroTraduzido, theme);
    }
  }

  const login = async (email: string, senha: string) => {
    const userLogged = await signInWithEmailAndPassword(auth, email, senha);

    if (userLogged.user?.email) {
      await configurarSessao(userLogged);
      toastType("success", "Sessão iniciada com sucesso.", theme);

      router.push("/projects");
    }
  };

  const isLogged = async () => {
    try {
      auth.onIdTokenChanged((user) => {
        if (user?.email || user?.uid.includes("token-login")) {
          setLogado(true);
        } else {
          setLogado(false);
          if (pathname !== "/login") {
            router.push("/login");
          }
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toastType("success", "Sessão encerrada com sucesso.", theme);
    } catch (error) {
      toastType("error", "Sessão encerrada com sucesso.", theme);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        logout,
        login,
        isLogged,
        logado,
        cadastrarUsuario,
        usuario,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
