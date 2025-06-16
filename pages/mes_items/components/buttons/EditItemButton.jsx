'use client';

export default function EditItemButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-white text-green-800 py-2 px-4 md:px-6 md:py-2 text-sm md:text-base w-full sm:w-auto rounded-lg font-semibold hover:bg-gray-200 transition"
        >
            ✏️Modifier item
        </button>
    );
}
