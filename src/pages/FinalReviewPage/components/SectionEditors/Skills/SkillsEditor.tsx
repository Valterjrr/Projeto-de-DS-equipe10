import React, { useState } from 'react'

interface SkillsEditorProps {
  initialContent: string[]
  onUpdate: (value: string[]) => void
  title?: string
  placeholder?: string
  isMultiline?: boolean
}

const SkillsEditor: React.FC<SkillsEditorProps> = ({ initialContent, onUpdate, title = 'Lista de Habilidades', placeholder = 'Ex: Python, SQL, AWS, React (separar por vírgula)', isMultiline = false }) => {
    const [content, setContent] = useState(isMultiline ? initialContent.join('\n') : initialContent.join(', '));
    
    const handleUpdate = (value: string) => {
        setContent(value);
        // Permite que SkillsEditor seja usado para Certifications e Achievements (onde o separador é nova linha)
        const list = (isMultiline ? value.split('\n') : value.split(',')).map(s => s.trim()).filter(Boolean);
        onUpdate(list);
    };

    return (
        <div className="editor-section">
            <h3 className="editor-section-title">{title}</h3>
            {/* CORREÇÃO: Usar a classe de estilo universal 'form-textarea' */}
            <textarea
                className="form-textarea"
                rows={isMultiline ? 8 : 4}
                value={content}
                onChange={(e) => handleUpdate(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}
export default SkillsEditor
