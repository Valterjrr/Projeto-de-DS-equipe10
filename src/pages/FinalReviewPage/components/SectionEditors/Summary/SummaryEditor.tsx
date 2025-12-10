import React from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
}

const SummaryEditor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="summary-editor">
      {/* Usando editor-section-title para o estilo de título padrão da Final Review Page */}
      <h3 className="editor-section-title">Resumo Profissional</h3>
      {/* CORREÇÃO: Usar a classe de estilo universal 'form-textarea' e aumentar as linhas para melhor visualização */}
      <textarea className="form-textarea" rows={10} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

export default SummaryEditor
