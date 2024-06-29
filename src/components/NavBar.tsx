import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.avif";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} height={40} width={40} alt="company-logo" className="rounded-lg" />
          <span className="text-xl font-bold tracking-tight">Flow jobs</span>
        </Link>
        <Button asChild>
          <Link href="/jobs/new">Post a job</Link>
        </Button>
      </nav>
    </header>
  );
}
