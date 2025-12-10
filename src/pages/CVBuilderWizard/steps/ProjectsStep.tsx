import React, { useState } from 'react'
import type { CVRequest } from '@/types/resume'
import type { WizardStepProps } from '../WizardStep.types'
import FormStepShell from '../components/FormStepShell/FormStepShell'

type Props = WizardStepProps & { data: CVRequest }

const ProjectsStep: React.FC<Props> = ({ data, onNext, onBack, isLastStep, stepTitle }) => {
  const [projects, setProjects] = useState(data.projects || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ projects })
  }

  return (
    <FormStepShell
      stepTitle={stepTitle}
      stepSubtitle="Descreva projetos profissionais, acadêmicos ou pessoais importantes, com destaque para tecnologias usadas e resultados alcançados."
      onSubmit={handleSubmit}
      onBack={onBack}
      isLastStep={isLastStep}
    >
        <div className="form-group full-width">
            <textarea
                className="form-textarea"
                placeholder="Ex: Projeto X | Tecnologias: React, Node.js | Link: https://github.com/usuario/projeto | Breve descrição do objetivo e resultados."
                value={projects}
                onChange={(e) => setProjects(e.target.value)}
                rows={8}
            />
        </div>
    </FormStepShell>
  )
}

export default ProjectsStep
