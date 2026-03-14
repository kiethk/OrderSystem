"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema";
import envConfig from "@/config";

export default function RegisterForm() {
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: RegisterBodyType) {
        const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }).then((res) => res.json());
        console.log(result);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[400px]">
            <Field>
                <FieldLabel>Name</FieldLabel>
                <Input {...form.register("name")} placeholder="Enter your name..." />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>

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

            <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input {...form.register("confirmPassword")} type="password" placeholder="Confirm your password..." />
                <FieldError>{form.formState.errors.confirmPassword?.message}</FieldError>
            </Field>

            <Button type="submit" className="w-full h-10 mt-[20px] cursor-pointer">
                Sign up
            </Button>
        </form>
    );
}
