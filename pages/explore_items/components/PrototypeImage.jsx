'use client';

export default function PrototypeImage({ item }) {
    return (
        <div className="bg-green-800 rounded-2xl shadow-md p-4 hover:scale-105 transition-transform">
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-md mb-3"
            />
            <p className="font-semibold text-lg text-white">{item.title}</p>
            <p className="text-sm text-white-300 mt-5">Statut : {item.status}</p>
            <p className="text-sm text-white-300 mt-5">Localisation : {item.codePostal}</p>
            <p className="text-sm text-white-300 mt-5">Ville : {item.ville}</p>

            {item.distance !== undefined && item.distance !== null && (
                <p className="text-sm text-green-300 mt-5">
                    📍 À {item.distance < 1 ? 'moins d’1' : item.distance.toFixed(1)} km de vous
                </p>
            )}
        </div>
    );
}
