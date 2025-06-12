
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
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8">
            <div className="p-3 sm:p-4 rounded-2xl bg-card border-2 border-border mb-4 sm:mb-0 sm:mr-6">
              <Music className="h-8 w-8 sm:h-12 sm:w-12 text-foreground" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              SongTranscribe
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Transform any song into playable chords and sheet music using AI. 
            Upload audio files or paste YouTube/Spotify links for instant transcription.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-8 sm:mb-12">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-10 sm:h-12">
              <TabsTrigger value="upload" className="flex items-center gap-2 text-sm sm:text-base">
                <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Upload File</span>
                <span className="xs:hidden">Upload</span>
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2 text-sm sm:text-base">
                <Link className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">From URL</span>
                <span className="xs:hidden">URL</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-8 sm:mt-12">
              <AudioUploader onFileUpload={handleFileUpload} isProcessing={isProcessing} />
            </TabsContent>

            <TabsContent value="url" className="mt-8 sm:mt-12">
              <Card className="max-w-2xl mx-auto border-2">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="flex items-center justify-center gap-3 text-xl sm:text-2xl">
                    <Link className="h-5 w-5 sm:h-6 sm:w-6" />
                    Add Song URL
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Paste a YouTube or Spotify link to transcribe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <Input
                    type="url"
                    placeholder="https://youtube.com/watch?v=... or https://open.spotify.com/track/..."
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    className="h-10 sm:h-12 text-sm sm:text-base"
                  />
                  <Button 
                    onClick={() => handleUrlSubmit(audioUrl)}
                    disabled={isProcessing}
                    className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
                    size="lg"
                  >
                    {isProcessing ? 'Processing...' : 'Transcribe Song'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Audio Player */}
          {(audioFile || audioUrl) && (
            <div className="mb-8 sm:mb-12">
              <AudioPlayer 
                audioFile={audioFile} 
                audioUrl={audioUrl}
                chords={chords}
              />
            </div>
          )}

          {/* Results */}
          {chords.length > 0 && (
            <Tabs defaultValue="chords" className="space-y-6 sm:space-y-8">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-10 sm:h-12">
                <TabsTrigger value="chords" className="text-sm sm:text-base">Chord Chart</TabsTrigger>
                <TabsTrigger value="sheet" className="text-sm sm:text-base">Sheet Music</TabsTrigger>
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
