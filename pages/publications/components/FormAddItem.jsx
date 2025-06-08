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
    const addressRef = useRef(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

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

    const onSubmit = (data) => {
        console.log('Item à enregistrer (envoyé au backend) :', data);
        setMessage('✅ Objet publié avec succès !');
        reset();
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            {message && <p className="text-green-600 font-semibold mb-4">{message}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                <textarea
                    placeholder="Description"
                    rows={4}
                    {...register('description', {
                        required: 'Description requise',
                        minLength: { value: 10, message: 'Min. 10 caractères' },
                        maxLength: { value: 1000, message: 'Max. 1000 caractères' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:border-green-700 focus:outline-none"
                />
                {errors.description && <p className="text-red-600">{errors.description.message}</p>}

                <input
                    type="text"
                    placeholder="Code postal*"
                    ref={addressRef}
                    {...register('adresse', {
                        required: 'Adresse ou code postal requis',
                        minLength: { value: 4, message: 'Adresse trop courte' },
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-green-700 focus:outline-none"
                />
                {errors.adresse && <p className="text-red-600">{errors.adresse.message}</p>}

                <input
                    type="file"
                    {...register('image', { required: 'Image requise' })}
                    className="w-full px-4 py-2 border-b border-gray-300 rounded cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 focus:border-green-700 focus:outline-none"
                />
                {errors.image && <p className="text-red-600">{errors.image.message}</p>}

                <select
                    {...register('categoryId', { required: 'Catégorie requise' })}
                    className="w-full px-4 py-2 border-b rounded focus:border-green-700 focus:outline-none"
                >
                    <option value="">-- Choisir une catégorie --</option>
                    <option value={1}>Électronique</option>
                    <option value={2}>Vêtements</option>
                    <option value={3}>Maison</option>
                </select>
                {errors.categoryId && <p className="text-red-600">{errors.categoryId.message}</p>}

                <select
                    {...register('statusId', { required: 'Statut requis' })}
                    className="w-full px-4 py-2 border-b rounded focus:border-green-700 focus:outline-none"
                >
                    <option value="">-- Choisir un statut --</option>
                    <option value={1}>Neuf</option>
                    <option value={2}>Bon état</option>
                    <option value={3}>À réparer</option>
                </select>
                {errors.statusId && <p className="text-red-600">{errors.statusId.message}</p>}

                <button
                    type="submit"
                    className="bg-green-900 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                >
                    Publier l’objet
                </button>
            </form>
        </div>
    );
}
