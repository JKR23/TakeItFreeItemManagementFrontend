'use client';

export default function PrototypeImage({ item }) {
    if (!item) return null; // Ne rien afficher si item est undefined ou null

    return (
        <div className="bg-green-800 rounded-2xl shadow-md p-4 hover:scale-[1.03] transition-transform duration-200 ease-in-out">
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-contain rounded-md mb-3 bg-green-900"
            />
            <p className="font-semibold text-lg text-white">{item.title}</p>
            <div className="mt-3 bg-green-900 rounded-lg p-4">
                <p className="text-sm text-gray-300">
                    Statut : {item.statusId?.statusName || 'N/A'}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                    Localisation : {item.postalCode || 'N/A'}
                </p>
                <p className="text-sm text-gray-300 mt-1">Ville : {item.city || 'N/A'}</p>
                {item.distance !== undefined && item.distance !== null && (
                    <p className="text-sm text-green-300 mt-1">
                        📍 À {item.distance < 1 ? 'moins d’1' : item.distance.toFixed(1)} km de vous
                    </p>
                )}
            </div>
        </div>
    );
}
