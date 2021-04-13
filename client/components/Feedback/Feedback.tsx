import React, { useEffect, useState } from 'react';

export default function Feedback() {
  const [feedbackRow, setFeedbackRow] = useState(15);

  useEffect(() => {
    const width = window.innerHeight;
    if (width < 900) setFeedbackRow(10);
    else if (width < 730) setFeedbackRow(8);
  });
  return (
    <div className="pt-8">
      <p className="text-3xl md:text-5xl pb-10">Let us know how we have been doing</p>
      <p className="text-2xl pb-3 md:pb-5">Feedback</p>
      <textarea
        className="border border-black w-full rounded-3xl resize-none p-2"
        rows={feedbackRow}
        name="feedback-text"
        id="feedback-text"
      ></textarea>
      <p className="text-2xl py-3 md:py-5">Do you want us to contact you?</p>
      <select className="border border-black rounded-3xl resize-none p-2 bg-white text-xl px-6">
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
      <p className="pt-3 md:pt-5 w-full text-2xl md:text-3xl text-center">
        <button className="bg-base-primary text-white rounded-full px-6 py-3">Submit</button>
      </p>
    </div>
  );
}
