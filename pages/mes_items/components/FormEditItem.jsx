'use client';

import { useLoadScript } from '@react-google-maps/api';
import { useForm } from 'react-hook-form';

import { useEffect, useRef, useState } from 'react';

export default function FormEditItem({ item, onCancel }) {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const [message, setMessage] = useState('');
    const [statusList, setStatusList] = useState([]);
    const addressRef = useRef(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    useEffect(() => {
        if (item) {
            setValue('title', item.title);
            setValue('adresse', item.postalCode);
            setValue('statusId', item.statusId.id);
        }
    }, [item, setValue]);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const res = await fetch('https://takeitfreeitemmanagement.onrender.com/status/all');
                const data = await res.json();
                setStatusList(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des statuts :', error);
            }
        };
        fetchStatuses();
    }, []);

    useEffect(() => {
        if (!isLoaded || !addressRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, {
            types: ['geocode'],
            componentRestrictions: { country: 'ca' },
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.formatted_address) {
                setValue('adresse', place.formatted_address);
            }
        });
    }, [isLoaded, setValue]);

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('id', item.id);
            formData.append('title', data.title);
            formData.append('postalCode', data.adresse);
            formData.append('statusId', data.statusId);
            formData.append('image', data.imageFile[0]);

            // ✅ Récupération du token
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            if (!token) throw new Error('Token JWT non trouvé');

            const response = await fetch(
                `https://takeitfreeitemmanagement.onrender.com/item/update`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                },
            );

            if (!response.ok) throw new Error('Erreur lors de la modification');

            setMessage('✅ Modifications enregistrées !');
            setTimeout(() => {
                setMessage('');
                onCancel(); // ferme le formulaire
            }, 1000);
        } catch (error) {
            console.error('Erreur de modification :', error);
            setMessage('❌ Échec de la modification');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 rounded bg-green-900">
            {message && <p className="text-green-600 font-semibold mb-4">{message}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 m-6">
                <input
                    type="text"
                    placeholder="Titre de l'objet*"
                    {...register('title', {
                        required: 'Titre requis',
                        minLength: { value: 2, message: 'Min. 2 caractères' },
                        maxLength: { value: 100, message: 'Max. 100 caractères' },
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-green-700 focus:outline-none"
                />
                {errors.title && <p className="text-red-600">{errors.title.message}</p>}

                <input
                    type="text"
                    placeholder="code postal* ex :A1A 1A1"
                    ref={addressRef}
                    {...register('adresse', {
                        required: 'Code postal requis',
                        pattern: {
                            value: /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/,
                            message: 'Format invalide (ex:A1A 1A1)',
                        },
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-green-700 focus:outline-none uppercase"
                    maxLength={7}
                />
                {errors.adresse && <p className="text-red-600">{errors.adresse.message}</p>}

                <input
                    type="file"
                    accept="image/*"
                    {...register('imageFile', {
                        required: 'Une image est requise',
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-green-700 focus:outline-none"
                />
                {errors.imageFile && <p className="text-red-600">{errors.imageFile.message}</p>}

                <select
                    {...register('statusId', { required: 'Statut requis' })}
                    className="w-full px-4 py-2 border-b rounded focus:border-green-700 focus:outline-none text-green-700"
                >
                    <option value="">-- Choisir un statut --</option>
                    {statusList.map((status) => (
                        <option key={status.id} value={status.id}>
                            {status.name}
                        </option>
                    ))}
                </select>
                {errors.statusId && <p className="text-red-600">{errors.statusId.message}</p>}

                <div className="flex justify-between gap-4">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                    >
                        Enregistrer
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
}
