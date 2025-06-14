'use client';

import ItemTakenButton from '@/pages/mes_items/components/ItemTakenButton';

export default function PrototypeImageExtra({ item }) {
    const handleUpdateItem = () => {
        console.log('Rediriger vers la modification de l’item', item.id);
    };

    return (
        <div className="bg-green-800 rounded-2xl shadow-md p-4 hover:scale-105 transition-transform">
            <img
                src={item.image}
                width={150}
                height={100}
                alt={item.title}
                className="w-full h-40 object-cover rounded-md mb-3"
            />
            <p className="font-semibold text-lg text-white">{item.title}</p>
            <div className="mt-3 bg-green-900 rounded-lg p-4">
                <p className="text-sm text-gray-300 mt-0">Statut : {item.statusId.statusName}</p>
                <p className="text-sm text-gray-300 mt-2">Localisation : {item.postalCode}</p>
                <p className="text-sm text-gray-300 mt-2">Ville : {item.city}</p>
                {item.distance !== undefined && item.distance !== null && (
                    <p className="text-sm text-green-300 mt-2">
                        📍 À {item.distance < 1 ? 'moins d’1' : item.distance.toFixed(1)} km de vous
                    </p>
                )}
            </div>

            <div className="mt-4 flex flex-col gap-2">
                <ItemTakenButton itemId={item.id} />
                <button
                    onClick={handleUpdateItem}
                    className="bg-white text-green-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                    Modifier item
                </button>
            </div>
        </div>
    );
}
