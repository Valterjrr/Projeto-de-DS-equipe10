import type { GeneratedCV } from "../../types/resume";
import { styleMap, type TemplateStyle } from '../styles/cvStyles';

interface CompactCvPreviewProps {
  cv: GeneratedCV;
  style: TemplateStyle;
}

export function CompactCvPreview({ cv, style }: CompactCvPreviewProps) {
  const styles = styleMap[style];
  const { colors, fonts } = styles;

  return (
    <div 
      className="cv-preview-compact scale-[0.4] origin-top-left"
      style={{
        fontFamily: fonts?.body || 'system-ui, -apple-system, sans-serif',
        color: colors.text,
        lineHeight: 1.5,
        width: '900px',
        padding: '2rem',
        background: colors.background,
      }}
    >
      <h1 style={{
        fontFamily: fonts?.heading,
        fontSize: '2rem',
        marginBottom: '0.5rem',
        color: colors.primary,
      }}>
        {cv.personal_info?.name}
      </h1>

      <p style={{
        fontSize: '1.25rem',
        marginBottom: '1rem',
        color: colors.accent,
      }}>
        {cv.personal_info?.title}
      </p>

      <div className="flex gap-8 mb-8 text-sm">
        {cv.personal_info?.email && (
          <div><strong>Email:</strong> {cv.personal_info.email}</div>
        )}
        {cv.personal_info?.phone && (
          <div><strong>Telefone:</strong> {cv.personal_info.phone}</div>
        )}
      </div>

      {cv.professional_summary && (
        <section className="mb-8">
          <h2 style={{
            fontFamily: fonts?.heading,
            fontSize: '1.25rem',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: `2px solid ${colors.accent}`,
            color: colors.accent,
          }}>
            Sobre Mim
          </h2>
          <p>{cv.professional_summary}</p>
        </section>
      )}

      <section className="mb-8">
        <h2 style={{
          fontFamily: fonts?.heading,
          fontSize: '1.25rem',
          marginBottom: '1rem',
          paddingBottom: '0.5rem',
          borderBottom: `2px solid ${colors.accent}`,
          color: colors.accent,
        }}>
          Experiência
        </h2>
        {cv.experience_entries?.slice(0, 2).map((exp: { title: string; company: string; period: string }, index: number) => (
          <div key={index} className="mb-4">
            <div style={{ fontWeight: 600, color: colors.primary }}>
              {exp.title} - {exp.company}
            </div>
            <div style={{ fontSize: '0.875rem', color: colors.accent }}>
              {exp.period}
            </div>
          </div>
        ))}
      </section>

      {cv.skills?.length > 0 && (
        <section className="mb-8">
          <h2 style={{
            fontFamily: fonts?.heading,
            fontSize: '1.25rem',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: `2px solid ${colors.accent}`,
            color: colors.accent,
          }}>
            Habilidades
          </h2>
          <div className="flex flex-wrap gap-2">
            {cv.skills.slice(0, 5).map((skill: string, index: number) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  backgroundColor: colors.accent,
                  color: colors.background,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

interface TemplatePreviewProps {
  style: TemplateStyle;
}

export function TemplatePreview({ style }: TemplatePreviewProps) {
  const styles = styleMap[style];
  const { colors, fonts } = styles;

  return (
    <div 
      className="cv-preview-template scale-[0.4] origin-top-left"
      style={{
        fontFamily: fonts?.body || 'system-ui, -apple-system, sans-serif',
        color: colors.text,
        lineHeight: 1.5,
        width: '900px',
        padding: '2rem',
        background: colors.background,
      }}
    >
      <h1 style={{
        fontFamily: fonts?.heading,
        fontSize: '2rem',
        marginBottom: '0.5rem',
        color: colors.primary,
      }}>
        Nome Completo
      </h1>

      <p style={{
        fontSize: '1.25rem',
        marginBottom: '1rem',
        color: colors.accent,
      }}>
        Cargo Desejado
      </p>

      <div className="flex gap-8 mb-8 text-sm">
        <div><strong>Email:</strong> email@exemplo.com</div>
        <div><strong>Telefone:</strong> (00) 00000-0000</div>
      </div>

      <section className="mb-8">
        <h2 style={{
          fontFamily: fonts?.heading,
          fontSize: '1.25rem',
          marginBottom: '1rem',
          paddingBottom: '0.5rem',
          borderBottom: `2px solid ${colors.accent}`,
          color: colors.accent,
        }}>
          Sobre Mim
        </h2>
        <p>Breve descrição profissional...</p>
      </section>

      <section className="mb-8">
        <h2 style={{
          fontFamily: fonts?.heading,
          fontSize: '1.25rem',
          marginBottom: '1rem',
          paddingBottom: '0.5rem',
          borderBottom: `2px solid ${colors.accent}`,
          color: colors.accent,
        }}>
          Experiência
        </h2>
        <div className="mb-4">
          <div style={{ fontWeight: 600, color: colors.primary }}>
            Cargo - Empresa
          </div>
          <div style={{ fontSize: '0.875rem', color: colors.accent }}>
            Período
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 style={{
          fontFamily: fonts?.heading,
          fontSize: '1.25rem',
          marginBottom: '1rem',
          paddingBottom: '0.5rem',
          borderBottom: `2px solid ${colors.accent}`,
          color: colors.accent,
        }}>
          Habilidades
        </h2>
        <div className="flex flex-wrap gap-2">
          {['Habilidade 1', 'Habilidade 2', 'Habilidade 3'].map((skill, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                backgroundColor: colors.accent,
                color: colors.background,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
