
import { Play, Pause, Volume2, Brain, Heart, Zap, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const toneCategories = [
    {
      id: "focus",
      title: "Focus & Concentration",
      description: "Enhance your mental clarity and productivity",
      color: "from-blue-500 to-purple-600",
      icon: Brain,
      tones: ["Alpha Waves", "Beta Boost", "Deep Focus", "Study Flow"]
    },
    {
      id: "relaxation",
      title: "Relaxation & Sleep",
      description: "Unwind and prepare for restful sleep",
      color: "from-purple-500 to-pink-500",
      icon: Heart,
      tones: ["Delta Dreams", "Theta Calm", "Sleep Induction", "Deep Rest"]
    },
    {
      id: "energy",
      title: "Energy & Motivation",
      description: "Boost your energy and drive",
      color: "from-orange-500 to-red-500",
      icon: Zap,
      tones: ["Morning Boost", "Power Up", "Energize", "Vitality"]
    },
    {
      id: "meditation",
      title: "Meditation & Mindfulness",
      description: "Deepen your practice and awareness",
      color: "from-green-500 to-teal-500",
      icon: Star,
      tones: ["Om Frequency", "Zen Garden", "Mindful Breath", "Inner Peace"]
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
    } else {
      setCurrentlyPlaying(toneId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">VitalTones</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#tones" className="text-gray-300 hover:text-white transition-colors">Tones</a>
            <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Transform Your Mind with Sound</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Unlock Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Potential</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the power of binaural beats and therapeutic tones designed to enhance focus, 
            promote relaxation, and optimize your mental state naturally.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105">
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg rounded-full transition-all duration-300">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Tone Categories */}
      <section id="tones" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Explore Our Tone Library</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover scientifically crafted audio experiences designed for every aspect of your wellness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toneCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm">{category.description}</p>
                    
                    <div className="space-y-2">
                      {category.tones.map((tone, index) => (
                        <div key={tone} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                          <span className="text-sm text-gray-300">{tone}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => togglePlay(`${category.id}-${index}`)}
                            className="text-white hover:bg-white/10 p-1 h-8 w-8"
                          >
                            {currentlyPlaying === `${category.id}-${index}` ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="px-6 py-20 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose VitalTones?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the transformative power of scientifically-backed audio therapy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Mind?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands who have discovered the power of therapeutic sound for wellness, productivity, and peace of mind.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg rounded-full transition-all duration-300">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">VitalTones</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
