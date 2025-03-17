import DomainGenerator from './components/DomainGenerator';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
          Domain Name Generator
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Generate unique domain names powered by AI
        </p>
        <DomainGenerator />
      </div>
    </main>
  );
}