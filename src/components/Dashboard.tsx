import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Play, Flame, Calendar, Clock, ChevronRight, Trophy, Target, Download, DownloadCloud, CheckCircle2, RotateCcw } from 'lucide-react';
import { TrainingPlan, Drill } from '../types';

interface DashboardProps {
  plan: TrainingPlan;
  onReset: () => void;
}

export default function Dashboard({ plan, onReset }: DashboardProps) {
  const [downloadingAll, setDownloadingAll] = useState(false);

  const downloadSchedule = () => {
    setDownloadingAll(true);
    
    // Create a text representation of the schedule
    let content = `COURTVISION AI TRAINING PLAN\n`;
    content += `Generated: ${new Date(plan.createdAt).toLocaleDateString()}\n`;
    content += `Level: ${plan.userLevel} | Position: ${plan.userPosition}\n\n`;
    content += `DAILY CHALLENGE: ${plan.dailyChallenge.title}\n`;
    content += `${plan.dailyChallenge.description}\nGoal: ${plan.dailyChallenge.goal}\n\n`;
    content += `--------------------------------------------------\n\n`;

    plan.days.forEach(day => {
      content += `DAY ${day.dayNumber}: ${day.focus}\n`;
      day.drills.forEach(drill => {
        content += `- [${drill.category}] ${drill.title}: ${drill.duration}m (${drill.reps})\n`;
        content += `  ${drill.description}\n`;
      });
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CourtVision_Plan_${plan.userLevel}_${plan.userPosition}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadingAll(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 text-orange-500 font-bold text-sm tracking-widest uppercase mb-2">
              <Flame size={18} /> Elite Training Active
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white italic uppercase">
              CourtVision <span className="text-slate-500">7-Day</span>
            </h1>
            <div className="flex flex-wrap gap-4 mt-4">
              <span className="px-4 py-1.5 bg-slate-900 rounded-full text-sm font-bold text-slate-300 border border-slate-800">
                Level: {plan.userLevel}
              </span>
              <span className="px-4 py-1.5 bg-slate-900 rounded-full text-sm font-bold text-slate-300 border border-slate-800">
                Position: {plan.userPosition}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="text-right">
              <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Plan Generated</p>
              <p className="text-white font-mono font-bold">{new Date(plan.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
               <button 
                onClick={downloadSchedule}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-95"
              >
                {downloadingAll ? <CheckCircle2 size={18} /> : <Download size={18} />}
                {downloadingAll ? 'Downloaded' : 'Download Schedule'}
              </button>
              <button 
                onClick={onReset}
                className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-all active:rotate-180"
                title="Reset Plan"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Daily Challenge Card */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden glass-card p-8 border-orange-500/20 bg-gradient-to-br from-slate-900 to-orange-500/5 group"
        >
          <div className="relative z-10">
            <h3 className="text-orange-500 font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4" /> Daily Power Challenge
            </h3>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h4 className="text-3xl font-black text-white mb-2 italic uppercase">{plan.dailyChallenge.title}</h4>
                <p className="text-slate-400 max-w-xl font-medium">{plan.dailyChallenge.description}</p>
              </div>
              <div className="bg-orange-500 text-white px-8 py-4 rounded-xl font-black italic uppercase text-lg shrink-0">
                Goal: {plan.dailyChallenge.goal}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <Flame className="w-64 h-64 text-orange-500" />
          </div>
        </motion.div>

        {/* 7-Day Routine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {plan.days.map((day) => (
            <motion.div 
              key={day.dayNumber}
              whileHover={{ y: -5 }}
              className={`p-6 glass-card ${day.dayNumber === 1 ? 'ring-2 ring-orange-500/50' : ''}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-white italic uppercase">Day {day.dayNumber}</span>
                {day.dayNumber === 1 && <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded uppercase italic">Current</span>}
              </div>
              <p className="text-xs font-bold text-orange-500 uppercase tracking-tighter mb-4">{day.focus}</p>
              <div className="space-y-3">
                {day.drills.map((drill) => (
                  <div key={drill.id} className="text-xs font-bold text-slate-400 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    {drill.title}
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-1 group">
                View Routine <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Current Day Details */}
        <section className="space-y-6 pt-12">
          <div className="flex items-center gap-4">
            <div className="w-2 h-12 bg-orange-500 rounded-full" />
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tight">Today's Drills</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plan.days[0].drills.map((drill) => (
              <DrillCard key={drill.id} drill={drill} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

interface DrillCardProps {
  drill: Drill;
}

const DrillCard: React.FC<DrillCardProps> = ({ drill }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadVideo = () => {
    setDownloaded(true);
    // In a real app, this would trigger a media download to IndexedDB or local storage
    setTimeout(() => {
        // Just a simulation for this architecture demo
    }, 1500);
  };

  return (
    <div className="glass-card hover:bg-slate-900/80 transition-all p-6 group">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-2 py-1 rounded mb-2 inline-block">
            {drill.category}
          </span>
          <h3 className="text-2xl font-black text-white italic uppercase">{drill.title}</h3>
        </div>
        <div className="flex items-center gap-3 text-slate-500 font-mono text-xs font-bold">
          <span className="flex items-center gap-1"><Clock size={14} /> {drill.duration}m</span>
        </div>
      </div>
      <p className="text-slate-400 font-medium text-sm mb-6 line-clamp-2">{drill.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="text-slate-500 text-xs font-bold font-mono">
          REPS: <span className="text-slate-300">{drill.reps}</span>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={handleDownloadVideo}
                className={`p-2 rounded-lg border transition-all ${downloaded ? 'bg-orange-500 border-orange-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
                title={downloaded ? "Available Offline" : "Download Video for Offline Use"}
            >
                {downloaded ? <CheckCircle2 size={16} /> : <DownloadCloud size={16} />}
            </button>
            <button className="flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest hover:text-orange-500 transition-colors">
            <Play size={16} fill="currentColor" /> Play
            </button>
        </div>
      </div>

      {/* Video Placeholder */}
      <div className="mt-4 aspect-video bg-slate-800 rounded-xl overflow-hidden relative group-hover:ring-2 ring-orange-500/20 transition-all">
         <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
            <Play size={48} className="text-orange-500" />
         </div>
         <div className="absolute bottom-4 left-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            {downloaded ? 'Video Saved Offline (Simulated)' : 'Video Tutorial Placeholder'}
         </div>
         {downloaded && (
             <div className="absolute top-4 right-4 text-orange-500">
                 <CheckCircle2 size={24} />
             </div>
         )}
      </div>
    </div>
  );
}

