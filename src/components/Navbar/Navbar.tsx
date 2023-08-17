"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hook/useAuth";
import { UserDataType } from "@/context/types";

const navigation = [
  { name: "Features", href: "/features" },
  { name: "About", href: "/about" },
];

const dashboardNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Walls", href: "/walls" },
];

function Navbar() {
  // ** States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserDataType | null>(null);

  // ** Hooks
  const pathname = usePathname();
  const auth = useAuth();

  function handleLogout() {
    auth.logout();
  }

  const init = () => {
    const userData = window.localStorage.getItem("userData");
    console.log("UserData", userData);
    if (userData) {
      const data = JSON.parse(userData);

      const transformedUser: UserDataType = {
        id: data?.userData?._id, // You can set the correct ID if available in the JSON data
        email: data?.userData?.email,
        username: data?.userData?.username,
        password: data?.userData?.password,
        accessToken: data?.userData?.["access-token"],
        refreshToken: data?.userData?.["refresh-token"],
        createdDate: data?.userData?.["created-date"],
        lastLogin: data?.userData?.["last-login"],
        lastLogout: data?.userData?.["last-logout"],
        lastModified: data?.userData?.["last-modified"],
      };
      console.log("transformedUser", transformedUser);
      setUser(transformedUser);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {pathname.substring(0, 6) == "/ideas" ? (
        <></>
      ) : (
        <>
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
              {auth.user
                ? dashboardNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-600"
                    >
                      {item.name}
                    </a>
                  ))
                : navigation.map((item) => (
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
                  {/* <a
                href="/dashboard"
                className="flex mr-2 text-sm font-semibold leading-6 text-gray-900 hover:text-orange-600"
              >
                <HomeIcon className="h-6 w-6" aria-hidden="true" />
                Dashboard
              </a> */}
                  <p className="mr-5 text-orange-600">{user?.username}</p>
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
                        {/* <a
                      href="/dashboard"
                      className="flex -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      <HomeIcon className="h-6 w-6" aria-hidden="true" />{" "}
                      Dashboard
                    </a> */}
                        <p className="mr-5 text-xl text-orange-600">
                          {auth.user?.username}
                        </p>
                        <a
                          onClick={handleLogout}
                          className="flex -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
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
                        className="flex -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
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
        </>
      )}
    </header>
  );
}

export default Navbar;
