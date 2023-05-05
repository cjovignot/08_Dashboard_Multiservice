import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

import NavBar from "../components/navbar";
import Frame from "../components/widget_frame";
import Footer from '../components/footer';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem("userJwtToken");
    if (jwtToken) {
      setIsLogged(true);
    }
  }, []);

  return (
    <div>
      <NavBar isLogged={isLogged} setIsLogged={setIsLogged} />
      <Frame isLogged={isLogged} />
      <Footer />
    </div>
  );
}
