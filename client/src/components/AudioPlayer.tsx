
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Settings, Download, Share2, Heart, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AudioPlayerProps {
  toneName: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayer = ({ toneName, isPlaying, onTogglePlay }: AudioPlayerProps) => {
  const [volume, setVolume] = useState([80]);
  const [progress, setProgress] = useState([0]);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setShuffle] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [bassBoost, setBassBoost] = useState([0]);
  const [trebleBoost, setTrebleBoost] = useState([0]);
  const [balance, setBalance] = useState([0]);
  const [fadeInOut, setFadeInOut] = useState(false);
  const [autoStop, setAutoStop] = useState(false);
  const [autoStopTime, setAutoStopTime] = useState([30]);
  const [showSettings, setShowSettings] = useState(false);
  const [visualizerEnabled, setVisualizerEnabled] = useState(true);
  const [audioFormat, setAudioFormat] = useState("mp3");
  const [sessionCount, setSessionCount] = useState(0);
  const [totalPlayTime, setTotalPlayTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const bassFilterRef = useRef<BiquadFilterNode | null>(null);
  const trebleFilterRef = useRef<BiquadFilterNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const autoStopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate demo URL with format support
  const audioUrl = `https://www.soundjay.com/misc/sounds/bell-ringing-05.wav`;

  // Initialize Web Audio API for advanced features
  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      if (audioRef.current) {
        const source = audioContextRef.current.createMediaElementSource(audioRef.current);
        
        // Create audio nodes
        gainNodeRef.current = audioContextRef.current.createGain();
        bassFilterRef.current = audioContextRef.current.createBiquadFilter();
        trebleFilterRef.current = audioContextRef.current.createBiquadFilter();
        analyserRef.current = audioContextRef.current.createAnalyser();
        
        // Configure filters
        bassFilterRef.current.type = 'lowshelf';
        bassFilterRef.current.frequency.setValueAtTime(320, audioContextRef.current.currentTime);
        
        trebleFilterRef.current.type = 'highshelf';
        trebleFilterRef.current.frequency.setValueAtTime(3200, audioContextRef.current.currentTime);
        
        // Connect audio graph
        source.connect(bassFilterRef.current);
        bassFilterRef.current.connect(trebleFilterRef.current);
        trebleFilterRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }
    }
  }, []);

  // Audio visualizer
  useEffect(() => {
    if (!visualizerEnabled || !analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!ctx || !canvas) return;
      
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      
      ctx.fillStyle = 'rgba(15, 12, 41, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(1, '#ec4899');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
    };
    
    if (isPlaying) {
      draw();
    }
  }, [isPlaying, visualizerEnabled]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress([(audio.currentTime / audio.duration) * 100]);
      setTotalPlayTime(prev => prev + 1);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        onTogglePlay();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeat, onTogglePlay]);

  // Playback control
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      audio.play().catch(console.error);
      setSessionCount(prev => prev + 1);
      
      if (autoStop) {
        autoStopTimeoutRef.current = setTimeout(() => {
          onTogglePlay();
        }, autoStopTime[0] * 60 * 1000);
      }
    } else {
      audio.pause();
      if (autoStopTimeoutRef.current) {
        clearTimeout(autoStopTimeoutRef.current);
        autoStopTimeoutRef.current = null;
      }
    }
  }, [isPlaying, autoStop, autoStopTime, onTogglePlay]);

  // Audio effects
  useEffect(() => {
    if (bassFilterRef.current) {
      bassFilterRef.current.gain.setValueAtTime(bassBoost[0], audioContextRef.current?.currentTime || 0);
    }
  }, [bassBoost]);

  useEffect(() => {
    if (trebleFilterRef.current) {
      trebleFilterRef.current.gain.setValueAtTime(trebleBoost[0], audioContextRef.current?.currentTime || 0);
    }
  }, [trebleBoost]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setProgress(value);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setVolume(value);
    const volumeValue = value[0] / 100;
    audio.volume = volumeValue;
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volumeValue, audioContextRef.current?.currentTime || 0);
    }
    
    setIsMuted(value[0] === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume[0] / 100;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const resetTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = 0;
    setProgress([0]);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = Math.min(audio.currentTime + 15, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = Math.max(audio.currentTime - 15, 0);
  };

  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${toneName}.${audioFormat}`;
    link.click();
  };

  const shareAudio = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `VitalTones™ - ${toneName}`,
          text: `Listen to this amazing binaural beat: ${toneName}`,
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="glass-effect p-6 animate-scale-in">
      <audio
        ref={audioRef}
        src={audioUrl}
        loop={isRepeat}
        preload="metadata"
      />
      
      <div className="space-y-6">
        {/* Track Info */}
        <div className="text-center">
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
          </h3>
          <p className="text-sm text-text-secondary">Binaural Beat Therapy</p>
          <div className="text-xs text-text-secondary mt-1">
            Sessions: {sessionCount} • Total time: {Math.floor(totalPlayTime / 60)}m
          </div>
        </div>

        {/* Visualizer */}
        {visualizerEnabled && (
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              width={300}
              height={60}
              className="rounded-lg bg-gradient-to-r from-purple-900/20 to-pink-900/20"
            />
          </div>
        )}

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={progress}
            onValueChange={handleProgressChange}
            max={100}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-text-secondary">
            <span>{formatTime(currentTime)}</span>
            <span>Rate: {playbackRate}x</span>
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
            onClick={skipBackward}
            className="text-text-secondary hover:text-foreground"
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={resetTrack}
            className="text-text-secondary hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          <Button
            onClick={onTogglePlay}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground rounded-full w-14 h-14 p-0 pulse-glow"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Play className="w-7 h-7 ml-1" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={skipForward}
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
        </div>

        {/* Volume and Secondary Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-text-secondary hover:text-foreground"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-24"
            />
          </div>

          <div className="flex items-center space-x-2">
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
              <PopoverContent className="w-80 glass-effect border-border-light">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Audio Settings</h4>
                  
                  {/* Playback Speed */}
                  <div className="space-y-2">
                    <Label>Playback Speed</Label>
                    <Select value={playbackRate.toString()} onValueChange={(value) => setPlaybackRate(parseFloat(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">0.5x</SelectItem>
                        <SelectItem value="0.75">0.75x</SelectItem>
                        <SelectItem value="1">1x</SelectItem>
                        <SelectItem value="1.25">1.25x</SelectItem>
                        <SelectItem value="1.5">1.5x</SelectItem>
                        <SelectItem value="2">2x</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* EQ Controls */}
                  <div className="space-y-3">
                    <Label>Equalizer</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bass</span>
                        <span className="text-xs text-text-secondary">{bassBoost[0]}dB</span>
                      </div>
                      <Slider
                        value={bassBoost}
                        onValueChange={setBassBoost}
                        min={-12}
                        max={12}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Treble</span>
                        <span className="text-xs text-text-secondary">{trebleBoost[0]}dB</span>
                      </div>
                      <Slider
                        value={trebleBoost}
                        onValueChange={setTrebleBoost}
                        min={-12}
                        max={12}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Balance</span>
                        <span className="text-xs text-text-secondary">
                          {balance[0] === 0 ? 'Center' : balance[0] > 0 ? `R${balance[0]}` : `L${Math.abs(balance[0])}`}
                        </span>
                      </div>
                      <Slider
                        value={balance}
                        onValueChange={setBalance}
                        min={-10}
                        max={10}
                        step={1}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Auto Features */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Fade In/Out</Label>
                      <Switch checked={fadeInOut} onCheckedChange={setFadeInOut} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Auto Stop Timer</Label>
                      <Switch checked={autoStop} onCheckedChange={setAutoStop} />
                    </div>
                    
                    {autoStop && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Stop after</span>
                          <span className="text-xs text-text-secondary">{autoStopTime[0]} min</span>
                        </div>
                        <Slider
                          value={autoStopTime}
                          onValueChange={setAutoStopTime}
                          min={5}
                          max={120}
                          step={5}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Label>Audio Visualizer</Label>
                      <Switch checked={visualizerEnabled} onCheckedChange={setVisualizerEnabled} />
                    </div>
                  </div>

                  <Separator />

                  {/* Download Format */}
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
                        <SelectItem value="ogg">OGG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </Card>
  );
};
