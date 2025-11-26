import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PageCardLayout from '@/shared_components/PageCardLayout/PageCardLayout'
import ProgressIndicator from '@/pages/CVBuilderWizard/components/ProgressIndicator/ProgressIndicator'

// Importar os componentes de etapa (a serem criados / já existentes como placeholders)
import JobDescriptionStep from './steps/JobDescriptionStep'
import PersonalInfoStep from './steps/PersonalInfoStep'
import ExperienceStep from './steps/ExperienceStep'
import ProjectsStep from './steps/ProjectsStep'
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
    projects: '',
    email: '',
    phone: '',
    target_job_description: '',
}

const CVBuilderWizard: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { isOptimized } = (location.state || { isOptimized: false }) as { isOptimized: boolean }

    const [cvRequest, setCvRequest] = useState<CVRequest>(initialCVRequest)
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    const STEPS = [
        { id: 'job-description', title: 'Descrição da Vaga', component: JobDescriptionStep, required: isOptimized },
        { id: 'personal-info', title: 'Informações Pessoais', component: PersonalInfoStep, required: true },
        { id: 'experience', title: 'Experiência Profissional', component: ExperienceStep, required: true },
        { id: 'projects', title: 'Projetos Relevantes', component: ProjectsStep, required: true },
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
            try {
                const response = await submitCVRequest(newCvRequest)
                // Limpar rascunho
                try { sessionStorage.removeItem(STORAGE_KEY) } catch (e) { console.warn('Could not remove CV draft from sessionStorage', e) }

                // Navega para a página adequada dependendo do fluxo: otimizado => /analysis, genérico => /final-review
                if (isOptimized) {
                    navigate('/analysis', { state: { reviewData: response } })
                } else {
                    navigate('/final-review', { state: { reviewData: response } })
                }
            } catch (error) {
                console.error('Failed to submit CV request', error)
                // Exibir mensagem simples por enquanto
                alert('Não foi possível enviar seu currículo. Tente novamente mais tarde.')
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
                <ProgressIndicator currentStep={currentStepIndex + 1} totalSteps={totalSteps} />
                <div className="wizard-step-title">{STEPS[currentStepIndex]?.title}</div>
                <CurrentStepComponent {...stepProps} />
            </div>
        </PageCardLayout>
    )
}

export default CVBuilderWizard
 
