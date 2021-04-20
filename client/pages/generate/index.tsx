import React, { useEffect, useState } from 'react';
import Loader from 'react-loader';
import Footer from '../../components/Footer/Footer';
import GenerateReport from '../../components/Generate Report/GenerateReport';
import MenuBar from '../../components/Menu Bar/MenuBar';
import { useAuthenticate } from '../../hooks/AuthenticateHook';

export default function index() {
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState('');
  useEffect(() => {
    if (window.localStorage.getItem('auth') !== 'true') {
      alert('Please login to continue.');
      return window.location.replace('/');
    }
    useAuthenticate(window.localStorage.getItem('token'))
      .then(_ => {
        setLoaded(true);
        setName(window.localStorage.getItem('name'));
      })
      .catch(_ => {
        alert('There was problem verifying your identify. Please re-login to continue.');
        return window.location.replace('/');
      });
  });
  return (
    <Loader loaded={loaded}>
      <MenuBar name={name} />
      <div className="px-3 md:px-10 min-h-full">
        <GenerateReport />
      </div>
      <Footer />
    </Loader>
  );
}
