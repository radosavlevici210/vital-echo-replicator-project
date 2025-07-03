
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Settings, Download, Share2, Heart, Repeat, Shuffle, SkipBack, SkipForward, Mic, Headphones, Radio, Zap, Brain, Eye, Target, Layers, Music, Waves, Filter, Gauge, Activity, BarChart3, Sliders, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface AudioPlayerProps {
  toneName: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayer = ({ toneName, isPlaying, onTogglePlay }: AudioPlayerProps) => {
  // Basic Controls
  const [volume, setVolume] = useState([80]);
  const [progress, setProgress] = useState([0]);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setShuffle] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  
  // Advanced Audio Controls
  const [bassBoost, setBassBoost] = useState([0]);
  const [trebleBoost, setTrebleBoost] = useState([0]);
  const [midBoost, setMidBoost] = useState([0]);
  const [balance, setBalance] = useState([0]);
  const [fade, setFade] = useState([0]);
  const [reverb, setReverb] = useState([0]);
  const [echo, setEcho] = useState([0]);
  const [chorus, setChorus] = useState([0]);
  const [distortion, setDistortion] = useState([0]);
  const [compressor, setCompressor] = useState([0]);
  const [limiter, setLimiter] = useState([0]);
  const [noiseGate, setNoiseGate] = useState([0]);
  
  // Spatial Audio
  const [spatialAudio, setSpatialAudio] = useState(false);
  const [headTracking, setHeadTracking] = useState(false);
  const [roomSize, setRoomSize] = useState([50]);
  const [positioning, setPositioning] = useState({ x: [0], y: [0], z: [0] });
  const [rotation, setRotation] = useState({ pitch: [0], yaw: [0], roll: [0] });
  
  // AI Features
  const [aiEnhancement, setAiEnhancement] = useState(false);
  const [adaptiveEQ, setAdaptiveEQ] = useState(false);
  const [intelligentMastering, setIntelligentMastering] = useState(false);
  const [moodDetection, setMoodDetection] = useState(false);
  const [personalizedTuning, setPersonalizedTuning] = useState(false);
  
  // Professional Features
  const [spectralAnalysis, setSpectralAnalysis] = useState(true);
  const [realTimeFFT, setRealTimeFFT] = useState(true);
  const [phaseScope, setPhaseScope] = useState(false);
  const [peakMeter, setPeakMeter] = useState(true);
  const [rmsLevel, setRmsLevel] = useState([0]);
  const [thd, setThd] = useState([0]);
  const [dynamicRange, setDynamicRange] = useState([0]);
  
  // Recording & Analysis
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [brainwaveSync, setBrainwaveSync] = useState(false);
  const [biofeedback, setBiofeedback] = useState(false);
  const [heartRateSync, setHeartRateSync] = useState(false);
  
  // Session Management
  const [sessionCount, setSessionCount] = useState(0);
  const [totalPlayTime, setTotalPlayTime] = useState(0);
  const [focusScore, setFocusScore] = useState([0]);
  const [relaxationLevel, setRelaxationLevel] = useState([0]);
  const [meditationDepth, setMeditationDepth] = useState([0]);
  
  // Automation
  const [fadeInOut, setFadeInOut] = useState(false);
  const [autoStop, setAutoStop] = useState(false);
  const [autoStopTime, setAutoStopTime] = useState([30]);
  const [breathingSync, setBreathingSync] = useState(false);
  const [circadianSync, setCircadianSync] = useState(false);
  
  // UI States
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [visualizerMode, setVisualizerMode] = useState("spectrum");
  const [isExpanded, setIsExpanded] = useState(false);
  const [audioFormat, setAudioFormat] = useState("wav");
  const [quality, setQuality] = useState("studio");
  
  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spectrumCanvasRef = useRef<HTMLCanvasElement>(null);
  const phaseCanvasRef = useRef<HTMLCanvasElement>(null);
  const autoStopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Advanced Audio Nodes
  const gainNodeRef = useRef<GainNode | null>(null);
  const bassFilterRef = useRef<BiquadFilterNode | null>(null);
  const midFilterRef = useRef<BiquadFilterNode | null>(null);
  const trebleFilterRef = useRef<BiquadFilterNode | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);
  const convolverRef = useRef<ConvolverNode | null>(null);
  const delayRef = useRef<DelayNode | null>(null);
  const spatialPannerRef = useRef<PannerNode | null>(null);
  const stereoPannerRef = useRef<StereoPannerNode | null>(null);

  // Generate professional quality demo URL
  const audioUrl = `https://www.soundjay.com/misc/sounds/bell-ringing-05.wav`;

  // Initialize advanced Web Audio API
  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      if (audioRef.current) {
        const source = audioContextRef.current.createMediaElementSource(audioRef.current);
        
        // Create professional audio processing chain
        gainNodeRef.current = audioContextRef.current.createGain();
        bassFilterRef.current = audioContextRef.current.createBiquadFilter();
        midFilterRef.current = audioContextRef.current.createBiquadFilter();
        trebleFilterRef.current = audioContextRef.current.createBiquadFilter();
        compressorRef.current = audioContextRef.current.createDynamicsCompressor();
        convolverRef.current = audioContextRef.current.createConvolver();
        delayRef.current = audioContextRef.current.createDelay(5.0);
        analyserRef.current = audioContextRef.current.createAnalyser();
        spatialPannerRef.current = audioContextRef.current.createPanner();
        stereoPannerRef.current = audioContextRef.current.createStereoPanner();
        
        // Configure professional filters
        bassFilterRef.current.type = 'lowshelf';
        bassFilterRef.current.frequency.setValueAtTime(150, audioContextRef.current.currentTime);
        
        midFilterRef.current.type = 'peaking';
        midFilterRef.current.frequency.setValueAtTime(1000, audioContextRef.current.currentTime);
        midFilterRef.current.Q.setValueAtTime(0.7, audioContextRef.current.currentTime);
        
        trebleFilterRef.current.type = 'highshelf';
        trebleFilterRef.current.frequency.setValueAtTime(8000, audioContextRef.current.currentTime);
        
        // Configure compressor for professional sound
        compressorRef.current.threshold.setValueAtTime(-24, audioContextRef.current.currentTime);
        compressorRef.current.knee.setValueAtTime(30, audioContextRef.current.currentTime);
        compressorRef.current.ratio.setValueAtTime(12, audioContextRef.current.currentTime);
        compressorRef.current.attack.setValueAtTime(0.003, audioContextRef.current.currentTime);
        compressorRef.current.release.setValueAtTime(0.25, audioContextRef.current.currentTime);
        
        // Configure spatial audio
        spatialPannerRef.current.panningModel = 'HRTF';
        spatialPannerRef.current.distanceModel = 'inverse';
        spatialPannerRef.current.refDistance = 1;
        spatialPannerRef.current.maxDistance = 10000;
        spatialPannerRef.current.rolloffFactor = 1;
        spatialPannerRef.current.coneInnerAngle = 360;
        spatialPannerRef.current.coneOuterAngle = 0;
        spatialPannerRef.current.coneOuterGain = 0;
        
        // Configure high-resolution analyser
        analyserRef.current.fftSize = 8192;
        analyserRef.current.smoothingTimeConstant = 0.8;
        
        // Connect professional audio graph
        source.connect(bassFilterRef.current);
        bassFilterRef.current.connect(midFilterRef.current);
        midFilterRef.current.connect(trebleFilterRef.current);
        trebleFilterRef.current.connect(compressorRef.current);
        compressorRef.current.connect(delayRef.current);
        delayRef.current.connect(convolverRef.current);
        convolverRef.current.connect(stereoPannerRef.current);
        stereoPannerRef.current.connect(spatialPannerRef.current);
        spatialPannerRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }
    }
  }, []);

  // Advanced visualizers
  useEffect(() => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const spectrumCanvas = spectrumCanvasRef.current;
    const phaseCanvas = phaseCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const spectrumCtx = spectrumCanvas?.getContext('2d');
    const phaseCtx = phaseCanvas?.getContext('2d');
    const analyser = analyserRef.current;
    
    analyser.fftSize = 8192;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const timeDataArray = new Uint8Array(analyser.fftSize);

    const drawWaveform = () => {
      if (!ctx || !canvas) return;
      
      analyser.getByteTimeDomainData(timeDataArray);
      
      ctx.fillStyle = 'rgba(15, 12, 41, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#8b5cf6';
      ctx.beginPath();
      
      const sliceWidth = canvas.width / timeDataArray.length;
      let x = 0;
      
      for (let i = 0; i < timeDataArray.length; i++) {
        const v = timeDataArray[i] / 128.0;
        const y = v * canvas.height / 2;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        x += sliceWidth;
      }
      
      ctx.stroke();
    };

    const drawSpectrum = () => {
      if (!spectrumCtx || !spectrumCanvas) return;
      
      analyser.getByteFrequencyData(dataArray);
      
      spectrumCtx.fillStyle = 'rgba(15, 12, 41, 0.2)';
      spectrumCtx.fillRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);
      
      const barWidth = (spectrumCanvas.width / bufferLength) * 4;
      let x = 0;
      
      for (let i = 0; i < bufferLength / 4; i++) {
        const barHeight = (dataArray[i] / 255) * spectrumCanvas.height * 0.9;
        
        const hue = (i / (bufferLength / 4)) * 360;
        spectrumCtx.fillStyle = `hsl(${hue}, 80%, 60%)`;
        spectrumCtx.fillRect(x, spectrumCanvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
    };

    const drawPhase = () => {
      if (!phaseCtx || !phaseCanvas) return;
      
      analyser.getByteTimeDomainData(timeDataArray);
      
      phaseCtx.fillStyle = 'rgba(15, 12, 41, 0.1)';
      phaseCtx.fillRect(0, 0, phaseCanvas.width, phaseCanvas.height);
      
      phaseCtx.strokeStyle = '#ec4899';
      phaseCtx.lineWidth = 1;
      phaseCtx.beginPath();
      
      const centerX = phaseCanvas.width / 2;
      const centerY = phaseCanvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;
      
      for (let i = 0; i < timeDataArray.length; i += 2) {
        const angle = (i / timeDataArray.length) * Math.PI * 2;
        const amplitude = (timeDataArray[i] - 128) / 128;
        const x = centerX + Math.cos(angle) * radius * amplitude;
        const y = centerY + Math.sin(angle) * radius * amplitude;
        
        if (i === 0) {
          phaseCtx.moveTo(x, y);
        } else {
          phaseCtx.lineTo(x, y);
        }
      }
      
      phaseCtx.stroke();
    };

    const draw = () => {
      requestAnimationFrame(draw);
      
      if (visualizerMode === "waveform") drawWaveform();
      if (visualizerMode === "spectrum" && spectralAnalysis) drawSpectrum();
      if (visualizerMode === "phase" && phaseScope) drawPhase();
    };
    
    if (isPlaying) {
      draw();
    }
  }, [isPlaying, visualizerMode, spectralAnalysis, phaseScope]);

  // Professional audio effects
  useEffect(() => {
    if (bassFilterRef.current) {
      bassFilterRef.current.gain.setValueAtTime(bassBoost[0], audioContextRef.current?.currentTime || 0);
    }
  }, [bassBoost]);

  useEffect(() => {
    if (midFilterRef.current) {
      midFilterRef.current.gain.setValueAtTime(midBoost[0], audioContextRef.current?.currentTime || 0);
    }
  }, [midBoost]);

  useEffect(() => {
    if (trebleFilterRef.current) {
      trebleFilterRef.current.gain.setValueAtTime(trebleBoost[0], audioContextRef.current?.currentTime || 0);
    }
  }, [trebleBoost]);

  useEffect(() => {
    if (stereoPannerRef.current) {
      stereoPannerRef.current.pan.setValueAtTime(balance[0] / 100, audioContextRef.current?.currentTime || 0);
    }
  }, [balance]);

  useEffect(() => {
    if (delayRef.current && audioContextRef.current) {
      delayRef.current.delayTime.setValueAtTime(echo[0] / 1000, audioContextRef.current.currentTime);
    }
  }, [echo]);

  useEffect(() => {
    if (spatialAudio && spatialPannerRef.current) {
      spatialPannerRef.current.setPosition(positioning.x[0], positioning.y[0], positioning.z[0]);
      spatialPannerRef.current.setOrientation(rotation.pitch[0], rotation.yaw[0], rotation.roll[0]);
    }
  }, [spatialAudio, positioning, rotation]);

  // AI-powered audio analysis
  useEffect(() => {
    if (aiEnhancement && analyserRef.current) {
      const interval = setInterval(() => {
        const dataArray = new Uint8Array(analyserRef.current!.frequencyBinCount);
        analyserRef.current!.getByteFrequencyData(dataArray);
        
        // Simulate AI analysis
        const avgFreq = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setFocusScore([Math.min(100, avgFreq * 2)]);
        setRelaxationLevel([Math.max(0, 100 - avgFreq)]);
        setMeditationDepth([Math.min(100, avgFreq * 1.5 + Math.random() * 20)]);
        setRmsLevel([avgFreq]);
        setDynamicRange([Math.max(...dataArray) - Math.min(...dataArray)]);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [aiEnhancement]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${toneName}_${quality}.${audioFormat}`;
    link.click();
  };

  const shareAudio = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `VitalTones™ Professional - ${toneName}`,
          text: `Experience professional-grade binaural beats: ${toneName}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Card className={`glass-effect p-6 animate-scale-in transition-all duration-300 ${isExpanded ? 'w-full max-w-6xl' : ''}`}>
      <audio
        ref={audioRef}
        src={audioUrl}
        loop={isRepeat}
        preload="metadata"
      />
      
      <div className="space-y-6">
        {/* Header with expand/collapse */}
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <h3 className="font-playfair text-xl font-semibold text-foreground flex items-center justify-center gap-2">
              {toneName}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="p-1"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-text-secondary'}`} />
              </Button>
              <Badge variant="outline" className="ml-2 text-xs">
                {quality.toUpperCase()}
              </Badge>
            </h3>
            <p className="text-sm text-text-secondary">Professional Binaural Beat Therapy</p>
            <div className="text-xs text-text-secondary mt-1 flex justify-center gap-4">
              <span>Sessions: {sessionCount}</span>
              <span>Time: {Math.floor(totalPlayTime / 60)}m</span>
              {aiEnhancement && (
                <>
                  <span>Focus: {focusScore[0]}%</span>
                  <span>Relax: {relaxationLevel[0]}%</span>
                </>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-text-secondary hover:text-foreground"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Advanced Visualizers */}
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            <Button
              variant={visualizerMode === "waveform" ? "default" : "ghost"}
              size="sm"
              onClick={() => setVisualizerMode("waveform")}
            >
              <Waves className="w-4 h-4 mr-1" />
              Wave
            </Button>
            <Button
              variant={visualizerMode === "spectrum" ? "default" : "ghost"}
              size="sm"
              onClick={() => setVisualizerMode("spectrum")}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Spectrum
            </Button>
            <Button
              variant={visualizerMode === "phase" ? "default" : "ghost"}
              size="sm"
              onClick={() => setVisualizerMode("phase")}
            >
              <Target className="w-4 h-4 mr-1" />
              Phase
            </Button>
          </div>
          
          <div className="flex justify-center gap-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={80}
              className="rounded-lg bg-gradient-to-r from-purple-900/20 to-pink-900/20"
            />
            {isExpanded && (
              <>
                <canvas
                  ref={spectrumCanvasRef}
                  width={300}
                  height={80}
                  className="rounded-lg bg-gradient-to-r from-blue-900/20 to-cyan-900/20"
                />
                <canvas
                  ref={phaseCanvasRef}
                  width={120}
                  height={80}
                  className="rounded-lg bg-gradient-to-r from-green-900/20 to-emerald-900/20"
                />
              </>
            )}
          </div>
          
          {/* Real-time metrics */}
          {peakMeter && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <Label className="text-xs">RMS Level</Label>
                <Progress value={rmsLevel[0]} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Dynamic Range</Label>
                <Progress value={dynamicRange[0]} className="mt-1" />
              </div>
              {aiEnhancement && (
                <>
                  <div>
                    <Label className="text-xs">Focus Score</Label>
                    <Progress value={focusScore[0]} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">Meditation Depth</Label>
                    <Progress value={meditationDepth[0]} className="mt-1" />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={progress}
            onValueChange={(value) => {
              const audio = audioRef.current;
              if (!audio) return;
              const newTime = (value[0] / 100) * duration;
              audio.currentTime = newTime;
              setProgress(value);
            }}
            max={100}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-text-secondary">
            <span>{formatTime(currentTime)}</span>
            <span>Rate: {playbackRate}x</span>
            {aiEnhancement && <span>AI Enhanced</span>}
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShuffle(!isShuffle)}
            className={`text-text-secondary hover:text-foreground ${isShuffle ? 'text-accent' : ''}`}
          >
            <Shuffle className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const audio = audioRef.current;
              if (audio) audio.currentTime = Math.max(audio.currentTime - 15, 0);
            }}
            className="text-text-secondary hover:text-foreground"
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const audio = audioRef.current;
              if (audio) {
                audio.currentTime = 0;
                setProgress([0]);
              }
            }}
            className="text-text-secondary hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          <Button
            onClick={onTogglePlay}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground rounded-full w-16 h-16 p-0 pulse-glow"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const audio = audioRef.current;
              if (audio) audio.currentTime = Math.min(audio.currentTime + 15, duration);
            }}
            className="text-text-secondary hover:text-foreground"
          >
            <SkipForward className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsRepeat(!isRepeat)}
            className={`text-text-secondary hover:text-foreground ${isRepeat ? 'text-accent' : ''}`}
          >
            <Repeat className="w-4 h-4" />
          </Button>

          {isRecording ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setIsRecording(false);
                setRecordingTime(0);
              }}
              className="pulse-glow"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
              {formatTime(recordingTime)}
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRecording(true)}
              className="text-text-secondary hover:text-foreground"
            >
              <Mic className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Volume and Secondary Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const audio = audioRef.current;
                if (!audio) return;
                if (isMuted) {
                  audio.volume = volume[0] / 100;
                  setIsMuted(false);
                } else {
                  audio.volume = 0;
                  setIsMuted(true);
                }
              }}
              className="text-text-secondary hover:text-foreground"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={(value) => {
                const audio = audioRef.current;
                if (!audio) return;
                setVolume(value);
                const volumeValue = value[0] / 100;
                audio.volume = volumeValue;
                if (gainNodeRef.current) {
                  gainNodeRef.current.gain.setValueAtTime(volumeValue, audioContextRef.current?.currentTime || 0);
                }
                setIsMuted(value[0] === 0);
              }}
              max={100}
              step={1}
              className="w-32"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSpatialAudio(!spatialAudio)}
              className={`text-text-secondary hover:text-foreground ${spatialAudio ? 'text-accent' : ''}`}
            >
              <Headphones className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAiEnhancement(!aiEnhancement)}
              className={`text-text-secondary hover:text-foreground ${aiEnhancement ? 'text-accent' : ''}`}
            >
              <Brain className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={shareAudio}
              className="text-text-secondary hover:text-foreground"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={downloadAudio}
              className="text-text-secondary hover:text-foreground"
            >
              <Download className="w-4 h-4" />
            </Button>

            <Popover open={showSettings} onOpenChange={setShowSettings}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-text-secondary hover:text-foreground"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 glass-effect border-border-light max-h-96 overflow-y-auto">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="effects">Effects</TabsTrigger>
                    <TabsTrigger value="spatial">3D</TabsTrigger>
                    <TabsTrigger value="ai">AI</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <h4 className="font-medium text-foreground">Basic Settings</h4>
                    
                    <div className="space-y-2">
                      <Label>Playback Speed</Label>
                      <Select value={playbackRate.toString()} onValueChange={(value) => {
                        setPlaybackRate(parseFloat(value));
                        if (audioRef.current) audioRef.current.playbackRate = parseFloat(value);
                      }}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.25">0.25x</SelectItem>
                          <SelectItem value="0.5">0.5x</SelectItem>
                          <SelectItem value="0.75">0.75x</SelectItem>
                          <SelectItem value="1">1x</SelectItem>
                          <SelectItem value="1.25">1.25x</SelectItem>
                          <SelectItem value="1.5">1.5x</SelectItem>
                          <SelectItem value="2">2x</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Audio Quality</Label>
                      <Select value={quality} onValueChange={setQuality}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="master">Master</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Download Format</Label>
                      <Select value={audioFormat} onValueChange={setAudioFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mp3">MP3</SelectItem>
                          <SelectItem value="wav">WAV</SelectItem>
                          <SelectItem value="flac">FLAC</SelectItem>
                          <SelectItem value="aiff">AIFF</SelectItem>
                          <SelectItem value="dsd">DSD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Auto Stop Timer</Label>
                      <Switch checked={autoStop} onCheckedChange={setAutoStop} />
                    </div>
                    
                    {autoStop && (
                      <div className="space-y-2">
                        <Label>Stop after {autoStopTime[0]} minutes</Label>
                        <Slider
                          value={autoStopTime}
                          onValueChange={setAutoStopTime}
                          min={5}
                          max={180}
                          step={5}
                        />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="effects" className="space-y-4">
                    <h4 className="font-medium text-foreground">Audio Effects</h4>
                    
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Bass ({bassBoost[0]}dB)</Label>
                        <Slider value={bassBoost} onValueChange={setBassBoost} min={-15} max={15} step={0.5} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Mid ({midBoost[0]}dB)</Label>
                        <Slider value={midBoost} onValueChange={setMidBoost} min={-15} max={15} step={0.5} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Treble ({trebleBoost[0]}dB)</Label>
                        <Slider value={trebleBoost} onValueChange={setTrebleBoost} min={-15} max={15} step={0.5} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Balance</Label>
                        <Slider value={balance} onValueChange={setBalance} min={-100} max={100} step={1} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Reverb ({reverb[0]}%)</Label>
                        <Slider value={reverb} onValueChange={setReverb} min={0} max={100} step={1} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Echo ({echo[0]}ms)</Label>
                        <Slider value={echo} onValueChange={setEcho} min={0} max={1000} step={10} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Compressor ({compressor[0]}%)</Label>
                        <Slider value={compressor} onValueChange={setCompressor} min={0} max={100} step={1} />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="spatial" className="space-y-4">
                    <h4 className="font-medium text-foreground">3D Spatial Audio</h4>
                    
                    <div className="flex items-center justify-between">
                      <Label>Spatial Audio</Label>
                      <Switch checked={spatialAudio} onCheckedChange={setSpatialAudio} />
                    </div>
                    
                    {spatialAudio && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Room Size ({roomSize[0]}%)</Label>
                          <Slider value={roomSize} onValueChange={setRoomSize} min={0} max={100} step={1} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Position X ({positioning.x[0]})</Label>
                          <Slider 
                            value={positioning.x} 
                            onValueChange={(value) => setPositioning(prev => ({...prev, x: value}))} 
                            min={-10} max={10} step={0.1} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Position Y ({positioning.y[0]})</Label>
                          <Slider 
                            value={positioning.y} 
                            onValueChange={(value) => setPositioning(prev => ({...prev, y: value}))} 
                            min={-10} max={10} step={0.1} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Position Z ({positioning.z[0]})</Label>
                          <Slider 
                            value={positioning.z} 
                            onValueChange={(value) => setPositioning(prev => ({...prev, z: value}))} 
                            min={-10} max={10} step={0.1} 
                          />
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="ai" className="space-y-4">
                    <h4 className="font-medium text-foreground">AI Features</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>AI Enhancement</Label>
                        <Switch checked={aiEnhancement} onCheckedChange={setAiEnhancement} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Adaptive EQ</Label>
                        <Switch checked={adaptiveEQ} onCheckedChange={setAdaptiveEQ} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Intelligent Mastering</Label>
                        <Switch checked={intelligentMastering} onCheckedChange={setIntelligentMastering} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Mood Detection</Label>
                        <Switch checked={moodDetection} onCheckedChange={setMoodDetection} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Personalized Tuning</Label>
                        <Switch checked={personalizedTuning} onCheckedChange={setPersonalizedTuning} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Brainwave Sync</Label>
                        <Switch checked={brainwaveSync} onCheckedChange={setBrainwaveSync} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Biofeedback</Label>
                        <Switch checked={biofeedback} onCheckedChange={setBiofeedback} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Heart Rate Sync</Label>
                        <Switch checked={heartRateSync} onCheckedChange={setHeartRateSync} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Breathing Sync</Label>
                        <Switch checked={breathingSync} onCheckedChange={setBreathingSync} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Circadian Sync</Label>
                        <Switch checked={circadianSync} onCheckedChange={setCircadianSync} />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </Card>
  );
};
