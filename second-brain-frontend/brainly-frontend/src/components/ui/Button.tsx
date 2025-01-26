// import { ReactElement } from "react";

import { ReactElement } from "react";

// export interface ButtonProps {
//   varient: "primary" | "secondary";
//   size: "sm" | "md" | "lg";
//   text: string;

//   startIcon?: ReactElement;
//   endIcon?: ReactElement;
//   onClick: () => void;
// }

// export const Button = (props: ButtonProps) => {
//   const baseClass = "flex items-center justify-center font-medium rounded";
//   const varientClasses = {
//     primary: "bg-purple-600 text-white hover:bg-blue-600",
//     secondary: "bg-purple-400 text-white hover:bg-gray-600",
//   };
//   const sizeClasses = {
//     sm: "px-3 py-1 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-6 py-3 text-lg",
//   };

//   return (
//     <button
//       onClick={props.onClick}
//       className={
//         baseClass +
//         " " +
//         varientClasses[props.varient] +
//         " " +
//         sizeClasses[props.size]
//       }
//     >
//       {props.text}
//     </button>
//   );
// };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface ButtonProps {
  varient: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  fullwidth?: boolean;

  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  loading?: boolean;
}
const varientClasses = {
  primary: "bg-purple-600 text-white hover:bg-purple-500",
  secondary: "bg-gray-600 text-white hover:bg-gray-400",
};
const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};
const defaultStyles = "px-4 py-2 rounded-md font-light flex justify-center";

export function Button({
  varient,
  text,
  size,
  onClick,
  startIcon,
  fullwidth,
  loading,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        varientClasses[varient] +
        " " +
        sizeClasses[size] +
        " " +
        defaultStyles +
        `${fullwidth ? " w-full" : ""}` +
        `${loading ? " opacity-45" : ""}`
      }
      disabled={loading}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {text}
    </button>
  );
}
