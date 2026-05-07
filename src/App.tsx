/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import { generateTrainingPlan } from './services/planService';
import { DrillCategory, Position, SkillLevel, TrainingPlan } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [profile, setProfile] = useState<{ level: SkillLevel; position: Position; categories: DrillCategory[] } | null>(null);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('courtvision_plan');
    const savedProfile = localStorage.getItem('courtvision_profile');
    if (savedPlan && savedProfile) {
      setPlan(JSON.parse(savedPlan));
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleOnboardingComplete = (level: SkillLevel, position: Position, categories: DrillCategory[]) => {
    const newPlan = generateTrainingPlan(level, position, categories);
    
    // Save to state and storage
    setProfile({ level, position, categories });
    setPlan(newPlan);
    localStorage.setItem('courtvision_plan', JSON.stringify(newPlan));
    localStorage.setItem('courtvision_profile', JSON.stringify({ level, position, categories }));
  };

  const handleReset = () => {
    setPlan(null);
    setProfile(null);
    localStorage.removeItem('courtvision_plan');
    localStorage.removeItem('courtvision_profile');
  };

  return (
    <main className="min-h-screen bg-slate-950 font-sans">
      <AnimatePresence mode="wait">
        {!plan ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Onboarding onComplete={handleOnboardingComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Dashboard plan={plan} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

