"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "/shared/ui/shadcn/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "/shared/ui/shadcn/components/ui/form";
import { Input } from "/shared/ui/shadcn/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import logo from "/assets/imgs/kimptrendz-logo.png";
import bgImage from "/assets/imgs/cloth-2.png";
import Image from "next/image";

const formSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  );

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          password: values.password,
        }),
      });
      if (response.status === 201) {
        router.push("/admin/auth/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-white">
      {/* Left Panel - Brand Image Showcase */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <Image
          src={bgImage}
          alt="Brand Background"
          fill
          objectFit="cover"
          className="opacity-40 grayscale-[20%] mix-blend-overlay transition-transform duration-1000 hover:scale-105"
        />
        <div className="relative z-10 flex flex-col items-center text-center px-12">
          <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl mb-8">
            <Image
              src={logo}
              width={140}
              height={140}
              alt="logo"
              className="drop-shadow-2xl brightness-0 invert"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-6">
            Join the Team
          </h1>
          <p className="text-lg text-slate-300 font-medium max-w-md leading-relaxed">
            Create an admin account to help manage and scale the Kimptrendz
            e-commerce ecosystem.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
      </div>

      {/* Right Panel - Interactive Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 flex justify-center">
            <Image src={logo} width={100} height={100} alt="logo" />
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Create Account
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              Enter your details to request admin access.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Jane Doe"
                        type="text"
                        className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#ffd138] focus-visible:border-[#ffd138] transition-all rounded-xl text-slate-900 font-medium placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin@kimptrendz.com"
                        type="email"
                        className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#ffd138] focus-visible:border-[#ffd138] transition-all rounded-xl text-slate-900 font-medium placeholder:text-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs font-medium" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#ffd138] focus-visible:border-[#ffd138] transition-all rounded-xl text-slate-900 font-medium placeholder:text-slate-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs font-medium" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#ffd138] focus-visible:border-[#ffd138] transition-all rounded-xl text-slate-900 font-medium placeholder:text-slate-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 mt-4 text-sm font-bold uppercase tracking-widest bg-[#ffd138] hover:bg-[#e6bb32] text-slate-900 transition-all hover:-translate-y-0.5 rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" /> Creating
                    Account...
                  </>
                ) : (
                  "Create Admin Account"
                )}
              </Button>
            </form>
          </Form>

          <p className="mt-10 text-center text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link
              href={"/admin/auth/login"}
              className="text-slate-900 font-bold hover:text-[#e6bb32] hover:underline underline-offset-4 transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
