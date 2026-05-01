import { Building2, Hotel, Warehouse, Home, Trees, Building, Mountain, DoorOpen, Castle, Columns, Grid2X2, LayoutGrid, Tent } from 'lucide-react';

export const typeIcons: Record<string, any> = {
    'Apartment': Building2,
    'Villa': Hotel,
    'Studio': Warehouse,
    'Bungalow': Home,
    'Cottage': Trees,
    'Townhouse': Building,
    'Chalet': Mountain,
    'Loft': DoorOpen,
    'Mansion': Castle,
    'Duplex': Columns,
    'Triplex': Grid2X2,
    'Quadplex': LayoutGrid,
    'Other': Tent
};
