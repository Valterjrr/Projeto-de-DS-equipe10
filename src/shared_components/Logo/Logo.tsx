import React from 'react';
import './Logo.css';

interface LogoProps {
  size?: 'small' | 'large';
  showText?: boolean; // <--- 1. Precisamos avisar que essa propriedade existe!
}

// 2. Recebemos a propriedade aqui (padrão é true se não vier nada)
const Logo: React.FC<LogoProps> = ({ size = 'large', showText = true }) => {
  return (
    <div className={`brand-logo ${size}`}>
      <div className="logo-svg-wrapper">
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Círculos e Check (Geometria) */}
          <circle cx="58" cy="42" r="38" fill="var(--color-teal)" />
          <circle cx="42" cy="58" r="38" stroke="var(--color-mint)" strokeWidth="4" />
          <path d="M30 56 L44 70 L72 34" stroke="var(--color-mint)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      
      {/* 3. A Lógica Mágica: Só cria a div se showText for verdadeiro */}
      {showText && <div className="logo-text">AId</div>}
    </div>
  );
};

export default Logo;