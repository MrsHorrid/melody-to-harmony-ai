
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
      <Card className="max-w-2xl mx-auto border-2">
        <CardContent className="p-8 sm:p-12 lg:p-16 text-center">
          <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 text-foreground mx-auto mb-6 sm:mb-8 animate-spin" />
          <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
            Transcribing Your Song...
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg">
            Our AI is analyzing the audio and extracting chords and melodies. This may take a few moments.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto border-2">
      <CardContent className="p-6 sm:p-12 lg:p-16">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 sm:p-12 lg:p-16 text-center cursor-pointer transition-all duration-200
            ${isDragActive 
              ? 'border-foreground bg-accent scale-[1.02]' 
              : 'border-border hover:border-foreground hover:bg-accent/50'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="space-y-4 sm:space-y-6">
            {isDragActive ? (
              <Upload className="h-16 w-16 sm:h-20 sm:w-20 text-foreground mx-auto animate-bounce" />
            ) : (
              <Music className="h-16 w-16 sm:h-20 sm:w-20 text-foreground mx-auto" />
            )}
            
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
                {isDragActive ? 'Drop your audio file here' : 'Upload Audio File'}
              </h3>
              <p className="text-muted-foreground mb-4 sm:mb-6 text-base sm:text-lg px-4">
                {isDragActive 
                  ? 'Release to upload your song'
                  : 'Drag & drop your audio file here, or click to browse'
                }
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
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
