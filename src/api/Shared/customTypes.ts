export type MoodRecord = {
  dateTime: string;
  currentMood: 'elated' | 'happy' | 'neutral' | 'sad' | 'awful';
};

export type User = {
  email: string;
  name: string;
  picture: string;
  moods: MoodRecord[];
};
