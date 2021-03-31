import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function AccountMenu(props) {
  const menuItems = [
    ['Feedback', <ChatIcon />],
    ['Log Out', <ExitToAppIcon />],
  ];
  return (
    <div className={[props.display, 'border-2 z-50 px-5 py-1 mt-2'].join(' ')}>
      {menuItems.map(item => {
        return (
          <p className="py-1 text-base md:text-xl">
            {item[0]} <span className="flex float-right pl-4 md:pl-5">{item[1]}</span>
          </p>
        );
      })}
    </div>
  );
}
