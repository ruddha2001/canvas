import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function AccountMenu(props) {
  const menuItems = [
    ['Feedback', <ChatIcon />],
    ['Log Out', <ExitToAppIcon />],
  ];
  const handleOnClickAccountMenuItem = (event, item) => {
    event.preventDefault();
    switch (item) {
      case 'Log Out':
        window.localStorage.setItem('token', '');
        window.localStorage.setItem('name', '');
        window.localStorage.setItem('auth', 'false');
        window.location.replace('/');
        break;
      case 'Feedback':
        window.location.replace('/feedback');
        break;
    }
  };
  return (
    <div className={[props.opacity, 'border-2 z-50 px-5 py-1 mt-2 bg-white'].join(' ')}>
      {menuItems.map(item => {
        return (
          <p
            className="py-1 text-base md:text-xl cursor-pointer"
            key={item[0] as string}
            onClick={event => handleOnClickAccountMenuItem(event, item[0])}
          >
            {item[0]} <span className="flex float-right pl-4 md:pl-5">{item[1]}</span>
          </p>
        );
      })}
    </div>
  );
}
