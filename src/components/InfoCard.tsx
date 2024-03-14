import Image from "next/image";
import React from "react";
import CalendarIcon from "@/assets/icons/calendar-icon.svg";

type Props = {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

export default function InfoCard({ icon, title, children }: Props) {
  return (
    <div className="flex items-center gap-4 border border-slate-200 hover:bg-slate-100 transition-bg rounded-xl px-4 py-2">
      {icon && icon}
      <div className="flex flex-col">
        <span className="text-xs text-slate-500">{title}</span>
        {children}
      </div>
    </div>
  );
}
