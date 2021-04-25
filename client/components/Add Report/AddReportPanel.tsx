import React, { useEffect, useState } from 'react';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

export default function AddReportPanel() {
  const [fontSize, setFontSize] = useState(80);

  useEffect(() => {
    const width = window.innerHeight;
    if (width < 800) setFontSize(30);
    else if (width < 730) setFontSize(20);
  });
  return (
    <div
      className="col-span-12 lg:col-span-5 mt-2 lg:mt-0 ml-0 lg:ml-1 border border-base-primary rounded lg:rounded-lg bg-base-primary text-white cursor-pointer"
      onClick={() => {
        window.location.href = '/addreport';
      }}
    >
      <p className="w-full text-center lg:pt-60 lg:text-4xl">Record How You Are Feeling Now</p>
      <p className="w-full">
        <ControlPointIcon className="mx-auto" style={{ display: 'block', fontSize: fontSize }} />
      </p>
    </div>
  );
}
