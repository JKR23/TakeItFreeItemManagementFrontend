'use client';

import { useState } from 'react';

import DisplayItems from '@/pages/explore_items/components/DisplayItems';
import SearchZone from '@/pages/explore_items/components/SearchZone';

export default function ExploreItemPage() {
    const [filteredItems, setFilteredItems] = useState(null); // null = charger tout

    return (
        <div className="max-w-7xl mx-auto">
            <SearchZone onResults={setFilteredItems} />
            <DisplayItems items={filteredItems} />
        </div>
    );
}
