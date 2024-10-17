'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { DiceCmds, DiceCmdMeta } from '@/data/command';
import CommandPage from './CommandPage';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const filteredCommands = useMemo(
    () =>
      Object.values(DiceCmds).filter((cmd: DiceCmdMeta) =>
        cmd.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center bg-gray-200 border border-gray-200 rounded px-2">
        <Search className="text-gray-900 mr-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search commands..."
          className="bg-transparent border-none outline-none w-full py-2 text-gray-900 font-assistant"
        />
      </div>
      <div className="mt-4 flex-grow overflow-y-auto max-h-[600px] bg-gray-50 rounded-lg">
        <div className="space-y-4 p-4">
          {search.length > 1 ? (
            filteredCommands.map((cmdMeta) => (
              <CommandPage
                key={cmdMeta.title}
                title={cmdMeta.title}
                syntax={cmdMeta.syntax}
                body={cmdMeta.body}
                url={cmdMeta.url}
              />
            ))
          ) : (
            <div className="flex items-center justify-center  md:h-[30rem] ">
              Type at least 2 characters to search commands...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
