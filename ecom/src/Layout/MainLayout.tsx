import Footer from "@/components/Footer";
import Navbar from "@/components/header";
import InfiniteLine from "@/components/Marquee";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InfiniteLine />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}