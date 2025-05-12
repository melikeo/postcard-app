import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { usePostcardStore } from '../stores/postcardStore';
import { processImage } from '../utils/imageEdit';
import heic2any from 'heic2any';

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


  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    let file = acceptedFiles[0];
    if (!file) return;

    try {
      if (file.type === "image/heic" || file.type === "image/heif" || file.name.toLowerCase().endsWith(".heic")) {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        });

        file = new File(
          [convertedBlob as Blob],
          file.name.replace(/\.heic$/, ".jpg"),
          { type: "image/jpeg", }
        );
      }

      //const blobUrl = URL.createObjectURL(file);
      //setProcessedImage(blobUrl);

      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        const processed = await processImage(dataUrl, isGrayscale);
        setImage(dataUrl); // save image (as Base64)
        setProcessedImage(processed);
      };
      reader.readAsDataURL(file);

      if (onFilesDrop) onFilesDrop([file]);
    } catch (error) {
      console.error("Converting failed: ", error);
      alert("This image format cannot be processed.");
    }
  }, [onFilesDrop, isGrayscale, setImage]);

  const { getRootProps, getInputProps, isDragActive, fileRejections, open } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg'],
      'image/png': ['.png'],
      'image/heic': ['.heic'],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024,
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
        <p className="font-playfair-display">Drop here ...</p>
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
          {fileRejections.some(rej => rej.errors.some(e => e.code === "file-too-large"))
            ? "File is too large (max. 10MB)."
            : "Wrong file type! - only images accepted"}
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