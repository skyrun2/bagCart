"use client";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import DemoModeBanner from "../feedback/DemoModeBanner";
import { isDemoMode } from "@/app/lib/demo";
import DemoCatalogBanner from "../feedback/DemoCatalogBanner";

export default function MainLayout({
  children,
  isDemoCatalog = false,
}: {
  children: React.ReactNode;
  isDemoCatalog?: boolean;
}) {
  const showCatalogBanner = isDemoCatalog && !isDemoMode();
  console.log({showCatalogBanner});
  

  return (
    <main className="flex flex-col min-h-screen w-full">
      <Navbar showCatalogBanner={showCatalogBanner} />
      {/* <DemoModeBanner /> */}
      
      <div className="w-full  xl:max-w-7xl xl:mx-auto">
        {children}
      </div>
      <Footer />
    </main>
  );
}
