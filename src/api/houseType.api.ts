export const HOUSE_TYPES = ['Apartment', 'House', 'Studio', 'Condo', 'Dormitory', 'Other'] as const;

export type HouseType = typeof HOUSE_TYPES[number];
