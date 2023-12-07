import React, { useState, useEffect } from 'react';

interface TextEditorProps {
  onTextChange: (text: string) => void;
  text?: string; 
  placeholderText: string
}

const TextEditor = ({ onTextChange, text, placeholderText } : TextEditorProps) => {
  const [localText, setLocalText] = useState('');

  useEffect(() => {
    if (text !== undefined) {
      setLocalText(text);
    }
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalText(e.target.value);
    onTextChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="text">{placeholderText} : </label>
      <input
        type="text"
        id="text"
        value={localText}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default TextEditor;
