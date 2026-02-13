// i18n scaffold - add translations and locale routing as needed.
export const locales = ['en'];
export const defaultLocale = 'en';

export function formatDate(dateString: string, locale = defaultLocale) {
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default { locales, defaultLocale, formatDate };
