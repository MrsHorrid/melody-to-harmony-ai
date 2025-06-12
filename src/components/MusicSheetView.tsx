
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
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-0.5 bg-gray-400 w-full"></div>
          ))}
        </div>
        
        {/* Chord symbols above staff */}
        <div className="absolute -top-8 left-0 right-0 flex justify-between">
          {chords.slice(0, 4).map((chord, index) => (
            <div key={index} className="text-white font-bold text-lg">
              {chord.chord}
            </div>
          ))}
        </div>

        {/* Note representations */}
        <div className="absolute inset-0 flex justify-between items-center">
          {chords.slice(0, 4).map((chord, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Whole note representation */}
              <div className="w-4 h-3 bg-white rounded-full border-2 border-gray-800"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <FileMusic className="h-5 w-5" />
            Sheet Music
          </CardTitle>
          <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Key Signature */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Key of C Major</h3>
          <p className="text-purple-200 text-sm">4/4 Time Signature</p>
        </div>

        {/* Staff */}
        <div className="bg-white p-8 rounded-lg">
          {renderStaff()}
        </div>

        {/* Chord Progression Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chords.map((chord, index) => (
            <div key={index} className="text-center p-4 bg-white/10 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">{chord.chord}</div>
              <div className="text-sm text-purple-200">Bar {index + 1}</div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center p-4 bg-purple-600/20 rounded-lg">
          <p className="text-purple-200 text-sm">
            🎵 This is a simplified chord representation. For detailed notation with melody lines, 
            consider exporting to music notation software like MuseScore or Sibelius.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicSheetView;
