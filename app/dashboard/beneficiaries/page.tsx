"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";

type Beneficiary = {
  id: number;
  beneficiary_name: string;
  relationship: string;
  prayer_intention: string;
  is_active: boolean;
};

export default function BeneficiariesPage() {
  const { user } = useAuth();
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const { register, handleSubmit, reset } = useForm();

  // Получаем список активных бенефициариев
  const fetchBeneficiaries = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("prayer_beneficiaries")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("id", { ascending: true });
    if (!error && data) setBeneficiaries(data);
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, [user]);

  // Добавление нового бенефициара через RPC
  const onSubmit = async (formData: any) => {
    if (!user) return;
    const { beneficiary_name, relationship, prayer_intention } = formData;

    const { error } = await supabase.rpc("add_prayer_beneficiary", {
      p_user_id: user.id,
      p_beneficiary_name: beneficiary_name,
      p_relationship: relationship,
      p_prayer_intention: prayer_intention,
    });

    if (error) {
      alert("Ошибка при добавлении: " + error.message);
    } else {
      alert("Добавлено!");
      reset();
      fetchBeneficiaries();
    }
  };

  if (!user) return <p>Loading user data...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>Добавить человека для молитвы</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
        <div>
          <input
            {...register("beneficiary_name", { required: true })}
            placeholder="Имя человека"
          />
        </div>
        <div>
          <select {...register("relationship", { required: true })}>
            <option value="">Выберите отношение</option>
            <option value="family">Семья</option>
            <option value="friend">Друг</option>
            <option value="community">Община</option>
          </select>
        </div>
        <div>
          <input
            {...register("prayer_intention", { required: false })}
            placeholder="Молитвенное намерение (здоровье, успех и т.д.)"
          />
        </div>
        <button type="submit">Добавить</button>
      </form>

      <h2>Ваши текущие бенефициары</h2>
      {beneficiaries.length ? (
        <ul>
          {beneficiaries.map((b) => (
            <li key={b.id}>
              {b.beneficiary_name} ({b.relationship}) — намерение:{" "}
              {b.prayer_intention || "не указано"}
            </li>
          ))}
        </ul>
      ) : (
        <p>Пока нет добавленных людей.</p>
      )}
    </div>
  );
}
