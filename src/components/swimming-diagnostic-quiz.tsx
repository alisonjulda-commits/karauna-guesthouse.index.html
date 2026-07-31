'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Waves, CheckCircle2, AlertCircle } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  options: {
    text: string;
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
    points: number;
  }[];
}

interface SkillResult {
  level: 'beginner' | 'intermediate' | 'advanced';
  score: number;
  maxScore: number;
  recommendations: string[];
}

const SWIMMING_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Floating & Buoyancy',
    question: 'How long can you comfortably float on your back?',
    options: [
      { text: 'I cannot float on my back', skillLevel: 'beginner', points: 0 },
      { text: 'Less than 30 seconds', skillLevel: 'beginner', points: 1 },
      { text: '30 seconds to 2 minutes', skillLevel: 'intermediate', points: 2 },
      { text: 'More than 2 minutes', skillLevel: 'advanced', points: 3 },
    ],
  },
  {
    id: 2,
    category: 'Freestyle Stroke',
    question: 'How would you describe your freestyle/front crawl?',
    options: [
      { text: 'I cannot do freestyle', skillLevel: 'beginner', points: 0 },
      { text: 'I can swim a short distance with effort', skillLevel: 'beginner', points: 1 },
      { text: 'I can swim continuously with proper form', skillLevel: 'intermediate', points: 2 },
      { text: 'I have efficient form and good endurance', skillLevel: 'advanced', points: 3 },
    ],
  },
  {
    id: 3,
    category: 'Breathing Technique',
    question: 'How comfortable is your breathing technique while swimming?',
    options: [
      { text: 'I avoid swimming strokes that require bilateral breathing', skillLevel: 'beginner', points: 0 },
      { text: 'I can breathe but it interrupts my stroke', skillLevel: 'beginner', points: 1 },
      { text: 'I can breathe rhythmically while maintaining stroke', skillLevel: 'intermediate', points: 2 },
      { text: 'I can breathe bilaterally with perfect rhythm', skillLevel: 'advanced', points: 3 },
    ],
  },
  {
    id: 4,
    category: 'Water Safety',
    question: 'How confident are you with water safety?',
    options: [
      { text: 'I am not confident in water', skillLevel: 'beginner', points: 0 },
      { text: 'I know basic safety but need support', skillLevel: 'beginner', points: 1 },
      { text: 'I am confident and know rescue techniques', skillLevel: 'intermediate', points: 2 },
      { text: 'I am very confident with advanced rescue skills', skillLevel: 'advanced', points: 3 },
    ],
  },
  {
    id: 5,
    category: 'Breaststroke',
    question: 'What is your breaststroke ability?',
    options: [
      { text: 'I cannot do breaststroke', skillLevel: 'beginner', points: 0 },
      { text: 'I can do basic breaststroke but form is rough', skillLevel: 'beginner', points: 1 },
      { text: 'I can do breaststroke with decent form', skillLevel: 'intermediate', points: 2 },
      { text: 'I have excellent breaststroke technique', skillLevel: 'advanced', points: 3 },
    ],
  },
  {
    id: 6,
    category: 'Endurance',
    question: 'How far can you swim continuously without stopping?',
    options: [
      { text: 'Less than 25 meters', skillLevel: 'beginner', points: 0 },
      { text: '25 to 100 meters', skillLevel: 'beginner', points: 1 },
      { text: '100 to 500 meters', skillLevel: 'intermediate', points: 2 },
      { text: 'More than 500 meters', skillLevel: 'advanced', points: 3 },
    ],
  },
  {
    id: 7,
    category: 'Treading Water',
    question: 'Can you tread water?',
    options: [
      { text: 'No, I cannot tread water', skillLevel: 'beginner', points: 0 },
      { text: 'Yes, but only for a short time', skillLevel: 'beginner', points: 1 },
      { text: 'Yes, comfortably for several minutes', skillLevel: 'intermediate', points: 2 },
      { text: 'Yes, efficiently for extended periods', skillLevel: 'advanced', points: 3 },
    ],
  },
  {
    id: 8,
    category: 'Flip Turns',
    question: 'Can you perform a flip turn?',
    options: [
      { text: 'No, I cannot do flip turns', skillLevel: 'beginner', points: 0 },
      { text: 'I can attempt but it is inconsistent', skillLevel: 'beginner', points: 1 },
      { text: 'I can perform flip turns with decent timing', skillLevel: 'intermediate', points: 2 },
      { text: 'I can execute efficient flip turns every time', skillLevel: 'advanced', points: 3 },
    ],
  },
  {
    id: 9,
    category: 'Diving',
    question: 'What is your diving ability?',
    options: [
      { text: 'I cannot dive', skillLevel: 'beginner', points: 0 },
      { text: 'I can dive but am uncomfortable', skillLevel: 'beginner', points: 1 },
      { text: 'I can dive confidently in shallow water', skillLevel: 'intermediate', points: 2 },
      { text: 'I can dive confidently in deep water', skillLevel: 'advanced', points: 3 },
    ],
  },
  {
    id: 10,
    category: 'Stroke Variety',
    question: 'How many different strokes can you swim?',
    options: [
      { text: 'Only one or none', skillLevel: 'beginner', points: 0 },
      { text: 'One or two strokes', skillLevel: 'beginner', points: 1 },
      { text: 'Three strokes (freestyle, breaststroke, backstroke)', skillLevel: 'intermediate', points: 2 },
      { text: 'Four or more strokes including butterfly', skillLevel: 'advanced', points: 3 },
    ],
  },
];

