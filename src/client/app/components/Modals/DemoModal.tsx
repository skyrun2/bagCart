import { useModalStore } from "@/app/hooks/useModalStore";
import { isDemoCatalogForced } from "@/app/lib/catalog/demoMode";
import Link from "next/link";

const  DemoCatalogBannerModal = ()=> {
  const forced = isDemoCatalogForced();
  const {  closeDemoModal } = useModalStore();
  return(
    <>      
      <div className="relative w-screen h-screen aspect-square bg-card/80 backdrop-blur-xl z-200  "
      onClick={closeDemoModal}
      >
        <div className="absolute w-fit py-4 px-4 bg-card   border border-white/5 rounded-2xl   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
          onClick={closeDemoModal}
        >
          <div className=" relative w-full h-full"
            onClick={(e) => e.stopPropagation()}>          
            <div className="min-w-0 flex-1 text-sm leading-snug text-white">
              <p>
                <span className="font-semibold">Static sample catalog</span>
                {" — "}
                product listings are placeholder records, not live inventory.
                {forced ? (
                  <>
                    {" "}
                    Demo mode is turned on in this build; the API may still be
                    running locally.
                  </>
                ) : (
                  <>
                    {" "}
                    The backend API is unavailable because hosting is{" "}
                    <span className="font-medium">down or not set up</span> for this
                    deployment.
                  </>
                )}
              </p>
              <p className="mt-1 text-textDark">
                Browse-only preview. Sign-in, cart, and checkout require a running
                backend.{" "}
                <Link
                  href="https://github.com/skyrun2/bagCart"
                  className="font-medium underline underline-offset-2 hover:text-amber-950"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Run the full stack locally
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>          
      
    </>
  )
}

export default DemoCatalogBannerModal;