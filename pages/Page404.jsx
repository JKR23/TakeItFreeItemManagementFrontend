import PageNotFound from '@/public/img/pagenotfound2.png';

import Image from 'next/image';

export default function Page404() {
    return (
        <div className="flex flex-col min-h-screen mb-8 justify-center items-center bg-white">
            <Image src={PageNotFound} alt="page not found" width={300} height={300} />
            <button className="bg-green-600 shadow-md rounded p-4 px-8 cursor-pointer hover:text-yellow-500 mt-8">
                Accueil
            </button>
        </div>
    );
}
