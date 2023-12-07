import React, { useState, ChangeEvent } from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import TextEditor from '../TextEditor/TextEditor';
import OutputArea from '../OutputArea/OutputArea';
import './ImageEditor.css';

interface ImageEditorProps {
  onImageChange: (url: string) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ onImageChange }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [textTop, setTextTop] = useState<string>('');
  const [textBottom, setTextBottom] = useState<string>('');
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [mirror, setMirror] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [crop, setCrop] = useState<Area>({ x: 0, y: 0, width: 1, height: 1 });
  const [zoom, setZoom] = useState<number>(1);

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newImageUrl = e.target.value;
    setImageUrl(newImageUrl);
    onImageChange(newImageUrl);
  };

  const handleMirrorChange = () => {
    setMirror((prevMirror) => !prevMirror);
  
    const container = document.getElementsByClassName('reactEasyCrop_Container')[0];
  
    mirror ? container.classList.remove("is-mirrored") : container.classList.add("is-mirrored");
  };

  const handleTextColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextColor(e.target.value);
  };

  const handleRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newRotation = parseInt(e.target.value, 10);

    if (!isNaN(newRotation)) {
      if (newRotation !== rotation) {
        setRotation(newRotation);
      }
    }

    if(isNaN(newRotation)) {
      setRotation(0);
    }
  };

  const handleTextTopChange = (newTextTop: string) => {
    setTextTop(newTextTop);
  };

  const handleTextBottomChange = (newTextBottom: string) => {
    setTextBottom(newTextBottom);
  };

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

  return (
    <div className='css--main-app'>
      <div className='css--main-app_image-viewer'>
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
        <p className='css--main-app_text-viewer-top' style={{ color: textColor }}>{textTop}</p>
        <p className='css--main-app_text-viewer-bottom' style={{ color: textColor }}>{textBottom}</p>
      </div>
      <div className='css--main-app_inputs'>
        <div className='css--main-app_inputs_imgurl'>
          <label htmlFor="imageUrl">Enter Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={handleImageInputChange}
          />
        </div>

        {/* We want to hide the form for inputs until the image has been loaded in */}
        {imageUrl && (
          <>
            <div className='css--main-app_inputs_rotation'>
              <label htmlFor="rotation">Rotation:</label>
              <input
                type="text"
                id="rotation"
                value={rotation}
                onChange={handleRotationChange}
                pattern="[0-9]*"
              />
            </div>

            <div className='css--main-app_inputs_mirror'>
              <label>
                Mirror Image : 
                <input type="checkbox" onChange={handleMirrorChange} />
              </label>
            </div>

            <TextEditor onTextChange={handleTextTopChange} text={textTop} placeholderText="Enter Top Text" />
            <TextEditor onTextChange={handleTextBottomChange} text={textBottom}  placeholderText="Enter Bottom Text" />

            <div className='css--main-app_inputs_text-color'>
              <label htmlFor="textColor">Text Color:</label>
              <input
                type="color"
                id="textColor"
                value={textColor}
                onChange={handleTextColorChange}
              />
            </div>
            <OutputArea crop={crop} rotation={rotation} />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;
