interface Source {
  name?: string;
  link?: string;
}

export const WelcomeScreen = () => (
  <div className="text-center flex flex-col items-center justify-center h-full pt-16">
    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
      <svg className="w-10 h-10 text-primary-content" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <h1 className="text-4xl font-bold tracking-tight">Sikkim AI Guide</h1>
    <p className="text-base-content/60 mt-2">Your guide to monasteries, festivals, and cultural history.</p>
  </div>
);

export const Sources = ({ sources }: { sources: Source[] }) => (
  <div>
    <h3 className="text-sm font-semibold mb-3">Sources</h3>
    <div className="flex gap-3 overflow-x-auto pb-3 -mb-3">
      {sources.map((source, index) => (
        <a href={source.link || '#'} key={index} target="_blank" rel="noopener noreferrer" className="card card-compact bg-base-200 hover:bg-base-300 transition-colors duration-200 w-48 flex-shrink-0">
          <div className="py-2 px-4 flex flex-row items-center gap-3">
            <div className="w-6 h-6 bg-base-300 text-base-content/70 rounded-full flex items-center justify-center flex-none leading-none">
              {index + 1}
            </div>
            <p className="font-semibold truncate text-sm">{source.name}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
);

export const RelatedQuestions = ({ onQuestionClick }: { onQuestionClick: (question: string) => void }) => {
  const questions = [
    "What is the significance of the Bhumchu festival?",
    "Compare Rumtek and Pemayangtse monasteries.",
    "Tell me about the founder of Tashiding Monastery.",
  ];
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">Related Questions</h3>
      <div className="flex flex-col items-start gap-2">
        {questions.map((q) => (
          <button key={q} onClick={() => onQuestionClick(q)} className="link link-primary text-left">
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};
