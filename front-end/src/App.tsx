import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { InputPage } from "./components/InputPage";
import { ResultsPage } from "./components/ResultsPage";
import { TemplatesPage } from "./components/TemplatesPage";

type Page = "home" | "input" | "results" | "templates";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");

  const handleAnalyze = (job: string, resume: string) => {
    setJobDescription(job);
    setResumeText(resume);
    setCurrentPage("results");
  };

  return (
    <div className="size-full">
      {currentPage === "home" && (
        <HomePage onStart={() => setCurrentPage("input")} />
      )}
      {currentPage === "input" && (
        <InputPage 
          onBack={() => setCurrentPage("home")}
          onAnalyze={handleAnalyze}
        />
      )}
      {currentPage === "results" && (
        <ResultsPage 
          onBack={() => setCurrentPage("input")}
          onViewTemplates={() => setCurrentPage("templates")}
          jobDescription={jobDescription}
          resumeText={resumeText}
        />
      )}
      {currentPage === "templates" && (
        <TemplatesPage 
          onBack={() => setCurrentPage("results")}
        />
      )}
    </div>
  );
}