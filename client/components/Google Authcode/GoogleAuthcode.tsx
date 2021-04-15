import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../constants';

export default function GoogleAuthcode() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('Please wait while we log you in...');
  const [help, setHelp] = useState('');
  useEffect(() => {
    const queryObject = new URLSearchParams(window.location.search);
    setCode(queryObject.get('code'));
    if (queryObject.get('error')) {
      setMessage('There was some problem authenticating with Google');
      return setHelp('Please retry or contact me@aniruddha.net for further help');
    }
    axios
      .get(`${BASE_URL}/api/user/authcode?code=${code}`, {
        validateStatus: function (status) {
          return status >= 200 && status <= 500;
        },
      })
      .then(response => {
        if (response.status != 200) {
          setMessage('We could not authenticate your account');
          return setHelp('Please retry or contact me@aniruddha.net for further help');
        }
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('name', response.data.name);
        window.localStorage.setItem('auth', 'true');
        window.location.replace('/dashboard');
      });
  });

  return (
    <>
      <p className="mx-auto mt-72 w-max text-center">
        <img src="/canvas.png" className="w-40 mx-auto pb-10" />
        <span className="font-bold text-2xl">{message}</span>
        <br />
        {help}
      </p>
    </>
  );
}
