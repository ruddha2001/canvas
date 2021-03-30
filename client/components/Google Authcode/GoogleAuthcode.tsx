import React, { useState, useEffect } from 'react';

export default function GoogleAuthcode() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('Please wait while we log you in...');
  useEffect(() => {
    const queryObject = new URLSearchParams(window.location.search);
    setCode(queryObject.get('code'));
    console.log(code);
  });

  return (
    <>
      <p className="mx-auto mt-72 w-max font-bold text-2xl">
        <img src="/canvas.png" className="w-40 mx-auto pb-10" />
        {message}
      </p>
    </>
  );
}
