'use client';

import { useLoadScript } from '@react-google-maps/api';
import { useForm } from 'react-hook-form';

import { useEffect, useRef, useState } from 'react';

export default function FormAddItem() {
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
        const fetchStatuses = async () => {
            try {
                const res = await fetch('http://localhost:8080/status/all');
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
            formData.append('title', data.title);
            formData.append('postalCode', data.adresse);
            formData.append('statusId', data.statusId);
            formData.append('image', data.imageFile[0]);

            const response = await fetch('http://localhost:8080/item/add', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Erreur lors de la création');

            setMessage('✅ Objet publié avec succès !');
            reset();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Erreur de soumission :', error);
            setMessage('❌ Échec de la publication');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 sm:p-8 md:p-10 rounded-lg shadow-md bg-green-800 mb-12 mt-5">
            {message && (
                <p
                    className={`mb-6 text-center font-semibold ${
                        message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
                <input
                    type="text"
                    placeholder="Titre de l'objet*"
                    {...register('title', {
                        required: 'Titre requis',
                        minLength: { value: 2, message: 'Min. 2 caractères' },
                        maxLength: { value: 100, message: 'Max. 100 caractères' },
                    })}
                    className={`w-full px-4 py-3 border-b border-gray-300 focus:border-green-700 focus:outline-none rounded-md placeholder-white ${
                        errors.title ? 'border-red-500' : ''
                    }`}
                />
                {errors.title && (
                    <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                )}

                <input
                    type="text"
                    placeholder="Code postal* ex : A1A 1A1"
                    ref={addressRef}
                    {...register('adresse', {
                        required: 'Code postal requis',
                        minLength: { value: 7, message: 'Code postal trop court' },
                        maxLength: { value: 7, message: 'Code postal trop long' },
                        pattern: {
                            value: /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/,
                            message: 'Format invalide (ex : A1A 1A1)',
                        },
                    })}
                    maxLength={7}
                    className={`w-full px-4 py-3 border-b border-gray-300 focus:border-green-700 focus:outline-none uppercase rounded-md placeholder-white ${
                        errors.adresse ? 'border-red-500' : ''
                    }`}
                />
                {errors.adresse && (
                    <p className="text-red-600 text-sm mt-1">{errors.adresse.message}</p>
                )}

                <input
                    type="file"
                    accept="image/*"
                    {...register('imageFile', {
                        required: 'Image requise',
                    })}
                    className={`w-full px-4 py-2 border-b border-gray-300 focus:border-green-700 focus:outline-none rounded-md ${
                        errors.imageFile ? 'border-red-500' : ''
                    }`}
                />
                {errors.imageFile && (
                    <p className="text-red-600 text-sm mt-1">{errors.imageFile.message}</p>
                )}

                <select
                    {...register('statusId', { required: 'Statut requis' })}
                    className={`w-full px-4 py-3 border-b rounded-md focus:border-green-700 focus:outline-none text-green-700 ${
                        errors.statusId ? 'border-red-500' : ''
                    }`}
                >
                    <option value="">-- Choisir un statut --</option>
                    {statusList.map((status) => (
                        <option key={status.id} value={status.id}>
                            {status.name}
                        </option>
                    ))}
                </select>
                {errors.statusId && (
                    <p className="text-red-600 text-sm mt-1">{errors.statusId.message}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-green-900 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition"
                >
                    Publier l’objet
                </button>
            </form>
        </div>
    );
}
