import Navbar from "@/components/header";
import InfiniteLine from  "@/components/Marquee";
import localFont from "next/font/local";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <InfiniteLine />
        <Navbar />

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}