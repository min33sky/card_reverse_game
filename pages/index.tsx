import Head from 'next/head';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { images } from '../data/card';
import { IImage } from '../typings/game';

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
    <>
      <Head>
        <title>Card Game ✨</title>
      </Head>

      <div className="flex min-h-screen w-full flex-col items-center justify-between bg-gradient-to-r from-violet-900 to-violet-800 text-slate-300">
        <header>
          <h1 className="font-header mt-8 select-none text-center text-3xl font-bold">
            카드 짝 맞추기 게임 🚀
          </h1>
        </header>

        <main className="mx-2 grid max-w-2xl grid-cols-4 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              cardStatus={card}
              selectCard={selectCard}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
        </main>

        <footer className="mb-10 flex w-3/4  max-w-2xl items-center justify-between">
          <p className="select-none text-2xl font-bold">턴: {turns}</p>
          <button
            className="select-none rounded-lg bg-orange-400 px-3 py-2 text-lg font-bold text-slate-800 transition-colors hover:bg-orange-600"
            onClick={shuffleCards}
          >
            게임 시작
          </button>
        </footer>
      </div>
    </>
  );
}
