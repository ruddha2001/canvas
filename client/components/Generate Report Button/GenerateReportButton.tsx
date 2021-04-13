import React from 'react';

export default function GenerateReportButton() {
  return (
    <div className="w-full mt-10 md:mt-5 lg:mt-0">
      <p className="w-full text-center sm:pt-4 md:pt-2 lg:pt-9 lg:text-2xl">
        You can generate a more detailed report{' '}
        <button className="bg-base-primary text-white rounded-2xl p-2">Generate Report</button>
      </p>
    </div>
  );
}
