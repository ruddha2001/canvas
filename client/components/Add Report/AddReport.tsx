import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faLaughBeam, faMeh, faFrown, faSadCry, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import { BASE_URL } from '../../constants';

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
  const [buttonText, setButtonText] = useState('Submit');

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
  async function handleOnSubmit() {
    try {
      if (selected === 'Crisis') {
        document.getElementById('dialog-text').innerHTML =
          'We are so sorry to hear that you are having a crisis.<br/>Please contact AASRA at <a href="http://www.aasra.info/" style="cursor:pointer">http://www.aasra.info/</a><br/><br/>Stay safe. We are there with you.';
        return document.getElementsByTagName('dialog')[0].showModal();
      }
      axios
        .post(
          `${BASE_URL}/api/mood/add`,
          {
            mood: selected.toLowerCase(),
            text: (document.getElementById('feedback-text') as HTMLInputElement).value,
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
          },
        )
        .then(_ => {
          console.log(_.data);
          setButtonText('Processing');
        });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
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
          <button
            className="bg-base-primary text-white rounded-full px-5 md:px-6 py-2 md:py-3 mb-28"
            onClick={ev => {
              ev.preventDefault();
              handleOnSubmit();
            }}
            disabled={buttonText === 'Processing'}
          >
            {buttonText}
          </button>
        </p>
      </div>
      <dialog>
        <div className="p-10">
          <p id="dialog-text">Your mood report has been addedd successfully.</p>
          <br />
          <button
            className="border border-base-primary bg-base-primary text-white p-2 text-center block mx-auto"
            onClick={() => {
              window.location.href = '/dashboard';
            }}
          >
            Go To Home
          </button>
        </div>
      </dialog>
    </>
  );
}
