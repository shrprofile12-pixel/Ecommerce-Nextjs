import Image from "next/image";
import Layout from  "@/Layout/MainLayout";
import HeroVideoSection from "@/components/HeroVideo";
import {Skiper54} from "@/components/Skiper54";
import  Advertisement  from "../components/Advertisement";
import Product from "@/components/Product";
export default function Home() {
  return (
    <>
      <Layout>

      <HeroVideoSection />
      <Skiper54 />    
      <Product/>
      <Advertisement />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1>Welcome to the Home Page</h1>
          <p>This is a simple home page content.</p>
        </main>
      


      </Layout>

    
    
    </>
  );
}
