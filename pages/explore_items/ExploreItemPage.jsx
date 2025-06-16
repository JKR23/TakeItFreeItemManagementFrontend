'use client';

import { useState } from 'react';

import DisplayItems from '@/pages/explore_items/components/DisplayItems';
import SearchZone from '@/pages/explore_items/components/SearchZone';

export default function ExploreItemPage() {
    const [filteredItems, setFilteredItems] = useState(null);

    return (
        <div className="min-h-screen  mx-auto px-2 sm:px-6 lg:px-8 bg-green-900">
            <SearchZone onResults={setFilteredItems} />
            <DisplayItems items={filteredItems} />
        </div>
    );
}
