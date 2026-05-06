import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Blog from './pages/Blog';
import Tools from './pages/Tools';
import VoiceToText from './pages/Tools/VoiceToText';
import InstagramTranscript from './pages/Tools/InstagramTranscript';
import BaseTransmuter from './pages/Tools/BaseTransmuter';
import CompoundingEngine from './pages/Tools/CompoundingEngine';
import JsonToTs from './pages/Tools/JsonToTs';
import KeywordDensity from './pages/Tools/KeywordDensity';
import GlassmorphismGen from './pages/Tools/GlassmorphismGen';
import TaxLogic from './pages/Tools/TaxLogic';
import SipForecaster from './pages/Tools/SipForecaster';
import QrExtractor from './pages/Tools/QrExtractor';
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
          <Route path="tools/base-transmuter" element={<BaseTransmuter />} />
          <Route path="tools/compounding-engine" element={<CompoundingEngine />} />
          <Route path="tools/json-to-ts" element={<JsonToTs />} />
          <Route path="tools/keyword-density" element={<KeywordDensity />} />
          <Route path="tools/glassmorphism-gen" element={<GlassmorphismGen />} />
          <Route path="tools/tax-logic" element={<TaxLogic />} />
          <Route path="tools/sip-forecaster" element={<SipForecaster />} />
          <Route path="tools/qr-extractor" element={<QrExtractor />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
