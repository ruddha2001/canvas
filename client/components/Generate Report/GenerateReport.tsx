import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import GenerateDialog from './GenerateDialog';

export default function GenerateReport() {
  const [feedbackRow, setFeedbackRow] = useState(4);
  useEffect(() => {
    const width = window.innerHeight;
    if (width < 900) setFeedbackRow(2);
    else if (width < 730) setFeedbackRow(2);
  });
  return (
    <>
      <div className="pt-8 text-base md:text-xl">
        <p className="text-3xl md:text-5xl pb-6 md:pb-10">Take a note of how you have been keeping</p>
        <p className="text-xl md:text-2xl pb-3 md:pb-5">
          Time Period <FontAwesomeIcon icon={faQuestionCircle} />
        </p>
        <input type="date" className="border border-black rounded-3xl resize-none p-2 mb-3 md:mb-8 inline-block" />
        <span className="block md:inline-block mx-6 mb-3 md:mb-5">to</span>
        <input type="date" className="border border-black rounded-3xl resize-none p-2 mb-3 md:mb-8 inline-block" />
        <p className="text-xl md:text-2xl pb-3 md:pb-5">
          File Format <FontAwesomeIcon icon={faQuestionCircle} />
        </p>
        <select className="border border-black rounded-3xl resize-none p-2 bg-white text-base md:text-xl px-6 mb-3 md:mb-8">
          <option value="html">HTML</option>
          <option value="pdf">PDF</option>
        </select>
        <p className="text-xl md:text-2xl pb-3 md:pb-5">
          Email Address <FontAwesomeIcon icon={faQuestionCircle} />
        </p>
        <textarea
          className="border border-black w-full rounded-3xl resize-none p-2 mb-3 md:mb-8"
          rows={1}
          name="feedback-text"
          id="feedback-text"
        ></textarea>
        <p className="text-xl md:text-2xl pb-3 md:pb-5">
          Email Message <FontAwesomeIcon icon={faQuestionCircle} />
        </p>
        <textarea
          className="border border-black w-full rounded-3xl resize-none p-2 mb-3 md:mb-8"
          rows={feedbackRow}
          name="feedback-text"
          id="feedback-text"
        ></textarea>
        <p className="pt-3 md:pt-5 w-full text-2xl md:text-3xl text-center">
          <button
            className="bg-base-primary text-white rounded-full px-5 md:px-6 py-2 md:py-3 mb-28"
            onClick={() => {
              document.getElementsByTagName('dialog')[0].showModal();
            }}
          >
            Submit
          </button>
        </p>
      </div>
      <dialog>
        <div className="p-10">
          <p>Your report has been generated and an email has been sent.</p>
          <br />
          <button
            className="border border-base-primary bg-base-primary text-white p-2 text-center block mx-auto"
            onClick={() => {
              document.getElementsByTagName('dialog')[0].close();
            }}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
