import { Card } from "../types/Card";

export const DECKS = [
  {
    id: 1,
    name: 'HTML',
  },
  {
    id: 2,
    name: 'English Grammar',
  },
  {
    id: 3,
    name: 'JS',
  },
  {
    id: 4,
    name: 'CSS',
  },
  {
    id: 5,
    name: 'Angular',
  },
  {
    id: 6,
    name: 'Mythology',
  },
  {
    id: 7,
    name: 'Maths',
  },
  {
    id: 8,
    name: 'Chemistry',
  },
  {
    id: 9,
    name: 'Psychology',
  },
  {
    id: 10,
    name: 'S.O.L.I.D',
  },
];

export const CARDS: Card[] = [
  {
    id: 1,
    deckId: 1,
    question: 'What is a favicon?',
    answer: 'Is the icon image that will appear next to the title in the browser\'s tabs',
  },
  {
    id: 2,
    deckId: 1,
    question: 'What does the attribute disabled?',
    answer: 'The attribute disabled will deactivate all click events in a button element'
  }
]
