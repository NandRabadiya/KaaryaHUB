import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/Auth/Action";

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const LoginForm = () => {
  const dispatch=useDispatch();
  const { error } = useSelector((state) => state.auth); // Add this line

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onSubmit = (data) => {
    dispatch(login(data))
    console.log("login form", data);
  };
  
  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Welcome Back</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border text-blue-900 w-full rounded-md border-input py-2 px-3 shadow-sm focus:border-primary"
                    placeholder="Your email address"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border text-blue-900 w-full rounded-md border-input py-2 px-3 shadow-sm focus:border-primary"
                    placeholder="Your password"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <LogIn className="w-4 h-4 mr-2" /> Sign In
          </Button>
          {error && (
  <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
)}
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
