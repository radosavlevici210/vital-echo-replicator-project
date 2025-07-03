import { useState } from "react";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "./AudioPlayer";

interface FloatingPlayerProps {
  toneName: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const FloatingPlayer = ({ toneName, isPlaying, onTogglePlay, onClose }: FloatingPlayerProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        left: position.x,
        top: position.y,
        transform: isMinimized ? 'scale(0.8)' : 'scale(1)',
      }}
    >
      <div className="glass-effect border border-border-light rounded-lg shadow-lg backdrop-blur-md">
        {/* Header */}
        <div
          className="flex items-center justify-between p-3 border-b border-border-light cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">Now Playing</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 h-6 w-6 text-text-secondary hover:text-foreground"
            >
              {isMinimized ? (
                <Maximize2 className="w-3 h-3" />
              ) : (
                <Minimize2 className="w-3 h-3" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1 h-6 w-6 text-text-secondary hover:text-destructive"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Player Content */}
        {!isMinimized && (
          <div className="p-4 w-80">
            <AudioPlayer
              toneName={toneName}
              isPlaying={isPlaying}
              onTogglePlay={onTogglePlay}
            />
          </div>
        )}

        {/* Minimized View */}
        {isMinimized && (
          <div className="p-3 w-64">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground truncate">
                  {toneName}
                </p>
                <p className="text-xs text-text-secondary">
                  {isPlaying ? 'Playing' : 'Paused'}
                </p>
              </div>
              <Button
                onClick={onTogglePlay}
                size="sm"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground rounded-full w-8 h-8 p-0"
              >
                {isPlaying ? '⏸' : '▶'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};