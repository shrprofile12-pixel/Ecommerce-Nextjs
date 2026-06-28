import Image from "next/image";
import Layout from  "@/Layout/MainLayout";
import HeroVideoSection from "@/components/HeroVideo";
import {Skiper54} from "@/components/Skiper54";
import  Advertisement  from "../components/Advertisement";
import Product from "@/components/Product";
import NewArrivals from "@/components/NewArrivals";
import TrustBadges from "@/components/TrustBadges";
import CommentShowcse from "@/components/CommentShowcse";
export default function Home() {
  return (
    <>
      <Layout>

      <HeroVideoSection />
      <Skiper54 />    
      <Product/>
      <Advertisement />
      <NewArrivals/>
      <TrustBadges/>
     <CommentShowcse/>
      


      </Layout>

    
    
    </>
  );
}
