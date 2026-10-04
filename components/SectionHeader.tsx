import React from "react";

// Единая шапка раздела: заголовок и лид слева по общей сетке, действие — справа по нижней линии заголовка.
export default function SectionHeader({
  title,
  lead,
  action,
  dark = false,
  className = "",
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={"flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12 mb-12 md:mb-16 " + className}>
      <div className="max-w-[760px]">
        <h2 className={"t-section " + (dark ? "text-white" : "text-navy")}>{title}</h2>
        {lead && <p className={"mt-4 md:mt-5 t-lead max-w-[620px] " + (dark ? "text-white/80" : "text-navy/65")}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
