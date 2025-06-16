'use client';

export default function ModalWrapper({ children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
                >
                    &times;
                </button>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
