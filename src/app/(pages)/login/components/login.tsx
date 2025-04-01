"use client";
import Button from "@/app/components/button";
import Google from "@/app/icons/icons";
import { auth } from "@/Services/firebaseConfig";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
  className?: string;
}

export default function Login({ className }: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const [validatingToken, setValidatingToken] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET || "seu-segredo";
        jwt.verify(token, secretKey);
        router.push("/Home");
      } catch (error) {
        Cookies.remove("authToken");
      }
    }
    setValidatingToken(false);
  }, [router]);

  const generateToken = (userEmail: string) => {
    const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET || "seu-segredo";
    return jwt.sign({ email: userEmail }, secretKey, { expiresIn: "30d" });
  };

  const handleAuthSuccess = (userEmail: string) => {
    toast.success("Login realizado com sucesso!", {
      autoClose: 3000,
      position: "bottom-center",
    });

    if (rememberMe) {
      const token = generateToken(userEmail);
      Cookies.set("authToken", token, { expires: 30 });
    }

    router.push("/Home");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !senha.trim()) {
      toast.error("Preencha todos os campos.", {
        autoClose: 3000,
        position: "bottom-center",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(email, senha);
      if (!result) {
        throw new Error("Dados incorretos");
      }
      handleAuthSuccess(email);
    } catch (error) {
      toast.error(
        "Erro ao fazer login. Verifique seus dados e tente novamente.",
        {
          autoClose: 5000,
          position: "bottom-center",
        }
      );
    }
  };

  const handleRegister = () => {
    router.push("/registro");
  };

  if (validatingToken) {
    return <div>Verificando autenticação...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col items-center gap-6 ${className ?? ""} `}
      >
        <div className="flex flex-col gap-1 ">
          <span className="text-xl font-extrabold text-zinc-800">
            Entre com sua conta
          </span>
          <span className="text-zinc-400 text-sm text-center">
            Insira seus dados:
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Email:</label>
            <input
              type="email"
              placeholder="Digite seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg p-2 border-solid border-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px] text-black"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Senha:</label>
            <input
              type="password"
              placeholder="Digite sua senha..."
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border rounded-lg p-2 border-solid border-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px] text-black"
              required
            />
          </div>
          <div className="flex gap-2 w-full justify-start">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className="text-xs text-black">Lembre por 30 dias</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-500 p-2 min-w-[300px] text-white rounded-md shadow-xl"
          >
            Entrar
          </button>
        </div>

        <div className="cursor-default">
          Não possui conta?{" "}
          <span
            className="text-black hover:text-zinc-700 cursor-pointer"
            onClick={handleRegister}
          >
            Cadastre-se aqui
          </span>
        </div>
      </form>

      <ToastContainer position="bottom-center" />
    </div>
  );
}
