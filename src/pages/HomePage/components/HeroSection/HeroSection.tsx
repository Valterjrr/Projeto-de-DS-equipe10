import React from 'react'
import './HeroSection.css'
import Logo from '@/shared_components/Logo/Logo' // <--- Importante!

const HeroSection: React.FC = () => {
  return (
    <div className="hp-hero">
      <div className="hp-hero-inner">
        
        {/* Grupo com a Logo e o Título */}
        <div className="hp-header-group">
             <Logo size="small" showText={false} /> 
             <h1 className="hp-title">AId Curriculum</h1>
        </div>

        <p className="hp-subtitle">
          Transforme seu currículo com inteligência artificial. Análise de compatibilidade,
          sugestões personalizadas e templates profissionais.
        </p>
      </div>
    </div>
  )
}

export default HeroSection