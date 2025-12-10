import React, { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import PageCardLayout from '@/shared_components/PageCardLayout/PageCardLayout'
import type { CVResponse, GeneratedCV } from '@/types/resume'
import './FinalReviewPage.css'
import { shortName } from '@/utils/formatters'
import html2pdf from 'html2pdf.js'
import SummaryEditor from './components/SectionEditors/Summary/SummaryEditor'
import ExperienceListEditor from './components/SectionEditors/Experience/ExperienceListEditor'
import EducationListEditor from './components/SectionEditors/Education/EducationListEditor'
import PersonalInfoEditor from './components/SectionEditors/PersonalInfo/PersonalInfoEditor'
import SkillsEditor from './components/SectionEditors/Skills/SkillsEditor'
import CertificationsEditor from './components/SectionEditors/Certifications/CertificationsEditor'
import AchievementsEditor from './components/SectionEditors/Achievements/AchievementsEditor'
import LanguageListEditor from './components/SectionEditors/Language/LanguageListEditor'
import CVPreview from './components/CVPreview/CVPreview'

// Função auxiliar para atualização aninhada do CV
const useEditableCV = (initialCV: GeneratedCV | null) => {
  // Normalizar campos opcionais para evitar acessos nulos em editores
  const normalized = initialCV ? {
    ...initialCV,
    skills: initialCV.skills || [],
    certifications: initialCV.certifications || [],
    experience_entries: initialCV.experience_entries || [],
    education_entries: initialCV.education_entries || [],
    languages: initialCV.languages || [],
    achievements: initialCV.achievements || [],
  } : null
  const [editableCV, setEditableCV] = useState<GeneratedCV | null>(normalized);

  const updateCV = (updates: Partial<GeneratedCV> | ((prev: GeneratedCV) => GeneratedCV)) => {
    if (!editableCV) return;
    setEditableCV(prev => {
      if (!prev) return prev;
      const newCV = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates };
      // Lógica de salvamento (Ex: debounce e salvar no localStorage)
      // console.log('CV Atualizado:', newCV);
      return newCV;
    });
  };
  return { editableCV, updateCV };
};


// NOTE: using imported CVPreview component for display

// External EditTabs component (pure, moved out)
interface EditTabsProps {
  active: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'certifications' | 'languages' | 'achievements'
  setActive: (s: EditTabsProps['active']) => void
}

const EditTabsExternal: React.FC<EditTabsProps> = ({ active, setActive }) => (
  <div className="edit-tabs-nav">
    <button className={`tab-btn ${active === 'personal' ? 'active' : ''}`} onClick={() => setActive('personal')}>Dados</button>
    <button className={`tab-btn ${active === 'summary' ? 'active' : ''}`} onClick={() => setActive('summary')}>Resumo</button>
    <button className={`tab-btn ${active === 'experience' ? 'active' : ''}`} onClick={() => setActive('experience')}>Experiência</button>
    <button className={`tab-btn ${active === 'education' ? 'active' : ''}`} onClick={() => setActive('education')}>Educação</button>
    <button className={`tab-btn ${active === 'skills' ? 'active' : ''}`} onClick={() => setActive('skills')}>Habilidades</button>
    <button className={`tab-btn ${active === 'certifications' ? 'active' : ''}`} onClick={() => setActive('certifications')}>Certificados</button>
  <button className={`tab-btn ${active === 'languages' ? 'active' : ''}`} onClick={() => setActive('languages')}>Idiomas</button>
  <button className={`tab-btn ${active === 'achievements' ? 'active' : ''}`} onClick={() => setActive('achievements')}>Conquistas</button>
  </div>
)

// External EditorContent component (moved out)
interface EditorContentProps {
  active: EditTabsProps['active']
  editableCV: GeneratedCV
  updateCV: (updates: Partial<GeneratedCV>) => void
}

