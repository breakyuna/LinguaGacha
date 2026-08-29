import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { startTransition } from "react";

import { useSidebar } from "@frontend/shadcn/sidebar";
import "@frontend/app/shell/app-titlebar.css";

type AppTitlebarProps = {
  title: string;
};

export function AppTitlebar(props: AppTitlebarProps): JSX.Element {
  const { state, toggleSidebar } = useSidebar();
  const shell_info: any = { titleBarHeight: 0, titleBarSafeAreaStart: 0, titleBarSafeAreaEnd: 0, titleBarControlSide: "right" };
  const SidebarToggleIcon = state === "expanded" ? PanelLeftClose : PanelLeftOpen;

  return (
    <header
      className="titlebar shell-topbar"
      data-titlebar-control-side={shell_info.titleBarControlSide}
    >
      <div className="topbar__safe-area topbar__safe-area--start" aria-hidden="true" />
      <div className="topbar__content">
        <div className="topbar__left">
          <button
            type="button"
            className="topbar__menu-button"
            onClick={() => {
              startTransition(() => {
                toggleSidebar();
              });
            }}
          >
            <SidebarToggleIcon size={18} aria-hidden="true" />
          </button>
          <div className="topbar__brand">
            <strong className="font-medium">{props.title}</strong>
          </div>
        </div>
      </div>
      <div className="topbar__safe-area topbar__safe-area--end" aria-hidden="true" />
    </header>
  );
}
