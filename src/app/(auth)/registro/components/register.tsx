"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import db, { auth } from "@/Services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

interface RegisterProps {
  className?: string;
}

export default function Register({ className }: RegisterProps) {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [repSenha, setRepSenha] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const router = useRouter();
  const [createUserWithEmailAndPassword, userCredential, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifica se as senhas são iguais
    if (senha !== repSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(email, senha);

      if (userCredential?.user) {
        const user = userCredential.user;

        // Salva informações adicionais no Firestore
        await setDoc(doc(db, "users", user.uid), {
          nome: nome,
          email: email,
          uid: user.uid,
        });

        toast.success("Registro realizado com sucesso!");
        console.log("Usuário criado e dados salvos no Firestore:", {
          email,
          nome,
          uid: user.uid,
        });

        // Redireciona para a página de login ou dashboard
        router.push("/login");
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      toast.error("Erro ao criar usuário. Tente novamente.");
    }
  };

  const handleCancel = () => {
    router.push("/login");
  };

  return (
    <>
      {loading ? <p>Carregando...</p> : null}
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col items-center gap-6 ${className ?? ""}`}
      >
        <div className="flex flex-col gap-1">
          <span className="text-xl font-extrabold">Registre-se</span>
          <span className="text-zinc-900 text-sm text-center">
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
              className="border rounded-lg p-2 border-solid border-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px]"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Nome:</label>
            <input
              placeholder="Digite seu nome..."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border rounded-lg p-2 border-solid border-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px]"
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
              className="border rounded-lg p-2 border-solid border-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px]"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Repita sua senha:</label>
            <input
              type="password"
              placeholder="Digite sua senha novamente..."
              value={repSenha}
              onChange={(e) => setRepSenha(e.target.value)}
              className="border rounded-lg p-2 border-solid border-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px]"
              required
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-500 p-2  text-white rounded-md shadow-xl"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Registrar"}
          </button>
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-200 hover:border-solid hover:border-black p-2 text-black rounded-md shadow-xl"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}
