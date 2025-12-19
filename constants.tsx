
import React from 'react';
import { OnboardingStep, KoalaExpression } from './types';

export const STEPS: OnboardingStep[] = [
  {
    id: 0,
    question: "Hello little friend! What is your name?",
    field: 'name',
    expression: KoalaExpression.SMILE,
    inputType: 'text'
  },
  {
    id: 1,
    question: "Great! How old are you today?",
    field: 'age',
    expression: KoalaExpression.THINK,
    inputType: 'number'
  },
  {
    id: 2,
    question: "Can you tell me your height (cm) and weight (kg)?",
    field: 'height',
    expression: KoalaExpression.SURPRISE,
    inputType: 'text' // We'll handle double input or just height for simplicity
  },
  {
    id: 3,
    question: "Which foods make your tummy happy?",
    field: 'likes',
    expression: KoalaExpression.CLAP,
    inputType: 'multi-select',
    options: ['🍎 Fruit', '🥦 Veggies', '🍕 Pizza', '🍗 Chicken', '🍚 Rice', '🍰 Cake']
  },
  {
    id: 4,
    question: "Is there anything you shouldn't eat?",
    field: 'dislikes',
    expression: KoalaExpression.THINK,
    inputType: 'multi-select',
    options: ['🥜 Peanuts', '🥛 Milk', '🥚 Eggs', '🐟 Fish', '🌶️ Spicy']
  },
  {
    id: 5,
    question: "Do you eat breakfast every morning?",
    field: 'habits',
    expression: KoalaExpression.SMILE,
    inputType: 'radio',
    options: ['Yes, always!', 'Sometimes', 'No, I forget']
  }
];

export const PixelStar = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" className={className}>
    <path d="M11 2h2v2h-2zM9 4h2v2H9zM13 4h2v2h-2zM7 6h2v2H7zM15 6h2v2h-2zM5 8h2v2H5zM17 8h2v2h-2zM2 10h3v2H2zM19 10h3v2h-3zM3 12h2v2H3zM19 12h2v2h-19zM4 14h2v2H4zM18 14h2v2h-2zM5 16h2v2H5zM17 16h2v2h-2zM6 18h2v2H6zM16 18h2v2h-2zM7 20h10v2H7z" fill="#FFD700" />
    <path d="M11 10h2v4h-2z" fill="#FFF" />
  </svg>
);
