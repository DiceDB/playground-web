"use client";

import Image from "next/image";
import React, { useState,useRef, useEffect } from "react";
import Cli from "@/components/CLI/CLI";
import SearchBox from "@/components/Search/SearchBox";
import { Dice1, Dice3, Dice5, Clock, Command } from "lucide-react";

import { formatTime } from "@/shared/utils/commonUtils";
import Link from "next/link";



const NavBar = () => (
  <nav className="shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Image
            src="https://dicedb.io/dicedb-logo-light.png"
            width={80}
            height={80}
            alt="DiceDB logo"
            className="object-contain"
          />
          <h2 className="font-light text-2xl ml-2">PlayGround</h2>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="https://dicedb.io/get-started/installation/" className="px-3 py-2 rounded-md text-sm font-medium">Docs</Link>
          <Link href="https://dicedb.io/blog/" className="px-3 py-2 rounded-md text-sm font-medium">Blogs</Link>
          <Link href="https://github.com/dicedb/dice" className="px-3 py-2 rounded-md text-sm font-medium">GitHub</Link>
        </div>
      </div>
    </div>
  </nav>
);

export default function Playground() {
  const [search, setSearch] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [commandsLeft, setCommandsLeft] = useState<number>(1000);
  const cliCodeRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const decreaseCommandsLeft = () => {
    setCommandsLeft((prev) => (prev > 0 ? prev - 1 : 0));
  };


  return (
      <div className="container mx-auto flex flex-col flex-grow min-h-screen bg-white text-gray-900 line-height-[1.5rem]">
          <NavBar   />
          <div className="container mx-auto px-4 py-8"> 
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
            <div className="space-y-4">
              <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center">
                 
                  <div className="flex space-x-2">
                    <Dice5 className="w-4 h-4 text-red-500" />
                    <Dice1 className="w-4 h-4 text-yellow-500" />
                    <Dice3 className="w-4 h-4 text-green-500" />
                  </div>
                </div>
               
                <div ref={cliCodeRef} className="h-80 bg-gray-900">
                  <Cli decreaseCommandsLeft={decreaseCommandsLeft} />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[48%] border border-gray-300 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="text-red-600 dark:text-red-700" />
                    <span className="font-semibold">Cleanup in:</span>
                  </div>
                  <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
                  <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-red-600 dark:bg-red-700 h-2 rounded-full"
                      style={{ width: `${(timeLeft / (15 * 60)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-[48%] border border-gray-300 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Command className="text-green-600 dark:text-green-600" />
                    <span className="font-semibold">Commands left:</span>
                  </div>
                  <div className="text-2xl font-bold">{commandsLeft}</div>
                  <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 dark:bg-green-600 h-2 rounded-full"
                      style={{ width: `${(commandsLeft / 1000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 flex flex-col">
        
          <div className="flex-grow border border-gray-400 bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <SearchBox search={search} setSearch={setSearch} />
          </div>
   
            
            </div>
          </main>
      </div>
      </div>
  );
}
