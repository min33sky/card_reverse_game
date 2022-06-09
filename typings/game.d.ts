export interface IImage {
  id: number;
  src: string;
  matched: boolean;
}

export interface ICard {
  cardStatus: IImage;
  selectCard: (status: IImage) => void;
  flipped: boolean;
}
