import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';

export default function Feedback() {
  const [actionText, setActionText] = useState('Submit');
  const [dialogText, setDialogText] = useState('Your feedback has been recorded. Thank you for using Canvas!');
  const [feedbackRow, setFeedbackRow] = useState(15);

  useEffect(() => {
    const width = window.innerHeight;
    if (width < 900) setFeedbackRow(10);
    else if (width < 730) setFeedbackRow(8);
  });
  return (
    <>
      <div className="pt-8">
        <p className="text-3xl md:text-5xl pb-6 md:pb-10">Let us know how we have been doing</p>
        <p className="text-xl md:text-2xl pb-3 md:pb-5">Feedback</p>
        <textarea
          className="border border-black w-full rounded-3xl resize-none p-2"
          rows={feedbackRow}
          name="feedback-text"
          id="feedback-text"
        ></textarea>
        <p className="text-xl md:text-2xl py-3 md:py-5">Do you want us to contact you?</p>
        <select
          className="border border-black rounded-3xl resize-none p-2 bg-white text-base md:text-xl px-6"
          id="choice"
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
        <p className="pt-3 md:pt-5 w-full text-2xl md:text-3xl text-center">
          <button
            className="bg-base-primary text-white rounded-full px-5 md:px-6 py-2 md:py-3 mb-28"
            onClick={event => {
              event.preventDefault();
              setActionText('Processing');
              try {
                axios
                  .post(
                    `${BASE_URL}/api/user/feedback`,
                    {
                      text: (document.getElementById('feedback-text') as HTMLInputElement).value,
                      choice: (document.getElementById('choice') as HTMLInputElement).value,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                      },
                    },
                  )
                  .then(_ => {
                    document.getElementsByTagName('dialog')[0].showModal();
                  });
              } catch (error) {
                console.error(error);
                setDialogText('We had some problem storing your feedback. Please try again.');
              }
            }}
            disabled={actionText === 'Submit' ? false : true}
          >
            {actionText}
          </button>
        </p>
      </div>
      <dialog>
        <div className="p-10">
          <p>{dialogText}</p>
          <br />
          <button
            className="border border-base-primary bg-base-primary text-white p-2 text-center block mx-auto"
            onClick={event => {
              event.preventDefault();
              window.location.href = '/dashboard';
            }}
          >
            Go to home
          </button>
        </div>
      </dialog>
    </>
  );
}
