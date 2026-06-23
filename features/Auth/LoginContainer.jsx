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
import { doCredentialLogin } from "/app/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import logo from "/assets/imgs/kimptrendz-logo.png";
import bgImage from "/assets/imgs/cloth-1.png";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const LoginContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await doCredentialLogin(values);
      if (!!response?.error) {
        toast.error("Invalid credentials", { duration: 5000 });
      } else {
        router.push("/admin/products");
      }
    } catch (error) {
      toast.error("Invalid credentials", { duration: 5000 });
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
          className="opacity-40 grayscale-[30%] mix-blend-overlay transition-transform duration-1000 hover:scale-105"
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
            Manage Your Empire
          </h1>
          <p className="text-lg text-slate-300 font-medium max-w-md leading-relaxed">
            Access the Kimptrendz command center. Oversee inventory, track
            orders, and monitor your global e-commerce growth.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
      </div>

      {/* Right Panel - Interactive Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12 flex justify-center">
            <Image src={logo} width={120} height={120} alt="logo" />
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Welcome back
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              Please enter your details to sign in.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
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

              <div className="flex items-center justify-between pt-2 pb-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer w-5 h-5 rounded border-slate-300 text-[#ffd138] focus:ring-[#ffd138] cursor-pointer appearance-none checked:bg-[#ffd138] checked:border-[#ffd138] transition-all"
                    />
                    <svg
                      className="absolute w-3 h-3 text-slate-900 pointer-events-none opacity-0 peer-checked:opacity-100"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                    Remember me
                  </span>
                </label>
                <Link
                  href="#"
                  className="text-sm font-bold text-slate-900 hover:text-slate-600 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 text-sm font-bold uppercase tracking-widest bg-[#ffd138] hover:bg-[#e6bb32] text-slate-900 transition-all hover:-translate-y-0.5 rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />{" "}
                    Authenticating...
                  </>
                ) : (
                  "Sign In to Dashboard"
                )}
              </Button>
            </form>
          </Form>

          <p className="mt-12 text-center text-sm font-medium text-slate-500">
            Don't have an admin account?{" "}
            <Link
              href={"/admin/auth/register"}
              className="text-slate-900 font-bold hover:text-[#e6bb32] hover:underline underline-offset-4 transition-all"
            >
              Request Access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
