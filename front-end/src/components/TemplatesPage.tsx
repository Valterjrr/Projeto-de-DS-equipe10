import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { LogoMain } from "./Logo";

interface Template {
  id: number;
  name: string;
  description: string;
  style: "modern" | "classic" | "minimal" | "creative";
  preview: string;
}

interface TemplatesPageProps {
  onBack: () => void;
}

export function TemplatesPage({ onBack }: TemplatesPageProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const templates: Template[] = [
    {
      id: 1,
      name: "Moderno Profissional",
      description: "Design limpo com toques de cor, ideal para áreas de tecnologia",
      style: "modern",
      preview: "modern"
    },
    {
      id: 2,
      name: "Clássico Elegante",
      description: "Tradicional e sofisticado, perfeito para áreas corporativas",
      style: "classic",
      preview: "classic"
    },
    {
      id: 3,
      name: "Minimalista",
      description: "Simplicidade e foco no conteúdo, para quem valoriza clareza",
      style: "minimal",
      preview: "minimal"
    },
    {
      id: 4,
      name: "Criativo Impactante",
      description: "Ousado e visual, ideal para áreas criativas e design",
      style: "creative",
      preview: "creative"
    }
  ];

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
  };

  const handleDownload = (template: Template) => {
    alert(`Gerando currículo no template: ${template.name}`);
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#F0F7DA' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{ color: '#2D6073' }}
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Análise
          </button>
          
          <div className="flex items-center gap-3">
            <LogoMain className="w-12 h-12" />
            <span className="text-2xl font-mono" style={{ color: '#2D6073', fontFamily: 'JetBrains Mono, monospace' }}>AId</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-mono mb-4" style={{ color: '#1F192F' }}>
            Escolha seu Template
          </h1>
          <p className="text-lg" style={{ color: '#2D6073' }}>
            Selecione o design que melhor representa seu estilo profissional
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div 
                  className="h-64 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: getTemplateColor(template.style) }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {renderTemplatePreview(template.style)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl mb-2" style={{ color: '#1F192F' }}>
                    {template.name}
                  </h3>
                  <p className="mb-4" style={{ color: '#2D6073' }}>
                    {template.description}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handlePreview(template)}
                      variant="outline"
                      className="flex-1"
                      style={{ borderColor: '#65B8A6', color: '#2D6073' }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button
                      onClick={() => handleDownload(template)}
                      className="flex-1"
                      style={{ backgroundColor: '#2D6073', color: '#F0F7DA' }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Usar Template
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-white rounded-2xl shadow-lg text-center"
        >
          <h3 className="text-xl mb-3" style={{ color: '#2D6073' }}>
            💡 Dica Profissional
          </h3>
          <p style={{ color: '#1F192F' }}>
            Escolha um template que esteja alinhado com a cultura da empresa e o tipo de vaga. 
            Áreas mais conservadoras preferem designs clássicos, enquanto startups e tech companies 
            valorizam layouts mais modernos e criativos.
          </p>
        </motion.div>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ color: '#2D6073' }}>
              {selectedTemplate?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            {selectedTemplate && (
              <div 
                className="min-h-[600px] rounded-lg p-8"
                style={{ backgroundColor: getTemplateColor(selectedTemplate.style) }}
              >
                {renderTemplateFullPreview(selectedTemplate.style)}
              </div>
            )}
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => setPreviewOpen(false)}
              variant="outline"
              style={{ borderColor: '#65B8A6', color: '#2D6073' }}
            >
              Fechar
            </Button>
            <Button
              onClick={() => selectedTemplate && handleDownload(selectedTemplate)}
              style={{ backgroundColor: '#2D6073', color: '#F0F7DA' }}
            >
              <Download className="w-4 h-4 mr-2" />
              Usar Este Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function getTemplateColor(style: string): string {
  const colors: Record<string, string> = {
    modern: '#2D6073',
    classic: '#1F192F',
    minimal: '#FFFFFF',
    creative: '#65B8A6'
  };
  return colors[style] || '#FFFFFF';
}

