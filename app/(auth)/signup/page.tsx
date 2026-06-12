"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    if (credentials.password.length < 6) {
      toast.error("Password must be atleast of 6 Characters");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      const user = data.user;

      if (user) {
        await supabase.from("profiles").insert({
          id: user.id,
          email: credentials.email,
          username: credentials.name,
        });
      }

      toast.success("SignUp Successful");

      setCredentials({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again later");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card {...props} className="text-center">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                name="name"
                required
                value={credentials.name}
                type="text"
                placeholder="Enter your name"
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                name="email"
                required
                value={credentials.email}
                type="email"
                placeholder="example@gmail.com"
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                name="password"
                value={credentials.password}
                type="password"
                onChange={handleInputChange}
              />
              <FieldDescription>
                Must be at least 6 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                name="confirmPassword"
                value={credentials.confirmPassword}
                type="password"
                onChange={handleInputChange}
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="cursor-pointer">
                  Create Account
                </Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center cursor-pointer">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
