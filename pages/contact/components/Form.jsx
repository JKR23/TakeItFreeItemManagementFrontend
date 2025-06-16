'use client';

import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';

import { useState } from 'react';

export default function FormContact() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nom: '',
            telephone: '',
            email: '',
            objet: '',
            commentaires: '',
        },
    });

    const [successMessage, setSuccessMessage] = useState('');

    const sendEmail = (values) => {
        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        const templateParams = {
            name: values.nom,
            phone: values.telephone,
            email: values.email,
            subject: values.objet,
            message: values.commentaires,
        };

        emailjs
            .send(serviceID, templateID, templateParams, publicKey)
            .then(() => {
                setSuccessMessage('✅ Votre message a bien été envoyé.');
                reset();
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch((error) => {
                console.error('Erreur EmailJS:', error);
                setSuccessMessage('❌ Une erreur est survenue. Veuillez réessayer.');
                setTimeout(() => setSuccessMessage(''), 5000);
            });
    };

    return (
        <div className="w-full max-w-xl px-4 sm:px-6 lg:px-8 mx-auto">
            {successMessage && (
                <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-800 font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5 fill-green-600" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" />
                    </svg>
                    {successMessage}
                </div>
            )}

            <form
                onSubmit={handleSubmit(sendEmail)}
                className="space-y-4 bg-green-800 bg-opacity-10 backdrop-blur-sm p-6 rounded-lg shadow-md"
            >
                <input
                    type="text"
                    placeholder="Nom*"
                    {...register('nom', {
                        required: 'Le nom est requis.',
                        minLength: { value: 2, message: 'Min. 2 caractères.' },
                        maxLength: { value: 20, message: 'Max. 20 caractères.' },
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 rounded focus:border-green-600 focus:outline-none bg-transparent text-white placeholder-white"
                />
                {errors.nom && <p className="text-red-600 italic text-sm">{errors.nom.message}</p>}

                <input
                    type="text"
                    placeholder="Téléphone*"
                    {...register('telephone', {
                        required: 'Le téléphone est requis.',
                        pattern: { value: /^\d+$/, message: 'Chiffres uniquement.' },
                        maxLength: { value: 14, message: 'Max. 14 chiffres.' },
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 rounded focus:border-green-600 focus:outline-none bg-transparent text-white placeholder-white"
                />
                {errors.telephone && (
                    <p className="text-red-600 italic text-sm">{errors.telephone.message}</p>
                )}

                <input
                    type="email"
                    placeholder="Email*"
                    {...register('email', {
                        required: "L'email est requis.",
                        validate: {
                            hasAt: (v) => v.includes('@') || "Doit contenir '@'.",
                            format: (v) =>
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Format email invalide.',
                        },
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 rounded focus:border-green-600 focus:outline-none bg-transparent text-white placeholder-white"
                />
                {errors.email && (
                    <p className="text-red-600 italic text-sm">{errors.email.message}</p>
                )}

                <input
                    type="text"
                    placeholder="Objet*"
                    {...register('objet', {
                        required: "L'objet est requis.",
                        minLength: { value: 5, message: 'Min. 5 caractères.' },
                        maxLength: { value: 30, message: 'Max. 30 caractères.' },
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 rounded focus:border-green-600 focus:outline-none bg-transparent text-white placeholder-white"
                />
                {errors.objet && (
                    <p className="text-red-600 italic text-sm">{errors.objet.message}</p>
                )}

                <textarea
                    placeholder="Message*"
                    rows={5}
                    {...register('commentaires', {
                        required: 'Le message est requis.',
                        maxLength: { value: 500, message: 'Max. 500 caractères.' },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:border-green-600 focus:outline-none bg-transparent text-white placeholder-white"
                ></textarea>
                {errors.commentaires && (
                    <p className="text-red-600 italic text-sm">{errors.commentaires.message}</p>
                )}

                <button
                    type="submit"
                    className="w-full sm:w-auto bg-green-900 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                >
                    Envoyer
                </button>
            </form>
        </div>
    );
}
