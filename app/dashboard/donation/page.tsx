"use client";
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from "@/hooks/useSession";

export default function DonationPage() {
  const { user } = useSession();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await supabase.from('tzedaka_commitments').insert([{
      user_id: user.id,
      amount: data.amount,
      currency: data.currency,
      status: 'committed'
    }]);
    alert('Donation committed!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('amount')} type="number" placeholder="Amount" />
      <select {...register('currency')}>
        <option value="ILS">₪ ILS</option>
        <option value="USD">$ USD</option>
        {/* другие валюты */}
      </select>
      <button type="submit">Commit Donation</button>
    </form>
  );
}
