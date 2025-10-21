import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, FileText, Sparkles, Upload } from "lucide-react";
import { LogoMain } from "./Logo";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { PdfUploader } from "./PdfUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useResumeApi } from "../hooks/useResume";
import type { CVRequest, CVResponse } from "../types/resume";
import { toast } from "sonner";

interface InputPageProps {
  onBack: () => void;
  onAnalyzeComplete: (result: CVResponse) => void;
}

type Step = "choice" | "from-scratch" | "improve-existing";
type FromScratchStep = "job-choice" | "job-input" | "personal" | "experience" | "skills" | "education";

export function InputPage({ onBack, onAnalyzeComplete }: InputPageProps) {
  const [step, setStep] = useState<Step>("choice");
  const [fromScratchStep, setFromScratchStep] = useState<FromScratchStep>("job-choice");
  const [isGenericResume, setIsGenericResume] = useState(false);
  
  // From scratch data
  const [personalInfo, setPersonalInfo] = useState({ name: "", title: "", email: "", phone: "" });
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  
  // Improve existing data
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const { analyze, loading } = useResumeApi();

  const handleFromScratchComplete = async () => {
    // Build resume text from collected data
    const builtResume = `
Nome: ${personalInfo.name}
Título: ${personalInfo.title}
Email: ${personalInfo.email}
Telefone: ${personalInfo.phone}

EXPERIÊNCIA PROFISSIONAL:
${experience}

HABILIDADES:
${skills}

EDUCAÇÃO:
${education}
    `.trim();
    try {
      const payload: CVRequest = {
        full_name: personalInfo.name,
        desired_role: personalInfo.title,
        email: personalInfo.email,
        phone: personalInfo.phone,
        professional_experience: experience,
        education: education,
        skills: skills,
        target_job_description: isGenericResume ? null : jobDescription,
      };
      const res = await analyze(payload);
      if (res) onAnalyzeComplete(res);
    } catch (e: any) {
      toast.error(e?.message || "Falha ao gerar currículo");
    }
  };

  const handleImproveExisting = async () => {
    try {
      const payload: CVRequest = {
        full_name: personalInfo.name || "",
        desired_role: personalInfo.title || "",
        email: personalInfo.email || undefined,
        phone: personalInfo.phone || undefined,
        professional_experience: resumeText,
        education: education || "",
        skills: skills || "",
        target_job_description: jobDescription,
      };
      const res = await analyze(payload);
      if (res) onAnalyzeComplete(res);
    } catch (e: any) {
      toast.error(e?.message || "Falha ao analisar currículo");
    }
  };

  const getStepProgress = () => {
    const steps = isGenericResume 
      ? ["personal", "experience", "skills", "education"]
      : ["job-input", "personal", "experience", "skills", "education"];
    return steps;
  };

  const getCurrentStepIndex = () => {
    const steps = getStepProgress();
    return steps.indexOf(fromScratchStep);
  };

  if (step === "choice") {
    return (
      <div className="min-h-screen p-8" style={{ backgroundColor: '#F0F7DA' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12"
          >
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{ color: '#2D6073' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            
            <div className="flex items-center gap-3">
              <LogoMain className="w-12 h-12" />
              <span className="text-2xl font-mono" style={{ color: '#2D6073', fontFamily: 'JetBrains Mono, monospace' }}>
                AId
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 
              className="text-5xl mb-4"
              style={{ 
                color: '#1F192F',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            >
              Qual seu ponto de partida?
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.button
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setStep("from-scratch")}
              className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: '#2D6073' }}
            >
              <div className="flex flex-col items-center gap-6">
                <Sparkles className="w-16 h-16" style={{ color: '#F0F7DA' }} />
                <h2 
                  className="text-2xl"
                  style={{ 
                    color: '#F0F7DA',
                    fontFamily: 'Questrial, Helvetica World, sans-serif'
                  }}
                >
                  Começe do zero
                </h2>
                <p 
                  className="text-center"
                  style={{ 
                    color: '#B5E8C3',
                    fontFamily: 'Questrial, Helvetica World, sans-serif'
                  }}
                >
                  Vamos construir seu currículo juntos através de perguntas simples
                </p>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => setStep("improve-existing")}
              className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: '#2D6073' }}
            >
              <div className="flex flex-col items-center gap-6">
                <FileText className="w-16 h-16" style={{ color: '#F0F7DA' }} />
                <h2 
                  className="text-2xl"
                  style={{ 
                    color: '#F0F7DA',
                    fontFamily: 'Questrial, Helvetica World, sans-serif'
                  }}
                >
                  Melhore um currículo pronto
                </h2>
                <p 
                  className="text-center"
                  style={{ 
                    color: '#B5E8C3',
                    fontFamily: 'Questrial, Helvetica World, sans-serif'
                  }}
                >
                  Cole seu currículo atual e receba análise e sugestões
                </p>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "from-scratch") {
    return (
      <div className="min-h-screen p-8" style={{ backgroundColor: '#F0F7DA' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <button
              onClick={() => {
                if (fromScratchStep === "job-choice") {
                  setStep("choice");
                } else if (fromScratchStep === "job-input") {
                  setFromScratchStep("job-choice");
                } else {
                  // Navigate back through steps
                  const steps = getStepProgress();
                  const currentIndex = getCurrentStepIndex();
                  if (currentIndex > 0) {
                    setFromScratchStep(steps[currentIndex - 1] as FromScratchStep);
                  }
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{ color: '#2D6073' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            
            <div className="flex items-center gap-3">
              <LogoMain className="w-12 h-12" />
              <span className="text-2xl font-mono" style={{ color: '#2D6073', fontFamily: 'JetBrains Mono, monospace' }}>
                AId
              </span>
            </div>
          </motion.div>

          {fromScratchStep !== "job-choice" && (
            <div className="mb-8">
              <div className="flex gap-2 mb-4">
                {getStepProgress().map((s, i) => (
                  <div
                    key={s}
                    className="flex-1 h-2 rounded-full"
                    style={{ 
                      backgroundColor: getCurrentStepIndex() >= i ? '#65B8A6' : '#B5E8C3' 
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {fromScratchStep === "job-choice" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl mb-4 text-center" style={{ color: '#1F192F', fontFamily: 'JetBrains Mono, monospace' }}>
                Tipo de Currículo
              </h2>
              <p className="text-center mb-8" style={{ color: '#2D6073' }}>
                Você já tem uma vaga em mente?
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => {
                    setIsGenericResume(true);
                    setFromScratchStep("personal");
                  }}
                  className="p-8 rounded-xl border-2 transition-all hover:scale-105"
                  style={{ 
                    borderColor: '#65B8A6',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: '#65B8A6' }} />
                  <h3 className="text-xl mb-2" style={{ color: '#2D6073' }}>
                    Currículo Genérico
                  </h3>
                  <p style={{ color: '#2D6073', opacity: 0.8 }}>
                    Crie um currículo geral sem focar em uma vaga específica
                  </p>
                </button>

                <button
                  onClick={() => {
                    setIsGenericResume(false);
                    setFromScratchStep("job-input");
                  }}
                  className="p-8 rounded-xl border-2 transition-all hover:scale-105"
                  style={{ 
                    borderColor: '#2D6073',
                    backgroundColor: '#2D6073'
                  }}
                >
                  <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color: '#F0F7DA' }} />
                  <h3 className="text-xl mb-2" style={{ color: '#F0F7DA' }}>
                    Currículo Personalizado
                  </h3>
                  <p style={{ color: '#B5E8C3' }}>
                    Otimize seu currículo para uma vaga específica
                  </p>
                </button>
              </div>
            </motion.div>
          )}

          {fromScratchStep === "job-input" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl mb-6" style={{ color: '#1F192F', fontFamily: 'JetBrains Mono, monospace' }}>
                Descrição da Vaga
              </h2>
              
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="text">Colar Texto</TabsTrigger>
                  <TabsTrigger value="pdf">Upload PDF</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text">
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[300px] border-2"
                    style={{ borderColor: '#65B8A6' }}
                    placeholder="Cole aqui a descrição completa da vaga..."
                  />
                </TabsContent>
                
                <TabsContent value="pdf">
                  <PdfUploader
                    label="Upload da Descrição da Vaga"
                    placeholder="Arraste o PDF da vaga aqui ou clique para selecionar"
                    onTextExtracted={(text) => setJobDescription(text)}
                  />
                </TabsContent>
              </Tabs>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setFromScratchStep("personal")}
                  disabled={!isGenericResume && !jobDescription.trim()}
                  style={{ backgroundColor: '#2D6073', color: '#F0F7DA' }}
                >
                  Próximo
                </Button>
              </div>
            </motion.div>
          )}

          {fromScratchStep === "personal" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl mb-6" style={{ color: '#1F192F', fontFamily: 'JetBrains Mono, monospace' }}>
                Informações Pessoais
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2" style={{ color: '#2D6073' }}>Nome Completo</label>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ borderColor: '#65B8A6' }}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#2D6073' }}>Título Profissional</label>
                  <input
                    type="text"
                    value={personalInfo.title}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2"
                    style={{ borderColor: '#65B8A6' }}
                    placeholder="Ex: Desenvolvedor Full Stack"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2" style={{ color: '#2D6073' }}>Email</label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{ borderColor: '#65B8A6' }}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ color: '#2D6073' }}>Telefone</label>
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2"
                      style={{ borderColor: '#65B8A6' }}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setFromScratchStep("experience")}
                  disabled={!personalInfo.name || !personalInfo.title}
                  style={{ backgroundColor: '#2D6073', color: '#F0F7DA' }}
                >
                  Próximo
                </Button>
              </div>
            </motion.div>
          )}

          {fromScratchStep === "experience" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl mb-6" style={{ color: '#1F192F', fontFamily: 'JetBrains Mono, monospace' }}>
                Experiência Profissional
              </h2>
              <Textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="min-h-[300px] border-2"
                style={{ borderColor: '#65B8A6' }}
                placeholder="Descreva suas experiências profissionais, incluindo empresa, cargo, período e principais atividades..."
              />
              <div className="flex justify-between mt-6">
                <Button
                  onClick={() => setFromScratchStep("personal")}
                  variant="outline"
                  style={{ borderColor: '#65B8A6', color: '#2D6073' }}
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setFromScratchStep("skills")}
                  style={{ backgroundColor: '#2D6073', color: '#F0F7DA' }}
                >
                  Próximo
                </Button>
              </div>
            </motion.div>
          )}

          {fromScratchStep === "skills" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl mb-6" style={{ color: '#1F192F', fontFamily: 'JetBrains Mono, monospace' }}>
                Habilidades
              </h2>
              <Textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="min-h-[300px] border-2"
                style={{ borderColor: '#65B8A6' }}
                placeholder="Liste suas habilidades técnicas e comportamentais. Ex: JavaScript, React, Trabalho em equipe, Liderança..."
              />
              <div className="flex justify-between mt-6">
                <Button
                  onClick={() => setFromScratchStep("experience")}
                  variant="outline"
                  style={{ borderColor: '#65B8A6', color: '#2D6073' }}
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setFromScratchStep("education")}
                  style={{ backgroundColor: '#2D6073', color: '#F0F7DA' }}
                >
                  Próximo
                </Button>
              </div>
            </motion.div>
          )}

          {fromScratchStep === "education" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl mb-6" style={{ color: '#1F192F', fontFamily: 'JetBrains Mono, monospace' }}>
                Educação
              </h2>
              <Textarea
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="min-h-[300px] border-2"
                style={{ borderColor: '#65B8A6' }}
                placeholder="Descreva sua formação acadêmica, cursos e certificações..."
              />
              <div className="flex justify-between mt-6">
                <Button
                  onClick={() => setFromScratchStep("skills")}
                  variant="outline"
                  style={{ borderColor: '#65B8A6', color: '#2D6073' }}
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleFromScratchComplete}
                  disabled={loading}
                  style={{ backgroundColor: '#2D6073', color: '#F0F7DA', opacity: loading ? 0.8 : 1 }}
                >
                  {loading ? "Processando..." : isGenericResume ? "Gerar Currículo" : "Analisar Currículo"}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (step === "improve-existing") {
    return (
      <div className="min-h-screen p-8" style={{ backgroundColor: '#F0F7DA' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <button
              onClick={() => setStep("choice")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{ color: '#2D6073' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            
            <div className="flex items-center gap-3">
              <LogoMain className="w-12 h-12" />
              <span className="text-2xl font-mono" style={{ color: '#2D6073', fontFamily: 'JetBrains Mono, monospace' }}>
                AId
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-mono mb-4" style={{ color: '#1F192F', fontFamily: 'JetBrains Mono, monospace' }}>
              Cole ou faça upload das informações
            </h1>
            <p className="text-lg" style={{ color: '#2D6073', fontFamily: 'Questrial, Helvetica World, sans-serif' }}>
              Adicione a descrição da vaga e seu currículo para análise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <label className="block mb-3 text-lg" style={{ color: '#2D6073' }}>
                📋 Descrição da Vaga
              </label>
              
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="text">Colar Texto</TabsTrigger>
                  <TabsTrigger value="pdf">Upload PDF</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text">
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Cole aqui a descrição completa da vaga que você deseja aplicar..."
                    className="min-h-[400px] resize-none border-2 focus:ring-2"
                    style={{ 
                      borderColor: '#65B8A6',
                      backgroundColor: '#ffffff'
                    }}
                  />
                  <p className="mt-2 text-sm" style={{ color: '#2D6073' }}>
                    {jobDescription.length} caracteres
                  </p>
                </TabsContent>
                
                <TabsContent value="pdf">
                  <PdfUploader
                    label=""
                    placeholder="Arraste o PDF da vaga aqui"
                    onTextExtracted={(text) => setJobDescription(text)}
                  />
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <label className="block mb-3 text-lg" style={{ color: '#2D6073' }}>
                📝 Seu Currículo
              </label>
              
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="text">Colar Texto</TabsTrigger>
                  <TabsTrigger value="pdf">Upload PDF</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text">
                  <Textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Cole aqui o conteúdo do seu currículo atual..."
                    className="min-h-[400px] resize-none border-2 focus:ring-2"
                    style={{ 
                      borderColor: '#65B8A6',
                      backgroundColor: '#ffffff'
                    }}
                  />
                  <p className="mt-2 text-sm" style={{ color: '#2D6073' }}>
                    {resumeText.length} caracteres
                  </p>
                </TabsContent>
                
                <TabsContent value="pdf">
                  <PdfUploader
                    label=""
                    placeholder="Arraste o PDF do seu currículo aqui"
                    onTextExtracted={(text) => setResumeText(text)}
                  />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={handleImproveExisting}
              disabled={!jobDescription.trim() || !resumeText.trim() || loading}
              className="px-12 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: jobDescription.trim() && resumeText.trim() ? '#2D6073' : '#B5E8C3',
                color: '#F0F7DA'
              }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {loading ? "Processando..." : "Analisar Compatibilidade"}
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}