import Image from "next/image";
import Layout from  "@/Layout/MainLayout";
import HeroVideoSection from "@/components/HeroVideo";
export default function Home() {
  return (
    <>
      <Layout>

      <HeroVideoSection />
        <main>
          <h1>Welcome to the Home Page</h1>
          <p>This is a simple home page content.</p>
        </main>
      </Layout>

    
    
    </>
  );
}
