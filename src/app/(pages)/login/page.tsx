"use client";

import { useEffect, useState } from "react";
import Login from "./components/login";
import { useRouter } from "next/navigation";
import { auth } from "@/Services/firebaseConfig";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/Home"); // Evita empilhar histórico de navegação
      } else {
        setIsLoading(false); // Somente define falso se não houver usuário
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 40;
    const y = (clientY / window.innerHeight - 0.5) * 40;
    setPosition({ x, y });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden border border-solid w-full"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out"
        style={{
          backgroundImage:
            "url('https://www.phsoft.com.br/wp-content/uploads/2020/10/controle-estoque.png')",
          transform: `translate(${position.x}px, ${position.y}px) scale(1.05)`,
        }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 grid grid-cols-1 min-h-screen h-full">
        <Login className="flex flex-col justify-center" />
      </div>
    </div>
  );
}
