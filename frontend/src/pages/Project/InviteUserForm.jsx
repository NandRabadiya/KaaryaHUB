import { DialogClose } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import React from 'react'
import { useForm } from 'react-hook-form';

const InviteUserForm = () => 
{
  
  
    
    const form = useForm({
          //  resolver: zodResolver(formSchema),
            defaultValues: {
              email: "",
        
            },
          });
    
    
          const onSubmit = (data) => {
          //  dispatch(createProject(data));
            console.log("Create project", data);
          };
  
  
    return (
    <div>

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-4">
          <FormField
          control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="User Email..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose>
           
              <Button type="submit" className="w-full  py-5">
                Invite User
              </Button>
        
          </DialogClose>
        </form>
      </Form>

      
    </div>
  )
}

export default InviteUserForm
