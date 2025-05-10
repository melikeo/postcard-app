import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { usePostcardStore } from '../stores/postcardStore';

type MyDropzoneProps = {
  onFilesDrop?: (files: File[]) => void
  isGrayscale?: boolean
}

export default function MyDropzone({ onFilesDrop }: MyDropzoneProps) {
  const uploadedImage = usePostcardStore(state => state.uploadedImage);
  const isGrayscale = usePostcardStore(state => state.isGrayscale);
  const setImage = usePostcardStore(state => state.setImage);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (onFilesDrop) {
      onFilesDrop(acceptedFiles)
    }

    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const isVertical = img.height > img.width;

        if (isVertical) {
          canvas.width = img.height;
          canvas.height = img.width;
          ctx?.translate(canvas.width / 2, canvas.height / 2);
          ctx?.rotate(-90 * Math.PI / 180);
          ctx?.drawImage(img, -img.width / 2, -img.height / 2);
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
        }

        const rotatedImage = canvas.toDataURL('image/jpeg');
        setImage(rotatedImage);
      }
    }

  if (file) {
    reader.readAsDataURL(file); // read image
  }
}, [onFilesDrop]);

const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
  onDrop,
  accept: { "image/*": [".jpeg", ".png", ".jpg"] },
  multiple: false,
  //maxSize
});

return (
  <div
    {...getRootProps()}
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

    {uploadedImage && (
      <div className="mt-4">
        <p className="font-playfair-display text-lg mb-2">Preview:</p>
        <img
          src={uploadedImage}
          alt="Preview"
          style={{
            filter: isGrayscale ? "grayscale(100%)" : "none"
          }}
          className="max-w-full h-auto mx-auto" />
      </div>
    )}
  </div>
);
}