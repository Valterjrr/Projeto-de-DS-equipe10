import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, Lightbulb, BookOpen, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LogoMain } from "./Logo";

interface AnalysisResult {
  compatibility: number;
  requiredSkills: Array<{ name: string; matched: boolean }>;
  suggestions: string[];
  learningResources: Array<{ skill: string; resources: Array<{ name: string; url: string }> }>;
}

interface ResultsPageProps {
  onBack: () => void;
  onViewTemplates: () => void;
  jobDescription: string;
  resumeText: string;
}

export function ResultsPage({ onBack, onViewTemplates, jobDescription, resumeText }: ResultsPageProps) {
  const [analysis] = useState<AnalysisResult>(() => generateAnalysis(jobDescription, resumeText));

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
            Nova Análise
          </button>
          
          <div className="flex items-center gap-3">
            <LogoMain className="w-12 h-12" />
            <span className="text-2xl font-mono" style={{ color: '#2D6073', fontFamily: 'JetBrains Mono, monospace' }}>AId</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 mb-8 shadow-xl"
          style={{ borderTop: '6px solid #65B8A6' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-mono" style={{ color: '#1F192F' }}>
              Análise de Compatibilidade
            </h2>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6" style={{ color: '#65B8A6' }} />
            </div>
          </div>

          <div className="flex flex-col items-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="relative w-48 h-48 rounded-full flex items-center justify-center mb-6"
              style={{ 
                backgroundColor: '#B5E8C3',
                border: '8px solid #65B8A6'
              }}
            >
              <span className="text-6xl font-mono" style={{ color: '#1F192F' }}>
                {analysis.compatibility}%
              </span>
            </motion.div>
            <p className="text-xl mb-4" style={{ color: '#2D6073' }}>
              {analysis.compatibility >= 75 ? "Excelente compatibilidade!" : 
               analysis.compatibility >= 50 ? "Boa compatibilidade!" : 
               "Há espaço para melhorias"}
            </p>
            <Progress value={analysis.compatibility} className="w-full max-w-md h-3" />
          </div>
        </motion.div>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white p-2 rounded-xl shadow-md">
            <TabsTrigger value="skills" className="rounded-lg data-[state=active]:bg-[#65B8A6] data-[state=active]:text-[#1F192F]">
              Habilidades
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="rounded-lg data-[state=active]:bg-[#65B8A6] data-[state=active]:text-[#1F192F]">
              Sugestões
            </TabsTrigger>
            <TabsTrigger value="learning" className="rounded-lg data-[state=active]:bg-[#65B8A6] data-[state=active]:text-[#1F192F]">
              Aprendizado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="text-2xl mb-4 flex items-center gap-2" style={{ color: '#2D6073' }}>
                  <TrendingUp className="w-6 h-6" />
                  Tecnologias e Habilidades Requeridas
                </h3>
                <div className="flex flex-wrap gap-3">
                  {analysis.requiredSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Badge
                        variant={skill.matched ? "default" : "secondary"}
                        className="px-4 py-2 text-sm"
                        style={{
                          backgroundColor: skill.matched ? '#65B8A6' : '#F0F7DA',
                          color: skill.matched ? '#1F192F' : '#2D6073',
                          border: skill.matched ? 'none' : '2px solid #65B8A6'
                        }}
                      >
                        {skill.matched ? '✓ ' : '○ '}
                        {skill.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#F0F7DA' }}>
                  <p style={{ color: '#2D6073' }}>
                    <strong>Legenda:</strong> ✓ = Você possui • ○ = Recomendado adicionar
                  </p>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="suggestions">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="text-2xl mb-4 flex items-center gap-2" style={{ color: '#2D6073' }}>
                  <Lightbulb className="w-6 h-6" />
                  Sugestões de Melhoria
                </h3>
                <div className="space-y-4">
                  {analysis.suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border-l-4"
                      style={{ 
                        backgroundColor: '#F0F7DA',
                        borderColor: '#65B8A6'
                      }}
                    >
                      <p style={{ color: '#1F192F' }}>{suggestion}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="learning">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="text-2xl mb-4 flex items-center gap-2" style={{ color: '#2D6073' }}>
                  <BookOpen className="w-6 h-6" />
                  Recursos de Aprendizado
                </h3>
                <div className="space-y-6">
                  {analysis.learningResources.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-5 rounded-xl"
                      style={{ backgroundColor: '#F0F7DA' }}
                    >
                      <h4 className="text-lg mb-3" style={{ color: '#2D6073' }}>
                        {item.skill}
                      </h4>
                      <div className="space-y-2">
                        {item.resources.map((resource, rIndex) => (
                          <a
                            key={rIndex}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 rounded-lg hover:shadow-md transition-all"
                            style={{ backgroundColor: 'white' }}
                          >
                            <span style={{ color: '#2D6073' }}>
                              📚 {resource.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Button
            onClick={onViewTemplates}
            className="px-12 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: '#2D6073',
              color: '#F0F7DA'
            }}
          >
            <Palette className="w-5 h-5 mr-2" />
            Escolher Template Visual
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

// Mock function to generate analysis based on input
function generateAnalysis(jobDescription: string, resumeText: string): AnalysisResult {
  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", 
    "Git", "Docker", "AWS", "SQL", "MongoDB",
    "REST APIs", "GraphQL", "Agile", "CI/CD", "Testing"
  ];

  const requiredSkills = skills.map(skill => ({
    name: skill,
    matched: resumeText.toLowerCase().includes(skill.toLowerCase()) || Math.random() > 0.4
  }));

  const matchedCount = requiredSkills.filter(s => s.matched).length;
  const compatibility = Math.round((matchedCount / requiredSkills.length) * 100);

  const suggestions = [
    "Destaque suas experiências com projetos práticos e resultados quantificáveis. Use números e métricas sempre que possível.",
    "Reorganize suas experiências profissionais em ordem cronológica inversa, começando pela mais recente.",
    "Adicione uma seção de 'Resumo Profissional' no início do currículo destacando suas principais qualificações.",
    "Use verbos de ação no início de cada item das suas experiências (ex: 'Desenvolvi', 'Implementei', 'Liderei').",
    "Personalize seu currículo para incluir palavras-chave específicas mencionadas na descrição da vaga."
  ];

  const unmatchedSkills = requiredSkills.filter(s => !s.matched).slice(0, 3);
  const learningResources = unmatchedSkills.map(skill => ({
    skill: skill.name,
    resources: [
      { name: `Curso Completo de ${skill.name} - Udemy`, url: "https://www.udemy.com" },
      { name: `${skill.name} Documentation`, url: "https://developer.mozilla.org" },
      { name: `freeCodeCamp - ${skill.name}`, url: "https://www.freecodecamp.org" }
    ]
  }));

  return {
    compatibility,
    requiredSkills,
    suggestions,
    learningResources
  };
}