import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function Graph(props) {
  const dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const moodMap = new Map();
  moodMap.set('elated', 5);
  moodMap.set('happy', 4);
  moodMap.set('neutral', 3);
  moodMap.set('sad', 2);
  moodMap.set('awful', 1);
  const [labelArray, setLabelArray] = useState([]);
  const [datapointArray, setDatapointArray] = useState([]);
  const [init, setInit] = useState(true);
  if (props.data && init) {
    let tempArray = [];
    let datapointTempArray = [];
    console.log(props.data);
    props.data.forEach(element => {
      tempArray.push(dayArray[new Date(element.dateTime).getDay()]);
      datapointTempArray.push(moodMap.get(element.currentMood) || 0);
    });
    setLabelArray(tempArray);
    setDatapointArray(datapointTempArray);
    setInit(false);
  }
  const data = {
    labels: labelArray,
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
        data: datapointArray,
      },
    ],
  };
  return (
    <div className="col-span-12 lg:col-span-7 border mr-0 lg:mr-1 border-base-secondary rounded lg:rounded-lg h-52 sm:md-60 md:h-96 xl:h-custom-large">
      <Line data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
}
