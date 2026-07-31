'use client';

import { SwimmingDiagnosticQuiz } from '@/components/swimming-diagnostic-quiz';

export default function SwimmingDiagnosticPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Swimming Diagnostic Game</h1>
        <p className="text-muted-foreground mt-1">
          Assess your swimming skills and get personalized recommendations
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">How it Works</h3>
        <p className="text-sm text-blue-800">
          Answer 10 questions about your swimming abilities across different categories including floating,
          strokes, breathing, endurance, and safety. Based on your answers, we'll determine your skill level
          (Beginner, Intermediate, or Advanced) and provide personalized recommendations to help you improve.
        </p>
      </div>

      <SwimmingDiagnosticQuiz />
    </div>
  );
}
