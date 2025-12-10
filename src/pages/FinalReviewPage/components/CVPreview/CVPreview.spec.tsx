import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CVPreview from './CVPreview';
import type { GeneratedCV } from '@/types/resume';

// Mock de dados completo para o teste
const mockCV: GeneratedCV = {
  personal_info: {
    name: 'João da Silva',
    title: 'Desenvolvedor Full Stack',
    email: 'joao@example.com',
    phone: '(11) 99999-9999'
  },
  professional_summary: 'Desenvolvedor apaixonado com 5 anos de experiência.',
  skills: ['React', 'TypeScript'], // Campos obrigatórios da tipagem
  languages: [],
  achievements: [],
  certifications: [],
  experience_entries: [
    {
      title: 'Engenheiro de Software',
      company: 'Tech Corp',
      period: '2020 - Presente',
      achievements: [
        'Aumentou a performance em 20%',
        'Liderou equipe de 3 pessoas'
      ]
    }
  ],
  education_entries: [
    {
      degree: 'Bacharel em Ciência da Computação',
      institution: 'Universidade Federal',
      period: '2016 - 2020'
    }
  ]
};

describe('CVPreview Component', () => {
  
  it('deve renderizar as informações pessoais corretamente', () => {
    render(<CVPreview cv={mockCV} />);

    expect(screen.getByText('João da Silva')).toBeInTheDocument();
    expect(screen.getByText('Desenvolvedor Full Stack')).toBeInTheDocument();
    expect(screen.getByText(/joao@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/\(11\) 99999-9999/)).toBeInTheDocument();
  });

  it('deve renderizar o resumo profissional', () => {
    render(<CVPreview cv={mockCV} />);

    expect(screen.getByRole('heading', { name: /Resumo Profissional/i })).toBeInTheDocument();
    expect(screen.getByText('Desenvolvedor apaixonado com 5 anos de experiência.')).toBeInTheDocument();
  });

  it('deve renderizar a lista de experiências com conquistas', () => {
    render(<CVPreview cv={mockCV} />);

    expect(screen.getByRole('heading', { name: /Experiência/i })).toBeInTheDocument();
    
    // Verifica empresa e cargo
    expect(screen.getByText((content) => content.includes('Tech Corp'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Engenheiro de Software'))).toBeInTheDocument();
    expect(screen.getByText('2020 - Presente')).toBeInTheDocument();

    // Verifica conquistas (bullet points)
    expect(screen.getByText('Aumentou a performance em 20%')).toBeInTheDocument();
    expect(screen.getByText('Liderou equipe de 3 pessoas')).toBeInTheDocument();
  });

  it('deve renderizar a seção de educação quando houver dados', () => {
    render(<CVPreview cv={mockCV} />);

    expect(screen.getByRole('heading', { name: /Educação/i })).toBeInTheDocument();
    expect(screen.getByText(/Bacharel em Ciência da Computação/)).toBeInTheDocument();
    expect(screen.getByText(/Universidade Federal/)).toBeInTheDocument();
  });

  it('NÃO deve renderizar a seção de educação se a lista estiver vazia', () => {
    const cvSemEducacao = { ...mockCV, education_entries: [] };
    
    render(<CVPreview cv={cvSemEducacao} />);

    // O título "Educação" não deve existir no documento
    expect(screen.queryByRole('heading', { name: /Educação/i })).not.toBeInTheDocument();
  });

  it('NÃO deve exibir o separador de telefone quando phone estiver ausente', () => {
    const cvSemTelefone = { ...mockCV, personal_info: { ...mockCV.personal_info, phone: undefined } };
    const { container } = render(<CVPreview cv={cvSemTelefone} />);

    // Email deve aparecer e o parágrafo de contato não deve conter o pipe
    const emailNode = screen.getByText(/joao@example.com/);
    expect(emailNode).toBeInTheDocument();
    const contactParagraph = emailNode.closest('p');
    expect(contactParagraph).toBeTruthy();
    expect(contactParagraph?.textContent?.trim()).toBe('joao@example.com');
  });

  it('deve renderizar o título de Experiência mesmo sem entradas, mas sem itens listados', () => {
    const cvSemExp = { ...mockCV, experience_entries: [] };
    const { container } = render(<CVPreview cv={cvSemExp} />);

    // O título deve existir
    expect(screen.getByRole('heading', { name: /Experiência/i })).toBeInTheDocument();

    // Não deve haver itens de experiência nem listas de conquistas
    const expItems = container.querySelectorAll('.cvp-exp-item');
    expect(expItems.length).toBe(0);
    const achievementItems = container.querySelectorAll('.cvp-achievements li');
    expect(achievementItems.length).toBe(0);
  });

  it('deve renderizar o número correto de conquistas na experiência', () => {
    const { container } = render(<CVPreview cv={mockCV} />);
    const achievementItems = container.querySelectorAll('.cvp-achievements li');
    expect(achievementItems.length).toBe(2);
  });
});