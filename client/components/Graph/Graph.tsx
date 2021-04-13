import React from 'react';
import { Line } from 'react-chartjs-2';

export default function Graph() {
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'My Mood',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [1, 1, 3, 2, 4, 5, 1],
      },
    ],
  };
  return (
    <div className="col-span-12 lg:col-span-7 border mr-0 lg:mr-1 border-base-secondary rounded lg:rounded-lg h-52 sm:md-60 md:h-96 xl:h-custom-large">
      <Line data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
}
