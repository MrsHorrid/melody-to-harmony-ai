
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileMusic, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Chord {
  time: number;
  chord: string;
  duration: number;
}

interface MusicSheetViewProps {
  chords: Chord[];
}

const MusicSheetView = ({ chords }: MusicSheetViewProps) => {
  const renderStaff = () => {
    return (
      <div className="relative">
        {/* Staff lines */}
        <div className="space-y-3 sm:space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-0.5 bg-foreground w-full"></div>
          ))}
        </div>
        
        {/* Chord symbols above staff */}
        <div className="absolute -top-8 sm:-top-12 left-0 right-0 flex justify-between">
          {chords.slice(0, 4).map((chord, index) => (
            <div key={index} className="text-foreground font-bold text-lg sm:text-xl">
              {chord.chord}
            </div>
          ))}
        </div>

        {/* Note representations */}
        <div className="absolute inset-0 flex justify-between items-center">
          {chords.slice(0, 4).map((chord, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Whole note representation */}
              <div className="w-4 h-3 sm:w-5 sm:h-4 bg-foreground rounded-full border-2 border-background"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <CardTitle className="text-foreground flex items-center gap-3 text-xl sm:text-2xl">
            <FileMusic className="h-5 w-5 sm:h-6 sm:w-6" />
            Sheet Music
          </CardTitle>
          <Button variant="outline" size="lg" className="text-sm sm:text-base w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 sm:space-y-10">
        {/* Key Signature */}
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3">Key of C Major</h3>
          <p className="text-muted-foreground text-sm sm:text-base">4/4 Time Signature</p>
        </div>

        {/* Staff */}
        <div className="bg-card border-2 border-border p-6 sm:p-8 lg:p-12 rounded-xl overflow-x-auto">
          {renderStaff()}
        </div>

        {/* Chord Progression Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {chords.map((chord, index) => (
            <div key={index} className="text-center p-4 sm:p-6 bg-accent border border-border rounded-xl hover:bg-accent/80 transition-colors">
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">{chord.chord}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Bar {index + 1}</div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center p-4 sm:p-6 bg-muted border border-border rounded-xl">
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            🎵 This is a simplified chord representation. For detailed notation with melody lines, 
            consider exporting to music notation software like MuseScore or Sibelius.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicSheetView;
