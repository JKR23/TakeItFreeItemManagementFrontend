import SearchZone from '@/pages/explore_items/components/SearchZone';
import DisplayMesItems from '@/pages/mes_items/components/DisplayMesItems';

export default function MesItems() {
    return (
        <div className="max-w-7xl mx-auto">
            <SearchZone />
            <DisplayMesItems />
        </div>
    );
}
