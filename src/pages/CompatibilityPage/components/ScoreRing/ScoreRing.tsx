import React from 'react'
import './ScoreRing.css'

interface ScoreRingProps {
  score: number; // 0-100
  statusText: string;
}

const ScoreRing: React.FC<ScoreRingProps> = ({ score, statusText }) => {
  const normalizedScore = Math.min(100, Math.max(0, score));
  
  return (
    <div className="score-ring-container">
      <div 
        className="score-ring" 
        style={{ 
            // Usamos var(--brand-secondary) [Menta] para a parte cheia
            // e uma cor transparente/cinza para o resto
            background: `conic-gradient(
                var(--brand-secondary) 0%, 
                var(--brand-secondary) ${normalizedScore}%, 
                rgba(0,0,0,0.05) ${normalizedScore}%, 
                rgba(0,0,0,0.05) 100%
            )`
        }}
      >
        <div className="score-text">{Math.round(score)}%</div>
      </div>
      <p className="compatibility-status">{statusText}</p>
      
      {/* Barra de Progresso Abaixo do Score (Protótipo) */}
      <div className="score-bar-bg">
        <div className="score-bar-fill" style={{ width: `${normalizedScore}%` }}></div>
      </div>
    </div>
  );
}
export default ScoreRing
