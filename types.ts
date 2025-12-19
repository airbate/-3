
export enum KoalaExpression {
  SMILE = 'smile',
  THINK = 'think',
  CLAP = 'clap',
  SURPRISE = 'surprise'
}

export interface UserProfile {
  name: string;
  age: string;
  height: string;
  weight: string;
  likes: string[];
  dislikes: string[];
  habits: string;
}

export interface OnboardingStep {
  id: number;
  question: string;
  field: keyof UserProfile;
  expression: KoalaExpression;
  inputType: 'text' | 'number' | 'multi-select' | 'radio';
  options?: string[];
}
