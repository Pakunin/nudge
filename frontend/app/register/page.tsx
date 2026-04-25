"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../lib/api";
import Image from "next/image";
import customBg from "../../public/bg.png";
import dotgrid from "../../public/texture.svg";
import login from "../../public/login.svg";
import shapebg from "../../public/shapebg.png";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const maskSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 210 961' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M309.607 406C227.107 366.5 40.2071 201.458 0.607422 0.5H1080.11V960.5H309.607C309.607 960.5 291.607 917.5 345.107 849.5C398.607 781.5 481.607 741.5 463.607 621.5C445.607 501.5 392.107 445.5 309.607 406Z' fill='black'/%3E%3C/svg%3E")`;

  const handleRegister = async () => {
    setError("");
    setMessage("");
    const data = await registerUser(email, password);

    if (data.error) {
      setError(data.error);
      return;
    }

    setMessage("Registered successfully! Redirecting...");
    setTimeout(() => router.push("/"), 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F9E9E0]">
      <div className="relative w-full h-full">
        <Image src={dotgrid} alt="svg" fill className="object-cover" priority />
      </div>

      <div className="absolute z-2 w-23.75 h-12.5 top-5 right-5 flex items-center justify-center group">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={login}
            alt="login"
            className="object-none opacity-90 group-hover:opacity-100 transition-opacity"
            priority
          />
        </div>
        <a
          href="/"
          className="text-black relative z-10 hover:underline font-hand text-2xl"
        >
          Login
        </a>
      </div>

      <div className="absolute z-2 w-101.5 top-90 right-25">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-18.25 border-4 px-3 py-2 rounded-[31px] mb-3 text-[30px] text-black font-hand pl-5 pt-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-18.25 border-4 px-3 py-2 rounded-[31px] mb-3 text-[30px] text-black font-hand pl-5 pt-3"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleRegister}
          className="relative w-23.75 h-12.25 flex justify-center items-center py-2 left-2 group cursor-pointer"
        >
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              src={login}
              alt="login"
              className="object-none transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
              priority
            />
          </div>

          <span className="relative z-3 font-hand text-2xl text-black select-none transition-all duration-300 group-hover:scale-110">
            Register
          </span>
        </button>
      </div>

      <div className="absolute top-90 w-137.5 h-52.5 overflow-hidden flex items-center justify-center left-60 z-5 pointer-events-none">
        <h1 className="relative font-hand text-[#E6BBBB] text-[266px] mt-13 leading-none inline-block [-webkit-text-stroke:2.79px_black]">
          NUDGE
        </h1>
      </div>

      <div className="absolute inset-0 z-0">
        <Image
          src={shapebg}
          alt="gradient"
          fill
          className="object-left object-none "
          priority
        />
      </div>

      <div
        className="absolute top-0 right-0 h-full w-full z-1"
        style={{
          WebkitMaskImage: maskSvg,
          WebkitMaskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "right",
          maskImage: maskSvg,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
          maskPosition: "right",
        }}
      >
        <Image
          src={customBg}
          alt="gradient"
          fill
          className="object-cover"
          priority
        />
      </div>
    </main>
  );
}
