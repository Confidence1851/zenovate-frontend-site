import * as React from 'react';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="25" height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    {...props}
  >
    <path d="M22.9519 12.9055C22.9519 6.90317 18.0805 2.03174 12.0781 2.03174C6.07584 2.03174 1.20441 6.90317 1.20441 12.9055C1.20441 18.1684 4.94497 22.5505 9.9034 23.5617V16.1676H7.72865V12.9055H9.9034V10.187C9.9034 8.08841 11.6106 6.38124 13.7092 6.38124H16.4276V9.64336H14.2529C13.6548 9.64336 13.1655 10.1327 13.1655 10.7307V12.9055H16.4276V16.1676H13.1655V23.7249C18.6568 23.1812 22.9519 18.549 22.9519 12.9055Z" fill="currentColor" />  </svg>

);

export default FacebookIcon;