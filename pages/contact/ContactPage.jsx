import FormContact from '@/pages/contact/components/Form';

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-900 px-4 py-12">
            <h1 className="mb-8 text-4xl sm:text-5xl font-bold text-white text-center">
                Question ou Avis ?
            </h1>
            <FormContact />
        </div>
    );
}
