'use client';

import SearchBox from '@/components/Search/SearchBox';
import { TerminalUI } from './TerminalUI';

export default function Playground() {
  return (
    <div className="container mx-auto flex flex-col flex-grow min-h-screen bg-white text-gray-900">
      <main className="flex flex-col lg:flex-row gap-10 flex-grow overflow-hidden px-4 h-full">
        <div className="w-full lg:w-7/12 flex flex-col h-full">
          <div className="flex-grow">
            <TerminalUI />
          </div>
        </div>
        <div className="w-full lg:w-5/12 flex flex-col h-full">
          <div className="flex-grow border border-gray-400 bg-gray-100 rounded-lg shadow-md">
            <SearchBox />
          </div>
        </div>
      </main>
    </div>
  );
}
