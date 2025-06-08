import DisplayItems from '@/pages/explore_items/components/DisplayItems';
import SearchZone from '@/pages/explore_items/components/SearchZone';

export default function ExploreItemPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <SearchZone />
            <DisplayItems />
        </div>
    );
}
