import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageCardLayout from '@/shared_components/PageCardLayout/PageCardLayout'
import Tabs from './components/Tabs/Tabs'
import type { TabItem } from './components/Tabs/Tabs.types'
import type { JobCompatibilityAnalysis } from '@/types/resume'
import './CompatibilityPage.css'
// NOVO: Importar componentes modulares
import SkillsTab from './components/SkillsTab/SkillsTab'
import SuggestionsTab from './components/SuggestionsTab/SuggestionsTab'
import LearningTab from './components/LearningTab/LearningTab'
import ScoreRing from './components/ScoreRing/ScoreRing'

const CompatibilityPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [activeTab, setActiveTab] = React.useState<string>('habilidades')
    // O `reviewData` agora deve ser um objeto CVResponse desembrulhado
    const reviewData = location.state?.reviewData as import('@/types/resume').CVResponse | undefined
    const compatibilityData = reviewData?.job_compatibility as JobCompatibilityAnalysis | undefined

    // TRATAMENTO DE ERRO MELHORADO: Checa se o CV GERAL foi gerado (o mínimo)
    if (!reviewData?.generated_cv) {
        console.error('ERRO FATAL: Dados do currículo gerado (generated_cv) ausentes no state da navegação.', { reviewData, locationState: location.state })
        return (
            <PageCardLayout>
                <div className="content-inner">
                    <h1 className="main-title" style={{ color: 'red' }}>⚠️ Erro Crítico: Dados Ausentes</h1>
                    <p className="subtitle">O backend não retornou o currículo gerado. Por favor, volte e tente novamente.</p>
                    <button className="btn-back" onClick={() => navigate('/new-cv/builder')}>Voltar ao Formulário</button>
                </div>
            </PageCardLayout>
        )
    }

    // Tratamento de cenário onde o CV foi gerado, mas a ANÁLISE FALHOU/É NULA
    if (!compatibilityData) {
        console.warn('AVISO: Dados de análise de compatibilidade (job_compatibility) ausentes ou nulos. Prosseguindo para revisão.', { reviewData })
        return (
            <PageCardLayout>
                <div className="content-inner">
                    <h1 className="main-title" style={{ color: 'orange' }}>⚠️ Análise Indisponível</h1>
                    <p className="subtitle">A ferramenta de análise de compatibilidade não pôde ser executada, mas o currículo base foi gerado com sucesso.</p>
                    <p className="subtitle">Você pode prosseguir para a revisão e edição.</p>
                    <button className="btn-primary" onClick={() => navigate('/final-review', { state: { reviewData } })}>Revisar Currículo (Sem Análise)</button>
                </div>
            </PageCardLayout>
        )
    }

    const tabs: TabItem<JobCompatibilityAnalysis>[] = [
        { id: 'habilidades', label: 'Habilidades', component: SkillsTab },
        { id: 'sugestoes', label: 'Sugestões', component: SuggestionsTab },
        { id: 'aprendizado', label: 'Aprendizado', component: LearningTab },
    ]

    return (
        <PageCardLayout>
            <div className="content-inner analysis-page">
                <div className="score-header">
                    <h1 className="main-title form-title">Análise de Compatibilidade</h1>
                    <ScoreRing score={compatibilityData.compatibility_score} statusText={compatibilityData.compatibility_score >= 60 ? 'Boa compatibilidade!' : 'Requer atenção.'} />
                </div>
                <div className="tabs-wrapper">
                    <Tabs<JobCompatibilityAnalysis>
                        tabs={tabs}
                        defaultTabId="habilidades"
                        compatibilityData={compatibilityData}
                        activeTabId={activeTab}
                        setActiveTabId={setActiveTab}
                    />
                </div>
                <div className="action-footer fixed-bottom">
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/final-review', { state: { reviewData } })}
                        disabled={!reviewData}
                        title={reviewData ? 'Continuar para revisão final' : 'Dados do currículo ausentes'}
                    >
                        Revisar Currículo
                    </button>
                </div>
            </div>
        </PageCardLayout>
    )
}
export default CompatibilityPage
 
