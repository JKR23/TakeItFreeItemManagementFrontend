'use client';

import { useState } from 'react';

import SearchZone from '@/pages/explore_items/components/SearchZone';
import DisplayMesItems from '@/pages/mes_items/components/DisplayMesItems';

export default function MesItems() {
    const [filteredItems, setFilteredItems] = useState(null);

    return (
        <div className="max-w-7xl mx-auto">
            <SearchZone onResults={setFilteredItems} />
            <DisplayMesItems items={filteredItems} />
        </div>
    );
}
