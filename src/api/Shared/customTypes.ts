export type MoodRecord = {
  dateTime: string;
  currentMood: 'radiant' | 'happy' | 'average' | 'upset' | 'worst';
};

export type User = {
  email: string;
  name: string;
  picture: string;
  moods: MoodRecord[];
};
