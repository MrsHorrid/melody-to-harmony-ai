
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
      <div className="flex flex-col items-center space-y-3 sm:space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{chord}</h3>
        <div className="bg-card border-2 border-border rounded-xl p-3 sm:p-4">
          <div className="grid grid-cols-6 gap-1 sm:gap-2">
            {diagram.map((fret, index) => (
              <div 
                key={index}
                className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-mono bg-accent rounded-lg text-foreground font-bold"
              >
                {fret}
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground mt-2 sm:mt-3 text-center font-medium tracking-wider">
            E A D G B E
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-3 text-xl sm:text-2xl">
          <Music className="h-5 w-5 sm:h-6 sm:w-6" />
          Chord Progression
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 sm:space-y-12">
        {/* Timeline View */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Timeline</h3>
          <div className="space-y-2 sm:space-y-3">
            {chords.map((chord, index) => (
              <div 
                key={index}
                className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 p-3 sm:p-4 bg-accent border border-border rounded-lg hover:bg-accent/80 transition-colors"
              >
                <div className="text-xs sm:text-sm text-muted-foreground font-mono min-w-[80px] font-medium">
                  {Math.floor(chord.time / 60)}:{(chord.time % 60).toFixed(0).padStart(2, '0')}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-foreground">
                  {chord.chord}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  ({chord.duration}s)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chord Diagrams */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Guitar Chords</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {Array.from(new Set(chords.map(c => c.chord))).map((chord) => (
              <div key={chord} className="hover:scale-105 transition-transform">
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
