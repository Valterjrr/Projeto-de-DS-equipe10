import { useMemo } from "react";
import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, Lightbulb, BookOpen, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LogoMain } from "./Logo";
import type { CVResponse } from "../types/resume";

interface ResultsPageProps {
  onBack: () => void;
  onViewTemplates: () => void;
  analysis: CVResponse | null;
}

export function ResultsPage({ onBack, onViewTemplates, analysis }: ResultsPageProps) {
  const jc = analysis?.job_compatibility || null;
  const compatibility = useMemo(() => Math.round(jc?.compatibility_score || 0), [jc]);

  const cv = analysis?.generated_cv;

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
                {compatibility}%
              </span>
            </motion.div>
            <p className="text-xl mb-4" style={{ color: '#2D6073' }}>
              {compatibility >= 75 ? "Excelente compatibilidade!" : 
               compatibility >= 50 ? "Boa compatibilidade!" : 
               "Há espaço para melhorias"}
            </p>
            <Progress value={compatibility} className="w-full max-w-md h-3" />
          </div>

          {/* Renderização dinâmica do currículo gerado */}
          {cv && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#2D6073' }}>Currículo Gerado</h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#1F192F' }}>Informações Pessoais</h3>
                <ul className="space-y-1">
                  <li><b>Nome:</b> {cv.personal_info.name}</li>
                  <li><b>Título:</b> {cv.personal_info.title}</li>
                  {cv.personal_info.email && <li><b>Email:</b> {cv.personal_info.email}</li>}
                  {cv.personal_info.phone && <li><b>Telefone:</b> {cv.personal_info.phone}</li>}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D6073' }}>Resumo Profissional</h3>
                <p>{cv.professional_summary}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D6073' }}>Experiência Profissional</h3>
                {cv.experience_entries.length === 0 ? <p>Nenhuma experiência cadastrada.</p> : (
                  <ul className="space-y-4">
                    {cv.experience_entries.map((exp, idx) => (
                      <li key={idx} className="border-b pb-2">
                        <div><b>{exp.title}</b> - {exp.company}</div>
                        <div className="text-sm text-gray-600">{exp.period}</div>
                        <ul className="list-disc ml-6">
                          {exp.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D6073' }}>Educação</h3>
                {cv.education_entries.length === 0 ? <p>Nenhuma formação cadastrada.</p> : (
                  <ul className="space-y-4">
                    {cv.education_entries.map((edu, idx) => (
                      <li key={idx} className="border-b pb-2">
                        <div><b>{edu.degree}</b> - {edu.institution}</div>
                        <div className="text-sm text-gray-600">{edu.period}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D6073' }}>Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {cv.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full" style={{ backgroundColor: '#B5E8C3', color: '#1F192F' }}>{skill}</span>
                  ))}
                </div>
              </div>
              {cv.certifications && cv.certifications.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D6073' }}>Certificações</h3>
                  <ul className="list-disc ml-6">
                    {cv.certifications.map((cert, idx) => <li key={idx}>{cert}</li>)}
                  </ul>
                </div>
              )}
              {cv.languages && cv.languages.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D6073' }}>Idiomas</h3>
                  <ul className="list-disc ml-6">
                    {cv.languages.map((lang, idx) => <li key={idx}>{lang.name} - {lang.level}</li>)}
                  </ul>
                </div>
              )}
              {cv.achievements && cv.achievements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#2D6073' }}>Conquistas</h3>
                  <ul className="list-disc ml-6">
                    {cv.achievements.map((ach, idx) => <li key={idx}>{ach}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
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
                  {(jc?.skills || []).map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Badge
                        variant={skill.has_skill ? "default" : "secondary"}
                        className="px-4 py-2 text-sm"
                        style={{
                          backgroundColor: skill.has_skill ? '#65B8A6' : '#F0F7DA',
                          color: skill.has_skill ? '#1F192F' : '#2D6073',
                          border: skill.has_skill ? 'none' : '2px solid #65B8A6'
                        }}
                      >
                        {skill.has_skill ? '✓ ' : '○ '}
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
                  {(jc?.improvement_suggestions || []).map((suggestion, index) => (
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
                  {(jc?.learning_resources || []).map((res, index) => (
                    <motion.a
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-5 rounded-xl hover:shadow-md transition-all"
                      style={{ backgroundColor: '#F0F7DA' }}
                    >
                      <div className="flex flex-col">
                        <span className="text-lg font-medium" style={{ color: '#2D6073' }}>
                          📚 {res.title}
                        </span>
                        <span className="text-sm" style={{ color: '#1F192F' }}>
                          {res.platform} • {res.type}
                        </span>
                        {res.description && (
                          <span className="text-sm mt-2" style={{ color: '#1F192F' }}>
                            {res.description}
                          </span>
                        )}
                      </div>
                    </motion.a>
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