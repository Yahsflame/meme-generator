// App.tsx
import React from 'react';
import ImageEditor from './ImageEditor';

const App: React.FC = () => {
  const handleImageChange = (url: string) => {
    // Handle image changes if needed
  };

  return (
    <div>
      <h1>Meme Generator</h1>
      <ImageEditor onImageChange={handleImageChange} />
    </div>
  );
};

export default App;
