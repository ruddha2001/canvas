import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faLaughBeam, faMeh, faFrown, faSadCry, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

const moodIconData = [
  {
    icon: faLaughBeam,
    text: 'Elated',
    color: 'green',
  },
  {
    icon: faSmile,
    text: 'Happy',
    color: 'orchid',
  },
  {
    icon: faMeh,
    text: 'Neutral',
    color: 'blue',
  },
  {
    icon: faFrown,
    text: 'Sad',
    color: 'orange',
  },
  {
    icon: faSadCry,
    text: 'Awful',
    color: 'brown',
  },
  {
    icon: faTimesCircle,
    text: 'Crisis',
    color: 'red',
  },
];

export default function Feedback() {
  const [iconSize, setIconSize] = useState('5x');
  const [feedbackRow, setFeedbackRow] = useState(15);
  const [selected, setSelected] = useState('none');

  useEffect(() => {
    const width = window.innerHeight;
    if (width < 900) {
      setIconSize('3x');
      setFeedbackRow(10);
    } else if (width < 730) {
      setIconSize('2x');
      setFeedbackRow(7);
    }
  });

  return (
    <div className="pt-8">
      <p className="text-xl md:text-2xl py-3 md:py-5">Let us take a note of how you have been</p>
      <div className="grid grid-cols-3 md:grid-cols-6 justify-items-center">
        {moodIconData.map(element => {
          return (
            <div className="my-3 md:my-6 cursor-pointer">
              <FontAwesomeIcon
                icon={element.icon}
                size={iconSize as SizeProp}
                color={selected === element.text ? element.color : 'black'}
                onClick={() => {
                  setSelected(element.text);
                }}
              />
              <p className="text-center text-base md:text-xl">{element.text}</p>
            </div>
          );
        })}
      </div>
      <p className="text-xl md:text-2xl py-3 md:pb-5">You can write down your current feelings (it really helps!)</p>
      <textarea
        className="border border-black w-full rounded-3xl resize-none p-2"
        rows={feedbackRow}
        name="feedback-text"
        id="feedback-text"
      ></textarea>
      <p className="pt-3 md:pt-5 w-full text-2xl md:text-3xl text-center">
        <button className="bg-base-primary text-white rounded-full px-5 md:px-6 py-2 md:py-3 mb-28">Submit</button>
      </p>
    </div>
  );
}
