export default function Navbar() {
    return (
      <nav className="bg-white shadow">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-blue-600">Domain Name Generator</a>
          <div>
            <a 
              href="https://github.com/yourusername/domain-generator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>
    );
  }