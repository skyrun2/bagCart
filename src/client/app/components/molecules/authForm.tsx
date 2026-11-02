import { useForm } from "react-hook-form";
import Input from "../atoms/Input"
import { useSignInMutation } from "@/app/store/apis/AuthApi";
import Link from "next/link";
import { Loader2 } from "lucide-react";


interface InputForm {
  email: string;
  password: string;
}

const AuthForm = ()=>{
    const {
        control,
        handleSubmit,
        formState: { errors },
        } = useForm<InputForm>({
            defaultValues: {
            email: "",
            password: "",
        },
    });

    const [signIn, { error, isLoading }] = useSignInMutation();
    const onSubmit = async (formData: InputForm) => {
        try {
            await signIn(formData).unwrap();
            // router.push("/");
        } catch (error) {
            console.log("error: ", error);
        }
    };
    

    
  
    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
                <Input
                name="email"
                type="text"
                placeholder="Email"
                control={control}
                validation={{ required: "Email is required" }}
                error={errors.email?.message}
                className="py-2.5 text-sm"
                />

                <Input
                name="password"
                type="password"
                placeholder="Password"
                control={control}
                validation={{
                    required: "Password is required",
                    minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                    },
                }}
                error={errors.password?.message}
                className="py-2.5 text-sm"
                />

                <Link
                href="/password-reset"
                className="block text-sm text-emigreen/60 hover:underline mb-4"
                >
                Forgot password?
                </Link>

                <button
                type="submit"
                className={`w-full py-2.5 bg-emigreen text-white rounded-md font-medium hover:bg-emigreen/60 transition-colors cursor-pointer ${
                    isLoading ? "cursor-not-allowed bg-gray-400" : ""
                }`}
                >
                {isLoading ? (
                    <Loader2 className="animate-spin mx-auto" size={20} />
                ) : (
                    "Sign In"
                )}
                </button>
            </form>
        </>
    )
}

export default AuthForm