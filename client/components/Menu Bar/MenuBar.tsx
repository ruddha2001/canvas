import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountMenu from './AccountMenu';

export default function MenuBar(props) {
  const [opacity, setOpacity] = useState('opacity-0');
  const toggleAccountMenu = event => {
    event.preventDefault();
    if (opacity === 'opacity-1') return setOpacity('opacity-0');
    return setOpacity('opacity-1');
  };
  return (
    <>
      <div className="w-full grid grid-cols-6 px-3 md:px-10 pt-2">
        <p className="col-start-1 col-end-4 text-lg md:text-xl lg:text-3xl">Hello {props.name}!</p>
        <p
          className="col-end-7 col-span-1 text-right"
          onClick={event => {
            toggleAccountMenu(event);
          }}
        >
          <AccountCircleIcon fontSize="large" />
        </p>
      </div>
      <p className="w-max flex float-right pr-3 md:pr-10">
        <AccountMenu opacity={opacity} />
      </p>
    </>
  );
}
