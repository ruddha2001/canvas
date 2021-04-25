import React, { useEffect, useState } from 'react';
import Loader from 'react-loader';
import axios from 'axios';
import AddReportPanel from '../../components/Add Report/AddReportPanel';
import Footer from '../../components/Footer/Footer';
import GenerateReportButton from '../../components/Generate Report Button/GenerateReportButton';
import Graph from '../../components/Graph/Graph';
import MenuBar from '../../components/Menu Bar/MenuBar';
import { useAuthenticate } from '../../hooks/AuthenticateHook';
import { BASE_URL } from '../../constants';

export default function index() {
  const [loaded, setLoaded] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [name, setName] = useState('');
  useEffect(() => {
    if (window.localStorage.getItem('auth') !== 'true') {
      alert('Please login to continue.');
      return window.location.replace('/');
    }
    useAuthenticate(window.localStorage.getItem('token'))
      .then(_ => {
        setName(window.localStorage.getItem('name'));
      })
      .catch(_ => {
        alert('There was problem verifying your identify. Please re-login to continue.');
        return window.location.replace('/');
      });
    async function fetchGraphData() {
      try {
        axios
          .get(`${BASE_URL}/api/mood/fetch`, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
          })
          .then(response => {
            setGraphData(response.data);
            setGraphLoaded(true);
            setLoaded(true);
          });
      } catch (error) {
        console.error(error);
      }
    }
    !graphLoaded && fetchGraphData();
  });
  return (
    <div className="w-screen h-screen relative">
      <Loader loaded={loaded}>
        <MenuBar name={name} />
        <div>
          <div className="grid grid-cols-12 w-full px-3 md:px-10 min-h-full overflow-auto">
            <Graph data={graphData} />
            <AddReportPanel />
          </div>
          <GenerateReportButton />
        </div>
        <Footer />
      </Loader>
    </div>
  );
}
