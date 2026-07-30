import * as React from "react";

const DefaultAppliedIcon = (
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
      d="M4 5h16l-6.5 7.5V19l-3 1.5v-8L4 5Z"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DefaultAppliedIcon;
