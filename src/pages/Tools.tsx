import React, { useState, useEffect, useRef } from "react";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Monitor, Clock, Volume2, Play, Pause, RotateCcw, VolumeX, Calculator, FileText, Palette, DollarSign, Percent, TrendingUp, PiggyBank, Link, Scissors, Image, QrCode, Hash, Globe, Zap, Type, Calendar, Timer, Ruler, Eye, EyeOff, Download, Upload, Copy, CheckCircle, RefreshCw, Search, Filter, Clipboard, Camera, FileCode, Binary, Repeat, MapPin, Server, Wifi, CheckSquare, Clock3, Target, ArrowUpDown, Building, Trash // <-- Add Trash here
} from "lucide-react";

const Tools = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Tools", icon: Filter },
    { id: "productivity", name: "Productivity", icon: Zap },
    { id: "finance", name: "Financial", icon: DollarSign },
    { id: "utility", name: "Utility", icon: Calculator },
    { id: "image", name: "Image", icon: Image },
    { id: "text", name: "Text", icon: Type },
    { id: "screen", name: "Screen", icon: Monitor },
    { id: "automation", name: "Automation", icon: RefreshCw },
    { id: "web", name: "Web", icon: Globe },
  ];

  const allTools = [
    // Productivity Tools
    { component: KeepAwakeTool, category: "screen", searchTerms: ["keep", "awake", "screen", "sleep", "prevent"] },
    { component: PomodoroTool, category: "productivity", searchTerms: ["pomodoro", "timer", "focus", "work", "break"] },
    { component: WhiteNoiseTool, category: "productivity", searchTerms: ["white", "noise", "focus", "sound", "ambient"] },
    { component: TodoListTool, category: "productivity", searchTerms: ["todo", "task", "list", "productivity", "organize"] },
    { component: NoteTakingTool, category: "text", searchTerms: ["note", "text", "write", "memo", "document"] },
    { component: PasswordGeneratorTool, category: "utility", searchTerms: ["password", "generate", "secure", "random", "security"] },
    
    // Financial Tools
    { component: LoanCalculatorTool, category: "finance", searchTerms: ["loan", "calculator", "payment", "interest", "mortgage"] },
    { component: BudgetCalculatorTool, category: "finance", searchTerms: ["budget", "calculator", "money", "finance", "planning"] },
    { component: CompoundInterestTool, category: "finance", searchTerms: ["compound", "interest", "investment", "savings", "growth"] },
    { component: TipCalculatorTool, category: "finance", searchTerms: ["tip", "calculator", "restaurant", "service", "bill"] },
    { component: CurrencyConverterTool, category: "finance", searchTerms: ["currency", "converter", "exchange", "rate", "money"] },
    { component: TaxCalculatorTool, category: "finance", searchTerms: ["tax", "calculator", "income", "deduction", "irs"] },
    
    // Utility Tools
    { component: CalculatorTool, category: "utility", searchTerms: ["calculator", "math", "calculation", "arithmetic"] },
    { component: ColorPickerTool, category: "utility", searchTerms: ["color", "picker", "hex", "rgb", "palette"] },
    { component: WordCounterTool, category: "text", searchTerms: ["word", "counter", "text", "character", "count"] },
    { component: QRCodeGeneratorTool, category: "utility", searchTerms: ["qr", "code", "generator", "barcode", "scan"] },
    { component: HashGeneratorTool, category: "utility", searchTerms: ["hash", "generator", "md5", "sha", "encryption"] },
    { component: UUIDGeneratorTool, category: "utility", searchTerms: ["uuid", "generator", "unique", "identifier", "id"] },
    
    // Image Tools
    { component: ImageResizerTool, category: "image", searchTerms: ["image", "resize", "photo", "dimension", "scale"] },
    { component: ImageCompressorTool, category: "image", searchTerms: ["image", "compress", "optimize", "size", "reduce"] },
    { component: Base64EncoderTool, category: "utility", searchTerms: ["base64", "encode", "decode", "convert", "string"] },
    
    // Text Tools
    { component: TextCaseConverterTool, category: "text", searchTerms: ["text", "case", "convert", "upper", "lower", "title"] },
    { component: LoremIpsumTool, category: "text", searchTerms: ["lorem", "ipsum", "placeholder", "dummy", "text"] },
    { component: TextDiffTool, category: "text", searchTerms: ["text", "diff", "compare", "difference", "merge"] },
    
    // Web Tools
    { component: URLShortenerTool, category: "web", searchTerms: ["url", "shortener", "link", "shorten", "tiny"] },
    { component: JSONFormatterTool, category: "web", searchTerms: ["json", "formatter", "validate", "pretty", "parse"] },
    { component: URLEncoderTool, category: "web", searchTerms: ["url", "encode", "decode", "percent", "escape"] },
    { component: HTMLEncoderTool, category: "web", searchTerms: ["html", "encode", "decode", "entities", "escape"] },
    
    // Screen & Automation Tools
    { component: ScreenshotTool, category: "screen", searchTerms: ["screenshot", "capture", "screen", "image", "download"] },
    { component: ClipboardManagerTool, category: "automation", searchTerms: ["clipboard", "copy", "paste", "history", "manager"] },
    { component: TimestampTool, category: "utility", searchTerms: ["timestamp", "unix", "time", "date", "epoch"] },
    { component: CountdownTimerTool, category: "productivity", searchTerms: ["countdown", "timer", "alarm", "reminder", "time"] },
    
    // Additional Popular Tools
    { component: UnitConverterTool, category: "utility", searchTerms: ["unit", "converter", "measurement", "length", "weight"] },
    { component: RegexTesterTool, category: "text", searchTerms: ["regex", "regular", "expression", "pattern", "match"] },
    { component: IPLookupTool, category: "web", searchTerms: ["ip", "lookup", "address", "location", "geolocation"] },
    { component: DomainCheckerTool, category: "web", searchTerms: ["domain", "checker", "availability", "whois", "dns"] },
    
     ];

  const filteredTools = allTools.filter(tool => {
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      tool.searchTerms.some(term => term.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Daily Productivity Tools
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Essential tools to boost your productivity and simplify daily tasks
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
            
            <ToggleGroup type="single" value={selectedCategory} onValueChange={setSelectedCategory} className="flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <ToggleGroupItem
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium data-[state=on]:bg-blue-600 data-[state=on]:text-white hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {filteredTools.map((ToolComponent, index) => (
            <ToolComponent.component key={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-slate-600">No tools found matching your criteria.</p>
            <Button 
              onClick={() => { setSelectedCategory("all"); setSearchTerm(""); }}
              className="mt-4 btn-primary hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* AdSense Placeholder */}
        <div className="mt-16">
          <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
            <p className="text-slate-700 font-medium">AdSense Ad Placement</p>
            <p className="text-slate-500 text-sm mt-1">Bottom banner ad will appear here after approval</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Keep Awake Tool
const KeepAwakeTool = () => {
  const [isActive, setIsActive] = useState(false);
  const wakeLockRef = useRef<any>(null);

  const toggleAwake = async () => {
    if (!isActive) {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
          setIsActive(true);
        } else {
          // Fallback: create invisible video element
          const video = document.createElement('video');
          video.setAttribute('muted', '');
          video.setAttribute('playsinline', '');
          video.style.position = 'absolute';
          video.style.opacity = '0';
          video.style.pointerEvents = 'none';
          document.body.appendChild(video);
          
          const canvas = document.createElement('canvas');
          canvas.width = 1;
          canvas.height = 1;
          const ctx = canvas.getContext('2d');
          ctx!.fillRect(0, 0, 1, 1);
          
          const stream = canvas.captureStream(1);
          video.srcObject = stream;
          video.play();
          
          wakeLockRef.current = { video, release: () => video.remove() };
          setIsActive(true);
        }
      } catch (err) {
        console.error('Failed to acquire wake lock:', err);
      }
    } else {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
      setIsActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
      }
    };
  }, []);

  return (
    <Card className="tool-card card-hover">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <Monitor className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Keep Screen Awake</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Prevent your screen from going to sleep during important tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className={`p-6 rounded-lg border-2 transition-all duration-300 ${isActive ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-slate-50'}`}>
          <p className="text-sm font-medium mb-2 text-slate-700">Status:</p>
          <p className={`text-lg font-bold ${isActive ? 'text-green-600' : 'text-slate-500'}`}>
            {isActive ? 'Screen Staying Awake' : 'Normal Sleep Mode'}
          </p>
        </div>
        <Button
          onClick={toggleAwake}
          className={`text-lg px-8 py-3 min-w-[200px] font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${
            isActive 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isActive ? 'Stop Keeping Awake' : 'Keep Screen Awake'}
        </Button>
      </CardContent>
    </Card>
  );
};

// Pomodoro Timer Tool
const PomodoroTool = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          setIsActive(false);
          setIsBreak(!isBreak);
          return isBreak ? 25 * 60 : 5 * 60;
        }
        return time - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Card className="tool-card card-hover">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <Clock className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Pomodoro Timer</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          25-minute focused work sessions with 5-minute breaks
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="p-8 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-sm font-medium mb-2 text-slate-700">
            {isBreak ? 'Break Time' : 'Focus Time'}
          </p>
          <p className="text-6xl font-bold font-mono text-blue-600 mb-4">
            {formatTime(timeLeft)}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={isActive ? pauseTimer : startTimer}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              {isActive ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button
              onClick={resetTimer}
              className="bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 px-6 py-3 font-semibold transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// White Noise Tool with Working Audio
const WhiteNoiseTool = () => {
  // White Noise Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentSound, setCurrentSound] = useState<'white' | 'pink' | 'brown'>('white');
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const sounds = [
    { id: 'white' as const, name: 'White Noise', description: 'Pure white noise' },
    { id: 'pink' as const, name: 'Pink Noise', description: 'Softer, warmer noise' },
    { id: 'brown' as const, name: 'Brown Noise', description: 'Deep, low-frequency noise' },
  ];

  const generateNoise = (type: 'white' | 'pink' | 'brown') => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    const bufferSize = audioContext.sampleRate * 2;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }
    } else if (type === 'brown') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
    }

    const bufferSource = audioContext.createBufferSource();
    bufferSource.buffer = noiseBuffer;
    bufferSource.loop = true;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;

    bufferSource.connect(gainNode);
    gainNode.connect(audioContext.destination);

    return { bufferSource, gainNode };
  };

  const toggleWhiteNoise = () => {
    if (isPlaying) {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
        gainNodeRef.current = null;
      }
      setIsPlaying(false);
    } else {
      const { bufferSource, gainNode } = generateNoise(currentSound);
      bufferSource.start();
      oscillatorRef.current = bufferSource as any; // Type assertion for compatibility
      gainNodeRef.current = gainNode;
      setIsPlaying(true);
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume;
    }
  };

  const changeSoundType = (type: 'white' | 'pink' | 'brown') => {
    const wasPlaying = isPlaying;
    if (isPlaying) {
      toggleWhiteNoise(); // Stop current sound
    }
    setCurrentSound(type);
    if (wasPlaying) {
      setTimeout(() => toggleWhiteNoise(), 100); // Start new sound
    }
  };

  return (
    <Card className="tool-card card-hover">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <Volume2 className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">White Noise Player</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Ambient sounds to help you focus and block out distractions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sound Selection */}
        <div>
          <h3 className="font-semibold mb-3 text-slate-900">Choose Your Sound</h3>
          <div className="grid grid-cols-3 gap-3">
            {sounds.map((sound) => (
              <Button
                key={sound.id}
                onClick={() => changeSoundType(sound.id)}
                variant={currentSound === sound.id ? "default" : "outline"}
                className={`text-left flex-col h-auto p-4 transition-all font-medium hover:shadow-md ${
                  currentSound === sound.id 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'border-slate-300 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
                }`}
              >
                <span className="font-semibold">{sound.name}</span>
                <span className="text-xs opacity-80">{sound.description}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Volume Control */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-slate-900">Volume</label>
            <span className="text-sm text-slate-600 font-medium">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={changeVolume}
            className="volume-slider"
          />
        </div>

        {/* Play Controls */}
        <div className="text-center">
          <Button
            onClick={toggleWhiteNoise}
            className={`text-lg px-8 py-3 min-w-[200px] font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${
              isPlaying 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <VolumeX className="h-5 w-5 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Play {sounds.find(s => s.id === currentSound)?.name}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Word Counter Tool
const WordCounterTool = () => {
  const [text, setText] = useState('');
  
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  const paragraphCount = text.trim() === '' ? 0 : text.split(/\n\s*\n/).length;

  return (
    <Card className="tool-card card-hover">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <FileText className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Word Counter</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Count words, characters, and paragraphs in your text
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-32 p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-200 hover:bg-blue-100 transition-colors">
            <p className="text-2xl font-bold text-blue-600">{wordCount}</p>
            <p className="text-sm text-slate-600">Words</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200 hover:bg-green-100 transition-colors">
            <p className="text-2xl font-bold text-green-600">{charCount}</p>
            <p className="text-sm text-slate-600">Characters</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center border border-purple-200 hover:bg-purple-100 transition-colors">
            <p className="text-2xl font-bold text-purple-600">{charCountNoSpaces}</p>
            <p className="text-sm text-slate-600">No Spaces</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg text-center border border-orange-200 hover:bg-orange-100 transition-colors">
            <p className="text-2xl font-bold text-orange-600">{paragraphCount}</p>
            <p className="text-sm text-slate-600">Paragraphs</p>
          </div>
        </div>
        <Button 
          onClick={() => setText('')}
          className="bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 w-full font-medium transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Clear Text
        </Button>
      </CardContent>
    </Card>
  );
};

// Calculator Tool
const CalculatorTool = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = previousValue || '0';
      const newValue = calculate(currentValue, display, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(String(newValue));
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: string, secondValue: string, operation: string): number => {
    const prev = parseFloat(firstValue);
    const next = parseFloat(secondValue);

    switch (operation) {
      case '+':
        return prev + next;
      case '-':
        return prev - next;
      case '×':
        return prev * next;
      case '÷':
        return prev / next;
      default:
        return next;
    }
  };

  const performCalculation = () => {
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, display, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  return (
    <Card className="tool-card card-hover">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <Calculator className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Calculator</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Simple calculator for quick calculations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-slate-900 text-white p-4 rounded-lg text-right text-2xl font-mono">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={clear} className="calc-btn calc-btn-clear col-span-2">C</Button>
          <Button onClick={() => inputOperation('÷')} className="calc-btn calc-btn-operator">÷</Button>
          <Button onClick={() => inputOperation('×')} className="calc-btn calc-btn-operator">×</Button>
          
          <Button onClick={() => inputNumber('7')} className="calc-btn calc-btn-number">7</Button>
          <Button onClick={() => inputNumber('8')} className="calc-btn calc-btn-number">8</Button>
          <Button onClick={() => inputNumber('9')} className="calc-btn calc-btn-number">9</Button>
          <Button onClick={() => inputOperation('-')} className="calc-btn calc-btn-operator">-</Button>
          
          <Button onClick={() => inputNumber('4')} className="calc-btn calc-btn-number">4</Button>
          <Button onClick={() => inputNumber('5')} className="calc-btn calc-btn-number">5</Button>
          <Button onClick={() => inputNumber('6')} className="calc-btn calc-btn-number">6</Button>
          <Button onClick={() => inputOperation('+')} className="calc-btn calc-btn-operator">+</Button>
          
          <Button onClick={() => inputNumber('1')} className="calc-btn calc-btn-number">1</Button>
          <Button onClick={() => inputNumber('2')} className="calc-btn calc-btn-number">2</Button>
          <Button onClick={() => inputNumber('3')} className="calc-btn calc-btn-number">3</Button>
          <Button onClick={performCalculation} className="calc-btn calc-btn-equals row-span-2">=</Button>
          
          <Button onClick={() => inputNumber('0')} className="calc-btn calc-btn-number col-span-2">0</Button>
          <Button onClick={() => inputNumber('.')} className="calc-btn calc-btn-number">.</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Color Picker Tool
const ColorPickerTool = () => {
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [colorHistory, setColorHistory] = useState<string[]>(['#3b82f6']);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    if (!colorHistory.includes(newColor)) {
      setColorHistory(prev => [newColor, ...prev.slice(0, 7)]);
    }
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : null;
  };

  return (
    <Card className="tool-card card-hover">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <Palette className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Color Picker</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Pick colors and get hex, RGB values instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="w-24 h-24 rounded-lg border-2 border-slate-300 cursor-pointer hover:border-blue-400 transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
            <span className="font-medium text-slate-700">HEX:</span>
            <code className="bg-white px-2 py-1 rounded border text-slate-900">{selectedColor}</code>
            <Button size="sm" onClick={() => copyToClipboard(selectedColor)} className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              Copy
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
            <span className="font-medium text-slate-700">RGB:</span>
            <code className="bg-white px-2 py-1 rounded border text-slate-900">{hexToRgb(selectedColor)}</code>
            <Button size="sm" onClick={() => copyToClipboard(hexToRgb(selectedColor) || '')} className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              Copy
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-slate-900">Recent Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colorHistory.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className="w-8 h-8 rounded border-2 border-slate-300 hover:border-blue-400 transition-all hover:scale-110"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// New Financial Tools
const LoanCalculatorTool = () => {
  const [loanAmount, setLoanAmount] = useState(100000); // INR default
  const [interestRate, setInterestRate] = useState(8);  // Typical Indian rate
  const [loanTerm, setLoanTerm] = useState(60);         // 5 years
  
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = monthlyRate === 0 
    ? loanAmount / loanTerm 
    : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - loanAmount;

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <DollarSign className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Loan Calculator</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Calculate monthly payments and total interest
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Loan Amount (₹)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              step="0.1"
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Loan Term (months)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
            <p className="text-2xl font-bold text-blue-600">₹{monthlyPayment.toFixed(2)}</p>
            <p className="text-sm text-slate-600">Monthly Payment</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
            <p className="text-2xl font-bold text-green-600">₹{totalInterest.toFixed(2)}</p>
            <p className="text-sm text-slate-600">Total Interest</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BudgetCalculatorTool = () => {
  const [income, setIncome] = useState(50000); // INR default
  const [needs, setNeeds] = useState(25000);
  const [wants, setWants] = useState(15000);
  const [savings, setSavings] = useState(10000);
  
  const total = needs + wants + savings;
  const remaining = income - total;
  const needsPercent = (needs / income * 100).toFixed(1);
  const wantsPercent = (wants / income * 100).toFixed(1);
  const savingsPercent = (savings / income * 100).toFixed(1);

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <PiggyBank className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Budget Calculator</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Plan your monthly budget with the 50/30/20 rule
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Income (₹)</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Needs ({needsPercent}%)</label>
            <input
              type="number"
              value={needs}
              onChange={(e) => setNeeds(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Wants ({wantsPercent}%)</label>
            <input
              type="number"
              value={wants}
              onChange={(e) => setWants(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Savings ({savingsPercent}%)</label>
            <input
              type="number"
              value={savings}
              onChange={(e) => setSavings(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className={`p-4 rounded-lg text-center border-2 ${remaining >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{remaining.toFixed(2)}
          </p>
          <p className="text-sm text-slate-600">{remaining >= 0 ? 'Remaining' : 'Over Budget'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const CompoundInterestTool = () => {
  const [principal, setPrincipal] = useState(100000); // INR default
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(10);
  
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  
  // Calculate compound interest with monthly contributions
  const futureValue = principal * Math.pow(1 + monthlyRate, totalMonths) + 
    monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  
  const totalContributions = principal + (monthlyContribution * totalMonths);
  const totalInterest = futureValue - totalContributions;

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <TrendingUp className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Compound Interest Calculator</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          See how your money grows over time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Initial Amount (₹)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Addition (₹)</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Annual Return (%)</label>
            <input
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              step="0.1"
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Years</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
            <p className="text-3xl font-bold text-blue-600">₹{futureValue.toFixed(2)}</p>
            <p className="text-sm text-slate-600">Future Value</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200">
              <p className="text-xl font-bold text-green-600">₹{totalContributions.toFixed(2)}</p>
              <p className="text-xs text-slate-600">Total Contributions</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center border border-purple-200">
              <p className="text-xl font-bold text-purple-600">₹{totalInterest.toFixed(2)}</p>
              <p className="text-xs text-slate-600">Interest Earned</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TipCalculatorTool = () => {
  const [billAmount, setBillAmount] = useState(1000); // INR default
  const [tipPercent, setTipPercent] = useState(18);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  
  const tipAmount = billAmount * (tipPercent / 100);
  const totalAmount = billAmount + tipAmount;
  const perPerson = totalAmount / numberOfPeople;

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <Percent className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Tip Calculator</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Calculate tips and split bills easily
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bill Amount (₹)</label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(Number(e.target.value))}
              step="0.01"
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tip Percentage (%)</label>
            <div className="flex gap-2 mb-2">
              {[15, 18, 20, 25].map(percent => (
                <Button
                  key={percent}
                  onClick={() => setTipPercent(percent)}
                  variant={tipPercent === percent ? "default" : "outline"}
                  size="sm"
                  className={tipPercent === percent ? "bg-blue-600 text-white" : ""}
                >
                  {percent}%
                </Button>
              ))}
            </div>
            <input
              type="number"
              value={tipPercent}
              onChange={(e) => setTipPercent(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Number of People</label>
            <input
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(Number(e.target.value))}
              min="1"
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
            <p className="text-2xl font-bold text-blue-600">₹{tipAmount.toFixed(2)}</p>
            <p className="text-sm text-slate-600">Tip Amount</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200">
              <p className="text-xl font-bold text-green-600">₹{totalAmount.toFixed(2)}</p>
              <p className="text-xs text-slate-600">Total Bill</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center border border-purple-200">
              <p className="text-xl font-bold text-purple-600">₹{perPerson.toFixed(2)}</p>
              <p className="text-xs text-slate-600">Per Person</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// URL Shortener Tool
const URLShortenerTool = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isShortened, setIsShortened] = useState(false);

  const shortenUrl = () => {
    if (longUrl.trim()) {
      // Simple mock URL shortener
      const hash = Math.random().toString(36).substring(7);
      setShortUrl(`https://short.ly/${hash}`);
      setIsShortened(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <Link className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">URL Shortener</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Create short links from long URLs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Enter URL to shorten</label>
          <input
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com/very-long-url..."
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <Button onClick={shortenUrl} className="btn-primary w-full" disabled={!longUrl.trim()}>
          <Scissors className="h-4 w-4 mr-2" />
          Shorten URL
        </Button>

        {isShortened && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-slate-700 mb-2">Shortened URL:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white p-2 rounded border text-slate-900 text-sm">{shortUrl}</code>
              <Button size="sm" onClick={copyToClipboard} className="btn-primary">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// QR Code Generator Tool
const QRCodeGeneratorTool = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const generateQR = () => {
    if (text.trim()) {
      // Mock QR code generation (in real app, you'd use a QR library)
      setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`);
    }
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <QrCode className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">QR Code Generator</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Generate QR codes for text, URLs, and more
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Enter text or URL</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text, URL, or data..."
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <Button onClick={generateQR} className="btn-primary w-full" disabled={!text.trim()}>
          Generate QR Code
        </Button>

        {qrCode && (
          <div className="text-center">
            <img src={qrCode} alt="QR Code" className="mx-auto border border-slate-300 rounded-lg" />
            <Button className="btn-secondary mt-4" onClick={() => window.open(qrCode, '_blank')}>
              <Download className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Password Generator Tool
const PasswordGeneratorTool = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);

  const generatePassword = () => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <Zap className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Password Generator</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Generate secure passwords with custom settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password Length: {length}</label>
          <input
            type="range"
            min="4"
            max="50"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="volume-slider"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Lowercase</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Uppercase</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Numbers</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Symbols</span>
          </label>
        </div>

        <Button onClick={generatePassword} className="btn-primary w-full">
          Generate Password
        </Button>

        {password && (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white p-2 rounded border text-slate-900 break-all">{password}</code>
              <Button size="sm" onClick={copyToClipboard} className="btn-primary">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Text Case Converter Tool
const TextCaseConverterTool = () => {
  const [text, setText] = useState('');

  const convertCase = (type: string) => {
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'title':
        setText(text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        ));
        break;
      case 'sentence':
        setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());
        break;
    }
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <Type className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Text Case Converter</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Convert text between different cases
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-32 p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => convertCase('upper')} className="btn-secondary">
            UPPERCASE
          </Button>
          <Button onClick={() => convertCase('lower')} className="btn-secondary">
            lowercase
          </Button>
          <Button onClick={() => convertCase('title')} className="btn-secondary">
            Title Case
          </Button>
          <Button onClick={() => convertCase('sentence')} className="btn-secondary">
            Sentence case
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Hash Generator Tool
const HashGeneratorTool = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<{[key: string]: string}>({});

  const generateHashes = async () => {
    if (!input.trim()) return;
    
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    
    try {
      const sha256Hash = await crypto.subtle.digest('SHA-256', data);
      const sha256Hex = Array.from(new Uint8Array(sha256Hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      // Simple MD5-like hash (not cryptographically secure)
      const simpleHash = Array.from(input)
        .reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) & 0xffffffff, 0)
        .toString(16);

      setHashes({
        'SHA-256': sha256Hex,
        'Simple Hash': simpleHash,
      });
    } catch (error) {
      console.error('Error generating hash:', error);
    }
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <Hash className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Hash Generator</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Generate MD5, SHA-256 and other hashes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Enter text to hash</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text..."
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <Button onClick={generateHashes} className="btn-primary w-full" disabled={!input.trim()}>
          Generate Hashes
        </Button>

        {Object.entries(hashes).map(([type, hash]) => (
          <div key={type} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-slate-700">{type}</span>
              <Button size="sm" onClick={() => copyHash(hash)} className="btn-primary">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <code className="block bg-white p-2 rounded border text-slate-900 text-xs break-all">{hash}</code>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// UUID Generator Tool
const UUIDGeneratorTool = () => {
  const [uuid, setUuid] = useState('');

  const generateUUID = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    setUuid(uuid);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuid);
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <RefreshCw className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">UUID Generator</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Generate unique identifiers (UUID v4)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={generateUUID} className="btn-primary w-full">
          Generate UUID
        </Button>

        {uuid && (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white p-2 rounded border text-slate-900 break-all">{uuid}</code>
              <Button size="sm" onClick={copyToClipboard} className="btn-primary">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Todo List Tool
const TodoListTool = () => {
  const [todos, setTodos] = useState<{ text: string; done: boolean }[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input.trim(), done: false }]);
      setInput('');
    }
  };

  const toggleTodo = (idx: number) => {
    setTodos(todos.map((todo, i) => i === idx ? { ...todo, done: !todo.done } : todo));
  };

  const removeTodo = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <CheckSquare className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Todo List</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Simple todo list to organize your tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 border border-slate-300 rounded-lg"
            onKeyDown={e => e.key === 'Enter' && addTodo()}
          />
          <Button onClick={addTodo} className="btn-primary">Add</Button>
        </div>
        <ul className="space-y-2">
          {todos.length === 0 && <li className="text-slate-500">No tasks yet.</li>}
          {todos.map((todo, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(idx)}
                className="accent-blue-600"
              />
              <span className={`flex-1 ${todo.done ? 'line-through text-slate-400' : ''}`}>{todo.text}</span>
              <Button size="sm" variant="ghost" onClick={() => removeTodo(idx)}>
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// Note Taking Tool
const NoteTakingTool = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addNote = () => {
    if (input.trim()) {
      setNotes([input.trim(), ...notes]);
      setInput('');
    }
  };

  const removeNote = (idx: number) => {
    setNotes(notes.filter((_, i) => i !== idx));
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <FileText className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Note Taking</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Quick notes for ideas and reminders
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write a note..."
          className="w-full h-20 p-2 border border-slate-300 rounded-lg"
        />
        <Button onClick={addNote} className="btn-primary w-full">Add Note</Button>
        <ul className="space-y-2">
          {notes.length === 0 && <li className="text-slate-500">No notes yet.</li>}
          {notes.map((note, idx) => (
            <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded">
              <span className="flex-1">{note}</span>
              <Button size="sm" variant="ghost" onClick={() => removeNote(idx)}>
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// Currency Converter Tool
const CurrencyConverterTool = () => {
  const [amount, setAmount] = useState(1);
 
  const [from, setFrom] = useState('INR'); // Default to INR

  const [to, setTo] = useState('USD');     // You can also set to 'INR' if you want both as INR
  const [result, setResult] = useState<number | null>(null);

  // For demo, use static rates. In production, use an API.
  const rates: { [key: string]: number } = { USD: 1, EUR: 0.92, INR: 83.2, GBP: 0.79, JPY: 156.5 };

  const convert = () => {
    if (from === to) {
      setResult(amount);
    } else {
      setResult((amount / rates[from]) * rates[to]);
    }
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <DollarSign className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Currency Converter</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Convert between major currencies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            className="w-1/3 p-2 border border-slate-300 rounded-lg"
          />
          <select value={from} onChange={e => setFrom(e.target.value)} className="p-2 border border-slate-300 rounded-lg">
            {Object.keys(rates).map(cur => <option key={cur}>{cur}</option>)}
          </select>
          <span className="self-center">to</span>
          <select value={to} onChange={e => setTo(e.target.value)} className="p-2 border border-slate-300 rounded-lg">
            {Object.keys(rates).map(cur => <option key={cur}>{cur}</option>)}
          </select>
        </div>
        <Button onClick={convert} className="btn-primary w-full">Convert</Button>
        {result !== null && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
            <span className="text-2xl font-bold text-blue-600">{result.toFixed(2)} {to}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Tax Calculator Tool (simple US federal tax brackets for demo)
const TaxCalculatorTool = () => {
  const [income, setIncome] = useState(50000);
  const [tax, setTax] = useState<number | null>(null);

  const calculateTax = () => {
    // 2024 US federal tax brackets (single filer, simplified)
    let brackets = [
      { cap: 11000, rate: 0.10 },
      { cap: 44725, rate: 0.12 },
      { cap: 95375, rate: 0.22 },
      { cap: 182100, rate: 0.24 },
      { cap: 231250, rate: 0.32 },
      { cap: 578125, rate: 0.35 },
      { cap: Infinity, rate: 0.37 },
    ];
    let remaining = income;
    let owed = 0;
    let lastCap = 0;
    for (let b of brackets) {
      if (income > b.cap) {
        owed += (b.cap - lastCap) * b.rate;
        lastCap = b.cap;
      } else {
        owed += (remaining) * b.rate;
        break;
      }
    }
    setTax(owed);
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <div className="tool-icon">
          <Percent className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl text-slate-900">Tax Calculator</CardTitle>
        <CardDescription className="text-lg text-slate-600">
          Estimate your US federal income tax
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          type="number"
          value={income}
          onChange={e => setIncome(Number(e.target.value))}
          className="w-full p-2 border border-slate-300 rounded-lg"
        />
        <Button onClick={calculateTax} className="btn-primary w-full">Calculate Tax</Button>
        {tax !== null && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
            <span className="text-2xl font-bold text-blue-600">${tax.toFixed(2)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// HTML Encoder/Decoder
const HTMLEncoderTool = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  const encode = () => setEncoded(input.replace(/[\u00A0-\u9999<>&]/gim, i => '&#'+i.charCodeAt(0)+';'));
  const decode = () => {
    const txt = document.createElement('textarea');
    txt.innerHTML = input;
    setDecoded(txt.value);
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center"><CardTitle>HTML Encoder/Decoder</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-20 p-2 border rounded" placeholder="Enter HTML or text..." />
        <div className="flex gap-2">
          <Button onClick={encode}>Encode</Button>
          <Button onClick={decode}>Decode</Button>
        </div>
        {encoded && <div><b>Encoded:</b><div className="break-all">{encoded}</div></div>}
        {decoded && <div><b>Decoded:</b><div className="break-all">{decoded}</div></div>}
      </CardContent>
    </Card>
  );
};

// Screenshot Tool (browser API limited, just a message)
const ScreenshotTool = () => (
  <Card className="tool-card">
    <CardHeader className="text-center"><CardTitle>Screenshot Tool</CardTitle></CardHeader>
    <CardContent>
      <p className="text-slate-600">Use your device's screenshot feature. Web screenshot APIs are limited for security reasons.</p>
    </CardContent>
  </Card>
);

// Clipboard Manager (simple copy/paste)
const ClipboardManagerTool = () => {
  const [text, setText] = useState('');
  const [clipboard, setClipboard] = useState<string[]>([]);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setClipboard([text, ...clipboard]);
  };
  const paste = async () => {
    const clip = await navigator.clipboard.readText();
    setText(clip);
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center"><CardTitle>Clipboard Manager</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <textarea value={text} onChange={e => setText(e.target.value)} className="w-full h-20 p-2 border rounded" placeholder="Type or paste here..." />
        <div className="flex gap-2">
          <Button onClick={copy}>Copy</Button>
          <Button onClick={paste}>Paste</Button>
        </div>
        <div>
          <b>History:</b>
          <ul className="text-xs mt-2">{clipboard.map((c, i) => <li key={i} className="break-all">{c}</li>)}</ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Timestamp Tool
const TimestampTool = () => {
  const [now, setNow] = useState(Date.now());
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const convert = () => {
    const ts = parseInt(input, 10);
    if (!isNaN(ts)) setDate(new Date(ts).toLocaleString());
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center"><CardTitle>Timestamp Tool</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>Current Timestamp: <b>{now}</b></div>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter timestamp..." />
        <Button onClick={convert}>Convert to Date</Button>
        {date && <div>Converted: <b>{date}</b></div>}
      </CardContent>
    </Card>
  );
};

// Countdown Timer
const CountdownTimerTool = () => {
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (seconds === 0) return setRunning(false);
    const timer = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [running, seconds]);

  return (
    <Card className="tool-card">
      <CardHeader className="text-center"><CardTitle>Countdown Timer</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <input type="number" value={seconds} onChange={e => setSeconds(Number(e.target.value))} className="w-full p-2 border rounded" min={0} />
        <div className="text-2xl font-bold">{seconds}s</div>
        <Button onClick={() => setRunning(true)} disabled={running || seconds === 0}>Start</Button>
        <Button onClick={() => setRunning(false)} disabled={!running}>Pause</Button>
        <Button onClick={() => { setSeconds(60); setRunning(false); }}>Reset</Button>
      </CardContent>
    </Card>
  );
};

// Unit Converter (length only, demo)
const UnitConverterTool = () => {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('ft');
  const units = { m: 1, ft: 3.28084, in: 39.3701, cm: 100 };
  const result = (value * (units[to] / units[from])).toFixed(4);

  return (
    <Card className="tool-card">
      <CardHeader className="text-center"><CardTitle>Unit Converter</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <input type="number" value={value} onChange={e => setValue(Number(e.target.value))} className="p-2 border rounded w-1/3" />
          <select value={from} onChange={e => setFrom(e.target.value)} className="p-2 border rounded">
            {Object.keys(units).map(u => <option key={u}>{u}</option>)}
          </select>
          <span>to</span>
          <select value={to} onChange={e => setTo(e.target.value)} className="p-2 border rounded">
            {Object.keys(units).map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
        <div className="text-lg font-bold">{result} {to}</div>
      </CardContent>
    </Card>
  );
};

// Regex Tester
const RegexTesterTool = () => {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  let result: RegExpMatchArray | null = null;
  try {
    result = pattern ? text.match(new RegExp(pattern, 'g')) : null;
  } catch {}

  return (
    <Card className="tool-card">
      <CardHeader className="text-center"><CardTitle>Regex Tester</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <input value={pattern} onChange={e => setPattern(e.target.value)} className="w-full p-2 border rounded" placeholder="Regex pattern (e.g. \d+)" />
        <textarea value={text} onChange={e => setText(e.target.value)} className="w-full h-20 p-2 border rounded" placeholder="Text to test..." />
        <div>
          <b>Matches:</b>
          <div className="break-all">{result ? result.join(', ') : 'None'}</div>
        </div>
      </CardContent>
    </Card>
  );
};

// IP Lookup (demo, no API)
const IPLookupTool = () => {
  const [ip, setIp] = useState('');
  const [info, setInfo] = useState<any>(null);

  const lookup = () => {
    // Demo: just echo IP, in real app use an API
    setInfo({ ip, city: "Demo City", country: "Demo Country" });
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center"><CardTitle>IP Lookup</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <input value={ip} onChange={e => setIp(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter IP address..." />
        <Button onClick={lookup}>Lookup</Button>
        {info && (
          <div className="mt-2">
            <div><b>IP:</b> {info.ip}</div>
            <div><b>City:</b> {info.city}</div>
            <div><b>Country:</b> {info.country}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Domain Checker (demo, random result)
const DomainCheckerTool = () => {
  const [domain, setDomain] = useState('');
  const [available, setAvailable] = useState<boolean | null>(null);

  const check = () => {
    setAvailable(Math.random() > 0.5);
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center"><CardTitle>Domain Checker</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <input value={domain} onChange={e => setDomain(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter domain (e.g. example.com)" />
        <Button onClick={check}>Check</Button>
        {available !== null && (
          <div className={`mt-2 font-bold ${available ? 'text-green-600' : 'text-red-600'}`}>
            {available ? 'Available!' : 'Taken'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Image Resizer Tool
const ImageResizerTool = () => {
  const [image, setImage] = useState<File | null>(null);
  const [width, setWidth] = useState<number>(200);
  const [height, setHeight] = useState<number>(200);
  const [resizedUrl, setResizedUrl] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const resizeImage = () => {
    if (!image) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new window.Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        setResizedUrl(canvas.toDataURL());
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(image);
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <CardTitle>Image Resizer</CardTitle>
        <CardDescription>Resize an image to your desired dimensions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full" />
        <div className="flex gap-2">
          <input
            type="number"
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
            placeholder="Width"
            className="p-2 border rounded flex-1"
          />
          <input
            type="number"
            value={height}
            onChange={e => setHeight(Number(e.target.value))}
            placeholder="Height"
            className="p-2 border rounded flex-1"
          />
        </div>
        <Button onClick={resizeImage} disabled={!image} className="w-full">
          Resize
        </Button>
        {resizedUrl && (
          <div className="text-center">
            <img src={resizedUrl} alt="Resized" className="max-w-full mx-auto border border-slate-300 rounded mb-2" />
            <a href={resizedUrl} download="resized-image.png" className="text-blue-600 underline">
              Download
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Image Compressor Tool
const ImageCompressorTool = () => {
  const [image, setImage] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(0.7);
  const [compressedUrl, setCompressedUrl] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const compressImage = () => {
    if (!image) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new window.Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        setCompressedUrl(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(image);
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <CardTitle>Image Compressor</CardTitle>
        <CardDescription>Reduce image file size while maintaining quality.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full" />
        <label>Quality: {Math.round(quality * 100)}%</label>
        <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e => setQuality(Number(e.target.value))} />
        <Button onClick={compressImage} disabled={!image}>Compress</Button>
        {compressedUrl && (
          <div>
            <img src={compressedUrl} alt="Compressed" className="max-w-full border rounded" />
            <a href={compressedUrl} download="compressed-image.jpg" className="block mt-2 text-blue-600 underline">Download</a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Base64 Encoder/Decoder Tool
const Base64EncoderTool = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  const encode = () => setEncoded(btoa(input));
  const decode = () => {
    try {
      setDecoded(atob(input));
    } catch {
      setDecoded('Invalid Base64');
    }
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <CardTitle>Base64 Encoder/Decoder</CardTitle>
        <CardDescription>Quickly encode or decode Base64 text.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full h-20 p-2 border rounded"
          placeholder="Enter text or Base64..."
        />
        <div className="flex gap-2">
          <Button onClick={encode} className="flex-1">Encode</Button>
          <Button onClick={decode} className="flex-1">Decode</Button>
        </div>
        {encoded && (
          <div>
            <b>Encoded:</b>
            <div className="break-all bg-slate-100 p-2 rounded">{encoded}</div>
          </div>
        )}
        {decoded && (
          <div>
            <b>Decoded:</b>
            <div className="break-all bg-slate-100 p-2 rounded">{decoded}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Lorem Ipsum Generator Tool
const LoremIpsumTool = () => {
  const [paragraphs, setParagraphs] = useState(2);
  const [output, setOutput] = useState('');

  const generate = () => {
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.`;
    setOutput(Array(paragraphs).fill(text).join('\n\n'));
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center">
        <CardTitle>Lorem Ipsum Generator</CardTitle>
        <CardDescription>Generate placeholder text for your designs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2 items-center">
          <label>Paragraphs:</label>
          <input
            type="number"
            min={1}
            max={10}
            value={paragraphs}
            onChange={e => setParagraphs(Number(e.target.value))}
            className="p-2 border rounded w-20"
          />
          <Button onClick={generate} className="ml-auto">Generate</Button>
        </div>
        <textarea
          value={output}
          readOnly
          className="w-full h-32 p-2 border rounded mt-2 bg-slate-100"
        />
      </CardContent>
    </Card>
  );
};

// Text Diff Tool
const TextDiffTool = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState('');

  const compare = () => {
    if (text1 === text2) {
      setDiff('No differences.');
      return;
    }
    // Simple line-by-line diff
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    let result = '';
    lines1.forEach((line, i) => {
      if (line !== lines2[i]) {
        result += `- ${line || ''}\n+ ${lines2[i] || ''}\n`;
      }
    });
    setDiff(result || 'No differences.');
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center"><CardTitle>Text Diff Tool</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <textarea value={text1} onChange={e => setText1(e.target.value)} className="w-full h-20 p-2 border rounded" placeholder="First text..." />
        <textarea value={text2} onChange={e => setText2(e.target.value)} className="w-full h-20 p-2 border rounded" placeholder="Second text..." />
        <Button onClick={compare}>Compare</Button>
        <pre className="bg-slate-100 p-2 rounded mt-2 whitespace-pre-wrap">{diff}</pre>
      </CardContent>
    </Card>
  );
};

// JSON Formatter Tool
const JSONFormatterTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
      setError('');
    } catch (e: any) {
      setError('Invalid JSON');
      setOutput('');
    }
  };

  return (
    <Card className="tool-card">
      <CardHeader className="text-center"><CardTitle>JSON Formatter</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-32 p-2 border rounded" placeholder="Paste JSON here..." />
        <Button onClick={format}>Format</Button>
        {error && <div className="text-red-600">{error}</div>}
        {output && <pre className="bg-slate-100 p-2 rounded mt-2 whitespace-pre-wrap">{output}</pre>}
      </CardContent>
    </Card>
  );
};

// URL Encoder/Decoder Tool
const URLEncoderTool = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  const encode = () => setEncoded(encodeURIComponent(input));
  const decode = () => setDecoded(decodeURIComponent(input));

  return (
    <Card className="tool-card">
      <CardHeader className="text-center"><CardTitle>URL Encoder/Decoder</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full h-20 p-2 border rounded" placeholder="Enter URL or text..." />
        <div className="flex gap-2">
          <Button onClick={encode}>Encode</Button>
          <Button onClick={decode}>Decode</Button>
        </div>
        {encoded && <div><b>Encoded:</b><div className="break-all">{encoded}</div></div>}
        {decoded && <div><b>Decoded:</b><div className="break-all">{decoded}</div></div>}
      </CardContent>
    </Card>
  );
};

export default Tools;
