import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import Card from './components/Card';
import './CyberpunkButton.css';

const cardImages = [
	'/img/cyberpunk/TarotCard_01.webp',
	'/img/cyberpunk/TarotCard_02.webp',
	'/img/cyberpunk/TarotCard_03.webp',
	'/img/cyberpunk/TarotCard_04.webp',
	'/img/cyberpunk/TarotCard_05.webp',
	'/img/cyberpunk/TarotCard_06.webp',
];

export interface ICard {
	src: string;
	id: string;
	isMatched: boolean;
}
function App() {
	const [cards, setCards] = useState<ICard[]>([]);
	const [turns, setTurns] = useState(0);

	const [choiceOne, setChoiceOne] = useState<ICard | null>(null);
	const [choiceTwo, setChoiceTwo] = useState<ICard | null>(null);

	const handleChoice = (card: ICard) => () => {
		if (card.isMatched) return;
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	const resetGame = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((src): ICard => {
				return {
					src,
					id: uuid(),
					isMatched: false,
				};
			});

		setCards(shuffledCards);
		setTurns(0);
		setLoadedImgCount(0);
		setShowLoading(false);
	};

	useEffect(() => {
		resetGame();
	}, []);

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			if (choiceOne.id !== choiceTwo.id && choiceOne.src === choiceTwo.src) {
				setCards((prevCards) =>
					prevCards.map((card) =>
						card.src === choiceOne.src ? { ...card, isMatched: true } : card
					)
				);
			}

			setTimeout(() => {
				setChoiceOne(null);
				setChoiceTwo(null);
				setTurns((prevTurn) => prevTurn + 1);
			}, 500);
		}
	}, [choiceOne, choiceTwo]);

	const [loadedImgCount, setLoadedImgCount] = useState(0);

	const incrementLoadedCount = () => {
		setLoadedImgCount((prevState) => prevState + 1);
	};

	const [showLoading, setShowLoading] = useState(false);

	useEffect(() => {
		if (loadedImgCount !== cards.length * 2)
			setTimeout(() => {
				setShowLoading(true);
			}, 500);
		else setShowLoading(false);
	}, [cards.length, loadedImgCount]);

	const isLoading = loadedImgCount !== cards.length * 2;
	return (
		<div className='App'>
			<h1>Turns: {turns}</h1>
			<button className='cyber-btn' onClick={() => resetGame()}>
				New Game<span aria-hidden>_</span>
				<span aria-hidden className='cyber-btn__glitch'>
					New Game
				</span>
				<span aria-hidden className='cyber-btn__tag'>
					R25
				</span>
			</button>
			<div className={showLoading && isLoading ? '' : 'invisible'}>
				<h1>loading...</h1>
			</div>
			<div className={!isLoading ? 'card-grid' : 'invisible'}>
				{cards.map((card) => (
					<Card
						handleChoice={handleChoice(card)}
						imgSrc={card.src}
						key={card.id}
						incrementLoadedCount={incrementLoadedCount}
						isFlipped={
							card.isMatched ||
							card.id === choiceOne?.id ||
							card.id === choiceTwo?.id
						}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
