"use client";

import React, { useContext } from "react";
import { RiBox3Fill } from "react-icons/ri";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdCategory, MdLogout, MdDashboard, MdListAlt } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "/assets/imgs/kimptrendz-logo.png";
import Image from "next/image";
import { doLogout } from "/app/actions";
import Context from "/shared/config/Context";
import { Skeleton } from "/shared/ui/shadcn/components/ui/skeleton";

const SideNav = () => {
  const { loading } = useContext(Context);
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: <MdDashboard size={20} />,
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: <RiBox3Fill size={20} />,
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <BiSolidCategoryAlt size={20} />,
    },
    {
      name: "Orders",
      link: "/admin/orders",
      icon: <MdListAlt size={20} />,
    },
    {
      name: "Sub Categories",
      link: "/admin/subcategories",
      icon: <MdCategory size={20} />,
    },
  ];

  return (
    <div className="w-[16rem] shrink-0 h-screen flex flex-col justify-between bg-white border-r border-slate-200 z-10">
      <div className="flex flex-col h-full">
        <div className="px-6 py-8 border-b border-slate-100 flex justify-center">
          <Image
            src={logo}
            alt="Kimptrendz Logo"
            height={60}
            width={60}
            className="object-contain"
          />
        </div>

        <div className="flex-1 py-6 px-4">
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Dashboard
          </p>
          <ul className="flex flex-col gap-1">
            {navItems.map((nav, index) => {
              const isActive = pathname.startsWith(nav.link);

              return (
                <li key={index}>
                  {loading ? (
                    <div className="px-4 py-2">
                      <Skeleton className="h-8 w-full rounded-lg" />
                    </div>
                  ) : (
                    <Link
                      href={nav.link}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                        isActive
                          ? "bg-[#ffd138]/10 text-yellow-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={`${isActive ? "text-[#ffd138]" : "text-slate-400"}`}
                      >
                        {nav.icon}
                      </span>
                      {nav.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-4 border-t border-slate-100">
          <form action={doLogout}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl py-3 transition-colors"
            >
              <MdLogout size={18} /> Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
