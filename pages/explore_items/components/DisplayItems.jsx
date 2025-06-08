'use client';

import { useEffect, useState } from 'react';

import PrototypeImage from '@/pages/explore_items/components/PrototypeImage';

export default function DisplayItems() {
    const [items, setItems] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 8;

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    useEffect(() => {
        const localItems = [
            {
                id: 1,
                title: 'Ordinateur portable',
                image: 'https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/36/362223f2-97e5-4f89-8dc6-173e4ff81f5b?rule=kijijica-400-webp',
                latitude: 45.5017,
                longitude: -73.5673, // Montréal
                codePostal: '',
                ville: 'Montreal',
            },
            {
                id: 2,
                title: 'Livre de programmation',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXNLMLGaQNCk8A6qPRcE7MQWJXa7HUQlFb9w&s',
                latitude: 45.4215,
                longitude: -75.699, // Ottawa
                codePostal: 'K1P 1J1',
                ville: 'Ottawa',
            },
            {
                id: 3,
                title: 'Chaise ergonomique',
                image: 'https://user-assets.sharetribe.com/images/listing_images/images/4336769/big/img_20210714_074052.jpg?1629198493',
                latitude: 46.8139,
                longitude: -71.2082, // Québec
                codePostal: '',
                ville: 'Québec',
            },
            // Ajoute d'autres objets ici avec latitude/longitude
        ];

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLon = position.coords.longitude;

                    const itemsWithDistance = localItems.map((item) => {
                        if (item.latitude && item.longitude) {
                            const distance = getDistanceFromLatLonInKm(
                                userLat,
                                userLon,
                                item.latitude,
                                item.longitude,
                            );
                            return { ...item, distance: parseFloat(distance.toFixed(2)) };
                        }
                        return item;
                    });

                    // Tri par distance croissante
                    itemsWithDistance.sort((a, b) => a.distance - b.distance);

                    setItems(itemsWithDistance);
                },
                (error) => {
                    console.error('Erreur géolocalisation :', error);
                    setItems(localItems);
                },
            );
        } else {
            setItems(localItems);
        }
    }, []);

    const handleNext = () => {
        if (startIndex + itemsPerPage < items.length) {
            setStartIndex(startIndex + itemsPerPage);
        }
    };

    const handlePrevious = () => {
        if (startIndex - itemsPerPage >= 0) {
            setStartIndex(startIndex - itemsPerPage);
        }
    };

    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Items à récupérer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentItems.map((item, index) => (
                    <PrototypeImage key={index} item={item} />
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrevious}
                    disabled={startIndex === 0}
                    className="px-4 py-2 bg-green-800 shadow-md cursor-pointer text-white rounded disabled:bg-gray-400"
                >
                    ←
                </button>
                <button
                    onClick={handleNext}
                    disabled={startIndex + itemsPerPage >= items.length}
                    className="px-4 py-2 bg-green-800 cursor-pointer text-white shadow-md rounded disabled:bg-gray-400"
                >
                    →
                </button>
            </div>
        </div>
    );
}
