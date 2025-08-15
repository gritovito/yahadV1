import { NextIntlProvider } from 'next-intl';
import en from '../locales/en.json';
import he from '../locales/he.json';
// Добавить остальные языки

export function AppIntlProvider({ children, locale }) {
  let messages;
  switch (locale) {
    case 'he': messages = he; break;
    // ...
    default: messages = en;
  }
  return <NextIntlProvider messages={messages}>{children}</NextIntlProvider>;
}
