import { useModalStore } from "@/app/hooks/useModalStore";
import { Command, SearchIcon, X } from "lucide-react";
import { useEffect } from "react";

const SearchModal = ()=>{
  const { isSearchOpen, closeSearchModal } = useModalStore();
  
  return(
    <>      
      {isSearchOpen && (
        <div className="relative w-screen h-screen aspect-square bg-card/80 backdrop-blur-xl z-200  "
        onClick={()=>{closeSearchModal()}}
        >
          <div className="absolute w-fit py-4 px-4 bg-card   border border-white/5 rounded-2xl   top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 "
            onClick={(e)=>e.stopPropagation()}
          >
            <div className="w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
              <div className="p-6 flex items-center gap-4 border-b border-white/5">
                <h2 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20">
                BagCart
                </h2>
                <SearchIcon/>
                <input className="bg-transparent border-none outline-none flex-1 text-white text-xl placeholder:text-zinc-600 font-medium"
                  type="text"
                  aria-describedby="search-results-status"
                  placeholder="Search collection..."                
                />
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X/>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar transition-opacity duration-200">
                <div className="space-y-8 p-6">
                  <div className="text-center space-y-4 py-8">
                    <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto text-zinc-500 border border-white/5 border-dashed">
                      <Command/>                    
                    </div>
                    <div >
                      <h3 className="text-white font-medium">Global Navigation Enabled</h3>
                      <p className="text-zinc-500 text-sm mt-1">Start typing to search products or use shortcuts.</p>                    
                    </div>
                  </div>
                  <div className="space-y-3">

                  </div>
                </div>
                <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 bg-zinc-900/30">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
                      <span className="bg-zinc-800 px-1.5 py-0.5 rounded border border-white/5 text-[10px] font-mono uppercase tracking-tighter">ESC</span>
                      Close
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
                      <span className="bg-zinc-800 px-1.5 py-0.5 rounded border border-white/5 text-[10px] font-mono uppercase tracking-tighter">↵</span>
                      Select
                    </span>          
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>          
      )}
    </>
  )
}


export default SearchModal;