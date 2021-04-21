import database from '../../loaders/database';

export const addNewMood = async (mood: string, email: string) => {
  const userData = await (await database()).collection('users').findOne({ email });
  if (userData === null) {
    throw new Error('User was not found in the database.');
  }
  userData.moods.push({ dateTime: Date.now(), currentMood: mood });
  await (await database()).collection('users').updateOne({ email }, { $set: { moods: userData.moods } });
};

export const getUserMoods = async (email: string, full: string | undefined) => {
  const userData = await (await database()).collection('users').findOne({ email });
  if (userData === null) {
    throw new Error('User was not found in the database.');
  }
  return userData.moods.splice(0, 5);
};
