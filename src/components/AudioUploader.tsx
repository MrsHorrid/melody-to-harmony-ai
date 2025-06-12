
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Music, Loader2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface AudioUploaderProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

const AudioUploader = ({ onFileUpload, isProcessing }: AudioUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.flac', '.aac']
    },
    multiple: false
  });

  if (isProcessing) {
    return (
      <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-12 text-center">
          <Loader2 className="h-16 w-16 text-purple-300 mx-auto mb-6 animate-spin" />
          <h3 className="text-2xl font-semibold text-white mb-2">
            Transcribing Your Song...
          </h3>
          <p className="text-purple-200">
            Our AI is analyzing the audio and extracting chords and melodies. This may take a few moments.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border-white/20">
      <CardContent className="p-12">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
            ${isDragActive 
              ? 'border-purple-400 bg-purple-500/20' 
              : 'border-purple-300 hover:border-purple-400 hover:bg-purple-500/10'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            {isDragActive ? (
              <Upload className="h-16 w-16 text-purple-300 mx-auto animate-bounce" />
            ) : (
              <Music className="h-16 w-16 text-purple-300 mx-auto" />
            )}
            
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                {isDragActive ? 'Drop your audio file here' : 'Upload Audio File'}
              </h3>
              <p className="text-purple-200 mb-4">
                {isDragActive 
                  ? 'Release to upload your song'
                  : 'Drag & drop your audio file here, or click to browse'
                }
              </p>
              <p className="text-sm text-purple-300">
                Supports MP3, WAV, M4A, FLAC, AAC
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioUploader;
