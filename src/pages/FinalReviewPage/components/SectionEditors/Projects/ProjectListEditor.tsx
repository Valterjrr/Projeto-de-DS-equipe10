import React from 'react'
import type { ProjectEntry } from '@/types/resume'
import ListEditorShell from '../ListEditorShell'
import ProjectItemEditor from './ProjectItemEditor'

interface ProjectListEditorProps {
  items: ProjectEntry[];
  onUpdateList: (newList: ProjectEntry[]) => void;
}

const initialProject: ProjectEntry = {
  name: '',
  description: '',
  technologies: [],
  link: null, // Pode ser null no modelo Pydantic
};

const ProjectListEditor: React.FC<ProjectListEditorProps> = ({ items, onUpdateList }) => {
  return (
    <ListEditorShell<ProjectEntry>
      title="Projetos"
      items={items}
      onUpdateList={onUpdateList}
      initialNewItem={initialProject}
      renderItem={(item, index, onEdit, onDelete) => (
        <div className="item-preview">
          <strong>{item.name}</strong>
          <p className="text-muted">{item.technologies.join(', ')}</p>
          <div className="item-actions">
            <button onClick={onEdit} className="btn-edit">Editar</button>
            <button onClick={onDelete} className="btn-delete">Excluir</button>
          </div>
        </div>
      )}
      renderModalContent={(item, onSave, onCancel) => (
        <ProjectItemEditor item={item} onSave={onSave} onCancel={onCancel} />
      )}
    />
  );
}

export default ProjectListEditor
