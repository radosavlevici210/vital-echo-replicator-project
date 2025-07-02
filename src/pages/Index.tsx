
import { Play, Pause, Volume2, Brain, Heart, Zap, Star, Search, Filter, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryCard } from "@/components/CategoryCard";
import { FloatingPlayer } from "@/components/FloatingPlayer";

const Index = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFloatingPlayer, setShowFloatingPlayer] = useState(false);
  const [currentToneName, setCurrentToneName] = useState("");

  const toneCategories = [
    {
      id: "skills",
      title: "Skills Enhancement",
      description: "Boost your cognitive abilities and skills",
      color: "from-blue-500 to-purple-600",
      icon: Brain,
      tones: ["IQ Enhancement", "Focus Improvement", "Cognitive Enhancement", "Short-Term Memory", "Long-Term Memory", "Language Skills", "Sports Skills", "Musician Skills", "Vocal Skills", "Investor Skills", "Expert Skills", "Fluid Intelligence"]
    },
    {
      id: "emotional",
      title: "Emotional Intelligence",
      description: "Develop emotional awareness and confidence",
      color: "from-purple-500 to-pink-500",
      icon: Heart,
      tones: ["Emotional Intelligence Boost", "Confidence Building", "Motivation Boosting", "Creative Thinking", "Alignment 144"]
    },
    {
      id: "spiritual",
      title: "Spiritual Growth",
      description: "Deepen your spiritual practice and awareness",
      color: "from-green-500 to-teal-500",
      icon: Star,
      tones: ["Meditation Practices", "Chakra Balancing", "Crown Chakra", "Third Eye Chakra", "Astral Travel", "Pineal Gland Activation", "Love Meditation", "Self-Awareness", "Self-Esteem Boosting", "Lucid Dream Induction", "Sensory Enhancement"]
    },
    {
      id: "sexual",
      title: "Sexual Health",
      description: "Enhance intimacy and sexual wellness",
      color: "from-red-500 to-orange-500",
      icon: Zap,
      tones: ["Sexual Desire Stimulation", "Sexual Arousal", "Male Orgasm Amplification", "Female Orgasm Intensification"]
    },
    {
      id: "wellbeing",
      title: "General Well-being",
      description: "Optimize your health and vitality",
      color: "from-orange-500 to-yellow-500",
      icon: Heart,
      tones: ["Homeostasis Enhancement", "Neurogenesis Stimulation", "Anti-Aging Therapy", "Serenity Boosting", "Bliss Induction", "Energize Therapy", "Alignment 108", "Immune Health Enhancement", "Body Repair Therapy"]
    },
    {
      id: "beauty",
      title: "Beauty & Care",
      description: "Enhance your natural beauty and appearance",
      color: "from-pink-500 to-purple-500",
      icon: Star,
      tones: ["Hair Loss Prevention", "Eyelashes Restoration", "Eyelids Aging", "Eyebrows Growth", "Face Detox", "Forehead Radiance", "Ear Elegance", "Cheek Revitalize", "Nose Renew", "Philtrum Rejuvenate", "Jawline Harmony", "Neck Revive"]
    }
  ];

  const benefits = [
    {
      title: "Science-Based",
      description: "Our tones are based on proven neuroscience research and brainwave entrainment principles."
    },
    {
      title: "Personalized Experience",
      description: "Choose from various categories designed for different goals and mental states."
    },
    {
      title: "High-Quality Audio",
      description: "Premium binaural beats and isochronic tones for maximum effectiveness."
    },
    {
      title: "Easy to Use",
      description: "Simple interface that lets you focus on what matters - your wellness journey."
    }
  ];

  const togglePlay = (toneId: string) => {
    if (currentlyPlaying === toneId) {
      setCurrentlyPlaying(null);
      setShowFloatingPlayer(false);
    } else {
      setCurrentlyPlaying(toneId);
      
      // Find the tone name
      const categoryIndex = parseInt(toneId.split('-')[0]);
      const toneIndex = parseInt(toneId.split('-')[1]);
      if (!isNaN(categoryIndex) && !isNaN(toneIndex)) {
        const category = toneCategories[categoryIndex];
        if (category && category.tones[toneIndex]) {
          setCurrentToneName(category.tones[toneIndex]);
        }
      } else {
        // Handle string-based category IDs
        const [categoryId, index] = toneId.split('-');
        const category = toneCategories.find(cat => cat.id === categoryId);
        const toneIdx = parseInt(index);
        if (category && category.tones[toneIdx]) {
          setCurrentToneName(category.tones[toneIdx]);
        }
      }
      
      setShowFloatingPlayer(true);
    }
  };

  const filteredCategories = toneCategories.filter(category => {
    const matchesCategory = selectedCategory === "all" || category.id === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.tones.some(tone => tone.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Volume2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-playfair font-bold text-foreground">VitalTones</span>
                <p className="text-xs text-text-secondary">Therapeutic Sound Technology</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#tones" className="text-text-secondary hover:text-foreground transition-colors">Tones</a>
              <a href="#benefits" className="text-text-secondary hover:text-foreground transition-colors">Benefits</a>
              <a href="#about" className="text-text-secondary hover:text-foreground transition-colors">About</a>
              <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground">
                Get Started
              </Button>
            </nav>

            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 glass-effect rounded-full px-6 py-3 mb-8 animate-fade-in">
            <Star className="w-5 h-5 text-accent" />
            <span className="text-sm text-text-secondary">Transform Your Mind with Sound</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-foreground mb-6 leading-tight animate-slide-up">
            Unlock Your
            <span className="gradient-text"> Potential</span>
          </h1>
          
          <p className="text-xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Experience the power of binaural beats and therapeutic tones designed to enhance focus, 
            promote relaxation, and optimize your mental state naturally.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-4 text-lg rounded-full shadow-glow"
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border-light text-foreground hover:bg-surface px-8 py-4 text-lg rounded-full"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="px-6 py-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <Input
                placeholder="Search tones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-surface border-border-light"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-text-secondary" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-surface border-border-light">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {toneCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tone Categories */}
      <section id="tones" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Explore Our Tone Library
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Discover scientifically crafted audio experiences designed for every aspect of your wellness journey.
            </p>
          </div>

          <div className="space-y-12">
            {filteredCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                currentlyPlaying={currentlyPlaying}
                onTogglePlay={togglePlay}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="px-6 py-20 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Why Choose VitalTones?
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Experience the transformative power of scientifically-backed audio therapy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow floating-animation">
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-8">
            Ready to Transform Your Mind?
          </h2>
          <p className="text-xl text-text-secondary mb-12 leading-relaxed">
            Join thousands who have discovered the power of therapeutic sound for wellness, productivity, and peace of mind.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-4 text-lg rounded-full shadow-glow pulse-glow"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border-light text-foreground hover:bg-surface px-8 py-4 text-lg rounded-full"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-playfair font-bold text-foreground">VitalTones</span>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-text-secondary">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="text-center text-sm text-text-secondary">
            <p>&copy; 2024 VitalTones. All rights reserved. Transforming minds through therapeutic sound.</p>
          </div>
        </div>
      </footer>

      {/* Floating Player */}
      {showFloatingPlayer && currentlyPlaying && (
        <FloatingPlayer
          toneName={currentToneName}
          isPlaying={!!currentlyPlaying}
          onTogglePlay={() => togglePlay(currentlyPlaying)}
          onClose={() => {
            setShowFloatingPlayer(false);
            setCurrentlyPlaying(null);
          }}
        />
      )}
    </div>
  );
};

export default Index;
