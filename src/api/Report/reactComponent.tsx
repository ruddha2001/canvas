import React from 'react';

const css = `td, th {
    border: 1px solid black;
    text-align: left;
    padding: 8px;`;

export default function Component(props) {
  return (
    <html>
      <head>
        <style>{css}</style>
      </head>
      <body>
        <h1>Report generated at {new Date().toISOString()}</h1>
        <h3>User: {props.email}</h3>
        {props.data.length > 0 ? (
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tr>
              <th>Mood</th>
              <th>Notes</th>
              <th>Date/Time</th>
            </tr>
            {props.data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.currentMood}</td>
                  <td>{element.text}</td>
                  <td>{new Date(element.dateTime).toISOString()}</td>
                </tr>
              );
            })}
          </table>
        ) : (
          <div style={{ textAlign: 'center' }}>No records were found within the stipulated time period.</div>
        )}
      </body>
    </html>
  );
}
