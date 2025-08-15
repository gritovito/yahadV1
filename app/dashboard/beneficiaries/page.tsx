"use client";
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@/hooks/useSession';

export default function BeneficiaryForm() {
  const { user } = useSession();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await supabase.rpc('add_prayer_beneficiary', {
      p_user_id: user.id,
      p_beneficiary_name: data.name,
      p_relationship: data.relationship,
      p_prayer_intention: data.intention
    });
    reset();
    alert('Saved!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} placeholder="Name" />
      <select {...register('relationship')}>
        <option value="family">Family</option>
        <option value="friend">Friend</option>
        <option value="community">Community</option>
      </select>
      <input {...register('intention')} placeholder="Intention" />
      <button type="submit">Add</button>
    </form>
  );
}
