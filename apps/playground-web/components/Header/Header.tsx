import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';

async function fetchStars(): Promise<string> {
  const formatNumber = (num: number): string =>
    num >= 1000
      ? (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + 'k'
      : num.toString();

  try {
    const response = await fetch('https://api.github.com/repos/dicedb/dice', {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch repository data');
    }
    const data = await response.json();
    return formatNumber(data.stargazers_count);
  } catch (err) {
    console.error('Error fetching GitHub stars:', err);
    return '0';
  }
}

export default async function Header() {
  const stars = await fetchStars();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://dicedb.io/dicedb-logo-light.png"
              width={110}
              height={110}
              priority
              alt="DiceDB logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-xl font-semibold">PlayGround</span>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="https://dicedb.io/get-started/installation/"
            className="text-md font-medium hover:underline"
          >
            Docs
          </Link>
          <Link
            href="https://dicedb.io/blog/"
            className="text-md font-medium hover:underline"
          >
            Blog
          </Link>
          <Link
            href="https://github.com/dicedb/dice"
            className="inline-flex items-center space-x-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
            <span className="text-sm font-medium">{stars}</span>
          </Link>
          <Link
            href="https://dicedb.io/get-started/installation/"
            className="inline-flex items-center justify-center gap-2 py-2 p-3 text-base font-medium text-white transition-all duration-300 ease-in-out bg-[#e60000] hover:bg-[#cc0000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e60000] focus:ring-offset-2 shadow-md hover:shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
