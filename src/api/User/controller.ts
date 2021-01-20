const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);

const scopes = ['profile', 'email'];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});
