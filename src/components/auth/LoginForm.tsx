"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/components/providers/AuthProvider";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff, Lock, Loader2, User } from "lucide-react";
import { Button } from "../ui/button";


const LoginForm = () => {
      const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
      });
      const {login, isLoading} = useAuth();
      const [showPassword, setShowPassword] = useState(false);
      
      const handleSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
        await login(values.username, values.password);
      };

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };


    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:space-y-5">
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Tài khoản</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        placeholder="Nhập tên đăng nhập"
                                        className="pl-10 h-11 md:h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs md:text-sm" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Mật khẩu</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Nhập mật khẩu"
                                        className="pl-10 pr-10 h-11 md:h-12 bg-gray-50 dark:bg-gray-800 border-gray-700 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        {...field}
                                    />
                                    <button 
                                    type="button" 
                                    onClick={togglePasswordVisibility} 
                                    className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                                    >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs md:text-sm" />
                        </FormItem>
                    )}
                />

                {form.formState.errors.root && (
                    <p className="text-red-500 text-sm text-center">{form.formState.errors.root.message}</p>
                )}

                <Button
                    type="submit"
                    className="w-full h-10 md:h-12 mt-4 md:mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors rounded-lg shadow-md hover:shadow-lg"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                           <svg 
                           className="animate-spin -ml-1 mr-2 h-4 w-4 md:size-5 text-white"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                           </svg>
                           <span className="ml-2">Đang xử lý...</span>
                        </div>
                    ) : (
                        <span className="text-sm md:text-base">Đăng nhập</span>
                    )}
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm;