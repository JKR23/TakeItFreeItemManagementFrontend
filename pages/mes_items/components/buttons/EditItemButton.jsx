// @/pages/mes_items/components/buttons/EditItemButton.jsx
'use client';

export default function EditItemButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-white text-green-800 py-2 px-4 cursor-pointer rounded-lg font-semibold hover:bg-gray-200 transition"
        >
            ✏️Modifier item
        </button>
    );
}
