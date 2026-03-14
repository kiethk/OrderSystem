"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import envConfig from "@/config";
import { toast } from "sonner";

export default function LoginForm() {
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginBodyType) {
        try {
            const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            }).then(async (res) => {
                const payload = await res.json();
                const data = {
                    status: res.status,
                    payload,
                };

                if (!res.ok) {
                    throw data;
                }

                return data;
            });
            toast.success("Success", {
                description: result.payload.message,
                position: "top-center",
            });
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const errors = error.payload.errors as { field: string; message: string }[];
            const status = error.status as number;

            if (status === 422) {
                errors.forEach((error) => {
                    form.setError(error.field as "email" | "password", {
                        type: "server",
                        message: error.message,
                    });
                });
            } else {
                toast.error("Error", {
                    description: error.payload.message,
                    position: "top-center",
                });
            }
        }

        // console.log(result);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[400px]">
            <Field>
                <FieldLabel>Email</FieldLabel>
                <Input {...form.register("email")} type="email" placeholder="Enter your email..." />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>

            <Field>
                <FieldLabel>Password</FieldLabel>
                <Input {...form.register("password")} type="password" placeholder="Enter your password..." />
                <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>
            <Button type="submit" className="w-full h-10 mt-[20px] cursor-pointer">
                Login
            </Button>
        </form>
    );
}
