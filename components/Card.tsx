import React, { useCallback } from 'react';
import Image from 'next/image';
import { ICard } from '../typings/game';

function Card({ cardStatus, selectCard, flipped }: ICard) {
  const handleClick = useCallback(() => {
    selectCard(cardStatus);
  }, [cardStatus, selectCard]);

  return (
    <article
      aria-label="카드"
      className={`relative transition hover:ring-1  ${
        cardStatus.matched
          ? 'cursor-not-allowed hover:ring-red-400'
          : 'cursor-pointer hover:ring-blue-400'
      }`}
      onClick={handleClick}
    >
      <div aria-label="카드 앞면" className={`front absolute ${flipped && 'flipped'} `}>
        <Image className={``} src={cardStatus.src} alt="front-card" width="200" height="200" />
      </div>

      <div aria-label="카드 뒷면" className={`back ${flipped && 'flipped'}`}>
        <Image src="/img/cover.png" alt="back-card" width="200" height="200" />
      </div>
    </article>
  );
}

export default Card;
