// ImageEditor.tsx
import React, { useState, ChangeEvent } from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import TextEditor from './TextEditor';
import OutputArea from './OutputArea';

interface ImageEditorProps {
  onImageChange: (url: string) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ onImageChange }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [crop, setCrop] = useState<Area>({ x: 0, y: 0, width: 1, height: 1 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [textTop, setTextTop] = useState<string>(''); // Initialize with an empty string
  const [textBottom, setTextBottom] = useState<string>(''); // Initialize with an empty string

  const onCropChange = (newCrop: Point) => {
    setCrop((prevCrop) => ({
      ...prevCrop,
      x: newCrop.x,
      y: newCrop.y,
    }));
  };

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newImageUrl = e.target.value;
    setImageUrl(newImageUrl);
    onImageChange(newImageUrl);
  };

  const handleRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newRotation = parseInt(e.target.value, 10);
    setRotation(newRotation);
  };

  const handleTextTopChange = (newTextTop: string) => {
    setTextTop(newTextTop);
  };

  const handleTextBottomChange = (newTextBottom: string) => {
    setTextBottom(newTextBottom);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ width: '400px', height: '400px', position: 'relative', overflow: 'hidden' }}>
        {imageUrl && (
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
          />
        )}
        <p style={{ position: 'absolute', top: 10, left: 10, color: 'white' }}>{textTop}</p>
        <p style={{ position: 'absolute', bottom: 10, right: 10, color: 'white' }}>{textBottom}</p>
      </div>
      <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <label htmlFor="imageUrl">Enter Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={handleImageInputChange}
        />
        <label htmlFor="rotation">Rotation:</label>
        <input
          type="number"
          id="rotation"
          value={rotation}
          onChange={handleRotationChange}
        />
        <OutputArea crop={crop} rotation={rotation} />
        <TextEditor onTextChange={handleTextTopChange} text={textTop} placeholderText="Enter Top Text" />
        <TextEditor onTextChange={handleTextBottomChange} text={textBottom}  placeholderText="Enter Bottom Text" />
      </div>
    </div>
  );
};

export default ImageEditor;
