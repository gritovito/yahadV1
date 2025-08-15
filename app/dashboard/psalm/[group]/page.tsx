"use client";
import { useState, useEffect } from "react";
import { usePrayerLanguage } from "@/hooks/usePrayerLanguage";
import { supabase } from "@/lib/supabaseClient";
import PrayerLanguageSwitcher from "@/components/PrayerLanguageSwitcher";

export default function PsalmPage({ params }) {
  const { prayerLang } = usePrayerLanguage();
  const group = params.group;
  const [text, setText] = useState("");

  useEffect(() => {
    supabase.from('tilitext36final')
      .select(`group_name, 
               ${prayerLang === 'hebrew' ? 'combined_hebrew_text' : prayerLang === 'trans_en' ? 'hebrew_transliteration_en' : prayerLang === 'trans_ru' ? 'hebrew_transliteration_ru' : prayerLang + '_translation'}`)
      .eq('group_number', group)
      .single()
      .then(({ data }) => {
        setText(data?.[prayerLang === 'hebrew'
                       ? 'combined_hebrew_text'
                       : prayerLang === 'trans_en'
                         ? 'hebrew_transliteration_en'
                         : prayerLang === 'trans_ru'
                           ? 'hebrew_transliteration_ru'
                           : prayerLang + '_translation']);
      });
  }, [group, prayerLang]);

  return (
    <div>
      <PrayerLanguageSwitcher />
      <div>{text}</div>
      {/* Кнопка "завершить" */}
    </div>
  );
}