const SKILL_RECOMMENDATIONS = {
  beginner: [
    'Take swimming lessons to build fundamental skills',
    'Practice floating and water comfort exercises',
    'Learn proper breathing techniques',
    'Build water confidence in shallow areas',
    'Start with short swimming distances and gradually increase',
  ],
  intermediate: [
    'Work on stroke efficiency and technique refinement',
    'Build endurance through longer swimming sessions',
    'Practice flip turns for pool swimming',
    'Learn different swimming styles (butterfly, backstroke)',
    'Consider joining a swim group for structured training',
  ],
  advanced: [
    'Focus on competitive training techniques',
    'Work on speed and time trials',
    'Consider coaching for technique optimization',
    'Explore open water swimming',
    'Train for swimming events or competitions',
  ],
};

export function SwimmingDiagnosticQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ beginner: 0, intermediate: 0, advanced: 0 });
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (skillLevel: 'beginner' | 'intermediate' | 'advanced', points: number) => {
    setScores({
      ...scores,
      [skillLevel]: scores[skillLevel] + points,
    });

    if (currentQuestion + 1 < SWIMMING_QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResult = (): SkillResult => {
    const total = scores.beginner + scores.intermediate + scores.advanced;
    const maxScore = SWIMMING_QUESTIONS.length * 3;

    let level: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
    if (scores.advanced > scores.intermediate && scores.advanced > scores.beginner) {
      level = 'advanced';
    } else if (scores.intermediate > scores.beginner) {
      level = 'intermediate';
    }

    return {
      level,
      score: total,
      maxScore,
      recommendations: SKILL_RECOMMENDATIONS[level],
    };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ beginner: 0, intermediate: 0, advanced: 0 });
    setShowResults(false);
  };

  const result = calculateResult();

  return (
    <div className="max-w-2xl mx-auto">
      {!showResults ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Waves className="w-6 h-6 text-blue-500" />
                <CardTitle>Swimming Diagnostic Assessment</CardTitle>
              </div>
              <Badge variant="secondary">
                Question {currentQuestion + 1} of {SWIMMING_QUESTIONS.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{SWIMMING_QUESTIONS[currentQuestion].question}</h3>
              <p className="text-sm text-muted-foreground">
                Category: {SWIMMING_QUESTIONS[currentQuestion].category}
              </p>
            </div>

            <div className="space-y-3">
              {SWIMMING_QUESTIONS[currentQuestion].options.map((option, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleAnswer(option.skillLevel, option.points)}
                  variant="outline"
                  className="w-full justify-start h-auto py-3 px-4 text-left hover:bg-blue-50 hover:border-blue-300"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{option.text}</span>
                    <span className="text-xs text-muted-foreground">
                      Level: {option.skillLevel.charAt(0).toUpperCase() + option.skillLevel.slice(1)}
                    </span>
                  </div>
                </Button>
              ))}
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / SWIMMING_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <div>
                  <CardTitle>Assessment Complete!</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your swimming skill level has been determined
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Results</span>
                <Badge className={`
                  ${result.level === 'advanced' ? 'bg-blue-600' : ''}
                  ${result.level === 'intermediate' ? 'bg-amber-600' : ''}
                  ${result.level === 'beginner' ? 'bg-orange-600' : ''}
                  text-white text-base px-4 py-2
                `}>
                  {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-blue-600">{result.score}</span>
                  <span className="text-lg text-muted-foreground mb-2">/ {result.maxScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${(result.score / result.maxScore) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {((result.score / result.maxScore) * 100).toFixed(1)}% Skills Mastered
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                  <div
                    key={level}
                    className={`p-3 rounded-lg border-2 ${
                      result.level === level
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      {level.toUpperCase()}
                    </p>
                    <p className="text-2xl font-bold">
                      {scores[level as keyof typeof scores]}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      out of {SWIMMING_QUESTIONS.length * 3 / 3}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <CardTitle className="text-base">Personalized Recommendations</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your assessment, here's how to improve your swimming
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Button onClick={resetQuiz} className="w-full gap-2">
            <Waves className="w-4 h-4" />
            Retake Assessment
          </Button>
        </div>
      )}
    </div>
  );
}
