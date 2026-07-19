import * as React from "react";

const DefaultFilterIcon = (
  props: React.SVGProps<SVGSVGElement> & { strokeWidth?: number }
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DefaultFilterIcon;
