import React from 'react';
import Image from 'next/image';
import { IImage } from '../pages';

interface ICard {
  cardStatus: IImage;
  selectCard: (status: IImage) => void;
  flipped: boolean;
}

function Card({ cardStatus, selectCard, flipped }: ICard) {
  const handleClick = () => {
    selectCard(cardStatus);
  };

  return (
    <div className="relative" onClick={handleClick}>
      <div className={`front absolute ${flipped && 'flipped'} `}>
        <Image className={``} src={cardStatus.src} alt="front-card" width="200" height="200" />
      </div>
      <div className={`back ${flipped && 'flipped'}`}>
        <Image src="/img/cover.png" alt="back-card" width="200" height="200" />
      </div>
    </div>
  );
}

export default Card;
