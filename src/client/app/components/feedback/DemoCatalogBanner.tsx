"use client";


import { Info,  } from "lucide-react";


import { useModalStore } from "@/app/hooks/useModalStore";
import DemoCatalogBannerModal from "../Modals/DemoModal";



export default function DemoCatalogBanner() {
  
   const { isDemoOpen, openDemoModal } = useModalStore();


  return (
    <>
      <button
       className="absolute bottom-[-60%] left-3 z-90 cursor-pointer"
        role="status"
        aria-live="polite"
        onClick={ openDemoModal}
      >
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
          <Info className="h-3.5 w-3.5" aria-hidden />
          Demo
        </span>
      </button>

      {isDemoOpen && <DemoCatalogBannerModal/>}

        
    </>
  );
}
