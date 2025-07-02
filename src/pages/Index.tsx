import { useState, useRef, useEffect } from "react";

// Audio Generator for Binaural Beats
class BinauralBeatGenerator {
  private audioContext: AudioContext | null = null;
  private leftOscillator: OscillatorNode | null = null;
  private rightOscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying = false;

  constructor() {
    this.initAudio();
  }

  private initAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.error('Web Audio API not supported:', error);
    }
  }

  async startTone(baseFreq: number = 440, beatFreq: number = 10) {
    if (!this.audioContext) return;

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    this.stopTone();

    // Create oscillators for left and right channels
    this.leftOscillator = this.audioContext.createOscillator();
    this.rightOscillator = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();

    // Create stereo panner for left/right separation
    const pannerLeft = this.audioContext.createStereoPanner();
    const pannerRight = this.audioContext.createStereoPanner();
    
    pannerLeft.pan.value = -1; // Full left
    pannerRight.pan.value = 1; // Full right

    // Set frequencies (binaural beat = difference between left and right)
    this.leftOscillator.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);
    this.rightOscillator.frequency.setValueAtTime(baseFreq + beatFreq, this.audioContext.currentTime);

    // Set waveform to sine wave for pure tones
    this.leftOscillator.type = 'sine';
    this.rightOscillator.type = 'sine';

    // Set volume (start low for safety)
    this.gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);

    // Connect audio graph
    this.leftOscillator.connect(pannerLeft).connect(this.gainNode);
    this.rightOscillator.connect(pannerRight).connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);

    // Start oscillators
    this.leftOscillator.start();
    this.rightOscillator.start();
    
    this.isPlaying = true;
  }

  stopTone() {
    if (this.leftOscillator) {
      this.leftOscillator.stop();
      this.leftOscillator.disconnect();
      this.leftOscillator = null;
    }
    if (this.rightOscillator) {
      this.rightOscillator.stop();
      this.rightOscillator.disconnect();
      this.rightOscillator = null;
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
    this.isPlaying = false;
  }

  setVolume(volume: number) {
    if (this.gainNode) {
      // Volume from 0-100 to 0-0.3 (safe range)
      this.gainNode.gain.setValueAtTime(volume / 100 * 0.3, this.audioContext!.currentTime);
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

const Index = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFloatingPlayer, setShowFloatingPlayer] = useState(false);
  const [currentToneName, setCurrentToneName] = useState("");
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 20, y: 20 });
  const audioGeneratorRef = useRef<BinauralBeatGenerator | null>(null);

  // Initialize audio generator
  useEffect(() => {
    audioGeneratorRef.current = new BinauralBeatGenerator();
    return () => {
      audioGeneratorRef.current?.stopTone();
    };
  }, []);

  // Tone frequency mappings for different types
  const getToneFrequencies = (toneName: string): { base: number; beat: number } => {
    const toneMap: { [key: string]: { base: number; beat: number } } = {
      // Skills Enhancement - Beta waves (13-30 Hz)
      "IQ Enhancement": { base: 440, beat: 20 },
      "Focus Improvement": { base: 440, beat: 15 },
      "Cognitive Enhancement": { base: 528, beat: 18 },
      "Short-Term Memory": { base: 440, beat: 25 },
      "Long-Term Memory": { base: 528, beat: 22 },
      "Language Skills": { base: 396, beat: 16 },
      "Sports Skills": { base: 440, beat: 28 },
      "Musician Skills": { base: 528, beat: 24 },
      "Vocal Skills": { base: 741, beat: 20 },
      "Investor Skills": { base: 852, beat: 19 },
      "Expert Skills": { base: 440, beat: 26 },
      "Fluid Intelligence": { base: 528, beat: 17 },

      // Emotional Intelligence - Alpha waves (8-13 Hz)
      "Emotional Intelligence Boost": { base: 440, beat: 10 },
      "Confidence Building": { base: 528, beat: 11 },
      "Motivation Boosting": { base: 741, beat: 12 },
      "Creative Thinking": { base: 852, beat: 9 },
      "Alignment 144": { base: 144, beat: 8 },

      // Spiritual Growth - Theta waves (4-8 Hz)
      "Meditation Practices": { base: 528, beat: 6 },
      "Chakra Balancing": { base: 396, beat: 7 },
      "Crown Chakra": { base: 963, beat: 5 },
      "Third Eye Chakra": { base: 852, beat: 6 },
      "Astral Travel": { base: 741, beat: 4 },
      "Pineal Gland Activation": { base: 936, beat: 5 },
      "Love Meditation": { base: 528, beat: 7 },
      "Self-Awareness": { base: 639, beat: 6 },
      "Self-Esteem Boosting": { base: 741, beat: 8 },
      "Lucid Dream Induction": { base: 285, beat: 4 },
      "Sensory Enhancement": { base: 440, beat: 7 },

      // Sexual Health - Alpha/Theta waves
      "Sexual Desire Stimulation": { base: 528, beat: 9 },
      "Sexual Arousal": { base: 639, beat: 10 },
      "Male Orgasm Amplification": { base: 741, beat: 8 },
      "Female Orgasm Intensification": { base: 852, beat: 9 },

      // General Well-being - Various therapeutic frequencies
      "Homeostasis Enhancement": { base: 528, beat: 8 },
      "Neurogenesis Stimulation": { base: 40, beat: 6 },
      "Anti-Aging Therapy": { base: 528, beat: 7 },
      "Serenity Boosting": { base: 396, beat: 5 },
      "Bliss Induction": { base: 963, beat: 4 },
      "Energize Therapy": { base: 741, beat: 15 },
      "Alignment 108": { base: 108, beat: 8 },
      "Immune Health Enhancement": { base: 528, beat: 10 },
      "Body Repair Therapy": { base: 285, beat: 6 },

      // Beauty & Care - Healing frequencies
      "Hair Loss Prevention": { base: 528, beat: 8 },
      "Eyelashes Restoration": { base: 741, beat: 7 },
      "Eyelids Aging": { base: 528, beat: 6 },
      "Eyebrows Growth": { base: 639, beat: 8 },
      "Face Detox": { base: 396, beat: 7 },
      "Forehead Radiance": { base: 852, beat: 6 },
      "Ear Elegance": { base: 741, beat: 8 },
      "Cheek Revitalize": { base: 528, beat: 7 },
      "Nose Renew": { base: 639, beat: 6 },
      "Philtrum Rejuvenate": { base: 741, beat: 7 },
      "Jawline Harmony": { base: 852, beat: 8 },
      "Neck Revive": { base: 528, beat: 6 }
    };

    return toneMap[toneName] || { base: 440, beat: 10 };
  };

  const toneCategories = [
    {
      id: "skills",
      title: "Skills Enhancement",
      description: "Boost your cognitive abilities and skills",
      color: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
      icon: "🧠",
      tones: ["IQ Enhancement", "Focus Improvement", "Cognitive Enhancement", "Short-Term Memory", "Long-Term Memory", "Language Skills", "Sports Skills", "Musician Skills", "Vocal Skills", "Investor Skills", "Expert Skills", "Fluid Intelligence"]
    },
    {
      id: "emotional",
      title: "Emotional Intelligence", 
      description: "Develop emotional awareness and confidence",
      color: "linear-gradient(45deg, #8b5cf6, #ec4899)",
      icon: "❤️",
      tones: ["Emotional Intelligence Boost", "Confidence Building", "Motivation Boosting", "Creative Thinking", "Alignment 144"]
    },
    {
      id: "spiritual",
      title: "Spiritual Growth",
      description: "Deepen your spiritual practice and awareness", 
      color: "linear-gradient(45deg, #10b981, #06b6d4)",
      icon: "⭐",
      tones: ["Meditation Practices", "Chakra Balancing", "Crown Chakra", "Third Eye Chakra", "Astral Travel", "Pineal Gland Activation", "Love Meditation", "Self-Awareness", "Self-Esteem Boosting", "Lucid Dream Induction", "Sensory Enhancement"]
    },
    {
      id: "sexual",
      title: "Sexual Health",
      description: "Enhance intimacy and sexual wellness",
      color: "linear-gradient(45deg, #ef4444, #f97316)",
      icon: "⚡",
      tones: ["Sexual Desire Stimulation", "Sexual Arousal", "Male Orgasm Amplification", "Female Orgasm Intensification"]
    },
    {
      id: "wellbeing", 
      title: "General Well-being",
      description: "Optimize your health and vitality",
      color: "linear-gradient(45deg, #f59e0b, #eab308)",
      icon: "🌟",
      tones: ["Homeostasis Enhancement", "Neurogenesis Stimulation", "Anti-Aging Therapy", "Serenity Boosting", "Bliss Induction", "Energize Therapy", "Alignment 108", "Immune Health Enhancement", "Body Repair Therapy"]
    },
    {
      id: "beauty",
      title: "Beauty & Care", 
      description: "Enhance your natural beauty and appearance",
      color: "linear-gradient(45deg, #ec4899, #a855f7)",
      icon: "✨",
      tones: ["Hair Loss Prevention", "Eyelashes Restoration", "Eyelids Aging", "Eyebrows Growth", "Face Detox", "Forehead Radiance", "Ear Elegance", "Cheek Revitalize", "Nose Renew", "Philtrum Rejuvenate", "Jawline Harmony", "Neck Revive"]
    }
  ];

  const togglePlay = (toneId: string) => {
    if (currentlyPlaying === toneId) {
      // Stop current tone
      audioGeneratorRef.current?.stopTone();
      setCurrentlyPlaying(null);
      setShowFloatingPlayer(false);
    } else {
      // Stop any current tone
      audioGeneratorRef.current?.stopTone();
      
      // Find tone name and start new tone
      const [categoryId, index] = toneId.split('-');
      const category = toneCategories.find(cat => cat.id === categoryId);
      const toneIdx = parseInt(index);
      
      if (category && category.tones[toneIdx]) {
        const toneName = category.tones[toneIdx];
        setCurrentToneName(toneName);
        
        // Get frequencies for this tone and start playing
        const frequencies = getToneFrequencies(toneName);
        audioGeneratorRef.current?.startTone(frequencies.base, frequencies.beat);
        
        setCurrentlyPlaying(toneId);
        setShowFloatingPlayer(true);
        
        // Auto-update progress (demo)
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 0;
            }
            return prev + 0.5; // Slow progress for demo
          });
        }, 300);
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    audioGeneratorRef.current?.setVolume(newVolume);
  };

  const filteredCategories = toneCategories.filter(category => {
    const matchesCategory = selectedCategory === "all" || category.id === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.tones.some(tone => tone.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Floating Player Component
  const FloatingPlayer = () => {
    if (!showFloatingPlayer || !currentlyPlaying) return null;

    return (
      <div 
        style={{
          position: 'fixed',
          left: playerPosition.x,
          top: playerPosition.y,
          zIndex: 1000,
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '15px',
          padding: isMinimized ? '15px' : '25px',
          minWidth: isMinimized ? '200px' : '320px',
          color: 'white',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isMinimized ? '0' : '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', background: '#ec4899', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
            <span style={{ fontSize: '12px', color: '#d1d5db' }}>Now Playing</span>
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '2px' }}
            >
              {isMinimized ? '⬆️' : '⬇️'}
            </button>
            <button 
              onClick={() => {
                setShowFloatingPlayer(false);
                setCurrentlyPlaying(null);
              }}
              style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
            >
              ✕
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Track Info */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 5px 0' }}>{currentToneName}</h3>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Binaural Beat Therapy</p>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                width: '100%', 
                height: '4px', 
                background: 'rgba(255, 255, 255, 0.2)', 
                borderRadius: '2px',
                marginBottom: '8px'
              }}>
                <div style={{ 
                  width: `${progress}%`, 
                  height: '100%', 
                  background: 'linear-gradient(45deg, #8b5cf6, #ec4899)', 
                  borderRadius: '2px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9ca3af' }}>
                <span>0:00</span>
                <span>15:00</span>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <button style={{
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                padding: '8px'
              }}>
                ⏮️
              </button>

              <button 
                onClick={() => togglePlay(currentlyPlaying!)}
                style={{
                  background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                {currentlyPlaying ? '⏸️' : '▶️'}
              </button>

              <button style={{
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                padding: '8px'
              }}>
                ⏭️
              </button>
            </div>

            {/* Volume */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
              <span style={{ fontSize: '14px' }}>🔊</span>
              <div 
                style={{ flex: 1, height: '4px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '2px', cursor: 'pointer' }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const newVolume = ((e.clientX - rect.left) / rect.width) * 100;
                  handleVolumeChange(Math.max(0, Math.min(100, newVolume)));
                }}
              >
                <div style={{ 
                  width: `${volume}%`, 
                  height: '100%', 
                  background: 'linear-gradient(45deg, #8b5cf6, #ec4899)', 
                  borderRadius: '2px' 
                }}></div>
              </div>
              <span style={{ fontSize: '12px', color: '#9ca3af', minWidth: '30px' }}>{Math.round(volume)}%</span>
            </div>
          </>
        )}

        {isMinimized && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{currentToneName}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>
                {currentlyPlaying ? 'Playing' : 'Paused'}
              </p>
            </div>
            <button 
              onClick={() => togglePlay(currentlyPlaying!)}
              style={{
                background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {currentlyPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        position: 'sticky',
        top: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '15px 0',
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              🎵
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>VitalTones</h1>
              <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Therapeutic Sound Technology</p>
            </div>
          </div>
          
          <button style={{
            background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Start Free - All Premium Features
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(139, 92, 246, 0.2)',
            padding: '10px 20px',
            borderRadius: '25px',
            marginBottom: '30px',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <span style={{ fontSize: '16px' }}>⭐</span>
            <span style={{ fontSize: '14px', color: '#d1d5db' }}>Transform Your Mind with Sound</span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
            fontWeight: '800', 
            marginBottom: '25px',
            background: 'linear-gradient(45deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.2'
          }}>
            Unlock Your Potential
          </h1>
          
          <p style={{ 
            fontSize: '18px', 
            color: '#d1d5db', 
            marginBottom: '40px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 40px auto'
          }}>
            Experience the power of binaural beats and therapeutic tones designed to enhance focus, 
            promote relaxation, and optimize your mental state naturally.
          </p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              fontSize: '16px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
            }}>
              Access All Premium Tones FREE
            </button>
            <button style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: '16px 32px',
              fontSize: '16px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section style={{ padding: '0 20px 40px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search tones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px 12px 45px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '25px',
                color: 'white',
                fontSize: '14px'
              }}
            />
            <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>🔍</span>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px 20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '25px',
              color: 'white',
              fontSize: '14px',
              minWidth: '200px'
            }}
          >
            <option value="all">All Categories</option>
            {toneCategories.map((category) => (
              <option key={category.id} value={category.id} style={{ background: '#1a1a1a' }}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Tone Categories */}
      <section style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}>
              Explore Our Tone Library
            </h2>
            <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '600px', margin: '0 auto' }}>
              Discover scientifically crafted audio experiences designed for every aspect of your wellness journey.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {filteredCategories.map((category, categoryIndex) => (
              <div key={category.id} style={{ opacity: 0, animation: `fadeInUp 0.6s ease forwards ${categoryIndex * 0.2}s` }}>
                {/* Category Header */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '30px',
                  marginBottom: '30px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      background: category.color,
                      borderRadius: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '30px',
                      boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
                    }}>
                      {category.icon}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '600', margin: 0 }}>{category.title}</h2>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: '#d1d5db'
                        }}>
                          {category.tones.length} tones
                        </span>
                      </div>
                      <p style={{ color: '#d1d5db', margin: 0, fontSize: '16px' }}>{category.description}</p>
                    </div>
                  </div>
                </div>

                {/* Tones Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '20px'
                }}>
                  {category.tones.map((tone, toneIndex) => {
                    const toneId = `${category.id}-${toneIndex}`;
                    const isPlaying = currentlyPlaying === toneId;
                    const effectiveness = Math.floor(Math.random() * 20) + 80;
                    const duration = Math.floor(Math.random() * 30) + 15;

                    return (
                      <div
                        key={toneId}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '15px',
                          padding: '25px',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '15px' }}>
                          <div style={{
                            width: '50px',
                            height: '50px',
                            background: category.color,
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px'
                          }}>
                            {category.icon}
                          </div>
                          
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#9ca3af',
                              cursor: 'pointer',
                              padding: '4px',
                              fontSize: '14px'
                            }}>
                              ❤️
                            </button>
                            <button style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#9ca3af',
                              cursor: 'pointer',
                              padding: '4px',
                              fontSize: '14px'
                            }}>
                              📥
                            </button>
                          </div>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', lineHeight: '1.3' }}>
                            {tone}
                          </h3>
                          <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                            {category.title}
                          </p>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{
                              background: 'rgba(255, 255, 255, 0.1)',
                              padding: '4px 8px',
                              borderRadius: '8px',
                              fontSize: '11px',
                              color: '#d1d5db'
                            }}>
                              {effectiveness}% effective
                            </span>
                            <span style={{
                              background: 'rgba(255, 255, 255, 0.1)',
                              padding: '4px 8px',
                              borderRadius: '8px',
                              fontSize: '11px',
                              color: '#d1d5db'
                            }}>
                              {duration}min
                            </span>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                style={{
                                  color: i < Math.floor(effectiveness / 20) ? '#fbbf24' : '#374151',
                                  fontSize: '12px'
                                }}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => togglePlay(toneId)}
                          style={{
                            width: '100%',
                            background: isPlaying 
                              ? 'rgba(255, 255, 255, 0.1)' 
                              : 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                            color: 'white',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          <span style={{ fontSize: '16px' }}>
                            {isPlaying ? '⏸️' : '▶️'}
                          </span>
                          {isPlaying ? 'Playing...' : 'Play Tone'}
                        </button>

                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '80px 20px', background: 'rgba(0, 0, 0, 0.3)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}>
              Why Choose VitalTones?
            </h2>
            <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '600px', margin: '0 auto' }}>
              Experience the transformative power of scientifically-backed audio therapy.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            {[
              { title: "Science-Based", description: "Our tones are based on proven neuroscience research and brainwave entrainment principles." },
              { title: "Personalized Experience", description: "Choose from various categories designed for different goals and mental states." },
              { title: "High-Quality Audio", description: "Premium binaural beats and isochronic tones for maximum effectiveness." },
              { title: "Easy to Use", description: "Simple interface that lets you focus on what matters - your wellness journey." }
            ].map((benefit, index) => (
              <div key={index} style={{ opacity: 0, animation: `fadeInUp 0.6s ease forwards ${index * 0.1}s` }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
                }}>
                  {index + 1}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>
                  {benefit.title}
                </h3>
                <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '25px' }}>
            Ready to Transform Your Mind?
          </h2>
          <p style={{ fontSize: '18px', color: '#d1d5db', marginBottom: '40px', lineHeight: '1.6' }}>
            Join thousands who have discovered the power of therapeutic sound for wellness, productivity, and peace of mind.
          </p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              fontSize: '16px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
              animation: 'pulse 2s infinite'
            }}>
              All Features FREE Forever
            </button>
            <button style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: '16px 32px',
              fontSize: '16px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Explore Premium Library
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
        padding: '60px 20px', 
        background: 'rgba(0, 0, 0, 0.3)' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                🎵
              </div>
              <span style={{ fontSize: '20px', fontWeight: '700' }}>VitalTones</span>
            </div>
            
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</a>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Terms of Service</a>
              <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Contact</a>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
              © 2024 VitalTones. All rights reserved. Transforming minds through therapeutic sound.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Player */}
      <FloatingPlayer />

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Index;