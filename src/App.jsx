import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParticlesBg from './components/ParticlesBg'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import About from './pages/About'

function AnimatedRoutes({ setActiveSection }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><Home setActiveSection={setActiveSection} /></PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition><Projects /></PageTransition>
        } />
        <Route path="/projects/:slug" element={
          <PageTransition><ProjectDetail /></PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition><Contact /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition><About /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('intro')

  return (
    <BrowserRouter>
      <ParticlesBg />
      <Navbar activeSection={activeSection} />
      <main>
        <AnimatedRoutes setActiveSection={setActiveSection} />
      </main>
      <Footer />
    </BrowserRouter>
  )
}