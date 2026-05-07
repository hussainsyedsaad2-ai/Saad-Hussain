import { DRILLS } from '../data/drills';
import { Drill, Position, SkillLevel, TrainingPlan, DrillCategory } from '../types';

/**
 * LOGIC MODULE: Drill Filtering & Plan Generation
 * This service filters drills based on level and position to create a custom 7-day routine.
 */

export function generateTrainingPlan(level: SkillLevel, position: Position, selectedCategories: DrillCategory[]): TrainingPlan {
  // 1. Filter drills eligible for this user
  let eligibleDrills = DRILLS.filter(drill => 
    drill.suitableLevels.includes(level) && 
    drill.suitablePositions.includes(position)
  );

  // 2. Further filter by selected categories if any are provided
  if (selectedCategories.length > 0) {
    eligibleDrills = eligibleDrills.filter(drill => selectedCategories.includes(drill.category));
  }

  // 2. Structure a 7-day schedule
  // Logic: 
  // Day 1, 3, 5: Skill-heavy (Primary focus)
  // Day 2, 4, 6: Conditioning/Athleticism + Defensive Focus
  // Day 7: Active Recovery / Daily Challenge Marathon
  
  const days = Array.from({ length: 7 }, (_, i) => {
    const dayNumber = i + 1;
    let focus = 'Skills & Technique';
    let selectedDrills: Drill[] = [];

    if (dayNumber % 2 === 0) {
      focus = 'Athleticism & Lockdown Defense';
    }

    // Pick 3-5 drills for the day (simplified logic for demo)
    selectedDrills = eligibleDrills.slice(0, 4);

    return {
      dayNumber,
      focus,
      drills: selectedDrills
    };
  });

  return {
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    userLevel: level,
    userPosition: position,
    days,
    dailyChallenge: {
      title: 'The Century Challenge',
      description: 'Make 100 shots of any kind as fast as possible.',
      goal: 'Sub 10 minutes'
    }
  };
}

/**
 * JSON Schema for TrainingPlan (as requested)
 */
export const TrainingPlanSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "TrainingPlan",
  type: "object",
  properties: {
    id: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    userLevel: { enum: ["Beginner", "Intermediate", "Advanced"] },
    userPosition: { enum: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"] },
    days: {
      type: "array",
      items: {
        type: "object",
        properties: {
          dayNumber: { type: "integer" },
          focus: { type: "string" },
          drills: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                description: { type: "string" },
                category: { type: "string" },
                duration: { type: "integer" },
                reps: { type: "string" }
              }
            }
          }
        }
      }
    },
    dailyChallenge: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        goal: { type: "string" }
      }
    }
  },
  required: ["id", "userLevel", "userPosition", "days"]
};
