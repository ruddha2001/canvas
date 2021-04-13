import React, { useState, useEffect } from 'react';
import Loader from 'react-loader';
import Footer from '../../components/Footer/Footer';
import MenuBar from '../../components/Menu Bar/MenuBar';

export default function index() {
  const [loaded, setLoaded] = useState(true);
  // useEffect(() => {
  //   if (window.localStorage.getItem('auth') !== 'true') {
  //     alert('Please login to continue.');
  //     return window.location.replace('/');
  //   }
  //   useAuthenticate(window.localStorage.getItem('token'))
  //     .then(_ => {
  //       setLoaded(true);
  //     })
  //     .catch(_ => {
  //       alert('There was problem verifying your identify. Please re-login to continue.');
  //       return window.location.replace('/');
  //     });
  // });
  return (
    <Loader loaded={loaded}>
      <MenuBar name="Ruddha" />
      <div></div>
      <div className="px-3 md:px-10 min-h-full">Feedback</div>
      <Footer />
    </Loader>
  );
}
