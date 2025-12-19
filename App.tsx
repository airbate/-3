
import React, { useState, useEffect, useCallback } from 'react';
import { KoalaChef } from './components/KoalaChef';
import { UserProfile, KoalaExpression } from './types';
import { STEPS, PixelStar } from './constants';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: '',
    height: '',
    weight: '',
    likes: [],
    dislikes: [],
    habits: ''
  });
  const [inputValue, setInputValue] = useState('');
  const [stars, setStars] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const activeStep = STEPS[currentStep];
  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (activeStep.inputType === 'text' || activeStep.inputType === 'number') {
      if (!inputValue.trim()) return;
      setProfile(prev => ({ ...prev, [activeStep.field]: inputValue }));
    }

    setStars(prev => [...prev, currentStep]);
    setInputValue('');

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinished(true);
      generateChefAdvice();
    }
  };

  const generateChefAdvice = async () => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are Pixel Koala Chef. A child shared their info: 
        Name: ${profile.name}, Age: ${profile.age}, Likes: ${profile.likes.join(', ')}, 
        Dislikes/Allergies: ${profile.dislikes.join(', ')}, Habits: ${profile.habits}.
        Write a short (2-3 sentences), pixel-game-style encouragement and one tiny "secret tip" for their lunchbox.
        Keep it very friendly and fun for a child.`,
        config: { systemInstruction: "Act as a pixel art game character." }
      });
      setAiAnalysis(response.text);
    } catch (err) {
      console.error(err);
      setAiAnalysis("You're going to be a great healthy eater! Keep up the good work!");
    } finally {
      setLoading(false);
    }
  };

  const toggleMultiSelect = (val: string) => {
    setProfile(prev => {
      const current = [...(prev[activeStep.field] as string[])];
      const idx = current.indexOf(val);
      if (idx > -1) current.splice(idx, 1);
      else current.push(val);
      return { ...prev, [activeStep.field]: current };
    });
  };

  const handleRadio = (val: string) => {
    setProfile(prev => ({ ...prev, [activeStep.field]: val }));
    setTimeout(handleNext, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 relative overflow-hidden">
      {/* XP Progress Bar */}
      <div className="w-full max-w-2xl z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-[#5D4AD8]">EXP PROGRESS</span>
          <span className="text-[10px] text-[#5D4AD8]">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-8 bg-white border-4 border-[#5D4AD8] p-1">
          <div 
            className="h-full bg-green-400 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Reward Stars */}
      <div className="flex gap-2 mt-4 flex-wrap justify-center">
        {STEPS.map((_, idx) => (
          <div key={idx} className={`${stars.includes(idx) ? 'opacity-100 star-pop' : 'opacity-20'}`}>
            <PixelStar />
          </div>
        ))}
      </div>

      <div className="flex-1 w-full flex flex-col md:flex-row items-end justify-center md:justify-start mt-8 gap-8">
        {/* Koala Section */}
        <div className="flex flex-col items-center">
          <KoalaChef expression={isFinished ? KoalaExpression.CLAP : activeStep.expression} />
        </div>

        {/* Interaction Section */}
        <div className="flex-1 max-w-xl w-full mb-12">
          {!isFinished ? (
            <div className="relative bg-white p-6 sm:p-8 pixel-border rounded-none">
              {/* Question Bubble Tail (Simplified) */}
              <div className="absolute -left-4 bottom-8 w-4 h-4 bg-white border-l-4 border-b-4 border-[#5D4AD8] rotate-45 hidden md:block"></div>
              
              <h2 className="text-sm sm:text-base leading-relaxed text-black mb-8">
                {activeStep.question}
              </h2>

              <div className="space-y-6">
                {(activeStep.inputType === 'text' || activeStep.inputType === 'number') && (
                  <div className="flex flex-col gap-4">
                    <input
                      type={activeStep.inputType}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type here..."
                      className="pixel-input w-full text-black"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                    />
                    <button onClick={handleNext} className="pixel-button self-end">
                      NEXT &gt;
                    </button>
                  </div>
                )}

                {activeStep.inputType === 'multi-select' && (
                  <div className="flex flex-wrap gap-4">
                    {activeStep.options?.map(opt => (
                      <button
                        key={opt}
                        onClick={() => toggleMultiSelect(opt)}
                        className={`pixel-button transition-colors ${
                          (profile[activeStep.field] as string[]).includes(opt) 
                          ? 'bg-yellow-400 !text-black' 
                          : 'bg-[#5D4AD8]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                    <button onClick={handleNext} className="pixel-button w-full mt-4 !bg-green-600">
                      DONE
                    </button>
                  </div>
                )}

                {activeStep.inputType === 'radio' && (
                  <div className="flex flex-col gap-4">
                    {activeStep.options?.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleRadio(opt)}
                        className={`pixel-button ${profile[activeStep.field] === opt ? 'bg-yellow-400 !text-black' : ''}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 pixel-border animate-bounce-short">
              <h2 className="text-lg text-[#5D4AD8] mb-4">GOAL REACHED! 🏆</h2>
              <p className="text-xs leading-6 mb-6 text-black">
                {loading ? "Chef Koala is writing a special note for you..." : aiAnalysis}
              </p>
              {!loading && (
                <button 
                  onClick={() => window.location.reload()} 
                  className="pixel-button w-full"
                >
                  PLAY AGAIN
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Pixel Elements */}
      <div className="absolute bottom-4 right-4 text-[#5D4AD8] opacity-50 text-[8px] pointer-events-none">
        PIXEL CHEF v1.0
      </div>
    </div>
  );
};

export default App;
