import "./globals.css";
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Navbar from "@/components/NavBar";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: "job on desk",
  description: 'jobs find only if you are alert!'
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px]`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}