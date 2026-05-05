import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Blog from './pages/Blog';
import Tools from './pages/Tools';
import VoiceToText from './pages/Tools/VoiceToText';
import InstagramTranscript from './pages/Tools/InstagramTranscript';
import Pricing from './pages/Pricing';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="blog" element={<Blog />} />
          <Route path="tools" element={<Tools />} />
          <Route path="tools/voice-to-text" element={<VoiceToText />} />
          <Route path="tools/instagram-transcript" element={<InstagramTranscript />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
