import React from 'react'
import './Header.css'
// REMOVIDO: import Title...
// NOVO: Importamos a Logo
import Logo from '@/shared_components/Logo/Logo' 
import BackButton from '@/shared_components/BackButton/BackButton'
import { useLocation } from 'react-router-dom'

const Header: React.FC = () => {
  const location = useLocation()
  
  // Define se estamos no fluxo de criação (não na home)
  const isStartFlow = location.pathname !== '/'
  // Páginas que precisam do header com fundo claro
  const isAdaptedPage = location.pathname === '/start' || location.pathname === '/new-cv' 

  let brandContent;

  if (isStartFlow) {
    // Nas páginas internas, mostramos o botão voltar na esquerda
    brandContent = <BackButton /> 
  } else {
    brandContent = <></>
  }

  return (
    <header className={`site-header ${isAdaptedPage ? 'is-start-page' : ''} ${!isStartFlow ? 'is-homepage' : ''}`}>
      <div className="header-inner">
        <div className="brand">
          {brandContent} 
        </div>
        
        <nav className="nav">
          {/* Se não for a home, mostra a Logo pequena na direita */}
          {isStartFlow && <Logo size="small" />} 
        </nav>
      </div>
    </header>
  )
}

export default Header