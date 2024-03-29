import { Area } from 'react-easy-crop/types';

interface OutputAreaProps {
  crop: Area;
  rotation: number;
}

const OutputArea = ({ crop, rotation } : OutputAreaProps) => {
  return (
    <div>
      <h3>Live Output:</h3>
      <p>Crop: {JSON.stringify(crop)}</p>
      <p>Rotation: {rotation}</p>
    </div>
  );
};

export default OutputArea;
