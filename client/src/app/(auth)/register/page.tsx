import RegisterForm from "@/app/(auth)/register/register-form";

export default function RegisterPage() {
    return (
        <div>
            <h1 className="text-xl text-center font-semibold">Register Page</h1>
            <div className="flex justify-center w-full mt-[30px]">
                <RegisterForm />
            </div>
        </div>
    );
}
