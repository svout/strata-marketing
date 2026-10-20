export interface ItineraryCardProps {
  isActive?: boolean;
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
  tagLabel: string;
  title: string;
  description: string;
  cost: string;
  rateValue: string;
}

export interface ItineraryItem extends Omit<ItineraryCardProps, "isActive"> {
  id: string;
}