import { useState, FormEvent, useCallback } from 'react';
import { X, CheckCircle2, Sparkles, ShieldCheck, RefreshCw } from 'lucide-react';
import { Language } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledContext?: string;
  lang: Language;
}

function createModalQuiz() {
  const numA = Math.floor(Math.random() * 7) + 2;
  const numB = Math.floor(Math.random() * 6) + 1;
  return { numA, numB, answer: numA + numB };
}

export function ContactModal({ isOpen, onClose, prefilledContext, lang }: ContactModalProps) {
  const isAr = lang === 'ar';
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(prefilledContext || 'Next-Gen AI & Web Engineering');
  const [budget, setBudget] = useState('$5k - $15k');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [notRobotChecked, setNotRobotChecked] = useState(false);
  const [quiz, setQuiz] = useState(() => createModalQuiz());
  const [quizInput, setQuizInput] = useState('');
  const [quizError, setQuizError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const refreshQuiz = useCallback(() => {
    setQuiz(createModalQuiz());
    setQuizInput('');
    setQuizError(null);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setQuizError(null);

    if (honeypot.trim() !== '') return;

    if (!notRobotChecked) {
      setQuizError(
        isAr
          ? 'يرجى تحديد مربع "أنا لست روبوتاً".'
          : 'Please check the "I am not a robot" verification box.'
      );
      return;
    }

    if (parseInt(quizInput.trim(), 10) !== quiz.answer) {
      setQuizError(
        isAr
          ? `إجابة اختبار الأمان غير صحيحة (${quiz.numA} + ${quiz.numB}).`
          : `Incorrect security quiz answer. Please solve ${quiz.numA} + ${quiz.numB}.`
      );
      return;
    }

    setLoading(true);

    try {
      await fetch('/wp-json/eferz/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          company: company.trim(),
          service: `${service} (Budget: ${budget})`,
          message: message.trim(),
          quiz_a: quiz.numA,
          quiz_b: quiz.numB,
          quiz_answer: parseInt(quizInput.trim(), 10),
          not_robot: notRobotChecked,
          honeypot,
          source: 'EFerz Direct Strategy Modal',
        }),
      }).catch(() => null);

      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setNotRobotChecked(false);
    refreshQuiz();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#ec3935]/30 p-6 sm:p-8 bg-[#181818] text-[#fffdff] shadow-2xl shadow-black/90">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#fffdff] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="website_url"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ec3935]/15 border border-[#ec3935]/30 text-[#ec3935] text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECT STRATEGY INTAKE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-[#fffdff]">
                Start your project with EFerz
              </h3>
              <p className="text-sm text-[#fffdff]/70">
                Share your timeline and objectives. Dispatched directly to info@eferz.com.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#fffdff] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Dupont"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#fffdff] text-sm focus:border-[#ec3935] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#fffdff] mb-1.5">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#fffdff] text-sm focus:border-[#ec3935] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#fffdff] mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Enterprise Ltd."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#fffdff] text-sm focus:border-[#ec3935] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#fffdff] mb-1.5">
                  Estimated Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#222222] border border-white/15 text-[#fffdff] text-sm focus:border-[#ec3935] focus:outline-none"
                >
                  <option value="< $5k">&lt; $5,000</option>
                  <option value="$5k - $15k">$5,000 - $15,000</option>
                  <option value="$15k - $35k">$15,000 - $35,000</option>
                  <option value="$35k+">$35,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#fffdff] mb-1.5">
                Target Service Focus
              </label>
              <input
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#fffdff] text-sm focus:border-[#ec3935] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#fffdff] mb-1.5">
                Project Overview & Requirements
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about the project goals, audience, or integrations..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[#fffdff] text-sm focus:border-[#ec3935] focus:outline-none resize-none"
              />
            </div>

            {/* Anti-Spam I Am Not A Robot + Math Quiz */}
            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notRobotChecked}
                  onChange={(e) => {
                    setNotRobotChecked(e.target.checked);
                    setQuizError(null);
                  }}
                  className="w-4 h-4 rounded accent-[#ec3935] cursor-pointer"
                />
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-mono font-bold text-white">
                  I am not a robot
                </span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-300">
                  What is {quiz.numA} + {quiz.numB}?
                </span>
                <input
                  type="number"
                  required
                  placeholder="?"
                  value={quizInput}
                  onChange={(e) => {
                    setQuizInput(e.target.value);
                    setQuizError(null);
                  }}
                  className="w-16 px-2.5 py-1 rounded-lg bg-white/10 border border-white/25 text-xs font-mono font-bold text-center text-white focus:border-[#ec3935] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={refreshQuiz}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/75 hover:text-white cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {quizError && (
              <div className="text-xs font-mono text-[#ff6b6b] bg-[#ec3935]/15 border border-[#ec3935]/40 rounded-xl px-3 py-2">
                {quizError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn--red w-full justify-center text-sm py-3.5 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Submitting verified proposal...' : 'Send Verified Project Brief'}</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#ec3935]/20 text-[#ec3935] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-black text-[#fffdff]">
              Proposal Received!
            </h3>
            <p className="text-sm text-[#fffdff]/70 max-w-sm mx-auto">
              Thank you, {fullName || 'there'}. Your verified project brief has been sent to info@eferz.com and we will connect with you via {email} promptly.
            </p>
            <button
              onClick={handleReset}
              className="btn btn--red text-sm cursor-pointer"
            >
              <span>Done</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
