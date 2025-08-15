"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const { signUp } = useAuth();
  const router = useRouter();
  
  const onSubmit = async (data) => {
    await signUp(data.email, data.password, data.full_name);
    // можно добавить доп. шаги (RPC prayer_requests), или перевести сразу на dashboard
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} type="email" placeholder="Email" />
      <input {...register("password", { required: true })} type="password" placeholder="Password" />
      <input {...register("full_name", { required: true })} placeholder="Full name" />
      <input {...register("hebrew_name", { required: true })} placeholder="Hebrew name" />
      <input {...register("mother_name", { required: true })} placeholder="Mother's name" />
      {/* Селекты для языка, категории молитвы, продолжительности, количества подключаемых молитв */}
      {/* Можно брать категории молитв через useQuery + Supabase endpoint */}
      <button type="submit">Register</button>
    </form>
  );
}
