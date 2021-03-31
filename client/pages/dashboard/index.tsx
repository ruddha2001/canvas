import React from 'react';
import AddReportPanel from '../../components/Add Report/AddReportPanel';
import Footer from '../../components/Footer/Footer';
import Graph from '../../components/Graph/Graph';
import MenuBar from '../../components/Menu Bar/MenuBar';

export default function index() {
  return (
    <div className="w-screen h-screen relative">
      <MenuBar name="Ruddha" />
      <div></div>
      <div>
        <div className="grid grid-cols-12 w-full px-3 md:px-10 min-h-full">
          <Graph />
          <AddReportPanel />
        </div>
      </div>
      <Footer />
    </div>
  );
}
