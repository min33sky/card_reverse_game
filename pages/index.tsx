import Head from 'next/head';
import { useEffect, useState } from 'react';
import Card from '../components/Card';

export interface IImage {
  id: number;
  src: string;
  matched: boolean;
}

const images = [
  {
    src: '/img/helmet-1.png',
    matched: false,
  },
  {
    src: '/img/potion-1.png',
    matched: false,
  },
  {
    src: '/img/ring-1.png',
    matched: false,
  },
  {
    src: '/img/scroll-1.png',
    matched: false,
  },
  {
    src: '/img/shield-1.png',
    matched: false,
  },
  {
    src: '/img/sword-1.png',
    matched: false,
  },
];

export default function Home() {
  const [cards, setCards] = useState<IImage[]>([]);
  const [choiceOne, setChoiceOne] = useState<IImage | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<IImage | null>(null);
  const [turns, setTurns] = useState(0);

  const shuffleCards = () => {
    //* 중복 카드를 한장씩 추가해서 순서를 섞자
    const extendedCards = [...images, ...images];
    const cardList = [];
    while (extendedCards.length > 0) {
      let index = Math.floor(Math.random() * extendedCards.length);
      cardList.push({
        ...extendedCards.splice(index, 1)[0],
        id: Math.random(),
      });
    }
    setCards(cardList);
    setTurns(0);
  };

  const selectCard = (card: IImage) => {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  const resetCard = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) =>
          prev.map((card) => (card.src === choiceOne.src ? { ...card, matched: true } : card))
        );
        resetCard();
      } else {
        setTimeout(() => resetCard(), 1000);
      }
      setTurns((prev) => prev + 1);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-slate-800 text-slate-300 ">
      <Head>
        <title>Card Game ✨</title>
      </Head>
      <div>
        <h1 className="mt-4 text-center text-3xl font-bold">Card Game</h1>
        <div className="my-10 flex items-center justify-between">
          <p>Turns: {turns}</p>
          <button
            className="rounded-lg bg-slate-500 px-3 py-2 text-slate-300 transition-colors hover:bg-slate-600"
            onClick={shuffleCards}
          >
            Start Game
          </button>
        </div>

        <div className="grid max-w-2xl grid-cols-4 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              cardStatus={card}
              selectCard={selectCard}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
