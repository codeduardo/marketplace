import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "@/redux/providers";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Maga store",
  description: "This is the store of Maga",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black antialiased`}>
        <Providers>{children}</Providers>
        <ToastContainer autoClose={3000} />
      </body>
    </html>
  );
}
