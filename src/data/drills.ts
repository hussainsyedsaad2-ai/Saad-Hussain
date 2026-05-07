import { Drill, DrillCategory, Position, SkillLevel } from '../types';

export const DRILLS: Drill[] = [
  // DRIBBLING
  {
    id: 'd1',
    title: 'Pound Dribbles',
    description: 'Dribble the ball as hard as you can at waist height. Focus on control and power.',
    category: DrillCategory.DRIBBLING,
    suitableLevels: [SkillLevel.BEGINNER, SkillLevel.INTERMEDIATE, SkillLevel.ADVANCED],
    suitablePositions: [Position.PG, Position.SG, Position.SF, Position.PF, Position.C],
    duration: 5,
    reps: '3 sets of 30 seconds each hand'
  },
  {
    id: 'd2',
    title: 'Crossover Series',
    description: 'Quick crossovers below the knees. Keep eyes up and stay low.',
    category: DrillCategory.DRIBBLING,
    suitableLevels: [SkillLevel.BEGINNER, SkillLevel.INTERMEDIATE],
    suitablePositions: [Position.PG, Position.SG, Position.SF],
    duration: 10,
    reps: '50 crossovers'
  },
  {
    id: 'd3',
    title: 'Behind the Back Wraps',
    description: 'Wrap the ball behind your back while moving. Elite level control required.',
    category: DrillCategory.DRIBBLING,
    suitableLevels: [SkillLevel.ADVANCED],
    suitablePositions: [Position.PG, Position.SG],
    duration: 10,
    reps: '4 sets of 15 reps'
  },

  // SHOOTING
  {
    id: 's1',
    title: 'Form Shooting',
    description: 'One-handed shots from 3 feet out. Focus on follow-through and arc.',
    category: DrillCategory.SHOOTING,
    suitableLevels: [SkillLevel.BEGINNER, SkillLevel.INTERMEDIATE, SkillLevel.ADVANCED],
    suitablePositions: [Position.PG, Position.SG, Position.SF, Position.PF, Position.C],
    duration: 10,
    reps: '50 makes'
  },
  {
    id: 's2',
    title: 'Catch and Shoot Wings',
    description: 'V-cut to the wing, catch, and shoot in one fluid motion.',
    category: DrillCategory.SHOOTING,
    suitableLevels: [SkillLevel.INTERMEDIATE, SkillLevel.ADVANCED],
    suitablePositions: [Position.SG, Position.SF, Position.PF],
    duration: 15,
    reps: '20 makes from each wing'
  },
  {
    id: 's3',
    title: 'Step-back 3s',
    description: 'Dribble hard, step back vertically or laterally, and launch.',
    category: DrillCategory.SHOOTING,
    suitableLevels: [SkillLevel.ADVANCED],
    suitablePositions: [Position.PG, Position.SG],
    duration: 20,
    reps: '10 makes from 5 spots'
  },

  // FINISHING
  {
    id: 'f1',
    title: 'Mikan Drill',
    description: 'Continuous alternating layups. Focus on soft touch and footwork.',
    category: DrillCategory.FINISHING,
    suitableLevels: [SkillLevel.BEGINNER, SkillLevel.INTERMEDIATE, SkillLevel.ADVANCED],
    suitablePositions: [Position.PG, Position.SG, Position.SF, Position.PF, Position.C],
    duration: 5,
    reps: '50 makes'
  },
  {
    id: 'f2',
    title: 'Euro Step Series',
    description: 'Dribble towards the rim and use a two-step move to evade the defender.',
    category: DrillCategory.FINISHING,
    suitableLevels: [SkillLevel.INTERMEDIATE, SkillLevel.ADVANCED],
    suitablePositions: [Position.PG, Position.SG, Position.SF],
    duration: 15,
    reps: '10 makes each side'
  },
  {
    id: 'f3',
    title: 'Post Hook Mastery',
    description: 'Drop step into a sky hook or baby hook. Essential for bigs.',
    category: DrillCategory.FINISHING,
    suitableLevels: [SkillLevel.INTERMEDIATE, SkillLevel.ADVANCED],
    suitablePositions: [Position.PF, Position.C],
    duration: 15,
    reps: '20 makes each hand'
  },

  // ATHLETICISM
  {
    id: 'a1',
    title: 'Box Jumps',
    description: 'Explosive jumps onto a stable platform. Focus on soft landing.',
    category: DrillCategory.ATHLETICISM,
    suitableLevels: [SkillLevel.BEGINNER, SkillLevel.INTERMEDIATE, SkillLevel.ADVANCED],
    suitablePositions: [Position.PG, Position.SG, Position.SF, Position.PF, Position.C],
    duration: 10,
    reps: '3 sets of 10'
  }
];
