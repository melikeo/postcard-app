import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { usePostcardStore } from '../stores/postcardStore';
import { processImage } from '../utils/imageEdit';

type MyDropzoneProps = {
  onFilesDrop?: (files: File[]) => void
  isGrayscale?: boolean
}

export default function MyDropzone({ onFilesDrop }: MyDropzoneProps) {
  const uploadedImage = usePostcardStore(state => state.uploadedImage);
  const isGrayscale = usePostcardStore(state => state.isGrayscale);
  const setImage = usePostcardStore(state => state.setImage);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!uploadedImage) return;
    processImage(uploadedImage, isGrayscale).then(setProcessedImage);
  }, [uploadedImage, isGrayscale]);


  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (onFilesDrop) {
      onFilesDrop(acceptedFiles)
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string); // save image (as Base64)
    }

    if (file) {
      reader.readAsDataURL(file); // read image
    }
  }, [onFilesDrop, isGrayscale]);

  const { getRootProps, getInputProps, isDragActive, fileRejections, open } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [ '.jpeg' ],      
      'image/jpg': [ '.jpg' ],
      'image/png': []
    },
    multiple: false,
    //maxSize
    noClick: true
  });

  return (
    <div
      {...getRootProps()}
      onClick={open}
      className={`  w-11/12 max-w-md p-10 mx-auto
        border-2 border-dashed rounded-lg text-center cursor-pointer 
        transition-colors
        border-gray-300 bg-gray-50
        hover:bg-gray-200 hover:border-primary
        focus:outline-none
        mb-5
        ${isDragActive ? "border-blue-500 bg-blue-50" : ""}
        ${fileRejections.length > 0 ? "border-red-500" : ""}
      `}

    >
      <input {...getInputProps()} />

      {!uploadedImage && (
        <UploadFileIcon sx={{ fontSize: 50 }} className="mb-5" />
      )}

      {isDragActive ? (
        <p>Drop here ...</p>
      ) : uploadedImage ? (
        <p>
          <span className="font-playfair-display text-lg font-semibold">Upload success! <br /> </span>
          <span className="font-playfair-display text-lg">Click or Drag & Drop to change Image.</span>
        </p>
      ) : (
        <p>
          <span className="font-playfair-display text-lg font-semibold">Choose a File </span>
          <span className="font-playfair-display text-lg">or Drag & Drop</span>
        </p>
      )}

      {fileRejections.length > 0 && (
        <p className="font-playfair-display text-red-500 mt-2">
          Wrong file type! - only images accepted
        </p>
      )}

      {processedImage && (
        <div className="mt-4">
          <p className="font-playfair-display text-lg mb-2">Preview:</p>
          <img
            src={processedImage}
            alt="Preview"

            className="max-w-full h-auto mx-auto" />
        </div>
      )}
    </div>
  );
}