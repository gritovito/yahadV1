"use client";
import { useLanguage } from "@/context/LanguageStore";
import { usePrayerLanguage } from "@/hooks/usePrayerLanguage";

export default function PrayerLanguageSwitcher() {
  const { prayerLang, setPrayerLang } = usePrayerLanguage();
  return (
    <div>
      <select value={prayerLang} onChange={e => setPrayerLang(e.target.value)}>
        <option value="hebrew">Hebrew</option>
        <option value="trans_en">Translit EN</option>
        <option value="trans_ru">Translit RU</option>
        <option value="en">English translation</option>
        <option value="ru">Russian translation</option>
        <option value="fr">French translation</option>
        <option value="es">Spanish translation</option>
        <option value="pt">Portuguese translation</option>
      </select>
    </div>
  );
}
