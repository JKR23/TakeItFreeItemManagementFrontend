export default function SearchZone() {
    return (
        <div className="flex items-center gap-2 p-4">
            <input
                type="text"
                name="searchzone"
                id="searchzone"
                placeholder="Ex: télévision"
                className="flex-1 p-2 border border-gray-300 rounded-md"
            />
            <button className="bg-green-900 text-white px-4 py-2 rounded-md cursor-pointer shadow-md">
                Rechercher
            </button>
        </div>
    );
}
