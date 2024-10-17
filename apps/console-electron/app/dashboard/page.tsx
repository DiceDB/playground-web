import Link from 'next/link';

export default function Another() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans">
      <Link href="/">Go back</Link>
      <p>Dashboard Page</p>
    </div>
  );
}
