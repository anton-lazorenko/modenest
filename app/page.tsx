import Hero from './components/Hero'
import LatestCollection from './components/LatestCollection';

export default function Home() {
  return (
    <main className="min-w-lg flex flex-col items-start justify-center">
      <Hero />
      <LatestCollection />
    </main>
  );
}