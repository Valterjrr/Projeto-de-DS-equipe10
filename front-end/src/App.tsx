import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { InputPage } from "./components/InputPage";
import { ResultsPage } from "./components/ResultsPage";
import { TemplatesPage } from "./components/TemplatesPage";
import type { CVResponse } from "./types/resume";

type Page = "home" | "input" | "results" | "templates";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [analysis, setAnalysis] = useState<CVResponse | null>(null);

  const handleAnalyzeComplete = (result: CVResponse) => {
    setAnalysis(result);
    setCurrentPage("results");
  };

  return (
    <div className="size-full">
      {currentPage === "home" && (
        <HomePage onStart={() => setCurrentPage("input")} />
      )}
      {currentPage === "input" && (
        <InputPage onBack={() => setCurrentPage("home")} onAnalyzeComplete={handleAnalyzeComplete} />
      )}
      {currentPage === "results" && (
        <ResultsPage onBack={() => setCurrentPage("input")} onViewTemplates={() => setCurrentPage("templates")} analysis={analysis} />
      )}
      {currentPage === "templates" && (
        <TemplatesPage 
          onBack={() => setCurrentPage("results")}
          analysis={analysis}
        />
      )}
    </div>
  );
}