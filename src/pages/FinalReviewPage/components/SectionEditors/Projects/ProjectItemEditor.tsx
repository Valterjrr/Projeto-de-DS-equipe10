import React, { useState } from 'react'
import type { ProjectEntry } from '@/types/resume'

interface ProjectItemEditorProps {
    item: ProjectEntry;
    onSave: (item: ProjectEntry) => void;
    onCancel: () => void; // Para fechar o modal
}

const ProjectItemEditor: React.FC<ProjectItemEditorProps> = ({ item, onSave, onCancel }) => {
    const [draft, setDraft] = useState<ProjectEntry>(item);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDraft({ ...draft, [e.target.name]: e.target.value });
    };
    
    const handleTechChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Assume-se que tecnologias são separadas por vírgula no textarea
        const techs = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
        setDraft({ ...draft, technologies: techs });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(draft);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group"><label>Nome do Projeto:</label><input className="form-input" name="name" value={draft.name} onChange={handleChange} required /></div>
            <div className="form-group"><label>Link/URL (Opcional):</label><input className="form-input" name="link" value={draft.link || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>Descrição:</label>
                <textarea className="form-textarea" name="description" rows={4} value={draft.description} onChange={handleChange} required />
            </div>
            <div className="form-group"><label>Tecnologias (Separar por vírgula):</label>
                <textarea className="form-textarea" name="technologies" rows={2} value={draft.technologies.join(', ')} onChange={handleTechChange} required />
            </div>
            <div className="modal-footer">
                <button type="button" className="btn-back" onClick={onCancel}>Cancelar</button>
                <button type="submit" className="btn-primary">Salvar</button>
            </div>
        </form>
    );
}
export default ProjectItemEditor
