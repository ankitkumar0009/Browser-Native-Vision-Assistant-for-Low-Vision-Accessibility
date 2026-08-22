import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import VisionAssistant from './pages/VisionAssistant';
import LiveVision from './pages/LiveVision';
import Settings from './pages/Settings';
import About from './pages/About';
import KeyboardHelp from './components/A11y/KeyboardHelp';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Header />
        <main id="main-content" className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assistant" element={<VisionAssistant />} />
            <Route path="/live" element={<LiveVision />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <KeyboardHelp />
      </div>
    </Router>
  );
}

export default App;
