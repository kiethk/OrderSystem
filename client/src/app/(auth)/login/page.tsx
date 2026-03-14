import LoginForm from "@/app/(auth)/login/login-form";

export default function LoginPage() {
    return (
        <div>
            <h1 className="text-xl text-center font-semibold">Login Page</h1>
            <div className="flex justify-center w-full mt-[30px]">
                <LoginForm />
            </div>
        </div>
    );
}
