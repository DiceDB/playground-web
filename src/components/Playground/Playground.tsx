"use client";

// Components
import Cli from "@/components/CLI/CLI";
import SearchBox from "@/components/Search/SearchBox";
import { Dice1, Dice3, Dice5 } from "lucide-react";

// utils
import { formatTime } from "@/shared/utils/commonUtils";

// images and icons
import { usePlayground } from "./hooks/usePlayground";

export default function Playground() {
  const { decreaseCommandsLeft, search, timeLeft, commandsLeft, setSearch } =
    usePlayground();

  return (
    <div className="container mx-auto flex flex-col flex-grow text-gray-900 p-4">
      <main className="flex flex-col lg:flex-row gap-6 flex-grow overflow-hidden">
        <div className="w-full lg:w-1/2 flex flex-col space-y-4">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-900 px-4 py-3 flex items-center">
              <div className="flex space-x-2">
                <Dice5 className="w-3 h-3 text-red-500" />
                <Dice1 className="w-3 h-3 text-yellow-500" />
                <Dice3 className="w-3 h-3 text-green-500" />
              </div>
            </div>
            <div className="h-[calc(100vh-28rem)] lg:h-[calc(100vh-24rem)] bg-gray-100 overflow-hidden shadow-inner">
              <Cli decreaseCommandsLeft={decreaseCommandsLeft} />
            </div>
          </div>

          <div className="flex flex-row justify-between text-gray-900 space-x-4">
            <div className="flex-1 flex justify-center items-center border border-gray-300 bg-white text-sm p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
              <span className="font-medium">
                Cleanup in:{" "}
                <span className="text-blue-600">
                  {formatTime(timeLeft)} mins
                </span>
              </span>
            </div>
            <div className="flex-1 flex justify-center items-center border border-gray-300 bg-white text-sm p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
              <span className="font-medium">
                Commands left:{" "}
                <span className="text-green-600">{commandsLeft}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex-grow border border-gray-300 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Command Search
            </h2>
            <SearchBox search={search} setSearch={setSearch} />
          </div>
        </div>
      </main>
    </div>
  );
}
