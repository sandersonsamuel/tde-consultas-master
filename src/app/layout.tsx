import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import {Navbar} from "@/components/navbar";
import DataProvider from "@/dataProvider/DataProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aplicação de consultas",
  description: "Aplicação de consultas paras trabalho de TDE de engenharia de software e banco de dados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="pt-br">
      <body className={inter.className}>
      <DataProvider>
          <Toaster />
          <Navbar/>
          {children}
      </DataProvider>
      </body>
    </html>
  );
}
