'use client';

import { useState } from 'react';

import ModalWrapper from '@/components/ModalWrapper';

import FormEditItem from '@/pages/mes_items/components/FormEditItem';
import EditItemButton from '@/pages/mes_items/components/buttons/EditItemButton';
import ItemTakenButton from '@/pages/mes_items/components/buttons/ItemTakenButton';

export default function PrototypeImageExtra({ item }) {
    const [isEditing, setIsEditing] = useState(false);

    if (!item) return null; // NE REND RIEN si item est undefined

    const handleUpdateItem = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    return (
        <>
            <div className="bg-green-800 rounded-2xl shadow-md p-4 hover:scale-105 transition-transform">
                <img
                    src={item.image || '/placeholder.jpg'} // Utilise une image de secours si image manquante
                    alt={item.title || 'Item'}
                    className="w-full h-40 object-contain rounded-md mb-3 bg-green-900"
                />
                <p className="font-semibold text-lg text-white">{item.title || 'Sans titre'}</p>
                <div className="mt-3 bg-green-900 rounded-lg p-4">
                    <p className="text-sm text-gray-300 mt-0">
                        Statut : {item.statusId?.statusName || 'Non défini'}
                    </p>
                    <p className="text-sm text-gray-300 mt-2">
                        Localisation : {item.postalCode || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-300 mt-2">Ville : {item.city || 'N/A'}</p>
                    {item.distance !== undefined && item.distance !== null && (
                        <p className="text-sm text-green-300 mt-2">
                            📍 À {item.distance < 1 ? 'moins d’1' : item.distance.toFixed(1)} km de
                            vous
                        </p>
                    )}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <ItemTakenButton itemId={item.id} />
                    <EditItemButton onClick={handleUpdateItem} />
                </div>
            </div>

            {isEditing && (
                <ModalWrapper onClose={handleCancelEdit}>
                    <FormEditItem item={item} onCancel={handleCancelEdit} />
                </ModalWrapper>
            )}
        </>
    );
}
