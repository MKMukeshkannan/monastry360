'use client';

import dynamic from 'next/dynamic';

const BuddhaViewer = dynamic(
  () => import('@/components/ModelViewer').then((mod) => mod.ModelViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
        <p className="text-white text-lg">Loading Buddha Model...</p>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <main className="h-screen w-screen bg-gray-100 dark:bg-gray-900">
      <BuddhaViewer />
    </main>
  );
}
