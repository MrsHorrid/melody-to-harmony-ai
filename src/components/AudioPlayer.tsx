
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  audioFile: File | null;
  audioUrl: string;
  chords: any[];
}

const AudioPlayer = ({ audioFile, audioUrl, chords }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([80]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState<string>('');

  useEffect(() => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      setAudioSrc(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [audioFile]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [audioSrc]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = value[0] / 100;
    setVolume(value);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getCurrentChord = () => {
    return chords.find(chord => 
      currentTime >= chord.time && currentTime < chord.time + chord.duration
    );
  };

  const currentChord = getCurrentChord();

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardContent className="p-6">
        <audio ref={audioRef} src={audioSrc} />
        
        {/* Current Chord Display */}
        {currentChord && (
          <div className="text-center mb-6">
            <div className="inline-block bg-purple-600 rounded-lg px-6 py-3">
              <span className="text-3xl font-bold text-white">{currentChord.chord}</span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-6">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-purple-200 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button 
            onClick={togglePlayPause}
            size="icon"
            className="h-12 w-12 bg-purple-600 hover:bg-purple-700"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3 max-w-xs mx-auto">
          <Volume2 className="h-4 w-4 text-purple-200" />
          <Slider
            value={volume}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="flex-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
