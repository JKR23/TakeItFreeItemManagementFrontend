'use client';

export default function EnregistrerModification({ onClick }) {
    return (
        <button
            type="submit"
            onClick={onClick}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
            Enregistrer
        </button>
    );
}
