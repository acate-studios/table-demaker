import * as React from "react";

const DefaultRemoveIcon = (
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
      d="M18 6 6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DefaultRemoveIcon;
