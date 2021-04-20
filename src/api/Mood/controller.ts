import database from '../../loaders/database';

export const addNewMood = async (mood: string, email: string) => {
  const userData = await (await database()).collection('users').findOne({ email });
  if (userData === null) {
    throw new Error('User was not found in the database.');
  }
  userData.moods.push({ dateTime: Date.now(), currentMood: mood });
  await (await database()).collection('users').updateOne({ email }, { $set: { moods: userData.moods } });
};
