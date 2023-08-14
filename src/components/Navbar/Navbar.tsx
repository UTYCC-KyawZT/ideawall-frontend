"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useAuth } from "@/hook/useAuth";

const navigation = [
  { name: "Features", href: "/features" },
  { name: "About", href: "/about" },
];

function Navbar() {
  // ** States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ** Hooks
  const auth = useAuth();

  function handleLogout() {
    auth.logout();
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/home" className="-m-1.5 p-1.5 flex">
            <span className="sr-only">Your Company</span>
            <Image
              className="h-8 w-auto"
              width={"100"}
              height={"100"}
              src="/images/logo.png"
              alt="logo"
            />
            <span className="font-bold mt-1 ml-1 text-orange-600 hover:text-orange-500">
              IdeaWall
            </span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-600"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {auth?.user == null ? (
            <a
              href="/login"
              className="flex text-sm font-semibold leading-6 text-gray-900 hover:text-orange-600"
            >
              <ArrowRightOnRectangleIcon
                className="h-6 w-6"
                aria-hidden="true"
              />
              Log in
            </a>
          ) : (
            <>
              <a
                href="/dashboard"
                className="flex mr-2 text-sm font-semibold leading-6 text-gray-900 hover:text-orange-600"
              >
                <HomeIcon className="h-6 w-6" aria-hidden="true" />
                Dashboard
              </a>
              <a
                onClick={handleLogout}
                className="flex cursor-pointer text-sm font-semibold leading-6 text-gray-900 hover:text-orange-600"
              >
                <ArrowRightOnRectangleIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
                Logout{" "}
              </a>
            </>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/home" className="-m-1.5 p-1.5 flex">
              {/* <span className="sr-only text-orange-600">IdeaWall</span> */}

              <Image
                className="h-8 w-auto mr-1"
                src="/images/logo.png"
                width={100}
                height={100}
                alt="logo"
              />
              <span className="font-bold mt-2 ml-1 text-orange-600 hover:text-orange-500">
                IdeaWall
              </span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {auth.user ? (
                  <>
                    <a
                      href="/dashboard"
                      className="flex -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      <HomeIcon className="h-6 w-6" aria-hidden="true" />{" "}
                      Dashboard
                    </a>
                    <a
                      onClick={handleLogout}
                      className="flex -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      <ArrowLeftOnRectangleIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />{" "}
                      Logout
                    </a>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="flex -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <ArrowRightOnRectangleIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />{" "}
                    Log in
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Navbar;
