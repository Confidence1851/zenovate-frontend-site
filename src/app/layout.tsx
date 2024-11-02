import type { Metadata } from "next";
import "./globals.css";
import { Barlow } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { ReactLenis } from "@/utils/lenis";
const barlow = Barlow({
  weight: ["400", "100", "200", "300", "500", "900", "700", "400", "600"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Zenovate",
  description: "Health & Wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body className={`${barlow.className} antialiased`}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </ReactLenis>
    </html>
  );
}
