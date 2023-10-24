import BillboardClient from "./components/client";
import {
  getTranslator,
} from 'next-intl/server';
 
const billboards = () => {
  return (
    <div className="flex flex-col mx-4">
        <div className="flex-1 items-center justify-between p-4">
            <BillboardClient />
            </div>
    </div>
  )
}

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
    const t = await getTranslator(locale, 'Index'); 
    
    return {
        title: t('billboards'),
    };
}

export default billboards;