import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
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
import { register } from "@/redux/Auth/Action";

const formSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
});

const SignupForm = () => {
  const dispatch=useDispatch();
  const { error } = useSelector((state) => state.auth); // Add this line

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });
  
  const onSubmit = (data) => {
    dispatch(register(data))
    console.log("signup form", data);
  };
  
  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Create Account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border text-secondary w-full rounded-md border-input py-2 px-3 shadow-sm focus:border-primary"
                    placeholder="Your full name"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border text-secondary w-full rounded-md border-input py-2 px-3 shadow-sm focus:border-primary"
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
                    className="border text-secondary w-full rounded-md border-input py-2 px-3 shadow-sm focus:border-primary"
                    placeholder="Create a password"
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
            <UserPlus className="w-4 h-4 mr-2" /> Create Account
          </Button>
          {error && (
  <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
)}
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
