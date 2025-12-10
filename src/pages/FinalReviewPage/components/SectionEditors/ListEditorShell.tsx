import React, { useState } from 'react';
import Modal from '@/shared_components/Modal/Modal';
import '../ListItemEditor/ListItemEditor.css'; // Usar o CSS do List Item

interface ListEditorShellProps<T> {
    title: string;
    items: T[];
    onUpdateList: (newList: T[]) => void;
    // Assinatura do renderItem foi simplificada para corresponder ao uso nos editores
    renderItem: (item: T, index: number, onEdit: () => void, onDelete: () => void) => React.ReactNode;
    renderModalContent: (item: T, onSave: (item: T) => void, onCancel: () => void) => React.ReactNode;
    initialNewItem: T;
}

// Garante que T possa ter uma chave `id` para `key`
const ListEditorShell = <T extends { [key: string]: any } & { id?: number },>({ 
    title,
    items,
    onUpdateList,
    renderItem,
    renderModalContent,
    initialNewItem,
}: ListEditorShellProps<T>) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<T | null>(null);
    const [editingIndex, setEditingIndex] = useState<number>(-1);

    const closeModal = () => setIsModalOpen(false);

    const handleEdit = (item: T, index: number) => {
        setEditingItem(item);
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        // Gera um ID temporário se o item inicial não tiver um
        const newItem = { ...initialNewItem, id: Date.now() } as T;
        setEditingItem(newItem);
        setEditingIndex(-1); // Indica que estamos adicionando um novo item
        setIsModalOpen(true);
    };

    const handleDelete = (index: number) => {
        // Usar window.confirm para UX mais direta nos editores
        if (window.confirm(`Tem certeza que deseja remover este item de ${title}?`)) {
            const newList = items.filter((_, i) => i !== index);
            onUpdateList(newList);
        }
    };

    const handleSave = (savedItem: T) => {
        let newList: T[];
        if (editingIndex >= 0) {
            // Editando item existente
            newList = items.map((item, i) => (i === editingIndex ? savedItem : item));
        } else {
            // Adicionando novo item
            newList = [...items, { ...savedItem }];
        }
        onUpdateList(newList);
        closeModal();
    };

    return (
        <div className="list-editor-shell">
            <h3 className="editor-section-title">{title}</h3>
            
            {items.length > 0 && (
                <div className="list-items-container">
                    {items.map((item, index) => (
                        <div key={item.id ?? index} className="list-item-wrapper">
                            {/* Renderiza o preview e as ações internas */}
                            {renderItem(item, index, 
                                () => handleEdit(item, index),
                                () => handleDelete(index)
                            )}
                        </div>
                    ))}
                </div>
            )}
            
            {/* Botão de Adicionar (sempre visível) */}
            <button className="btn-add-item btn-primary" onClick={handleAdd}>+ Adicionar {title.slice(0, -1)}</button>

            {/* Modal de Edição/Adição (Compartilhado) */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={`${editingIndex === -1 ? 'Adicionar' : 'Editar'} ${title.toLowerCase().slice(0, -1)}`}>
                {/* O renderModalContent cuida do formulário interno e dos botões Salvar/Cancelar */}
                {editingItem && renderModalContent(editingItem, handleSave, closeModal)}
            </Modal>
        </div>
    );
};
export default ListEditorShell
