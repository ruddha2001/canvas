import { expect } from 'chai';
import 'mocha';
import { addNewMood, getUserMoods } from '../api/Mood/controller';

/**
 * Takes in a function and checks for error
 * @param {Function} method - The function to check
 * @param {any[]} params - The array of function parameters
 * @param {string} message - Optional message to match with error message
 */
const expectThrowsAsync = async (method: Function, params: any[], message?: string) => {
  let err = null;
  try {
    await method(...params);
  } catch (error) {
    err = error;
  }
  if (message) {
    expect(err.message).to.be.equal(message);
  } else {
    expect(err).to.be.an('Error');
  }
};

describe('Controller Testing', () => {
  it('Add an invalid new mood', async () => {
    await expectThrowsAsync(addNewMood, ['elated', '', 'sample@mail.com']);
  });
  it('Fetch moods for non-existent user', async () => {
    await expectThrowsAsync(getUserMoods, ['sample@mail.com']);
  });
});
