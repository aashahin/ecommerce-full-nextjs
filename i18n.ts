import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => ({
  now: new Date(),
  messages: (await import(`./public/locales/${locale}/${locale}.json`)).default,
}));