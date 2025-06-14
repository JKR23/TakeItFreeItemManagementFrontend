'use client';

export default function ItemTakenButton({ itemId }) {
    const handleItemTaken = async () => {
        try {
            const response = await fetch(`http://localhost:8080/item/take/${itemId}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                console.error('Erreur lors de la mise à jour de l’item');
            } else {
                console.log('Item mis à jour avec succès');
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
        }
    };

    return (
        <button
            onClick={handleItemTaken}
            className="bg-yellow-400 text-black py-2 px-4 cursor-pointer rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
            Item pris/pas pris
        </button>
    );
}
