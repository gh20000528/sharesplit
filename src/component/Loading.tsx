import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

// Keyframes for animations
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const truckBody = keyframes`
  from,
  12.5%,
  25%,
  37.5%,
  50%,
  62.5%,
  75%,
  87.5%,
  to {
    animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0);
    transform: translate(0,0) rotate(0);
  }
  6.25%,
  18.75%,
  31.25%,
  43.75%,
  56.25%,
  68.75%,
  81.25%,
  93.75% {
    animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1);
    transform: translate(0,1px) rotate(-0.75deg);
  }
`;

const truckLine = keyframes`
  from {
    stroke-dashoffset: -18;
  }
  to {
    stroke-dashoffset: 78;
  }
`;

const truckOutside1 = keyframes`
  from {
    stroke-dashoffset: 105;
  }
  to {
    stroke-dashoffset: -105;
  }
`;

const truckOutside2 = keyframes`
  from {
    stroke-dashoffset: 168;
  }
  to {
    stroke-dashoffset: -42;
  }
`;

const truckOutside3 = keyframes`
  from {
    stroke-dashoffset: 192;
  }
  to {
    stroke-dashoffset: -18;
  }
`;

const truckWheel = keyframes`
  from,
  12.5%,
  25%,
  37.5%,
  50%,
  62.5%,
  75%,
  87.5%,
  to {
    animation-timing-function: cubic-bezier(0.33, 0, 0.67, 0);
    transform: translate(0,0);
  }
  6.25%,
  18.75%,
  31.25%,
  43.75%,
  56.25%,
  68.75%,
  81.25%,
  93.75% {
    animation-timing-function: cubic-bezier(0.33, 1, 0.67, 1);
    transform: translate(0,-1px);
  }
`;

const truckWheelSpin = keyframes`
  from {
    stroke-dashoffset: -15.71;
    transform: rotate(0);
  }
  to {
    stroke-dashoffset: 15.71;
    transform: rotate(-4turn);
  }
`;

const truckWindow1 = keyframes`
  from {
    stroke-dashoffset: -21;
  }
  to {
    stroke-dashoffset: 189;
  }
`;

const truckWindow2 = keyframes`
  from {
    stroke-dashoffset: -39;
  }
  to {
    stroke-dashoffset: 171;
  }
`;

// Styled component for Truck
const TruckWrapper = styled.svg`
  --dur: 3s;
  display: block;
  width: 12em;
  height: auto;

  .truck__body,
  .truck__line,
  .truck__outside1,
  .truck__outside2,
  .truck__outside3,
  .truck__wheel,
  .truck__wheel-spin,
  .truck__window1,
  .truck__window2 {
    animation: ${truckBody} var(--dur) linear infinite;
  }

  .truck__line {
    animation-name: ${truckLine};
  }

  .truck__outside1 {
    animation-name: ${truckOutside1};
  }

  .truck__outside2 {
    animation-name: ${truckOutside2};
  }

  .truck__outside3 {
    animation-name: ${truckOutside3};
  }

  .truck__wheel {
    animation-name: ${truckWheel};

    &-spin {
      animation-name: ${truckWheelSpin};
      transform-origin: 6.5px 17px;
    }

    &:nth-child(2) {
      animation-delay: calc(var(--dur) * 0.0625);
    }

    &:nth-child(2) &-spin {
      transform-origin: 27px 17px;
    }
  }

  .truck__window1 {
    animation-name: ${truckWindow1};
  }

  .truck__window2 {
    animation-name: ${truckWindow2};
  }
`;

const Loading = () => (
  <TruckWrapper className="truck" viewBox="0 0 48 24" width="48px" height="24px">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" transform="translate(0,2)">
      <g className="truck__body">
        <g strokeDasharray="105 105">
          <polyline className="truck__outside1" points="2 17,1 17,1 11,5 9,7 1,39 1,39 6" />
          <polyline className="truck__outside2" points="39 12,39 17,31.5 17" />
          <polyline className="truck__outside3" points="22.5 17,11 17" />
          <polyline className="truck__window1" points="6.5 4,8 4,8 9,5 9" />
          <polygon className="truck__window2" points="10 4,10 9,14 9,14 4" />
        </g>
        <polyline className="truck__line" points="43 8,31 8" strokeDasharray="10 2 10 2 10 2 10 2 10 2 10 26" />
        <polyline className="truck__line" points="47 10,31 10" strokeDasharray="14 2 14 2 14 2 14 2 14 18" />
      </g>
      <g strokeDasharray="15.71 15.71">
        <g className="truck__wheel">
          <circle className="truck__wheel-spin" r="2.5" cx="6.5" cy="17" />
        </g>
        <g className="truck__wheel">
          <circle className="truck__wheel-spin" r="2.5" cx="27" cy="17" />
        </g>
      </g>
    </g>
  </TruckWrapper>
);

export default Loading;
