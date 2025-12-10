import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PageCardLayout from '@/shared_components/PageCardLayout/PageCardLayout'
import ProgressIndicator from '@/pages/CVBuilderWizard/components/ProgressIndicator/ProgressIndicator'
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay'
// Importar os componentes de etapa (a serem criados / já existentes como placeholders)
import JobDescriptionStep from './steps/JobDescriptionStep'
import PersonalInfoStep from './steps/PersonalInfoStep'
import ExperienceStep from './steps/ExperienceStep'
import SkillsStep from './steps/SkillsStep'
import EducationStep from './steps/EducationStep'

import type { CVRequest } from '@/types/resume'
import './CVBuilderWizard.css'
import { submitCVRequest } from '@/services/resumeService'

const STORAGE_KEY = 'cv_builder_draft'

const initialCVRequest: CVRequest = {
  full_name: '',
  desired_role: '',
  professional_experience: '',
  education: '',
  skills: '',
  email: '',
  phone: '',
  target_job_description: '',
}

// Função para carregar rascunho do sessionStorage, garantindo resiliência
const loadDraft = (): CVRequest => {
  try {
    const draft = sessionStorage.getItem(STORAGE_KEY)
    if (draft) {
      // Garantir que os campos padrão estejam presentes mesmo se o JSON for incompleto
      return { ...initialCVRequest, ...JSON.parse(draft) }
    }
  } catch (e) {
    // Log do erro de parsing JSON, mas continua com o estado inicial
    console.error('Falha ao carregar ou parsear rascunho do CV da sessionStorage', e)
  }
  return initialCVRequest
}

const CVBuilderWizard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isOptimized } = (location.state || { isOptimized: false }) as { isOptimized: boolean }

  const [cvRequest, setCvRequest] = useState<CVRequest>(loadDraft)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const STEPS = [
    { id: 'job-description', title: 'Descrição da Vaga', component: JobDescriptionStep, required: isOptimized },
    { id: 'personal-info', title: 'Informações Pessoais', component: PersonalInfoStep, required: true },
    { id: 'experience', title: 'Experiência Profissional', component: ExperienceStep, required: true },
    { id: 'skills', title: 'Habilidades', component: SkillsStep, required: true },
    { id: 'education', title: 'Educação', component: EducationStep, required: true },
  ].filter(step => step.required)

  const totalSteps = STEPS.length
  const isLastStep = currentStepIndex === totalSteps - 1
  const CurrentStepComponent = STEPS[currentStepIndex]?.component ?? (() => <div />)

  const handleNext = async (data: Partial<CVRequest>) => {
    const newCvRequest = { ...cvRequest, ...data }
    setCvRequest(newCvRequest)

    // Persist draft curto no sessionStorage para evitar perda entre recarregamentos
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newCvRequest))
    } catch (e) {
      console.warn('Could not persist CV draft to sessionStorage', e)
    }

    if (isLastStep) {
      setIsLoading(true)

      try {
        console.log('ENVIANDO CV REQUEST (Final):', newCvRequest) // MANTIDO: Log para rastrear requisição
        const response = await submitCVRequest(newCvRequest)
        console.log('RESPOSTA CV SUCESSO:', JSON.stringify(response, null, 2)) // MANTIDO: Log para rastrear resposta

        // Limpar rascunho
        try { sessionStorage.removeItem(STORAGE_KEY) } catch (e) { console.warn('Could not remove CV draft from sessionStorage', e) }

        // Restaura a navegação imediata
        const targetPath = isOptimized ? '/analysis' : '/final-review'
        console.log(`Navegando para ${targetPath} com dados de revisão...`)

        navigate(targetPath, { state: { reviewData: response } })

      } catch (error) {
        // O erro já está sendo logado no http.ts, mas logamos aqui para o fluxo
        console.error('ERRO AO SUBMETER CV:', error)
        alert(`Não foi possível gerar seu currículo. Verifique o console (F12) para detalhes. Detalhes: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
      } finally {
        setIsLoading(false)
      }
    } else {
      setCurrentStepIndex(i => i + 1)
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(i => i - 1)
    } else {
      navigate('/new-cv')
    }
  }

  const stepProps = {
    data: cvRequest,
    onNext: handleNext,
    onBack: handleBack,
    isLastStep,
    stepTitle: STEPS[currentStepIndex]?.title ?? '',
    flowType: (isOptimized ? 'Optimized' : 'Generic') as 'Optimized' | 'Generic',
  }

  return (
    <PageCardLayout>
      <div className="content-inner wizard-page">
        {/* FLUXO NORMAL: Apenas mostra o overlay de loading enquanto a API chama */}
        {isLoading && <LoadingOverlay text="Gerando seu currículo inteligente..." />}

        <ProgressIndicator currentStep={currentStepIndex + 1} totalSteps={totalSteps} />
        <div className="wizard-step-title">{STEPS[currentStepIndex]?.title}</div>
        <CurrentStepComponent {...stepProps} />
      </div>
    </PageCardLayout>
  )
}

export default CVBuilderWizard


