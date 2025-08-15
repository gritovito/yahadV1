import { create } from 'zustand';

export const useLanguage = create((set) => ({
  locale: 'en',
  setLocale: (lang) => set({ locale: lang })
}));
