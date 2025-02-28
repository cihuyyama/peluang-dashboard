import { MoreVertical, ChevronLast, ChevronFirst, LogOut } from "lucide-react";
import Image from "next/image";
import { useContext, createContext, useState, ReactNode } from "react";
import Link from "next/link";
import logo from "../public/Peluang-Logo-2024.png"

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  link: string;
  active?: boolean;
  alert?: boolean;
}

interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps>({
  expanded: true,
});

export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState<boolean>(true);

  function delete_cookie() {
    document.cookie = 'token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'exp' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className={`transition-transform flex flow-row gap-2 items-center ${expanded ? "w-full text-base" : "text-xs w-0"
            }`}>
            <Image
              src={logo}
              className={`overflow-hidden ${expanded ? "w-[35px]" : "w-0"}`}
              alt=""
              width={64}
              height={64}
            />
            <div className="overflow-hidden flex flex-row w-full">
              <span>
                Peluang Admin Panel
              </span>
            </div>
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 flex flex-col items-center">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex w-full px-3 mb-4 ">
          <Link onClick={delete_cookie} href='/auth'
            className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${false
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                : "hover:bg-indigo-50 text-gray-600"
              }
    `}
          >
            <LogOut />
            <span
              className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                }`}
            >
              Logout
            </span>
            {false && (
              <div
                className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                  }`}
              />
            )}

            {!expanded && (
              <div
                className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
              >
                Logout
              </div>
            )}
          </Link>
        </div>
        
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  link
}: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link href={link}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
          }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
            }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </Link>
  );
}
