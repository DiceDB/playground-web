import { Button } from '@dicedb/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="lg">DiceDB</h1>
        <img
          width={48}
          height={48}
          src="https://avatars.githubusercontent.com/u/112580013?s=48&v=4"
          alt="logo"
        />
        <Button variant="default">
          <Link href="/dashboard">Home</Link>
        </Button>
      </main>
    </div>
  );
}
