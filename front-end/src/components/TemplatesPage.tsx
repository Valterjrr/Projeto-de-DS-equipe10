import { useState } from "react";
import { motion } from "motion/react";
import { renderToString } from "react-dom/server";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { LogoMain } from "./Logo";
import type { CVResponse } from "../types/resume";
import { styleMap, type TemplateStyle } from "./styles/cvStyles";
import { CvPreview } from "./CvPreview";
import { TemplatePreview } from "./TemplatePreview";

interface Template {
  id: number;
  name: string;
  description: string;
  style: TemplateStyle;
  preview: string;
}

interface TemplatesPageProps {
  onBack: () => void;
  analysis: CVResponse | null;
}



export function TemplatesPage({ onBack, analysis }: TemplatesPageProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const cv = analysis?.generated_cv;

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
    if (!cv) {
      alert('Nenhum currículo gerado disponível para download.');
      return;
    }

    // Create a new div element to hold the preview
    const container = document.createElement('div');
    container.style.width = '900px';
    container.style.margin = '24px auto';
    container.style.backgroundColor = '#ffffff';
    container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

    // Create a React root and render the CvPreview component
    const root = document.createElement('div');
    root.innerHTML = renderToString(
      <CvPreview
        cv={cv}
        style={template.style}
      />
    );
    container.appendChild(root);

    // Create the HTML document for printing
    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${template.name} - Currículo</title>
          <style>
            body { margin: 0; padding: 24px; background: #f5f5f5; }
            @media print {
              body { margin: 0; padding: 0; background: none; }
              .cv-preview { box-shadow: none !important; }
            }
          </style>
        </head>
        <body>
          ${container.outerHTML}
        </body>
      </html>
    `;

    const win = window.open('', '_blank');
    if (!win) {
      alert('Não foi possível abrir nova janela para download.');
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();

    // Automatically open print dialog
    setTimeout(() => {
      win.print();
    }, 500);
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
                  className="h-64 flex items-center justify-center relative overflow-hidden bg-white"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="transform scale-[0.2] origin-center">
                        <TemplatePreview style={template.style} />
                      </div>
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
                      disabled={!cv}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button
                      onClick={() => handleDownload(template)}
                      className="flex-1"
                      style={{ backgroundColor: '#2D6073', color: '#F0F7DA' }}
                      disabled={!cv}
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
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-6">
            {cv && selectedTemplate ? (
              <div className="overflow-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                <CvPreview
                  cv={cv}
                  style={selectedTemplate.style}
                />
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Nenhum currículo gerado disponível para visualização.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}