"use client";

import React, { useState, useEffect } from "react";
import {
  PlusCircleIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { Idea } from "../types";
import axios from "axios";
import { UserDataType } from "@/context/types";

export default function Idea({ params }: { params: { id: string } }) {
  // ** Variables
  const wallId = params.id;

  // ** States
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [user, setUser] = useState<UserDataType | null>(null);

  const addIdea = (newIdea: Idea) => {
    setIdeas((prevIdeas) => [...prevIdeas, newIdea]);
  };

  useEffect(() => {
    init();
    if (user?.id) getIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const getIdeas = async () => {
    console.log("Get Ideas....");
    const url = process.env.API_URL;
    if (user) {
      const token = user?.accessToken;
      console.log("Wall id:", wallId);
      console.log("Token: ", token);
      try {
        const response = await axios.get(`${url}ideas/${wallId}`, {
          headers: {
            Authorization: "Bearer " + token, // Replace with your actual token
          },
        });

        console.log("Response:", response.data);

        const transformedIdeas = response.data.data.map((ideaData: Idea) => ({
          _id: ideaData._id,
          name: ideaData.name,
          wall_id: ideaData.wall_id,
          notes: ideaData.notes,
          date: ideaData.date,
        }));

        console.log("Ideas: ", transformedIdeas);

        setIdeas(transformedIdeas);
      } catch (error) {
        console.error("Error fetching ideas:", error);
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
        <div className="pt-5">
          <div className="text-left">
            <h1 className="text-4xl mb-5 font-bold tracking-tight text-orange-600 sm:text-6xl">
              Ideas
            </h1>
            <h1 className="text-xl mb-10">( Wall Id: {params.id} )</h1>
          </div>
        </div>
        {/* show Ideas */}
        <div className="flex">
          <a
            href="/walls"
            className="rounded bg-orange-600 px-3.5 mr-2 py-2.5 text-sm font-semibold text-white shadow hover:bg-orange-500 mb-5"
          >
            <div className="flex">
              <ArrowUturnLeftIcon className="h-5 w-6" aria-hidden="true" />
              Back
            </div>
          </a>
          <a className="rounded bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-orange-500 mb-5">
            <div className="flex">
              <PlusCircleIcon className="h-5 w-6" aria-hidden="true" />
              Create New Idea
            </div>
          </a>
        </div>
        {ideas.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {ideas.map((idea) => (
                <a
                  // href={`/ideas/idea-id=${idea?._id}`}
                  className="bg-gray-100 hover:bg-gray-200 text-black p-5 rounded h-80"
                  key={idea?._id}
                >
                  <h2 className="text-orange-600 text-lg mb-5">
                    {idea?.name.length > 40
                      ? idea?.name.substring(0, 40) + "..."
                      : idea?.name}
                  </h2>
                  <p className="">
                    {idea?.notes.length > 300
                      ? idea?.notes.substring(0, 300) + "..."
                      : idea?.notes}
                  </p>
                </a>
              ))}
            </div>
          </>
        ) : (
          <p className="text-xl text-center">
            There is no ideas yet. Please Create one to let your dream comes
            true!
          </p>
        )}
      </div>
    </div>
  );
}
