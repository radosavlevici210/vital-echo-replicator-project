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

  // Advanced tone frequency mappings with scientifically-backed frequencies
  const getToneFrequencies = (toneName: string): { base: number; beat: number } => {
    const toneMap: { [key: string]: { base: number; beat: number } } = {
      // Advanced Skills Enhancement - Beta waves (13-30 Hz) + Solfeggio Frequencies
      "Genius IQ Enhancement": { base: 741, beat: 40 }, // Advanced gamma + healing frequency
      "Quantum Focus Mastery": { base: 528, beat: 15 }, // Love frequency + beta focus
      "Neural Cognitive Boost": { base: 963, beat: 18 }, // Pineal activation + cognition
      "Memory Palace Builder": { base: 396, beat: 25 }, // Liberation frequency + memory
      "Photographic Memory": { base: 852, beat: 22 }, // Intuition frequency + memory
      "Polyglot Language Master": { base: 639, beat: 16 }, // Connection frequency + language
      "Olympic Athletic Performance": { base: 174, beat: 28 }, // Pain relief + performance
      "Virtuoso Musical Genius": { base: 285, beat: 24 }, // Transformation + music
      "Perfect Pitch Vocal": { base: 741, beat: 20 }, // Expression + vocal
      "Wall Street Investor Mind": { base: 852, beat: 19 }, // Awakening + investor
      "Master Expert Flow State": { base: 963, beat: 26 }, // Crown chakra + mastery
      "Einstein Fluid Intelligence": { base: 528, beat: 17 }, // Love frequency + intelligence

      // Advanced Emotional Intelligence - Alpha waves (8-13 Hz) + Sacred Frequencies
      "Emotional Mastery Supreme": { base: 639, beat: 10 }, // Heart connection + alpha
      "Unshakeable Confidence": { base: 741, beat: 11 }, // Expression + confidence
      "Infinite Motivation Fire": { base: 528, beat: 12 }, // Love + motivation
      "Divine Creative Genius": { base: 963, beat: 9 }, // Spiritual + creativity
      "Sacred Geometry Alignment": { base: 432, beat: 8 }, // Natural frequency + alignment

      // Advanced Spiritual Growth - Theta waves (4-8 Hz) + Ancient Frequencies
      "Deep Samadhi Meditation": { base: 528, beat: 6 }, // Love frequency + theta
      "Complete Chakra Mastery": { base: 396, beat: 7 }, // Root healing + balance
      "Crown Enlightenment": { base: 963, beat: 5 }, // Highest frequency + crown
      "Third Eye Activation": { base: 852, beat: 6 }, // Intuition + third eye
      "Astral Projection Mastery": { base: 741, beat: 4 }, // Expression + astral
      "Pineal DMT Activation": { base: 936, beat: 5 }, // Pineal specific + activation
      "Unconditional Love State": { base: 528, beat: 7 }, // Love frequency + theta
      "Higher Self Connection": { base: 639, beat: 6 }, // Connection + awareness
      "Infinite Self Worth": { base: 741, beat: 8 }, // Expression + self-esteem
      "Lucid Dream Command": { base: 285, beat: 4 }, // Transformation + lucid
      "Superhuman Senses": { base: 174, beat: 7 }, // Foundation + enhancement

      // Advanced Sexual Health - Alpha/Theta + Tantric Frequencies
      "Tantric Desire Ignition": { base: 528, beat: 9 }, // Love + desire
      "Sacred Sexual Arousal": { base: 639, beat: 10 }, // Connection + arousal
      "Male Power Enhancement": { base: 741, beat: 8 }, // Expression + male energy
      "Divine Feminine Orgasm": { base: 852, beat: 9 }, // Intuition + feminine

      // Advanced General Well-being - Multi-layered Frequencies
      "Cellular Regeneration": { base: 528, beat: 8 }, // DNA repair frequency
      "Superhuman Neurogenesis": { base: 40, beat: 6 }, // Gamma + brain growth
      "Immortality Anti-Aging": { base: 528, beat: 7 }, // Love frequency + longevity
      "Zen Master Serenity": { base: 396, beat: 5 }, // Liberation + peace
      "Ecstatic Bliss State": { base: 963, beat: 4 }, // Crown + bliss
      "Unlimited Energy Matrix": { base: 741, beat: 15 }, // Expression + energy
      "Sacred 108 Alignment": { base: 108, beat: 8 }, // Sacred number + balance
      "Superhuman Immunity": { base: 528, beat: 10 }, // Love + immune system
      "Miraculous Body Repair": { base: 285, beat: 6 }, // Transformation + healing

      // Advanced Beauty & Care - Aesthetic Frequencies + Golden Ratio
      "Fountain of Youth Hair": { base: 528, beat: 8 }, // DNA repair + hair
      "Divine Eyelash Growth": { base: 741, beat: 7 }, // Expression + lashes
      "Timeless Eye Beauty": { base: 528, beat: 6 }, // Love + eye area
      "Perfect Brow Architecture": { base: 639, beat: 8 }, // Harmony + brows
      "Radiant Face Transformation": { base: 396, beat: 7 }, // Liberation + face
      "Golden Ratio Forehead": { base: 852, beat: 6 }, // Intuition + proportion
      "Symmetrical Ear Perfection": { base: 741, beat: 8 }, // Expression + ears
      "Angelic Cheek Sculpting": { base: 528, beat: 7 }, // Love + cheeks
      "Aristocratic Nose Refinement": { base: 639, beat: 6 }, // Harmony + nose
      "Perfect Philtrum Definition": { base: 741, beat: 7 }, // Expression + philtrum
      "Diamond Jawline Creation": { base: 852, beat: 8 }, // Awakening + jawline
      "Swan Neck Elegance": { base: 528, beat: 6 }, // Grace + neck

      // NEW ADVANCED CATEGORIES
      
      // Quantum Enhancement - Ultra-high frequencies
      "Quantum Field Manipulation": { base: 1111, beat: 40 }, // Master number + gamma
      "Reality Shifting Master": { base: 999, beat: 35 }, // Completion + shifting
      "Manifestation Accelerator": { base: 888, beat: 30 }, // Abundance + manifestation
      "Time Dilation Control": { base: 777, beat: 25 }, // Spiritual + time
      "Dimensional Awareness": { base: 666, beat: 20 }, // Material mastery + dimension

      // Psychic Powers - Extrasensory frequencies
      "Telepathic Communication": { base: 852, beat: 14 }, // Intuition + telepathy
      "Clairvoyant Vision": { base: 963, beat: 12 }, // Crown + vision
      "Psychokinetic Power": { base: 741, beat: 18 }, // Expression + telekinesis
      "Precognitive Ability": { base: 639, beat: 16 }, // Connection + foresight
      "Remote Viewing Mastery": { base: 528, beat: 14 }, // Love + remote viewing

      // Superhuman Abilities - Peak performance frequencies
      "Superhuman Strength": { base: 174, beat: 30 }, // Foundation + strength
      "Lightning Reflexes": { base: 285, beat: 35 }, // Transformation + speed
      "Advanced Photographic Memory": { base: 396, beat: 25 }, // Liberation + memory
      "Perfect Balance": { base: 417, beat: 20 }, // Change + balance
      "Enhanced Endurance": { base: 528, beat: 28 }, // Love + endurance

      // Business & Success - Prosperity frequencies
      "Millionaire Mindset": { base: 888, beat: 20 }, // Abundance + success
      "Leadership Magnetism": { base: 741, beat: 16 }, // Expression + leadership
      "Negotiation Master": { base: 639, beat: 18 }, // Connection + persuasion
      "Innovation Genius": { base: 963, beat: 22 }, // Crown + innovation
      "Wealth Attraction": { base: 528, beat: 14 }, // Love + wealth

      // Healing & Recovery - Therapeutic frequencies
      "Pain Elimination": { base: 174, beat: 5 }, // Pain relief + theta
      "Trauma Release": { base: 396, beat: 6 }, // Liberation + healing
      "Addiction Recovery": { base: 417, beat: 7 }, // Change + recovery
      "Depression Lift": { base: 528, beat: 8 }, // Love + mood
      "Anxiety Dissolve": { base: 741, beat: 9 }, // Expression + calm
      
      // Sleep & Dreams - Restorative frequencies
      "Instant Deep Sleep": { base: 285, beat: 2 }, // Transformation + delta
      "Prophetic Dreams": { base: 639, beat: 4 }, // Connection + dreams
      "Sleep Paralysis Freedom": { base: 396, beat: 3 }, // Liberation + freedom
      "Nightmare Protection": { base: 741, beat: 2.5 }, // Expression + protection
      "Regenerative Sleep": { base: 528, beat: 1.5 } // Love + deep rest
    };

    return toneMap[toneName] || { base: 440, beat: 10 };
  };

  const toneCategories = [
    {
      id: "skills",
      title: "Advanced Skills Enhancement",
      description: "Next-generation cognitive enhancement and genius-level abilities",
      color: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
      icon: "🧠",
      tones: ["Genius IQ Enhancement", "Quantum Focus Mastery", "Neural Cognitive Boost", "Memory Palace Builder", "Photographic Memory", "Polyglot Language Master", "Olympic Athletic Performance", "Virtuoso Musical Genius", "Perfect Pitch Vocal", "Wall Street Investor Mind", "Master Expert Flow State", "Einstein Fluid Intelligence"]
    },
    {
      id: "emotional",
      title: "Emotional Mastery", 
      description: "Supreme emotional intelligence and unshakeable confidence",
      color: "linear-gradient(45deg, #8b5cf6, #ec4899)",
      icon: "❤️",
      tones: ["Emotional Mastery Supreme", "Unshakeable Confidence", "Infinite Motivation Fire", "Divine Creative Genius", "Sacred Geometry Alignment"]
    },
    {
      id: "spiritual",
      title: "Spiritual Awakening",
      description: "Advanced spiritual practices and consciousness expansion", 
      color: "linear-gradient(45deg, #10b981, #06b6d4)",
      icon: "⭐",
      tones: ["Deep Samadhi Meditation", "Complete Chakra Mastery", "Crown Enlightenment", "Third Eye Activation", "Astral Projection Mastery", "Pineal DMT Activation", "Unconditional Love State", "Higher Self Connection", "Infinite Self Worth", "Lucid Dream Command", "Superhuman Senses"]
    },
    {
      id: "sexual",
      title: "Sacred Sexual Energy",
      description: "Tantric mastery and divine sexual expression",
      color: "linear-gradient(45deg, #ef4444, #f97316)",
      icon: "⚡",
      tones: ["Tantric Desire Ignition", "Sacred Sexual Arousal", "Male Power Enhancement", "Divine Feminine Orgasm"]
    },
    {
      id: "wellbeing", 
      title: "Superhuman Well-being",
      description: "Cellular regeneration and immortality protocols",
      color: "linear-gradient(45deg, #f59e0b, #eab308)",
      icon: "🌟",
      tones: ["Cellular Regeneration", "Superhuman Neurogenesis", "Immortality Anti-Aging", "Zen Master Serenity", "Ecstatic Bliss State", "Unlimited Energy Matrix", "Sacred 108 Alignment", "Superhuman Immunity", "Miraculous Body Repair"]
    },
    {
      id: "beauty",
      title: "Divine Beauty & Perfection", 
      description: "Golden ratio aesthetics and timeless beauty enhancement",
      color: "linear-gradient(45deg, #ec4899, #a855f7)",
      icon: "✨",
      tones: ["Fountain of Youth Hair", "Divine Eyelash Growth", "Timeless Eye Beauty", "Perfect Brow Architecture", "Radiant Face Transformation", "Golden Ratio Forehead", "Symmetrical Ear Perfection", "Angelic Cheek Sculpting", "Aristocratic Nose Refinement", "Perfect Philtrum Definition", "Diamond Jawline Creation", "Swan Neck Elegance"]
    },
    {
      id: "quantum",
      title: "Quantum Enhancement",
      description: "Reality manipulation and dimensional mastery",
      color: "linear-gradient(45deg, #7c3aed, #2563eb)",
      icon: "🌌",
      tones: ["Quantum Field Manipulation", "Reality Shifting Master", "Manifestation Accelerator", "Time Dilation Control", "Dimensional Awareness"]
    },
    {
      id: "psychic",
      title: "Psychic Powers",
      description: "Extrasensory abilities and supernatural consciousness",
      color: "linear-gradient(45deg, #9333ea, #c026d3)",
      icon: "🔮",
      tones: ["Telepathic Communication", "Clairvoyant Vision", "Psychokinetic Power", "Precognitive Ability", "Remote Viewing Mastery"]
    },
    {
      id: "superhuman",
      title: "Superhuman Abilities",
      description: "Peak human performance and beyond",
      color: "linear-gradient(45deg, #dc2626, #ea580c)",
      icon: "⚡",
      tones: ["Superhuman Strength", "Lightning Reflexes", "Advanced Photographic Memory", "Perfect Balance", "Enhanced Endurance"]
    },
    {
      id: "business",
      title: "Business Mastery",
      description: "Wealth creation and leadership magnetism",
      color: "linear-gradient(45deg, #059669, #0891b2)",
      icon: "💎",
      tones: ["Millionaire Mindset", "Leadership Magnetism", "Negotiation Master", "Innovation Genius", "Wealth Attraction"]
    },
    {
      id: "healing",
      title: "Advanced Healing",
      description: "Therapeutic recovery and trauma release",
      color: "linear-gradient(45deg, #16a34a, #22c55e)",
      icon: "🌿",
      tones: ["Pain Elimination", "Trauma Release", "Addiction Recovery", "Depression Lift", "Anxiety Dissolve"]
    },
    {
      id: "sleep",
      title: "Sleep & Dreams",
      description: "Advanced sleep optimization and dream control",
      color: "linear-gradient(45deg, #4f46e5, #7c3aed)",
      icon: "🌙",
      tones: ["Instant Deep Sleep", "Prophetic Dreams", "Sleep Paralysis Freedom", "Nightmare Protection", "Regenerative Sleep"]
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
            background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))',
            padding: '10px 20px',
            borderRadius: '25px',
            marginBottom: '30px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <span style={{ fontSize: '16px' }}>🎉</span>
            <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '600' }}>100% FREE PREMIUM ACCESS - ALL FEATURES UNLOCKED</span>
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
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                            <span style={{
                              background: 'linear-gradient(45deg, #10b981, #059669)',
                              color: 'white',
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontSize: '10px',
                              fontWeight: '600'
                            }}>
                              ✓ CERTIFIED
                            </span>
                            <span style={{
                              background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                              color: 'white',
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontSize: '10px',
                              fontWeight: '600'
                            }}>
                              🔬 SCIENTIFIC
                            </span>
                            <span style={{
                              background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                              color: 'white',
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontSize: '10px',
                              fontWeight: '600'
                            }}>
                              ⚡ PREMIUM
                            </span>
                          </div>
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
                          {isPlaying ? 'Playing Premium...' : 'Play Premium FREE'}
                        </button>

                        {/* Free Premium Access Badge */}
                        <div style={{
                          width: '100%',
                          background: 'linear-gradient(45deg, #10b981, #059669)',
                          color: 'white',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                          marginTop: '8px'
                        }}>
                          <span style={{ fontSize: '14px' }}>🎉</span>
                          UNLOCKED - FREE PREMIUM ACCESS
                        </div>

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