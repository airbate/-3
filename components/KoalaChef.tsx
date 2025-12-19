
import React from 'react';
import { KoalaExpression } from '../types';

interface KoalaChefProps {
  expression: KoalaExpression;
}

export const KoalaChef: React.FC<KoalaChefProps> = ({ expression }) => {
  const renderFace = () => {
    switch (expression) {
      case KoalaExpression.THINK:
        return (
          <g>
            {/* Thinking Eyes */}
            <rect x="32" y="44" width="8" height="4" fill="#333" />
            <rect x="56" y="44" width="8" height="4" fill="#333" />
            {/* Small O mouth */}
            <rect x="46" y="58" width="4" height="4" fill="#333" />
          </g>
        );
      case KoalaExpression.CLAP:
        return (
          <g>
            {/* Happy closed eyes ^ ^ */}
            <rect x="32" y="42" width="4" height="4" fill="#333" />
            <rect x="36" y="40" width="4" height="4" fill="#333" />
            <rect x="56" y="40" width="4" height="4" fill="#333" />
            <rect x="60" y="42" width="4" height="4" fill="#333" />
            {/* Big Smile */}
            <rect x="42" y="58" width="12" height="4" fill="#333" />
            <rect x="42" y="62" width="12" height="2" fill="#FFB6C1" />
          </g>
        );
      case KoalaExpression.SURPRISE:
        return (
          <g>
            {/* Big round eyes */}
            <rect x="32" y="42" width="8" height="8" fill="#333" />
            <rect x="56" y="42" width="8" height="8" fill="#333" />
            {/* Big O mouth */}
            <rect x="44" y="58" width="8" height="8" fill="#333" />
          </g>
        );
      case KoalaExpression.SMILE:
      default:
        return (
          <g>
            {/* Eyes */}
            <rect x="32" y="44" width="8" height="8" fill="#333" />
            <rect x="56" y="44" width="8" height="8" fill="#333" />
            {/* Smile */}
            <rect x="42" y="60" width="12" height="4" fill="#333" />
          </g>
        );
    }
  };

  return (
    <div className="relative w-48 h-48 sm:w-64 sm:h-64">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Ears */}
        <rect x="10" y="30" width="20" height="20" fill="#8E8E8E" />
        <rect x="70" y="30" width="20" height="20" fill="#8E8E8E" />
        <rect x="15" y="35" width="10" height="10" fill="#FFC0CB" />
        <rect x="75" y="35" width="10" height="10" fill="#FFC0CB" />
        
        {/* Head */}
        <rect x="25" y="30" width="50" height="50" fill="#A9A9A9" />
        
        {/* Face Elements */}
        {renderFace()}

        {/* Big Nose */}
        <rect x="44" y="48" width="12" height="10" fill="#333" rx="2" />

        {/* Chef Hat */}
        <rect x="35" y="5" width="30" height="15" fill="#FFF" />
        <rect x="30" y="20" width="40" height="10" fill="#EEE" />
        <path d="M35 20 L65 20 L65 18 L35 18 Z" fill="#DDD" />

        {/* Body/Apron */}
        <rect x="30" y="80" width="40" height="20" fill="#FFF" />
        <rect x="35" y="85" width="30" height="15" fill="#5D4AD8" />
      </svg>
    </div>
  );
};
