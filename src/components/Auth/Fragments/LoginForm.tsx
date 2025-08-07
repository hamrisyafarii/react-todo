import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginSchema } from "@/schemas/auth.schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { control, handleSubmit } = form;

  const handleLoginSubmit = handleSubmit(async () => {
    alert("Login nih!!");
  });

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={handleLoginSubmit}>
        <FormField
          control={control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    placeholder="*****"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex gap-2 my-4">
          <Label className="text-muted-foreground text-sm">
            <Checkbox
              checked={showPassword}
              onCheckedChange={(checked) => setShowPassword(!!checked)}
            />
            Show Password
          </Label>
        </div>

        <Button className="w-full">Masuk</Button>
      </form>
    </Form>
  );
};
export default LoginForm;
