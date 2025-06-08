import FormAddItem from '@/pages/publications/components/FormAddItem';

export default function PublicationPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="mt-12 mb-4 text-5xl font-bold">Item a donner ?</h1>
            <FormAddItem />
        </div>
    );
}
