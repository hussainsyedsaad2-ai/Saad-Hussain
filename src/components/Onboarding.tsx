import { motion } from 'motion/react';
import { ChevronRight, Target, Trophy, User, Zap } from 'lucide-react';
import { useState } from 'react';
import { Position, SkillLevel, DrillCategory } from '../types';

interface OnboardingProps {
  onComplete: (level: SkillLevel, position: Position, categories: DrillCategory[]) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState<SkillLevel | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<DrillCategory[]>([]);

  const levels = Object.values(SkillLevel);
  const positions = Object.values(Position);
  const categories = Object.values(DrillCategory);

  const toggleCategory = (cat: DrillCategory) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleNext = () => {
    if (step === 1 && level) setStep(2);
    else if (step === 2 && position) setStep(3);
    else if (step === 3) onComplete(level!, position!, selectedCategories);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-slate-950 to-slate-950">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        <header className="mb-12">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12 shadow-2xl shadow-orange-500/40"
          >
            <Target className="text-white w-10 h-10" />
          </motion.div>
          <h1 className="text-5xl font-black tracking-tighter mb-4 text-white uppercase italic">
            CourtVision <span className="text-orange-500">AI</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium">Build your pro-level training profile.</p>
        </header>

        <div className="space-y-8">
          {step === 1 ? (
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest flex items-center justify-center gap-2">
                <Trophy size={16} /> Select Your Skill Level
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {levels.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left group ${
                      level === l 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-600'
                    }`}
                  >
                    <span className={`text-lg font-bold block ${level === l ? 'text-white' : 'text-slate-300'}`}>
                      {l}
                    </span>
                    <span className="text-xs text-slate-500 mt-2 block font-medium">
                      Tailored drills for {l.toLowerCase()} mechanics.
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ) : step === 2 ? (
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest flex items-center justify-center gap-2">
                <User size={16} /> Choose Your Primary Position
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {positions.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPosition(p)}
                    className={`p-4 rounded-2xl border-2 transition-all font-bold ${
                      position === p 
                        ? 'border-orange-500 bg-orange-500/10 text-white' 
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest flex items-center justify-center gap-2">
                <Zap size={16} /> Select Training Focus (Optional)
              </h2>
              <p className="text-slate-500 text-xs font-medium italic">Select multiple or keep empty for a balanced "All-Rounder" plan.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleCategory(c)}
                    className={`p-4 rounded-xl border-2 transition-all font-bold text-sm text-left ${
                      selectedCategories.includes(c) 
                        ? 'border-orange-500 bg-orange-500/10 text-white' 
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </section>
          )}

          <div className="pt-6">
            <button 
              onClick={handleNext}
              disabled={step === 1 ? !level : step === 2 ? !position : false}
              className="btn-primary w-full md:w-auto h-16 px-12 text-xl flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:grayscale"
            >
              {step === 3 ? 'Generate Plan' : 'Next'} <ChevronRight />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
