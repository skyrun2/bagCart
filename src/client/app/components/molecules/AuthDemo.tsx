import { DEMO_ACCOUNT_EMAILS } from "@/app/lib/demo"
import { useSignInMutation } from "@/app/store/apis/AuthApi";


const AuthDemo = () =>{
    const [signIn, { error, isLoading }] = useSignInMutation();
    const signInAsDemo = async (email: string) => {
        try {
        await signIn({ email, password: "password123" }).unwrap();
        // router.push("/");
        } catch (error) {
        console.log("error: ", error);
        }
    };
    return(
        <>
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="text-sm font-semibold text-amber-900 mb-2">
                    Quick sign-in (demo)
                </h3>
                <p className="text-xs text-amber-800 mb-3">
                    Any password works. Pick a role to explore the app.
                </p>
                <div className="flex flex-col gap-2">
                    <button
                    type="button"
                    onClick={() => signInAsDemo(DEMO_ACCOUNT_EMAILS.user)}
                    disabled={isLoading}
                    className="w-full py-2 text-sm rounded-md border border-amber-300 bg-white hover:bg-amber-100 text-amber-950 font-medium"
                    >
                    Customer (user@example.com)
                    </button>
                    <button
                    type="button"
                    onClick={() => signInAsDemo(DEMO_ACCOUNT_EMAILS.admin)}
                    disabled={isLoading}
                    className="w-full py-2 text-sm rounded-md border border-amber-300 bg-white hover:bg-amber-100 text-amber-950 font-medium"
                    >
                    Admin (admin@example.com)
                    </button>
                    <button
                    type="button"
                    onClick={() => signInAsDemo(DEMO_ACCOUNT_EMAILS.superadmin)}
                    disabled={isLoading}
                    className="w-full py-2 text-sm rounded-md border border-amber-300 bg-white hover:bg-amber-100 text-amber-950 font-medium"
                    >
                    Superadmin (superadmin@example.com)
                    </button>
                </div>
            </div>
        </>
    )
}

export default AuthDemo