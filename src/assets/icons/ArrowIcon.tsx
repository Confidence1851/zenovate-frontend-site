import * as React from 'react';

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="25" height="25"
        viewBox='0 0 24 24'
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth='1'
        stroke='currentColor'
        className={props.className}
        {...props}
    >
        <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />

    </svg>
);

export default ArrowIcon;
