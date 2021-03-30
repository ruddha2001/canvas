import database from '../../loaders/database';
import { sign } from 'jsonwebtoken';
import LoggerInstance from '../../loaders/logger';
import { User } from '../Shared/customTypes';

const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);

const scopes = ['profile', 'email'];

export const generateLoginUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
};

export const setToken = async (authObject: any) => {
  try {
    if (authObject.error) {
      console.log(authObject.error);
      throw Error('Access denied');
    }
    const { tokens } = await oauth2Client.getToken(authObject.code);
    oauth2Client.setCredentials(tokens);
    return await getUserProfile();
  } catch (error) {
    if (error.message === 'Could not get/create user profile') throw error;
    throw Error('Could not set token');
  }
};

const getUserProfile = async () => {
  try {
    let oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });
    let res = await oauth2.userinfo.get();
    const dbResponse = await (await database()).collection('users').findOne({ email: res.data.email });
    if (dbResponse === null) await createLocalUserProfile(res.data);
    return res.data;
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Could not get/create user profile');
  }
};

const createLocalUserProfile = async (data: any) => {
  try {
    const { email, name, picture } = data;
    const newUser: User = {
      name: name,
      email: email,
      picture: picture,
      moods: [],
    };
    await (await database()).collection('users').insertOne(newUser);
  } catch (error) {
    LoggerInstance.error(error);
    throw Error('Could not create a local user profile');
  }
};

export const generateJwt = (email: string, name: string) => {
  return sign({ email, name }, process.env.JWT_SECRET);
};
