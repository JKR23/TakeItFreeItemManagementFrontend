'use client';

import { useState } from 'react';

import SearchZone from '@/pages/explore_items/components/SearchZone';
import DisplayMesItems from '@/pages/mes_items/components/DisplayMesItems';

// @/pages/mes_items/page.jsx

export default function MesItems() {
    const [filteredItems, setFilteredItems] = useState(null);

    return (
        <div className="min-h-screen mx-auto px-4 sm:px-6 bg-green-900">
            <SearchZone onResults={setFilteredItems} />
            <DisplayMesItems items={filteredItems} />
        </div>
    );
}
