import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { registerUser } from "@/api/auth";
import PasswordStrengthState from "@/components/PasswordStrengthState";
import { Eye, EyeOff } from "lucide-react";
import InputPassword from "@/components/InputPassword";
import { registerSchema } from "./schemas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password");

  useEffect(() => {
    if (!password) {
      setPasswordScore(null);
      return;
    }

    setPasswordScore(zxcvbn(password).score);
  }, [password]);

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);

      console.log(res);
      toast.success(res?.data);
    } catch (error) {
      console.log(error);

      const messageErr = error.response?.data?.message;

      if (messageErr == "Email already exist!") {
        setError(messageErr);
        return;
      }

      toast.error(messageErr);
    }
  };

  const inputClass = (hasError) => `focus-visible:outline-none
  ${
    hasError &&
    "border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 shake"
  }`;

  return (
    <>
      <div className="flex items-center justify-center p-20">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Tabs value="register" onValueChange={(value) => {
            if (value === 'login') {
              navigate('/login')
            }
          }}>
            <TabsList>
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="register">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                      Sign up to make shopping easier and never miss exclusive
                      deals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>

                        <Input
                          type="email"
                          id="email"
                          className={inputClass(
                            Boolean(errors?.email?.message)
                          )}
                          placeholder="Email"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                        {error && (
                          <p className="text-sm text-red-500">{error}</p>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>

                        <InputPassword
                          name={"password"}
                          placeholder={"password"}
                          register={register}
                          inputClass={inputClass}
                          errors={errors}
                        />

                        {passwordScore >= 0 && (
                          <PasswordStrengthState
                            passwordScore={passwordScore}
                          />
                        )}

                        {errors.password && (
                          <p className="text-sm text-red-500">
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>

                        <InputPassword
                          name={"confirmPassword"}
                          placeholder={"Confirm Password"}
                          register={register}
                          inputClass={inputClass}
                          errors={errors}
                        />

                        {errors.confirmPassword && (
                          <p className="text-sm text-red-500">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-3 flex-col gap-2">
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                    <CardDescription className="text-center py-3">
                      Already have an account?
                      <Link
                        to={"/login"}
                        className="ml-auto pl-2 inline-block text-sm font-bold underline-offset-4 hover:underline"
                      >
                        Login
                      </Link>
                    </CardDescription>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
            <TabsContent value="login">
              {/* form login */}
            </TabsContent>
          </Tabs>
        </div>

        {/* <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle className="text-center font-bold text-2xl">
                Sign Up
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>

                  <Input
                    type="email"
                    id="email"
                    className={inputClass(Boolean(errors?.email?.message))}
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>

                  <InputPassword
                    name={"password"}
                    placeholder={"password"}
                    register={register}
                    inputClass={inputClass}
                    errors={errors}
                  />

                  {passwordScore >= 0 && (
                    <PasswordStrengthState passwordScore={passwordScore} />
                  )}

                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>

                  <InputPassword
                    name={"confirmPassword"}
                    placeholder={"Confirm Password"}
                    register={register}
                    inputClass={inputClass}
                    errors={errors}
                  />

                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <CardDescription className="text-center py-3">
                Already have an account?
                <Link
                  to={"/login"}
                  className="ml-auto pl-2 inline-block text-sm font-bold underline-offset-4 hover:underline"
                >
                  Login
                </Link>
              </CardDescription>
            </CardFooter>
          </Card>
        </form> */}
      </div>
    </>
  );
};
export default Register;
