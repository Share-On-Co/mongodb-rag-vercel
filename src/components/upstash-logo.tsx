import React, { HTMLProps } from "react";

export interface Props extends HTMLProps<SVGSVGElement> {
  size?: number;
}

export default function UpstashLogo({ height = 30, ...props }: Props) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 0 24 30" x="0px" y="0px">
  <g transform="translate(0, 2)">
    <path d="M20.5,13H20V12a3,3,0,0,0-3-3H13V6.7226a2,2,0,1,0-2,0V9H7a3,3,0,0,0-3,3v1H3.5a1.5,1.5,0,0,0,0,3H4v1a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16h.5a1.5,1.5,0,0,0,0-3ZM19,17a2.00226,2.00226,0,0,1-2,2H7a2.0023,2.0023,0,0,1-2-2V12a2.00226,2.00226,0,0,1,2-2H17a2.00222,2.00222,0,0,1,2,2Zm-9-2.5A1.5,1.5,0,1,1,8.5,13,1.5,1.5,0,0,1,10,14.5Zm7,0A1.5,1.5,0,1,1,15.5,13,1.5,1.5,0,0,1,17,14.5Z" fill="#FFFFFF"/>
  </g>
</svg>
  );
}
