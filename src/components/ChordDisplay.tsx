
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from 'lucide-react';

interface Chord {
  time: number;
  chord: string;
  duration: number;
}

interface ChordDisplayProps {
  chords: Chord[];
}

const ChordDisplay = ({ chords }: ChordDisplayProps) => {
  const chordDiagrams: { [key: string]: string[] } = {
    'C': ['X', '3', '2', '0', '1', '0'],
    'Am': ['X', '0', '2', '2', '1', '0'],
    'F': ['1', '3', '3', '2', '1', '1'],
    'G': ['3', '2', '0', '0', '3', '3'],
    'Dm': ['X', 'X', '0', '2', '3', '1'],
    'Em': ['0', '2', '2', '0', '0', '0'],
  };

  const renderChordDiagram = (chord: string) => {
    const diagram = chordDiagrams[chord] || ['?', '?', '?', '?', '?', '?'];
    
    return (
      <div className="flex flex-col items-center space-y-2">
        <h3 className="text-2xl font-bold text-white">{chord}</h3>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="grid grid-cols-6 gap-1">
            {diagram.map((fret, index) => (
              <div 
                key={index}
                className="w-6 h-6 flex items-center justify-center text-xs font-mono bg-white/30 rounded text-white"
              >
                {fret}
              </div>
            ))}
          </div>
          <div className="text-xs text-purple-200 mt-1 text-center">
            E A D G B E
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Music className="h-5 w-5" />
          Chord Progression
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Timeline View */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
          <div className="space-y-2">
            {chords.map((chord, index) => (
              <div 
                key={index}
                className="flex items-center space-x-4 p-3 bg-white/10 rounded-lg"
              >
                <div className="text-sm text-purple-200 font-mono min-w-[60px]">
                  {Math.floor(chord.time / 60)}:{(chord.time % 60).toFixed(0).padStart(2, '0')}
                </div>
                <div className="text-xl font-bold text-white">
                  {chord.chord}
                </div>
                <div className="text-sm text-purple-300">
                  ({chord.duration}s)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chord Diagrams */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Guitar Chords</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from(new Set(chords.map(c => c.chord))).map((chord) => (
              <div key={chord}>
                {renderChordDiagram(chord)}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChordDisplay;
