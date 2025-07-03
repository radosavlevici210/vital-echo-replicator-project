import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToneCard } from "./ToneCard";

interface CategoryCardProps {
  category: {
    id: string;
    title: string;
    description: string;
    color: string;
    icon: any;
    tones: string[];
  };
  currentlyPlaying: string | null;
  onTogglePlay: (toneId: string) => void;
  index: number;
  getToneDescription?: (toneName: string) => string;
}

export const CategoryCard = ({ category, currentlyPlaying, onTogglePlay, index, getToneDescription }: CategoryCardProps) => {
  return (
    <div 
      className="space-y-4 animate-slide-up"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Category Header */}
      <Card className="glass-effect border-border-light">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-glow floating-animation`}>
              <category.icon className="w-7 h-7 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="font-playfair text-xl font-semibold text-foreground">
                  {category.title}
                </h2>
                <Badge variant="outline" className="text-xs border-border-light text-text-secondary">
                  {category.tones.length} tones
                </Badge>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {category.tones.map((tone, toneIndex) => {
          const toneId = `${category.id}-${toneIndex}`;
          return (
            <ToneCard
              key={toneId}
              tone={tone}
              category={category}
              isPlaying={currentlyPlaying === toneId}
              onTogglePlay={() => onTogglePlay(toneId)}
              index={toneIndex}
              description={getToneDescription ? getToneDescription(tone) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};