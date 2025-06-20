'use client';

import { useEffect, useState } from 'react';

import PrototypeImageExtra from '@/pages/mes_items/components/PrototypeImageExtra';

export default function DisplayMesItems({ items: itemsFromProps = [] }) {
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

    const fetchItems = async () => {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            if (!token) {
                console.error('Token JWT non trouvé');
                setItems([]);
                return;
            }

            const response = await fetch('http://localhost:8080/item/my-items', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error('Erreur HTTP:', response.status);
                setItems([]);
                return;
            }

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
            setItems([]);
        }
    };

    useEffect(() => {
        if (itemsFromProps && itemsFromProps.length > 0) {
            setItems(itemsFromProps);
            setStartIndex(0);
        } else {
            fetchItems();
        }
    }, [itemsFromProps]);

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
            <h2 className="text-3xl font-bold mb-4">Items publiés</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentItems.map((item, index) => (
                    <PrototypeImageExtra key={index} item={item} />
                ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <button
                    onClick={handlePrevious}
                    disabled={startIndex === 0}
                    className="w-full sm:w-auto px-4 py-2 bg-green-800 text-white rounded shadow-md disabled:bg-gray-400"
                >
                    ←
                </button>
                <button
                    onClick={handleNext}
                    disabled={startIndex + itemsPerPage >= items.length}
                    className="w-full sm:w-auto px-4 py-2 bg-green-800 text-white rounded shadow-md disabled:bg-gray-400"
                >
                    →
                </button>
            </div>
        </div>
    );
}
