import * as React from 'react';

const ExIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="25" height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    {...props}
  >
    <g clipPath="url(#clip0_559_3218)">
      <path d="M18.9547 2.03186H22.6347L14.5947 11.2219L24.0537 23.7249H16.6477L10.8477 16.1409L4.20971 23.7249H0.527711L9.12771 13.8949L0.0537109 2.03286H7.64771L12.8907 8.96486L18.9547 2.03186ZM17.6637 21.5229H19.7027L6.53971 4.11886H4.35171L17.6637 21.5229Z" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="clip0_559_3218">
        <rect width="24" height="24" fill="transparent" transform="translate(0.0537109 0.878906)" />
      </clipPath>
    </defs>
  </svg>
);

export default ExIcon;