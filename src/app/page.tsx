"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/Services/firebaseConfig";

const Home = () => {
  console.log('log from server component ')
  return <div>Home page</div>
};

export default Home;
