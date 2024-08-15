import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Manager from './components/Manager';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Manager />
      </main>
      <Footer />
    </div>
  );
}

export default App;