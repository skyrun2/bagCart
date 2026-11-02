import { useModalStore } from "@/app/hooks/useModalStore";

import Link from "next/link"
import Input from "../atoms/Input";
import { DEMO_ACCOUNT_EMAILS,isDemoMode } from "@/app/lib/demo";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "@/app/store/apis/AuthApi";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import GoogleIcon from "@/app/assets/icons/google.png";
import FacebookIcon from "@/app/assets/icons/facebook.png";
import TwitterIcon from "@/app/assets/icons/twitter.png";
import { AUTH_API_BASE_URL } from "@/app/lib/constants/config";
import Image from "next/image";
import AuthForm from "../molecules/authForm";
import DevDemo from "../DevDemo";
import ThirdPartyAuth from "../molecules/ThirdPartAuth";
import AuthDemo from "../molecules/AuthDemo";




const AuthModal = ()=>{
    const { isAuthOpen, closeAuthModal } = useModalStore();
    const [signIn, { error, isLoading }] = useSignInMutation();
    return(
        <>      
            {isAuthOpen && (
                    <div className="relative w-screen h-screen aspect-square bg-card/80 backdrop-blur-xl z-200  "
                        onClick={()=>{closeAuthModal()}}>
                        <div className="absolute w-fit py-4 px-4 bg-card   border border-white/5 rounded-2xl   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                            onClick={(e)=> e.stopPropagation() }>
                            <div className="w-full max-w-2xl bg-zinc-950  rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
                                <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-6">
                                    Sign In
                                </h2>
                                {error && (
                                    <div className="bg-red-50 border border-red-300 text-red-600 text-center text-sm p-3 rounded mb-4">
                                    An unexpected error occurred
                                    </div>
                                )}
                                <AuthForm/>
                                <div className="text-center text-sm text-gray-600 mt-4">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/sign-up" className="text-emigreen/60 hover:underline">
                                    Sign up
                                    </Link>
                                </div>
                                
                                {isDemoMode() && <AuthDemo/>}

                            {process.env.NODE_ENV === "development" && !isDemoMode() && (
                                <DevDemo/>
                            )}

                            {/* {!isDemoMode() && <ThirdPartyAuth/>} */}
                        </div>    
                     </div>
                </div>
            )}
        </>
    )
}


export default AuthModal;