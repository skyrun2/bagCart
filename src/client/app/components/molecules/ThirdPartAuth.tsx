import { AUTH_API_BASE_URL } from "@/app/lib/constants/config";
import Image from "next/image"
import GoogleIcon from "@/app/assets/icons/google.png";
import FacebookIcon from "@/app/assets/icons/facebook.png";
import TwitterIcon from "@/app/assets/icons/twitter.png";

const thirdParty = [
        {
            provider: "google",
            icon: GoogleIcon,
            label: "Sign in with Google",
        },
        {
            provider: "facebook",
            icon: FacebookIcon,
            label: "Sign in with Facebook",
        },
        {
            provider: "twitter",
            icon: TwitterIcon,
            label: "Sign in with X",
        },
]
const ThirdPartyAuth = () =>{
    const handleOAuthLogin = (provider: string) => {
        console.log("Using AUTH API URL:", AUTH_API_BASE_URL);
        window.location.href = `${AUTH_API_BASE_URL}/auth/${provider}`;
    };
    
    return(
        <>
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t text-gray-600/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                <span className="px-2  text-emigreen/60">or</span>
                </div>
            </div>
            
            <div className="space-y-2">
                {thirdParty.map(({ provider, icon, label }) => (
                    <button
                        key={provider}
                        onClick={() => handleOAuthLogin(provider)}
                        className="w-full py-3 border-2 border-gray-100 bg-transparent text-black rounded-md font-medium hover:bg-gray-50
                        transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                        <Image width={20} height={20} src={icon} alt={provider} />
                        {label}
                    </button>
                ))}
            </div>
            
        </>
    )
}

export default ThirdPartyAuth