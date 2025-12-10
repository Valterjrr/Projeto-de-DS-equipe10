import React from 'react'
import type { GeneratedCV } from '@/types/resume'
import './CVPreview.css'

interface CVPreviewProps { cv: GeneratedCV }

const CVPreview: React.FC<CVPreviewProps> = ({ cv }) => {
  
  // Funções auxiliares para renderizar listas opcionais
  const renderListSection = (title: string, items: string[] | null | undefined) => {
    // Note: skills is string[], certifications and achievements are string[] | null
    const filteredItems = Array.isArray(items) ? items.filter(Boolean) : []
    if (filteredItems.length === 0) return null

    return (
      <div className="cv-section">
        <h3 className="cvp-section-title">{title}</h3>
        <ul className="cvp-list">
          {filteredItems.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    )
  }

  return (
    <div className="cv-preview-page">
      <div className="cv-header">
        <h2 className="cvp-name">{cv.personal_info.name}</h2>
        <p className="cvp-title">{cv.personal_info.title}</p>
        {/* Certifique-se de que não haja pipe extra se phone for nulo */}
        <p className="cvp-contact">{cv.personal_info.email} {cv.personal_info.phone ? `| ${cv.personal_info.phone}` : ''}</p>
      </div>
      
      {/* Seção de Resumo Profissional */}
      {cv.professional_summary && (
        <div className="cv-section">
          <h3 className="cvp-section-title">Resumo Profissional</h3>
          <p className="cvp-summary">{cv.professional_summary}</p>
        </div>
      )}

      {/* Seção de Experiência Profissional */}
      {cv.experience_entries.length > 0 && (
        <div className="cv-section">
          <h3 className="cvp-section-title">Experiência</h3>
          {cv.experience_entries.map((e, index) => (
            <div key={`${e.title}-${e.company}-${index}`} className="cvp-exp-item">
              <strong>{e.title}</strong> na {e.company} <span className="cvp-period">{e.period}</span>
              {e.achievements.length > 0 && (
                <ul className="cvp-achievements">
                  {e.achievements.map((a, aIndex) => <li key={aIndex}>{a}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      
      {/* Seção de Educação */}
      {cv.education_entries.length > 0 && (
          <div className="cv-section">
            <h3 className="cvp-section-title">Educação</h3>
            {cv.education_entries.map((e, index) => (
              <p key={index}>{e.degree} em {e.institution} ({e.period})</p>
            ))}
          </div>
      )}
      
      {/* SEÇÕES ADICIONAIS: Certificações, Conquistas, Habilidades */}
      {renderListSection('Habilidades Técnicas e Soft Skills', cv.skills)}
      {renderListSection('Certificados', cv.certifications)}
      {renderListSection('Conquistas', cv.achievements)}

      {/* Seção de Idiomas */}
      {cv.languages && cv.languages.length > 0 && (
        <div className="cv-section">
          <h3 className="cvp-section-title">Idiomas</h3>
          <ul className="cvp-list language-list">
            {cv.languages.map((l, index) => (
              <li key={index}>{l.name} ({l.level})</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default CVPreview
