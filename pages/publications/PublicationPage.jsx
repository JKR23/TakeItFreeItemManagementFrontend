import FormAddItem from '@/pages/publications/components/FormAddItem';

export default function PublicationPage() {
    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center">
            <h1 className="mb-4 text-5xl font-bold">Item à donner ?</h1>
            <FormAddItem />
        </div>
    );
}
