export const HOUSE_TYPES = ['Apartment', 'Villa', 'Bungalow', 'Cottage', 'Townhouse', 'Chalet', 'Loft', 'Mansion', 'Duplex', 'Triplex', 'Quadplex', 'Studio', 'Other'] as const;

export type HouseType = typeof HOUSE_TYPES[number];
