import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import GrievanceCard from './components/GrievanceCard';
import Navbar from './components/Navbar';
import Sidebar from './components/SearchFilter';

function App() {
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 }); // Start outside screen
  const hoverRadius = 150; // Adjust radius for hover effect

  // Track mouse movement
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Generate dot positions
  const dots = [];
  const gridSpacing = 40;
  for (let y = 0; y < window.innerHeight; y += gridSpacing) {
    for (let x = 0; x < window.innerWidth; x += gridSpacing) {
      dots.push({ x, y });
    }
  }

  return (
    <div
      className="min-h-screen bg-[#0f0f0f] relative text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Grid Background */}
      <div className="absolute inset-0">
        {dots.map((dot, index) => {
          // Calculate distance from mouse position
          const distance = Math.sqrt(
            Math.pow(dot.x - mousePos.x, 2) + Math.pow(dot.y - mousePos.y, 2)
          );

          // Determine dot opacity based on hover effect
          const opacity = Math.min(1, Math.max(0.2, 1 - distance / hoverRadius));
          const reducedOpacity = opacity * 0.3;
          const fillColor = `rgba(255, 255, 255, ${reducedOpacity})`;

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: dot.y,
                left: dot.x,
                width: '4px',
                height: '4px',
                backgroundColor: fillColor,
                borderRadius: '50%',
                transition: 'background-color 0.3s ease, opacity 0.3s ease',
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4">
            <GrievanceCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
