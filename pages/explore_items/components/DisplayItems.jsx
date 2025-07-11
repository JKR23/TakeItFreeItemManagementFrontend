'use client';

import { useEffect, useState } from 'react';

import PrototypeImage from '@/pages/explore_items/components/PrototypeImage';

export default function DisplayItems({ items: itemsFromProps = [] }) {
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

    const loadDefaultItems = async () => {
        try {
            const response = await fetch(
                'https://takeitfreeitemmanagement.onrender.com/status/items-all',
            );
            const data = await response.json();

            if (!Array.isArray(data)) {
                console.error('Format de données invalide');
                setItems([]);
                return;
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLat = position.coords.latitude;
                        const userLon = position.coords.longitude;

                        const itemsWithDistance = data.map((item) => {
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

                        itemsWithDistance.sort((a, b) => a.distance - b.distance);
                        setItems(itemsWithDistance);
                    },
                    (error) => {
                        console.error('Erreur géolocalisation :', error);
                        setItems(data);
                    },
                );
            } else {
                setItems(data);
            }
        } catch (error) {
            console.error('Erreur de récupération des items :', error);
        }
    };

    useEffect(() => {
        if (itemsFromProps && itemsFromProps.length > 0) {
            setItems(itemsFromProps);
            setStartIndex(0);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            loadDefaultItems();
        }
    }, [itemsFromProps?.length]);

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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
                Items à récupérer
            </h2>

            {items.length === 0 ? (
                <p className="text-gray-500 text-center">Aucun item trouvé.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {currentItems.map((item, index) => (
                            <PrototypeImage key={index} item={item} />
                        ))}
                    </div>

                    <div className="flex justify-center sm:justify-between mt-6 gap-4">
                        <button
                            onClick={handlePrevious}
                            disabled={startIndex === 0}
                            className="px-4 py-2 bg-green-800 text-white rounded shadow-md disabled:bg-gray-400"
                        >
                            ←
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={startIndex + itemsPerPage >= items.length}
                            className="px-4 py-2 bg-green-800 text-white rounded shadow-md disabled:bg-gray-400"
                        >
                            →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