function renderTemplatePreview(style: string) {
  const baseStyle = { borderRadius: '8px' };
  
  switch (style) {
    case 'modern':
      return (
        <div className="w-48 h-56 bg-white p-4 shadow-xl" style={baseStyle}>
          <div className="h-3 w-32 mb-2" style={{ backgroundColor: '#65B8A6' }} />
          <div className="h-2 w-24 mb-4" style={{ backgroundColor: '#B5E8C3' }} />
          <div className="space-y-2">
            <div className="h-2 w-full" style={{ backgroundColor: '#F0F7DA' }} />
            <div className="h-2 w-full" style={{ backgroundColor: '#F0F7DA' }} />
            <div className="h-2 w-3/4" style={{ backgroundColor: '#F0F7DA' }} />
          </div>
        </div>
      );
    case 'classic':
      return (
        <div className="w-48 h-56 bg-white p-4 shadow-xl" style={baseStyle}>
          <div className="text-center mb-4">
            <div className="h-3 w-32 mx-auto mb-1" style={{ backgroundColor: '#1F192F' }} />
            <div className="h-2 w-24 mx-auto" style={{ backgroundColor: '#2D6073' }} />
          </div>
          <div className="space-y-1">
            <div className="h-1 w-full" style={{ backgroundColor: '#B5E8C3' }} />
            <div className="h-1 w-full" style={{ backgroundColor: '#B5E8C3' }} />
            <div className="h-1 w-full" style={{ backgroundColor: '#B5E8C3' }} />
          </div>
        </div>
      );
    case 'minimal':
      return (
        <div className="w-48 h-56 bg-white p-4 shadow-xl border" style={{ ...baseStyle, borderColor: '#2D6073' }}>
          <div className="h-2 w-28 mb-3" style={{ backgroundColor: '#2D6073' }} />
          <div className="space-y-3">
            <div className="h-1 w-full" style={{ backgroundColor: '#65B8A6' }} />
            <div className="h-1 w-full" style={{ backgroundColor: '#65B8A6' }} />
            <div className="h-1 w-2/3" style={{ backgroundColor: '#65B8A6' }} />
          </div>
        </div>
      );
    case 'creative':
      return (
        <div className="w-48 h-56 bg-white p-4 shadow-xl relative overflow-hidden" style={baseStyle}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full" style={{ backgroundColor: '#B5E8C3', opacity: 0.5 }} />
          <div className="relative">
            <div className="h-4 w-28 mb-2" style={{ backgroundColor: '#2D6073' }} />
            <div className="h-2 w-20 mb-4" style={{ backgroundColor: '#65B8A6' }} />
            <div className="space-y-2">
              <div className="h-2 w-full" style={{ backgroundColor: '#F0F7DA' }} />
              <div className="h-2 w-5/6" style={{ backgroundColor: '#F0F7DA' }} />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function renderTemplateFullPreview(style: string) {
  return (
    <div className="bg-white p-12 shadow-2xl rounded-lg">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl mb-2" style={{ color: '#1F192F' }}>João Silva</h2>
        <p className="text-xl mb-6" style={{ color: '#2D6073' }}>Desenvolvedor Full Stack</p>
        
        <div className="mb-8">
          <h3 className="text-xl mb-3 pb-2 border-b-2" style={{ color: '#2D6073', borderColor: '#65B8A6' }}>
            Sobre Mim
          </h3>
          <p style={{ color: '#1F192F' }}>
            Desenvolvedor com 5 anos de experiência em desenvolvimento web, 
            especializado em React, Node.js e arquitetura de microsserviços.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl mb-3 pb-2 border-b-2" style={{ color: '#2D6073', borderColor: '#65B8A6' }}>
            Experiência Profissional
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold" style={{ color: '#1F192F' }}>Desenvolvedor Sênior - Tech Company</h4>
              <p className="text-sm mb-2" style={{ color: '#2D6073' }}>2021 - Presente</p>
              <ul className="list-disc list-inside space-y-1" style={{ color: '#1F192F' }}>
                <li>Desenvolvimento de aplicações React com TypeScript</li>
                <li>Implementação de APIs RESTful com Node.js</li>
                <li>Colaboração em equipe ágil com 8 desenvolvedores</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl mb-3 pb-2 border-b-2" style={{ color: '#2D6073', borderColor: '#65B8A6' }}>
            Habilidades
          </h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Node.js', 'MongoDB', 'Docker', 'AWS'].map((skill) => (
              <span 
                key={skill}
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: '#B5E8C3', color: '#1F192F' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}