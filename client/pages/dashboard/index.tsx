import React, { useEffect, useState } from 'react';
import Loader from 'react-loader';
import AddReportPanel from '../../components/Add Report/AddReportPanel';
import Footer from '../../components/Footer/Footer';
import GenerateReportButton from '../../components/Generate Report Button/GenerateReportButton';
import Graph from '../../components/Graph/Graph';
import MenuBar from '../../components/Menu Bar/MenuBar';
import { useAuthenticate } from '../../hooks/AuthenticateHook';

export default function index() {
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState(window.localStorage.getItem('name'));
  useEffect(() => {
    if (window.localStorage.getItem('auth') !== 'true') {
      alert('Please login to continue.');
      return window.location.replace('/');
    }
    useAuthenticate(window.localStorage.getItem('token'))
      .then(_ => {
        setLoaded(true);
      })
      .catch(_ => {
        alert('There was problem verifying your identify. Please re-login to continue.');
        return window.location.replace('/');
      });
  });
  return (
    <div className="w-screen h-screen relative">
      <Loader loaded={loaded}>
        <MenuBar name={name} />
        <div></div>
        <div>
          <div className="grid grid-cols-12 w-full px-3 md:px-10 min-h-full">
            <Graph />
            <AddReportPanel />
          </div>
          <GenerateReportButton />
        </div>
        <Footer />
      </Loader>
    </div>
  );
}
