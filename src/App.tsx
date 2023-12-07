// App.tsx
import React from 'react';
import ImageEditor from './components/ImageEditor/ImageEditor';
import './App.css'

const App: React.FC = () => {
  const handleImageChange = (url: string) => {
    // Handle image changes if needed
  };

  return (
    <div className='App'>
      <h1>Meme Generator</h1>
      <ImageEditor onImageChange={handleImageChange} />
    </div>
  );
};

export default App;