const EditorContentExternal: React.FC<EditorContentProps> = ({ active, editableCV, updateCV }) => {
  switch (active) {
    case 'personal':
      return (
        <PersonalInfoEditor
          item={editableCV.personal_info}
          onUpdate={(info) => updateCV({ personal_info: info })}
        />
      )
    case 'summary':
      return <SummaryEditor value={editableCV.professional_summary} onChange={(v) => updateCV({ professional_summary: v })} />
    case 'experience':
      return <ExperienceListEditor items={editableCV.experience_entries} onUpdateList={(newList) => updateCV({ experience_entries: newList })} />
    case 'education':
      return <EducationListEditor items={editableCV.education_entries} onUpdateList={(newList) => updateCV({ education_entries: newList })} />
    case 'skills':
      return (
        <SkillsEditor
          initialContent={editableCV.skills || []}
          onUpdate={(newList) => updateCV({ skills: newList })}
        />
      )
    case 'certifications':
      return (
        <CertificationsEditor
          initialContent={editableCV.certifications || []}
          onUpdate={(newList) => updateCV({ certifications: newList })}
        />
      )
    case 'languages':
      return (
        <LanguageListEditor
          items={editableCV.languages || []}
          onUpdateList={(newList) => updateCV({ languages: newList })}
        />
      )
    case 'achievements':
      return (
        <AchievementsEditor
          initialContent={editableCV.achievements || []}
          onUpdate={(newList) => updateCV({ achievements: newList })}
        />
      )
    default:
      return <div>Selecione uma seção para editar.</div>;
  }
}


const FinalReviewPage: React.FC = () => {
  const location = useLocation()
  const reviewData = location.state?.reviewData as CVResponse | undefined
    
  // Inicialização do estado editável
  const { editableCV, updateCV } = useEditableCV(reviewData?.generated_cv || null);
  // Ref para o elemento que será convertido em PDF
  const printRef = useRef<HTMLDivElement>(null)

  // Estado para alternar entre as abas (Edição/Preview) e as seções de edição
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');
  const [activeEditSection, setActiveEditSection] = useState<EditTabsProps['active']>('summary'); // Começar no Resumo
  // wrapper to satisfy setter type expected by EditTabsExternal
  const setActiveEditSectionTyped = (s: EditTabsProps['active']) => setActiveEditSection(s)
    
  // CORREÇÃO: Tratamento de Erro Explícito. Mostra mensagem de erro em vez de tela vazia.
  if (!reviewData?.generated_cv || !editableCV) {
    return (
      <PageCardLayout>
        <div className="content-inner">
          <h1 className="main-title" style={{ color: 'red' }}>⚠️ Erro Crítico: Dados Ausentes</h1>
          <p className="subtitle">Não foi possível carregar os dados do currículo para revisão.</p>
          <p className="subtitle">Isto pode indicar uma falha na comunicação com a API. Verifique o console do navegador para mais detalhes sobre o erro.</p>
        </div>
      </PageCardLayout>
    )
  }
    

  const handleDownloadPDF = () => {
    // Implementar lógica real de download de PDF usando os dados de 'editableCV' e o elemento referenciado
    if (!editableCV || !printRef.current) return

    const rawName = editableCV.personal_info?.name || 'Curriculo'
    const fileName = `${rawName.replace(/\s+/g, '_')}_Curriculo.pdf`

    const opt = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    // html2pdf pode não ter definições TS; forçamos any para chamar
    ;(html2pdf as any)().set(opt).from(printRef.current).save()
  }

    


  return (
    <PageCardLayout>
      <div className="content-inner final-review-page">
        <h1 className="main-title">Revisão Final do Currículo</h1>
        <p className="subtitle">Edite o conteúdo seção por seção e visualize a prévia em tempo real.</p>
                
        {/* Botões de Alternância (Edição vs Preview) */}
        <div className="view-toggle">
          <button className={`toggle-btn ${activeView === 'editor' ? 'active' : ''}`} onClick={() => setActiveView('editor')}>🛠️ Edição</button>
          <button className={`toggle-btn ${activeView === 'preview' ? 'active' : ''}`} onClick={() => setActiveView('preview')}>👁️ Prévia</button>
        </div>

        <div className="review-area-grid">
                    
          {/* Painel de Edição (Esquerda, na prática) */}
          <div className={`editor-panel ${activeView === 'editor' ? 'active' : ''}`}>
            <EditTabsExternal active={activeEditSection} setActive={setActiveEditSectionTyped} />
            <EditorContentExternal active={activeEditSection} editableCV={editableCV} updateCV={updateCV} />
          </div>
                    
          {/* Painel de Preview (Direita, na prática) */}
          <div className={`preview-panel ${activeView === 'preview' ? 'active' : ''}`}>
            {/* NOVO: Visualização formatada do CV */}
            <div ref={printRef} style={{ width: '100%' }}>
              <CVPreview cv={editableCV} />
            </div>
          </div>
        </div>

        {/* Ação Principal: Download */}
        <div className="action-footer">
          <button className="btn-primary large-btn" onClick={handleDownloadPDF}>
            ⬇️ Gerar PDF para Download
          </button>
        </div>
      </div>
    </PageCardLayout>
  );
}

export default FinalReviewPage
