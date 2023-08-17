"use client";

import React, { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Wall } from "./types";
import axios from "axios";
import { UserDataType } from "@/context/types";

function Walls() {
  // ** States
  const [walls, setWalls] = useState<Wall[]>([]);
  const [user, setUser] = useState<UserDataType | null>(null);

  const addWall = (newWall: Wall) => {
    setWalls((prevWalls) => [...prevWalls, newWall]);
  };

  useEffect(() => {
    init();
    if (user?.id) getWalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const getWalls = async () => {
    console.log("Get Walls....");
    const url = process.env.API_URL;
    if (user) {
      const token = user?.accessToken;
      console.log("Token: ", token);
      try {
        const response = await axios.get(`${url}walls/`, {
          headers: {
            Authorization: "Bearer " + token, // Replace with your actual token
          },
        });

        console.log("Response:", response.data);

        const transformedWalls = response.data.data.map((wallData: Wall) => ({
          name: wallData.name,
          owner_id: wallData["owner_id"],
          description: wallData.description,
          _id: wallData._id,
          "created-date": wallData["created-date"],
          "last-modified": wallData["last-modified"],
        }));

        console.log("Walls: ", transformedWalls);

        setWalls(transformedWalls);
      } catch (error) {
        console.error("Error fetching walls:", error);
      }
    }
  };

  const init = () => {
    const userData = window.localStorage.getItem("userData");
    console.log("UserData", userData);
    if (userData) {
      const data = JSON.parse(userData);

      const transformedUser: UserDataType = {
        id: data.userData._id, // You can set the correct ID if available in the JSON data
        email: data.userData.email,
        username: data.userData.username,
        password: data.userData.password,
        accessToken: data.userData["access-token"],
        refreshToken: data.userData["refresh-token"],
        createdDate: data.userData["created-date"],
        lastLogin: data.userData["last-login"],
        lastLogout: data.userData["last-logout"],
        lastModified: data.userData["last-modified"],
      };
      console.log("transformedUser", transformedUser);
      setUser(transformedUser);
    }
  };

  return (
    <div className="bg-white">
      <div className="relative min-h-screen isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-20">
          <div className="text-center">
            <h1 className="text-4xl mb-10 font-bold tracking-tight text-orange-600 sm:text-6xl">
              Walls
            </h1>

            <button className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <div className="flex">
                <PlusCircleIcon className="h-5 w-6" aria-hidden="true" />
                Create new wall
              </div>
            </button>
          </div>
        </div>
        {/* show Walls */}
        {walls.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {walls.map((wall) => (
                <a
                  href={`/ideas/${wall?._id}`}
                  className="bg-gray-100 hover:bg-gray-200 text-black p-5 rounded h-80 text-center pt-24"
                  key={wall?._id}
                >
                  <h2 className="text-xl mb-5 text-orange-600">{wall?.name}</h2>
                  <p>{wall?._id}</p>
                </a>
              ))}
            </div>
          </>
        ) : (
          <p className="text-xl text-center">
            There is no walls yet. Please Create one to let your dream comes
            true!
          </p>
        )}
      </div>
    </div>
  );
}

export default Walls;
