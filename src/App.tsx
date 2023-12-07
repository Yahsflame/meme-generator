// App.tsx
import React from 'react';
import ImageEditor from './components/ImageEditor/ImageEditor';
import './App.css'

const App: React.FC = () => {
  return (
    <div className='App'>
      <h1>Meme Generator</h1>
      <ImageEditor />
    </div>
  );
};

export default App;
