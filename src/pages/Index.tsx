
import React, { useState } from 'react';
import { Upload, Link, Music, Play, Pause, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AudioUploader from "@/components/AudioUploader";
import ChordDisplay from "@/components/ChordDisplay";
import MusicSheetView from "@/components/MusicSheetView";
import AudioPlayer from "@/components/AudioPlayer";

const Index = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chords, setChords] = useState<any[]>([]);
  const [musicSheet, setMusicSheet] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState('upload');
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setAudioFile(file);
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockChords = [
        { time: 0, chord: 'C', duration: 2 },
        { time: 2, chord: 'Am', duration: 2 },
        { time: 4, chord: 'F', duration: 2 },
        { time: 6, chord: 'G', duration: 2 },
        { time: 8, chord: 'C', duration: 2 },
      ];
      setChords(mockChords);
      setIsProcessing(false);
      toast({
        title: "Success!",
        description: "Audio transcribed successfully. Chords and sheet music are ready!",
      });
    }, 3000);
  };

  const handleUrlSubmit = async (url: string) => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }
    
    setAudioUrl(url);
    setIsProcessing(true);
    
    // Simulate URL processing
    setTimeout(() => {
      const mockChords = [
        { time: 0, chord: 'Am', duration: 2 },
        { time: 2, chord: 'F', duration: 2 },
        { time: 4, chord: 'C', duration: 2 },
        { time: 6, chord: 'G', duration: 2 },
      ];
      setChords(mockChords);
      setIsProcessing(false);
      toast({
        title: "Success!",
        description: "Song from URL transcribed successfully!",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Music className="h-12 w-12 text-purple-300 mr-4" />
            <h1 className="text-5xl font-bold text-white">SongTranscribe</h1>
          </div>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Transform any song into playable chords and sheet music using AI. 
            Upload audio files or paste YouTube/Spotify links.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 lg:w-1/2 mx-auto">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload File
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                From URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-8">
              <AudioUploader onFileUpload={handleFileUpload} isProcessing={isProcessing} />
            </TabsContent>

            <TabsContent value="url" className="mt-8">
              <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Link className="h-5 w-5" />
                    Add Song URL
                  </CardTitle>
                  <CardDescription className="text-purple-200">
                    Paste a YouTube or Spotify link to transcribe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="url"
                    placeholder="https://youtube.com/watch?v=... or https://open.spotify.com/track/..."
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                  />
                  <Button 
                    onClick={() => handleUrlSubmit(audioUrl)}
                    disabled={isProcessing}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {isProcessing ? 'Processing...' : 'Transcribe Song'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Audio Player */}
          {(audioFile || audioUrl) && (
            <div className="mb-8">
              <AudioPlayer 
                audioFile={audioFile} 
                audioUrl={audioUrl}
                chords={chords}
              />
            </div>
          )}

          {/* Results */}
          {chords.length > 0 && (
            <Tabs defaultValue="chords" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:w-1/2 mx-auto">
                <TabsTrigger value="chords">Chord Chart</TabsTrigger>
                <TabsTrigger value="sheet">Sheet Music</TabsTrigger>
              </TabsList>

              <TabsContent value="chords">
                <ChordDisplay chords={chords} />
              </TabsContent>

              <TabsContent value="sheet">
                <MusicSheetView chords={chords} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
