# Memory Matching Game
A simple memory matching game built with TypeScript and React.

## What it does
This game creates a grid of cards with hidden values. The player's goal is to find all the matching pairs by flipping two cards at a time.

## Installation and Running
To get started, clone this repository and install the dependencies:
```bash
git clone https://github.com/your-username/memory-matching-game.git
cd memory-matching-game
npm install
```
Then, start the development server:
```bash
npm start
```
Open your browser to `http://localhost:3000` to play the game.

## Example
The game grid is customizable, but by default, it's a 4x4 grid with 8 pairs of cards. Here's a quick example of what it looks like:
```typescript
const grid = [
  { id: 1, value: 'A' },
  { id: 2, value: 'B' },
  { id: 3, value: 'A' },
  { id: 4, value: 'C' },
  { id: 5, value: 'C' },
  { id: 6, value: 'B' },
  { id: 7, value: 'D' },
  { id: 8, value: 'D' },
  { id: 9, value: 'E' },
  { id: 10, value: 'F' },
  { id: 11, value: 'E' },
  { id: 12, value: 'F' },
  { id: 13, value: 'G' },
  { id: 14, value: 'H' },
  { id: 15, value: 'G' },
  { id: 16, value: 'H' },
];
```
Feel free to modify the grid to create your own custom game.