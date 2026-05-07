/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export enum Position {
  PG = 'Point Guard',
  SG = 'Shooting Guard',
  SF = 'Small Forward',
  PF = 'Power Forward',
  C = 'Center'
}

export enum DrillCategory {
  DRIBBLING = 'Dribbling & Ball Handling',
  FINISHING = 'Finishing at the Rim',
  SHOOTING = 'Shooting Mechanics & Range',
  ATHLETICISM = 'Vertical Leap & Athleticism',
  DEFENSE = 'Defensive Footwork'
}

export interface Drill {
  id: string;
  title: string;
  description: string;
  category: DrillCategory;
  suitableLevels: SkillLevel[];
  suitablePositions: Position[];
  duration: number; // in minutes
  reps?: string;
  videoPlaceholderUrl?: string;
}

export interface TrainingDay {
  dayNumber: number;
  focus: string;
  drills: Drill[];
}

export interface TrainingPlan {
  id: string;
  createdAt: string;
  userLevel: SkillLevel;
  userPosition: Position;
  days: TrainingDay[];
  dailyChallenge: {
    title: string;
    description: string;
    goal: string;
  };
}
