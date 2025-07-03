import { Play, Pause, Star, Download, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ToneCardProps {
  tone: string;
  category: {
    id: string;
    title: string;
    color: string;
    icon: any;
  };
  isPlaying: boolean;
  onTogglePlay: () => void;
  index: number;
}

export const ToneCard = ({ tone, category, isPlaying, onTogglePlay, index }: ToneCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const effectiveness = Math.floor(Math.random() * 20) + 80; // Random effectiveness 80-99%
  const duration = Math.floor(Math.random() * 30) + 15; // Random duration 15-45 minutes
  
  return (
    <Card 
      className="glass-effect card-hover group animate-fade-in border-border-light"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center shadow-glow transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
            <category.icon className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorited(!isFavorited)}
              className={`p-1 h-8 w-8 ${isFavorited ? 'text-accent' : 'text-text-secondary'} hover:text-accent`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:text-foreground p-1 h-8 w-8"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="font-playfair text-base font-semibold text-foreground leading-tight">
              {tone}
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              {category.title}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Badge variant="secondary" className="text-xs bg-surface border-border-light">
                {effectiveness}% effective
              </Badge>
              <Badge variant="outline" className="text-xs border-border-light text-text-secondary">
                {duration}min
              </Badge>
              <Badge variant="outline" className="text-xs border-green-500/20 text-green-600 bg-green-500/10">
                <Award className="w-3 h-3 mr-1" />
                Certified
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(effectiveness / 20) 
                        ? 'text-accent fill-current' 
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <Button
            onClick={onTogglePlay}
            variant={isPlaying ? "secondary" : "default"}
            size="sm"
            className={`w-full ${
              isPlaying 
                ? 'bg-secondary text-secondary-foreground hover:bg-secondary-light' 
                : 'bg-gradient-primary hover:opacity-90 text-primary-foreground'
            } transition-all duration-300`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Playing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play Tone
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};