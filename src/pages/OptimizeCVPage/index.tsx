import React from 'react'
import PageCardLayout from '@/shared_components/PageCardLayout/PageCardLayout'

const OptimizeCVPage: React.FC = () => {
  return (
    <PageCardLayout>
      <div className="content-inner">
        <h1 className="main-title">Melhorar Currículo</h1>
        <p className="subtitle">
          Cole seu currículo e a descrição da vaga para receber uma análise detalhada.
        </p>
        
        {/* Aqui entraremos com o layout de duas colunas do Figma 3B depois */}
        <div style={{ 
            padding: '40px', 
            background: 'rgba(0,0,0,0.05)', 
            borderRadius: '8px', 
            marginTop: '20px' 
        }}>
            🚧 Área de Upload em Construção 🚧
        </div>
      </div>
    </PageCardLayout>
  )
}

export default OptimizeCVPage