"use client";

import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null); // Keep track of the selected file
  const [content, setContent] = useState<string | ArrayBuffer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // Set the selected file
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result;

        if (typeof result === 'string') {
          setContent(result);
          setError(null); // Clear previous error
        } else {
          setContent(null);
          setError('File content is not readable.');
        }
      };

      reader.readAsText(selectedFile); // Read as text
    }
  };
  const handleUpload = async () => {
    if (!file) return; // Ensure there's a file to upload
  
    setUploading(true);
    setError(null);
  
    const formData = new FormData();
    formData.append('file', file); // Append the selected file
  
    try {
      const response = await fetch('/api/getpath', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('File upload failed');
      }
  
      const result = await response.json();
      console.log('Upload response:', result);
      // Handle success response if needed
    } catch (err) {
      // Type assertion to safely access error message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred'); // Fallback for non-Error instances
      }
    } finally {
      setUploading(false);
      setFile(null); // Clear file after upload
    }
  };
  
  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {content && (
        <div>
          <h3>File Content:</h3>
          <pre>{content.toString()}</pre>
        </div>
      )}
      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
    </div>
  );
};

export default FileUpload;



// "use client"

// import { useState } from 'react';

// export default function HomePage() {
//     const [filePath, setFilePath] = useState<string>('');
//     const [content, setContent] = useState<string | null>(null);
//     const [error, setError] = useState<string | null>(null);
    
//     const fetchFileContent = async () => {
//         if (!filePath) {
//             setError('Please enter a file path.');
//             return;
//         }

//         try {
//             const response = await fetch(`/api/getpath?filePath=${filePath}`);
         

//             const data = await response.json();
//             console.log(data)
//             if (data.error) {
//                 setError(data.error);
//             } else {
//                 setContent(data.content);
//                 setError(null); // Clear any previous errors
//             }
//         } catch (err) {
//             const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
//             setError(errorMessage);
//         }
//     };

//     return (
//         <div>
//             <h1>File Content</h1>
//             <input 
//                 type="text" 
//                 value={filePath} 
//                 onChange={(e) => setFilePath(e.target.value)} 
//                 placeholder="Enter file path" 
//                 style={{ width: '100%', marginBottom: '10px' }}
//             />
//             <button onClick={fetchFileContent}>Fetch File</button>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {content ? (
//                 <pre>{content}</pre>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// }
