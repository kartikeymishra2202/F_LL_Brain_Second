import { ReactElement } from "react";

export function SideBarItem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <>
      <div className="flex text-gray-900 py-1 cursor-pointer hover:bg-gray-400 rounded max-w-44 pl-4 transition-all duration-150 hover:text-slate-200">
        <div className="pl-2 "> {icon}</div>
        <div className="pl-2"> {text}</div>
      </div>
    </>
  );
}
