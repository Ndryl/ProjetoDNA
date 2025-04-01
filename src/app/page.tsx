"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/Services/firebaseConfig";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return; // Evita execução no SSR

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/Home"); // Redireciona para Home dentro de Logado
      } else {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return null;
};

export default Home;
