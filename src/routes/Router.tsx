import React from 'react'
import HomePage from '@/pages/HomePage'
import StartPage from '@/pages/StartPage'
import NewCVTypePage from '@/pages/NewCVTypePage'
// NOVO: Importar o Wizard unificado do fluxo de criação de CV
import CVBuilderWizard from '@/pages/CVBuilderWizard'
import FinalReviewPage from '@/pages/FinalReviewPage' // NOVO: Página de Revisão Final
import CompatibilityPage from '@/pages/CompatibilityPage' // Rota de Análise
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import OptimizeCVPage from '@/pages/OptimizeCVPage' //adicionada nova página pra otimizar curriculo pronto
// NOVO: Componente que renderiza as rotas com a location para facilitar transições
const Router = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              key="homepage"
              initial="initial"
              animate="in"
              exit="out"
              variants={{ initial: { opacity: 0, x: 20 }, in: { opacity: 1, x: 0 }, out: { opacity: 0, x: -20 } }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              className="page-transition-wrapper"
            >
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/start"
          element={
            <motion.div
              key="startpage"
              initial="initial"
              animate="in"
              exit="out"
              variants={{ initial: { opacity: 0, x: 20 }, in: { opacity: 1, x: 0 }, out: { opacity: 0, x: -20 } }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              className="page-transition-wrapper"
            >
              <StartPage />
            </motion.div>
          }
        />
  {/* Rota 1.0: Seleção de Tipo de CV */}
  <Route path="/new-cv" element={<RouteWrapper key="newcvtypepage" component={NewCVTypePage} />} />

  {/* NOVA ROTA ÚNICA PARA O FLUXO DO FORMULÁRIO (Wizard) */}
  <Route path="/new-cv/builder" element={<RouteWrapper key="cv-builder-wizard" component={CVBuilderWizard} />} />

  {/* As rotas individuais do formulário foram removidas e substituídas pelo Wizard */}
  {/* Rota Final Unificada para Revisão e Download */}
  <Route path="/final-review" element={<RouteWrapper key="final-review-page" component={FinalReviewPage} />} />
  {/* Rota de Análise (Critical Path para fluxo Otimizado) */}
  <Route path="/analysis" element={<RouteWrapper key="analysis-page" component={CompatibilityPage} />} />
  {/* Rota do "Analise um Curriculo Pronto" */}
  <Route path="/optimize-cv" element={<RouteWrapper key="optimize-cv-page" component={OptimizeCVPage} />} />        
      </Routes>
    </AnimatePresence>
  )
}

export default Router

// NOVO: Componente Wrapper para simplificar o código do Router
const RouteWrapper: React.FC<{ component: React.ComponentType; key: string }> = ({ component: Component, key }) => {
  return (
    <motion.div
      key={key}
      initial="initial"
      animate="in"
      exit="out"
      variants={{ initial: { opacity: 0, x: 20 }, in: { opacity: 1, x: 0 }, out: { opacity: 0, x: -20 } }}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      className="page-transition-wrapper"
    >
      <Component />
    </motion.div>
  );
};
