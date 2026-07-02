import { ArrowLeft, ExternalLink } from 'lucide-react';

interface LearningViewProps {
  onBack: () => void;
  topic: any;
}

const LearningView: React.FC<LearningViewProps> = ({ onBack, topic }) => {
  if (!topic) return null;

  const handleExternal = async (url: string) => {
    if ((window as any).electronAPI) {
      await (window as any).electronAPI.openExternal(url);
    }
  };

  return (
    <div className="flex-col h-full p-5 animate-fade-in scrollable relative">
      <div className="flex items-center gap-3 mb-4 sticky top-0 bg-transparent z-10" style={{ background: 'inherit' }}>
        <button className="btn" style={{ padding: '6px' }} onClick={onBack}>
          <ArrowLeft size={16} />
        </button>
        <h2 className="text-sm font-semibold uppercase text-muted tracking-wider">Deep Dive</h2>
      </div>

      <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
      
      <div className="space-y-6 text-sm leading-relaxed pb-8">
        <section>
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p>{topic.details?.overview || topic.teaser}</p>
        </section>

        {topic.details?.whyItMatters && (
          <section>
            <h3 className="text-lg font-semibold mb-2">Why it matters</h3>
            <p>{topic.details.whyItMatters}</p>
          </section>
        )}

        {topic.details?.history && (
          <section>
            <h3 className="text-lg font-semibold mb-2">History</h3>
            <p>{topic.details.history}</p>
          </section>
        )}
        
        {topic.details?.interestingFacts && topic.details.interestingFacts.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold mb-2">Interesting Facts</h3>
            <ul className="list-disc pl-5 space-y-1">
              {topic.details.interestingFacts.map((fact: string, i: number) => (
                <li key={i}>{fact}</li>
              ))}
            </ul>
          </section>
        )}

        {topic.details?.questions && topic.details.questions.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold mb-2">Thought-Provoking Questions</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              {topic.details.questions.map((q: string, i: number) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="pt-4 border-t border-gray-500/20">
          <h3 className="text-base font-semibold mb-3">Further Exploration</h3>
          <div className="flex-col gap-2">
            <button className="btn w-full justify-start" onClick={() => handleExternal(`https://www.google.com/search?q=${encodeURIComponent(topic.title + ' research papers')}`)}>
              <ExternalLink size={14} /> Search Research Papers
            </button>
            <button className="btn w-full justify-start" onClick={() => handleExternal(`https://www.google.com/search?tbm=bks&q=${encodeURIComponent(topic.title)}`)}>
              <ExternalLink size={14} /> Find Books
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LearningView;
