import Sidebar from "./Sidebar";
import bg from "../../public/bg.png";
import Image from "next/image";
import dotgrid from "../../public/texture.svg";
import Navbar from "./Navbar";
export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-[#F9E9E0] overflow-x-hidden">
      <header className="relative top-5 z-20">
        <Navbar />
      </header>

      <div className="fixed inset-0 w-full h-full z-2">
        <Image src={dotgrid} alt="svg" fill className="object-cover" priority />
      </div>
      <div className="absolute top-0 right-0 h-full w-full z-1">
        <Image
          src={bg}
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <main className="relative z-10 flex-1 p-8">{children}</main>
    </div>
  );
}
