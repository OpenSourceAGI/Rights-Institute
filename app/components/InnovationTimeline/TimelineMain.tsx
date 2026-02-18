"use client"
import type React from "react"
import { Timeline, type TimelineItem } from "./timeline"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Computer,
  Code,
  FileText,
  Car,
  Microscope,
  Heart,
  Lightbulb,
  Cpu,
  Globe,
  Smartphone,
  Atom,
  Dna,
  Rocket,
  Brain,
  Shield,
  Zap,
  Wrench,
  Edit,
  ImageIcon,
  CassetteTapeIcon as Cassette,
  Container,
  Triangle,
  ArrowRight,
  FlashlightIcon as Torch,
  Cog,
  Plane,
  Rabbit,
  Gem,
  Mouse,
  Keyboard,
  Star,
  Feather,
  NotebookPen,
  Edit3,
  FileEdit,
  MonitorIcon as Mirror,
  Blocks,
  MousePointer,
  Hammer,
  Building,
  ScrollText,
  Bomb,
  Gauge,
  Drill,
  FuelIcon as Engine,
  Beaker,
  Wind,
  Shapes,
  Layers3,
  Battery,
  Magnet,
  RadioIcon,
  Scan,
  Waves,
  Clock,
  Target,
  Orbit,
  Dices,
  Telescope,
  Minus,
  Split,
  Grid3x3,
  Snowflake,
  Moon,
  Stethoscope,
  User,
  Bug,
  Syringe,
  Hospital,
  SoupIcon as Soap,
  TreePine,
  Droplets,
  Activity,
  Filter,
  HeartHandshake,
  ScanLine,
  Baby,
  Map,
  RotateCcw,
  Scissors,
  Train,
  RailSymbolIcon as Railway,
  Bike,
  FuelIcon,
  Disc,
  Route,
  Disc3,
  Leaf,
  Radar,
  Navigation,
  CarTaxiFrontIcon as Taxi,
  Globe2,
  Twitter,
  Phone,
  Link2,
  Sun,
  Pill,
  Search,
  TrendingUp,
  X,
  ArrowUp,
  ArrowDown,
  Scroll,
  Columns,
  GraduationCap,
  Scale,
  Handshake,
  Vote,
  FileCheck,
  Unlink,
  CheckSquare,
  Umbrella,
  Megaphone,
  Gavel,
  Paintbrush,
  PenTool,
  Trophy,
  Newspaper,
  Tv,
  Volume2,
  Network,
  MessageSquare,
  Users,
  Layers,
  ShoppingCart,
  Monitor,
  Music,
  Radio,
  Cloud,
  UserCircle,
  Flame,
  Coins,
  Circle,
  Eye,
  Palette,
  Server,
  GitBranch,
  Terminal,
  Apple,
  Factory,
  Sparkles,
  ExternalLink,
  Hourglass,
} from "lucide-react"
import innovationsData from "./innovations.json"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useMemo, useEffect, useCallback, useRef } from "react"

// Convert JSON data to timeline format
const createTimelineItems = (
  data: Array<{ year: string; innovation: string; features: string; innovator: string }>,
  getIcon?: (innovation: string) => React.ReactNode,
): TimelineItem[] => {
  return data.map((item, index) => {
    // Parse year handling BCE and ranges
    let parsedYear = item.year
    let numericYear = 0

    // Handle ranges (take first value)
    if (parsedYear.includes("–") || parsedYear.includes("-")) {
      parsedYear = parsedYear.split(/[–-]/)[0].trim()
    }

    // Handle BCE years (convert to negative)
    if (parsedYear.toLowerCase().includes("bce")) {
      const yearNum = Number.parseInt(parsedYear.replace(/[^\d]/g, "")) || 0
      numericYear = -yearNum
    } else {
      numericYear = Number.parseInt(parsedYear.replace(/[^\d]/g, "")) || 0
    }

    return {
      id: `${numericYear}-${index}`,
      date: item.year,
      title: item.innovation,
      description: item.features,
      innovator: item.innovator,
      icon: getIcon ? getIcon(item.innovation) : <Lightbulb className="w-4 h-4" />,
      status: numericYear > 2020 ? "completed" : numericYear > 2000 ? "in-progress" : "completed",
    }
  })
}

// Enhanced Icon mapping functions with unique icons and colors
const getITIcon = (innovation: string): React.ReactNode => {
  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    Printer: { icon: <ImageIcon className="w-4 h-4" />, color: "text-amber-600" },
    Typewriter: { icon: <FileText className="w-4 h-4" />, color: "text-slate-600" },
    "Data Processor": { icon: <Container className="w-4 h-4" />, color: "text-blue-600" },
    "Computation Model": { icon: <Cog className="w-4 h-4" />, color: "text-purple-600" },
    Transistor: { icon: <Cpu className="w-4 h-4" />, color: "text-green-600" },
    "Turing Test": { icon: <Shield className="w-4 h-4" />, color: "text-indigo-600" },
    Perceptron: { icon: <Network className="w-4 h-4" />, color: "text-pink-600" },
    "ELIZA Chatbot": { icon: <MessageSquare className="w-4 h-4" />, color: "text-cyan-600" },
    "Sensorama VR": { icon: <Volume2 className="w-4 h-4" />, color: "text-violet-600" },
    Intel: { icon: <Atom className="w-4 h-4" />, color: "text-blue-700" },
    ARPANET: { icon: <Globe className="w-4 h-4" />, color: "text-emerald-600" },
    Email: { icon: <Shield className="w-4 h-4" />, color: "text-red-600" },
    "Usenet/BBS": { icon: <Users className="w-4 h-4" />, color: "text-orange-600" },
    "First 3D Printer Concept": { icon: <Triangle className="w-4 h-4" />, color: "text-teal-600" },
    "Domain Name System (DNS)": { icon: <ExternalLink className="w-4 h-4" />, color: "text-lime-600" },
    Backpropagation: { icon: <Zap className="w-4 h-4" />, color: "text-yellow-600" },
    HyperCard: { icon: <Layers className="w-4 h-4" />, color: "text-rose-600" },
    "World Wide Web": { icon: <Globe2 className="w-4 h-4" />, color: "text-blue-500" },
    "Web Browser": { icon: <Tv className="w-4 h-4" />, color: "text-green-500" },
    Amazon: { icon: <ShoppingCart className="w-4 h-4" />, color: "text-orange-500" },
    "Internet Explorer": { icon: <Monitor className="w-4 h-4" />, color: "text-blue-400" },
    "IBM Deep Blue": { icon: <Gem className="w-4 h-4" />, color: "text-purple-700" },
    Netflix: { icon: <ArrowRight className="w-4 h-4" />, color: "text-red-500" },
    "Google Search": { icon: <Search className="w-4 h-4" />, color: "text-blue-600" },
    Napster: { icon: <Music className="w-4 h-4" />, color: "text-green-400" },
    Pandora: { icon: <Radio className="w-4 h-4" />, color: "text-blue-300" },
    AWS: { icon: <Cloud className="w-4 h-4" />, color: "text-orange-400" },
    LinkedIn: { icon: <UserCircle className="w-4 h-4" />, color: "text-blue-700" },
    MySpace: { icon: <UserCircle className="w-4 h-4" />, color: "text-purple-500" },
    Facebook: { icon: <Users className="w-4 h-4" />, color: "text-blue-600" },
    Firefox: { icon: <Flame className="w-4 h-4" />, color: "text-orange-600" },
    "Boston Dynamics BigDog": { icon: <ImageIcon className="w-4 h-4" />, color: "text-amber-700" },
    YouTube: { icon: <Tv className="w-4 h-4" />, color: "text-red-600" },
    Android: { icon: <Smartphone className="w-4 h-4" />, color: "text-green-500" },
    Twitter: { icon: <Twitter className="w-4 h-4" />, color: "text-sky-500" },
    iPhone: { icon: <Phone className="w-4 h-4" />, color: "text-gray-800" },
    "Android Beta": { icon: <ImageIcon className="w-4 h-4" />, color: "text-green-400" },
    "Bitcoin & Blockchain": { icon: <Coins className="w-4 h-4" />, color: "text-yellow-500" },
    "Google Chrome": { icon: <Circle className="w-4 h-4" />, color: "text-red-500" },
    WhatsApp: { icon: <MessageSquare className="w-4 h-4" />, color: "text-green-600" },
    Instagram: { icon: <ImageIcon className="w-4 h-4" />, color: "text-pink-500" },
    "IBM Watson": { icon: <Brain className="w-4 h-4" />, color: "text-blue-800" },
    Snapchat: { icon: <Shield className="w-4 h-4" />, color: "text-yellow-400" },
    AlexNet: { icon: <Eye className="w-4 h-4" />, color: "text-indigo-500" },
    "Oculus Kickstarter": { icon: <Shield className="w-4 h-4" />, color: "text-purple-600" },
    "Boston Dynamics Atlas": { icon: <Shield className="w-4 h-4" />, color: "text-gray-600" },
    "Generative Adversarial Networks": { icon: <Shield className="w-4 h-4" />, color: "text-violet-500" },
    "Oculus Rift": { icon: <Shield className="w-4 h-4" />, color: "text-black" },
    TikTok: { icon: <Music className="w-4 h-4" />, color: "text-pink-600" },
    "Transformer Architecture": { icon: <Shield className="w-4 h-4" />, color: "text-emerald-500" },
    "Meta Quest": { icon: <Shield className="w-4 h-4" />, color: "text-blue-500" },
    "GPT-3": { icon: <Shield className="w-4 h-4" />, color: "text-green-700" },
    "Boston Dynamics Commercial Robot": { icon: <Shield className="w-4 h-4" />, color: "text-gray-700" },
    ChatGPT: { icon: <Shield className="w-4 h-4" />, color: "text-emerald-600" },
    Perplexity: { icon: <Shield className="w-4 h-4" />, color: "text-purple-500" },
    "GPT-4": { icon: <Shield className="w-4 h-4" />, color: "text-gold-500" },
    "Brain interface trial": { icon: <Zap className="w-4 h-4" />, color: "text-electric-blue" },
  }

  const defaultIcon = { icon: <Computer className="w-4 h-4" />, color: "text-gray-500" }
  const selected = iconMap[innovation] || defaultIcon

  return <span className={selected.color}>{selected.icon}</span>
}

const getProgrammingIcon = (innovation: string): React.ReactNode => {
  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    FORTRAN: { icon: <Cog className="w-4 h-4" />, color: "text-blue-700" },
    LISP: { icon: <Shield className="w-4 h-4" />, color: "text-purple-600" },
    Unix: { icon: <Shield className="w-4 h-4" />, color: "text-green-700" },
    SQL: { icon: <Container className="w-4 h-4" />, color: "text-blue-600" },
    C: { icon: <Shield className="w-4 h-4" />, color: "text-gray-700" },
    "TCP/IP": { icon: <Network className="w-4 h-4" />, color: "text-cyan-600" },
    DNS: { icon: <ExternalLink className="w-4 h-4" />, color: "text-green-600" },
    HTTP: { icon: <ExternalLink className="w-4 h-4" />, color: "text-blue-500" },
    Linux: { icon: <Shield className="w-4 h-4" />, color: "text-yellow-600" },
    Python: { icon: <Shield className="w-4 h-4" />, color: "text-blue-500" },
    HTML: { icon: <FileText className="w-4 h-4" />, color: "text-orange-600" },
    JavaScript: { icon: <Shield className="w-4 h-4" />, color: "text-yellow-500" },
    CSS: { icon: <Palette className="w-4 h-4" />, color: "text-blue-400" },
    REST: { icon: <Server className="w-4 h-4" />, color: "text-green-500" },
    Git: { icon: <GitBranch className="w-4 h-4" />, color: "text-orange-500" },
    "Amazon EC2": { icon: <Cloud className="w-4 h-4" />, color: "text-orange-400" },
    jQuery: { icon: <Zap className="w-4 h-4" />, color: "text-blue-600" },
    iOS: { icon: <Shield className="w-4 h-4" />, color: "text-gray-800" },
    GitHub: { icon: <Shield className="w-4 h-4" />, color: "text-gray-900" },
    Android: { icon: <Smartphone className="w-4 h-4" />, color: "text-green-500" },
    "Node.js": { icon: <Triangle className="w-4 h-4" />, color: "text-green-600" },
    TypeScript: { icon: <Shield className="w-4 h-4" />, color: "text-blue-700" },
    Docker: { icon: <Container className="w-4 h-4" />, color: "text-blue-500" },
    React: { icon: <Atom className="w-4 h-4" />, color: "text-cyan-500" },
    "Vue.js": { icon: <Triangle className="w-4 h-4" />, color: "text-green-500" },
    TensorFlow: { icon: <Brain className="w-4 h-4" />, color: "text-orange-500" },
    "Next.js": { icon: <ArrowRight className="w-4 h-4" />, color: "text-black" },
    Svelte: { icon: <Flame className="w-4 h-4" />, color: "text-orange-600" },
    PyTorch: { icon: <Torch className="w-4 h-4" />, color: "text-red-600" },
    WebAssembly: { icon: <Cog className="w-4 h-4" />, color: "text-purple-600" },
    Copilot: { icon: <Plane className="w-4 h-4" />, color: "text-blue-600" },
    ChatGPT: { icon: <MessageSquare className="w-4 h-4" />, color: "text-green-600" },
    Bun: { icon: <Rabbit className="w-4 h-4" />, color: "text-yellow-600" },
    Claude: { icon: <Shield className="w-4 h-4" />, color: "text-purple-600" },
    Gemini: { icon: <Gem className="w-4 h-4" />, color: "text-blue-500" },
  }

  const defaultIcon = { icon: <Code className="w-4 h-4" />, color: "text-gray-500" }
  const selected = iconMap[innovation] || defaultIcon

  return <span className={selected.color}>{selected.icon}</span>
}

const getTextEditorIcon = (innovation: string): React.ReactNode => {
  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    "TECO, ED": { icon: <Terminal className="w-4 h-4" />, color: "text-green-700" },
    "Xerox Alto": { icon: <Mouse className="w-4 h-4" />, color: "text-gray-600" },
    "vi / Vim": { icon: <Keyboard className="w-4 h-4" />, color: "text-green-600" },
    WordStar: { icon: <Star className="w-4 h-4" />, color: "text-blue-600" },
    "Microsoft Word": { icon: <FileText className="w-4 h-4" />, color: "text-blue-700" },
    "GNU Nano": { icon: <Feather className="w-4 h-4" />, color: "text-yellow-600" },
    "Notepad++": { icon: <NotebookPen className="w-4 h-4" />, color: "text-blue-500" },
    "TinyMCE, CKEditor": { icon: <Edit3 className="w-4 h-4" />, color: "text-orange-500" },
    "Google Docs": { icon: <FileEdit className="w-4 h-4" />, color: "text-blue-600" },
    "Sublime Text": { icon: <Shield className="w-4 h-4" />, color: "text-orange-600" },
    CodeMirror: { icon: <Mirror className="w-4 h-4" />, color: "text-purple-600" },
    "VS Code/Monaco": { icon: <Shield className="w-4 h-4" />, color: "text-blue-600" },
    "Editor.js": { icon: <Blocks className="w-4 h-4" />, color: "text-gray-700" },
    Cursor: { icon: <MousePointer className="w-4 h-4" />, color: "text-blue-500" },
  }

  const defaultIcon = { icon: <Edit className="w-4 h-4" />, color: "text-gray-500" }
  const selected = iconMap[innovation] || defaultIcon

  return <span className={selected.color}>{selected.icon}</span>
}

const getMaterialsIcon = (innovation: string): React.ReactNode => {
  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    Bronze: { icon: <Hammer className="w-4 h-4" />, color: "text-amber-700" },
    "Roman Concrete": { icon: <Building className="w-4 h-4" />, color: "text-gray-600" },
    Paper: { icon: <ImageIcon className="w-4 h-4" />, color: "text-yellow-100" },
    Gunpowder: { icon: <Bomb className="w-4 h-4" />, color: "text-red-600" },
    "Printing Press": { icon: <ImageIcon className="w-4 h-4" />, color: "text-black" },
    "Steam Engine (Improved)": { icon: <Gauge className="w-4 h-4" />, color: "text-gray-700" },
    "Bessemer Process": { icon: <Flame className="w-4 h-4" />, color: "text-red-700" },
    "Oil Well Drilling": { icon: <Drill className="w-4 h-4" />, color: "text-black" },
    "Internal Combustion Engine": { icon: <Engine className="w-4 h-4" />, color: "text-red-600" },
    "Incandescent Light Bulb": { icon: <Lightbulb className="w-4 h-4" />, color: "text-yellow-500" },
    "Hall-Héroult Process": { icon: <Beaker className="w-4 h-4" />, color: "text-silver" },
    "Wind Turbine (Electric)": { icon: <Wind className="w-4 h-4" />, color: "text-blue-500" },
    Bakelite: { icon: <Shapes className="w-4 h-4" />, color: "text-brown-600" },
    Nylon: { icon: <Shield className="w-4 h-4" />, color: "text-pink-400" },
    "Nuclear Reactor": { icon: <Atom className="w-4 h-4" />, color: "text-green-500" },
    Transistor: { icon: <Cpu className="w-4 h-4" />, color: "text-blue-600" },
    "Solar Cell": { icon: <Sun className="w-4 h-4" />, color: "text-yellow-500" },
    "Carbon Fiber": { icon: <Layers3 className="w-4 h-4" />, color: "text-gray-900" },
    LED: { icon: <Zap className="w-4 h-4" />, color: "text-blue-400" },
    "Lithium-ion Battery": { icon: <Battery className="w-4 h-4" />, color: "text-green-600" },
  }

  const defaultIcon = { icon: <Wrench className="w-4 h-4" />, color: "text-gray-500" }
  const selected = iconMap[innovation] || defaultIcon

  return <span className={selected.color}>{selected.icon}</span>
}

const getScienceIcon = (innovation: string): React.ReactNode => {
  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    "Euclidean Geometry": { icon: <Triangle className="w-4 h-4" />, color: "text-blue-600" },
    "Laws of Motion & Gravity": { icon: <Apple className="w-4 h-4" />, color: "text-red-600" },
    "Electric Current": { icon: <Zap className="w-4 h-4" />, color: "text-yellow-500" },
    "Electromagnetic Induction": { icon: <Magnet className="w-4 h-4" />, color: "text-red-500" },
    "Electromagnetic Theory": { icon: <Radio className="w-4 h-4" />, color: "text-purple-600" },
    "X-rays": { icon: <Scan className="w-4 h-4" />, color: "text-green-500" },
    Radioactivity: { icon: <RadioIcon className="w-4 h-4" />, color: "text-yellow-600" },
    Electron: { icon: <Atom className="w-4 h-4" />, color: "text-blue-500" },
    "Quantum Theory": { icon: <Waves className="w-4 h-4" />, color: "text-purple-500" },
    "Special Relativity": { icon: <Clock className="w-4 h-4" />, color: "text-blue-700" },
    "Atomic Nucleus": { icon: <Target className="w-4 h-4" />, color: "text-red-600" },
    "Bohr Model": { icon: <Orbit className="w-4 h-4" />, color: "text-cyan-600" },
    "General Relativity": { icon: <Globe2 className="w-4 h-4" />, color: "text-indigo-600" },
    "Quantum Mechanics": { icon: <Dices className="w-4 h-4" />, color: "text-purple-600" },
    "Big Bang Theory": { icon: <Shield className="w-4 h-4" />, color: "text-orange-500" },
    "Expanding Universe": { icon: <Telescope className="w-4 h-4" />, color: "text-blue-800" },
    Neutron: { icon: <Circle className="w-4 h-4" />, color: "text-gray-500" },
    Antimatter: { icon: <Minus className="w-4 h-4" />, color: "text-red-500" },
    "Nuclear Fission": { icon: <Split className="w-4 h-4" />, color: "text-green-600" },
    "Quantum Electrodynamics": { icon: <Shield className="w-4 h-4" />, color: "text-electric-blue" },
    "Neutrino Detection": { icon: <Shield className="w-4 h-4" />, color: "text-gray-400" },
    Quarks: { icon: <Shield className="w-4 h-4" />, color: "text-rainbow" },
    "Cosmic Microwave Background": { icon: <Waves className="w-4 h-4" />, color: "text-orange-400" },
    "Electroweak Unification": { icon: <ExternalLink className="w-4 h-4" />, color: "text-purple-700" },
    "Standard Model": { icon: <Grid3x3 className="w-4 h-4" />, color: "text-blue-600" },
    "Hawking Radiation": { icon: <Sun className="w-4 h-4" />, color: "text-black" },
    "Quantum Computing": { icon: <Cpu className="w-4 h-4" />, color: "text-cyan-500" },
    "Bose-Einstein Condensate": { icon: <Snowflake className="w-4 h-4" />, color: "text-blue-300" },
    "Dark Energy": { icon: <Moon className="w-4 h-4" />, color: "text-purple-900" },
    "Higgs Boson": { icon: <Gem className="w-4 h-4" />, color: "text-yellow-600" },
    "Gravitational Waves": { icon: <Waves className="w-4 h-4" />, color: "text-blue-500" },
    "Black Hole Image": { icon: <ImageIcon className="w-4 h-4" />, color: "text-black" },
  }

  const defaultIcon = { icon: <Microscope className="w-4 h-4" />, color: "text-gray-500" }
  const selected = iconMap[innovation] || defaultIcon

  return <span className={selected.color}>{selected.icon}</span>
}

const getMedicineIcon = (innovation: string): React.ReactNode => {
  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    "Hippocratic Medicine": { icon: <Stethoscope className="w-4 h-4" />, color: "text-blue-600" },
    "Human Anatomy": { icon: <User className="w-4 h-4" />, color: "text-red-600" },
    "Compound Microscope": { icon: <Microscope className="w-4 h-4" />, color: "text-purple-600" },
    "Blood Circulation": { icon: <Heart className="w-4 h-4" />, color: "text-red-500" },
    "Cell Discovery": { icon: <Shield className="w-4 h-4" />, color: "text-green-500" },
    "Bacteria Discovery": { icon: <Bug className="w-4 h-4" />, color: "text-yellow-600" },
    Vaccination: { icon: <Syringe className="w-4 h-4" />, color: "text-blue-500" },
    Stethoscope: { icon: <Stethoscope className="w-4 h-4" />, color: "text-gray-700" },
    Anesthesia: { icon: <Pill className="w-4 h-4" />, color: "text-purple-500" },
    "Public Anesthesia": { icon: <Hospital className="w-4 h-4" />, color: "text-blue-600" },
    "Antiseptic Surgery": { icon: <Soap className="w-4 h-4" />, color: "text-green-600" },
    "Evolution Theory": { icon: <TreePine className="w-4 h-4" />, color: "text-green-700" },
    "Genetics Laws": { icon: <Dna className="w-4 h-4" />, color: "text-blue-500" },
    "Antiseptic Principle": { icon: <Shield className="w-4 h-4" />, color: "text-green-500" },
    "Periodic Table": { icon: <Grid3x3 className="w-4 h-4" />, color: "text-rainbow" },
    "TB Bacillus Discovery": { icon: <Search className="w-4 h-4" />, color: "text-red-600" },
    "X-rays": { icon: <Scan className="w-4 h-4" />, color: "text-green-400" },
    "Electron Discovery": { icon: <Zap className="w-4 h-4" />, color: "text-yellow-500" },
    "Blood Types": { icon: <Droplets className="w-4 h-4" />, color: "text-red-600" },
    Electrocardiograph: { icon: <Activity className="w-4 h-4" />, color: "text-green-500" },
    "Special Relativity": { icon: <Clock className="w-4 h-4" />, color: "text-blue-700" },
    Penicillin: { icon: <Pill className="w-4 h-4" />, color: "text-green-600" },
    "Insulin Treatment": { icon: <Syringe className="w-4 h-4" />, color: "text-blue-500" },
    "Kidney Dialysis": { icon: <Filter className="w-4 h-4" />, color: "text-blue-600" },
    "Heart Surgery": { icon: <Heart className="w-4 h-4" />, color: "text-red-600" },
    "HeLa Cells": { icon: <Microscope className="w-4 h-4" />, color: "text-purple-500" },
    "DNA Structure": { icon: <Dna className="w-4 h-4" />, color: "text-blue-600" },
    "Kidney Transplant": { icon: <Heart className="w-4 h-4" />, color: "text-orange-600" },
    "Polio Vaccine": { icon: <Shield className="w-4 h-4" />, color: "text-green-500" },
    "Heart Transplant": { icon: <HeartHandshake className="w-4 h-4" />, color: "text-red-500" },
    "CT Scan": { icon: <ScanLine className="w-4 h-4" />, color: "text-blue-500" },
    "Recombinant DNA": { icon: <Dna className="w-4 h-4" />, color: "text-green-600" },
    "Monoclonal Antibodies": { icon: <Target className="w-4 h-4" />, color: "text-purple-600" },
    "IVF Birth": { icon: <Baby className="w-4 h-4" />, color: "text-pink-500" },
    "MRI Imaging": { icon: <Brain className="w-4 h-4" />, color: "text-blue-600" },
    "Artificial Heart": { icon: <Cog className="w-4 h-4" />, color: "text-gray-600" },
    "PCR Technology": { icon: <Dna className="w-4 h-4" />, color: "text-cyan-500" },
    "Gene Therapy": { icon: <Dna className="w-4 h-4" />, color: "text-green-600" },
    "Cloning (Dolly)": { icon: <Shield className="w-4 h-4" />, color: "text-white" },
    "Human Genome Project": { icon: <Map className="w-4 h-4" />, color: "text-blue-700" },
    "Face Transplant": { icon: <User className="w-4 h-4" />, color: "text-skin-tone" },
    "HPV Vaccine": { icon: <Shield className="w-4 h-4" />, color: "text-pink-500" },
    "iPS Cells": { icon: <RotateCcw className="w-4 h-4" />, color: "text-green-500" },
    "3D Bioprinting": { icon: <ImageIcon className="w-4 h-4" />, color: "text-red-500" },
    "CRISPR Gene Editing": { icon: <Scissors className="w-4 h-4" />, color: "text-blue-500" },
    "Cancer Therapy": { icon: <Shield className="w-4 h-4" />, color: "text-purple-600" },
    "CRISPR Babies": { icon: <Baby className="w-4 h-4" />, color: "text-blue-400" },
    "mRNA Vaccines": { icon: <Syringe className="w-4 h-4" />, color: "text-green-600" },
    "AI Drug Discovery": { icon: <Shield className="w-4 h-4" />, color: "text-purple-500" },
    "Base Editing": { icon: <Shield className="w-4 h-4" />, color: "text-cyan-600" },
  }

  const defaultIcon = { icon: <Heart className="w-4 h-4" />, color: "text-gray-500" }
  const selected = iconMap[innovation] || defaultIcon

  return <span className={selected.color}>{selected.icon}</span>
}

const getTransportationIcon = (innovation: string): React.ReactNode => {
  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    Wheel: { icon: <Circle className="w-4 h-4" />, color: "text-brown-600" },
    "Steam-Powered Vehicle": { icon: <Gauge className="w-4 h-4" />, color: "text-gray-600" },
    "Steam Locomotive": { icon: <Train className="w-4 h-4" />, color: "text-black" },
    Railway: { icon: <Railway className="w-4 h-4" />, color: "text-gray-700" },
    "Petroleum Reitwagen (Motorcycle)": { icon: <Bike className="w-4 h-4" />, color: "text-orange-600" },
    "Benz Patent-Motorwagen": { icon: <Car className="w-4 h-4" />, color: "text-black" },
    "Flocken Elektrowagen": { icon: <Zap className="w-4 h-4" />, color: "text-blue-500" },
    Electrobat: { icon: <Battery className="w-4 h-4" />, color: "text-green-600" },
    "Lohner-Porsche Hybrid": { icon: <FuelIcon className="w-4 h-4" />, color: "text-yellow-600" },
    "Ford Model T": { icon: <Car className="w-4 h-4" />, color: "text-black" },
    "Moving Assembly Line": { icon: <Factory className="w-4 h-4" />, color: "text-gray-600" },
    "Four-Wheel Brakes": { icon: <Disc className="w-4 h-4" />, color: "text-red-600" },
    "Car Radio": { icon: <Radio className="w-4 h-4" />, color: "text-blue-500" },
    "Jet Engine (First Jet-Powered Aircraft)": { icon: <Plane className="w-4 h-4" />, color: "text-blue-600" },
    "Interstate Highway System": { icon: <Route className="w-4 h-4" />, color: "text-gray-500" },
    "Three-Point Seatbelt": { icon: <Shield className="w-4 h-4" />, color: "text-red-500" },
    "Moon Landing": { icon: <Rocket className="w-4 h-4" />, color: "text-blue-700" },
    "Anti-lock Braking System (ABS)": { icon: <Disc3 className="w-4 h-4" />, color: "text-orange-500" },
    "Toyota Prius": { icon: <Leaf className="w-4 h-4" />, color: "text-green-600" },
    "Adaptive Cruise Control": { icon: <Radar className="w-4 h-4" />, color: "text-blue-500" },
    "Backup Camera": { icon: <ImageIcon className="w-4 h-4" />, color: "text-purple-500" },
    "Google Self-Driving Car Project": { icon: <Navigation className="w-4 h-4" />, color: "text-blue-600" },
    "Tesla Autopilot 1.0": { icon: <Shield className="w-4 h-4" />, color: "text-red-600" },
    "Waymo Driverless Taxi Service": { icon: <Taxi className="w-4 h-4" />, color: "text-blue-500" },
  }

  const defaultIcon = { icon: <Car className="w-4 h-4" />, color: "text-gray-500" }
  const selected = iconMap[innovation] || defaultIcon

  return <span className={selected.color}>{selected.icon}</span>
}

const getSocietyIcon = (innovation: string): React.ReactNode => {
  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    "Urban City-States": { icon: <Building className="w-4 h-4" />, color: "text-amber-700" },
    "Divine Kingship": { icon: <Shield className="w-4 h-4" />, color: "text-yellow-600" },
    "Jewish Monotheism": { icon: <Star className="w-4 h-4" />, color: "text-blue-600" },
    "Code of Hammurabi": { icon: <Scroll className="w-4 h-4" />, color: "text-brown-600" },
    "Mandate of Heaven": { icon: <Sun className="w-4 h-4" />, color: "text-yellow-500" },
    "Cyrus Cylinder": { icon: <ScrollText className="w-4 h-4" />, color: "text-purple-600" },
    "Confucian Ethics": { icon: <TreePine className="w-4 h-4" />, color: "text-green-700" },
    "Athenian Democracy": { icon: <Users className="w-4 h-4" />, color: "text-blue-500" },
    "Roman Republic": { icon: <Columns className="w-4 h-4" />, color: "text-red-600" },
    "Roman Law (Twelve Tables)": { icon: <FileText className="w-4 h-4" />, color: "text-gray-700" },
    "Civil Service System": { icon: <GraduationCap className="w-4 h-4" />, color: "text-blue-600" },
    "Magna Carta": { icon: <Shield className="w-4 h-4" />, color: "text-green-600" },
    "English Bill of Rights": { icon: <Scale className="w-4 h-4" />, color: "text-blue-700" },
    "Social Contract Theory": { icon: <Handshake className="w-4 h-4" />, color: "text-purple-500" },
    "Separation of Powers": { icon: <GitBranch className="w-4 h-4" />, color: "text-indigo-600" },
    "Declaration of Independence": { icon: <Star className="w-4 h-4" />, color: "text-red-500" },
    "Constitutional Democracy": { icon: <Vote className="w-4 h-4" />, color: "text-blue-600" },
    "Declaration of Rights of Man": { icon: <Users className="w-4 h-4" />, color: "text-blue-500" },
    "Bill of Rights": { icon: <FileCheck className="w-4 h-4" />, color: "text-green-600" },
    "Abolition Movement": { icon: <Unlink className="w-4 h-4" />, color: "text-purple-700" },
    "Women's Rights Movement": { icon: <Shield className="w-4 h-4" />, color: "text-pink-600" },
    "Women's Suffrage": { icon: <CheckSquare className="w-4 h-4" />, color: "text-purple-600" },
    "Social Security System": { icon: <Umbrella className="w-4 h-4" />, color: "text-blue-600" },
    "United Nations": { icon: <Globe2 className="w-4 h-4" />, color: "text-blue-500" },
    "Universal Declaration of Human Rights": { icon: <Shield className="w-4 h-4" />, color: "text-red-500" },
    "Civil Rights Movement": { icon: <Megaphone className="w-4 h-4" />, color: "text-purple-700" },
    "International Criminal Court": { icon: <Gavel className="w-4 h-4" />, color: "text-gray-700" },
  }

  const defaultIcon = { icon: <Users className="w-4 h-4" />, color: "text-gray-500" }
  const selected = iconMap[innovation] || defaultIcon

  return <span className={selected.color}>{selected.icon}</span>
}

const getCultureIcon = (innovation: string): React.ReactNode => {
  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    "Cave Painting": { icon: <Paintbrush className="w-4 h-4" />, color: "text-brown-600" },
    "Cuneiform Writing": { icon: <PenTool className="w-4 h-4" />, color: "text-gray-700" },
    "Egyptian Hieroglyphics": { icon: <Shield className="w-4 h-4" />, color: "text-yellow-600" },
    "Ancient Olympic Games": { icon: <Trophy className="w-4 h-4" />, color: "text-gold-500" },
    "Greek Theater": { icon: <Shield className="w-4 h-4" />, color: "text-purple-600" },
    "Chess (Chaturanga)": { icon: <Shield className="w-4 h-4" />, color: "text-black" },
    "Roman Amphitheaters": { icon: <Shield className="w-4 h-4" />, color: "text-red-700" },
    "Shadow Puppetry (Wayang)": { icon: <Shield className="w-4 h-4" />, color: "text-orange-600" },
    "Musical Notation": { icon: <Music className="w-4 h-4" />, color: "text-blue-600" },
    "Gothic Architecture": { icon: <Shield className="w-4 h-4" />, color: "text-gray-600" },
    "Linear Perspective": { icon: <Grid3x3 className="w-4 h-4" />, color: "text-blue-500" },
    "Oil Painting": { icon: <Shield className="w-4 h-4" />, color: "text-rainbow" },
    "Modern Newspaper": { icon: <Newspaper className="w-4 h-4" />, color: "text-gray-700" },
    "Baroque Art": { icon: <Shield className="w-4 h-4" />, color: "text-gold-600" },
    "Classical Music Form": { icon: <Shield className="w-4 h-4" />, color: "text-black" },
    "Photography (Daguerreotype)": { icon: <ImageIcon className="w-4 h-4" />, color: "text-gray-600" },
    Impressionism: { icon: <Shield className="w-4 h-4" />, color: "text-yellow-500" },
    "Cinema (Cinematograph)": { icon: <Shield className="w-4 h-4" />, color: "text-black" },
    "Modern Olympics Revival": { icon: <Shield className="w-4 h-4" />, color: "text-gold-500" },
    Cubism: { icon: <Shield className="w-4 h-4" />, color: "text-blue-600" },
    "Abstract Art": { icon: <Shield className="w-4 h-4" />, color: "text-rainbow" },
    Dadaism: { icon: <Shield className="w-4 h-4" />, color: "text-purple-500" },
    "Radio Broadcasting": { icon: <Radio className="w-4 h-4" />, color: "text-blue-500" },
    Surrealism: { icon: <Shield className="w-4 h-4" />, color: "text-purple-600" },
    "Sound Films (Talkies)": { icon: <Volume2 className="w-4 h-4" />, color: "text-blue-600" },
    Television: { icon: <Shield className="w-4 h-4" />, color: "text-gray-700" },
    "Animation Industry": { icon: <Shield className="w-4 h-4" />, color: "text-red-500" },
    "Abstract Expressionism": { icon: <Shield className="w-4 h-4" />, color: "text-blue-500" },
    "Rock and Roll": { icon: <Shield className="w-4 h-4" />, color: "text-red-600" },
    "Pop Art": { icon: <Shield className="w-4 h-4" />, color: "text-pink-500" },
    "Video Art": { icon: <Shield className="w-4 h-4" />, color: "text-purple-500" },
    "Home Video/VCR": { icon: <Cassette className="w-4 h-4" />, color: "text-black" },
    "Video Games": { icon: <Shield className="w-4 h-4" />, color: "text-blue-500" },
    "Digital Art": { icon: <Shield className="w-4 h-4" />, color: "text-cyan-500" },
    "Internet/World Wide Web": { icon: <Shield className="w-4 h-4" />, color: "text-blue-500" },
    "Social Media Platforms": { icon: <Shield className="w-4 h-4" />, color: "text-blue-600" },
    "Streaming Services": { icon: <Shield className="w-4 h-4" />, color: "text-red-600" },
    "Mobile Photography/Art": { icon: <Shield className="w-4 h-4" />, color: "text-gray-800" },
    "Virtual Reality Entertainment": { icon: <Shield className="w-4 h-4" />, color: "text-purple-600" },
    "AI-Generated Art": { icon: <Shield className="w-4 h-4" />, color: "text-green-600" },
    "NFT Art Market": { icon: <Shield className="w-4 h-4" />, color: "text-yellow-500" },
    "TikTok Culture": { icon: <Shield className="w-4 h-4" />, color: "text-pink-600" },
  }

  const defaultIcon = { icon: <Palette className="w-4 h-4" />, color: "text-gray-500" }
  const selected = iconMap[innovation] || defaultIcon

  return <span className={selected.color}>{selected.icon}</span>
}

export default function InnovationTimelines() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Debounced search handler with 2-second delay
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value)

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Set new timeout for 2 seconds
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(value)
    }, 2000)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])
  const [activeTab, setActiveTab] = useState("information-technology")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const timelineData = {
    "information-technology": createTimelineItems(innovationsData.informationTechnology, getITIcon),
    "programming-tools": createTimelineItems(innovationsData.programmingTools, getProgrammingIcon),
    "text-editors": createTimelineItems(innovationsData.textEditors, getTextEditorIcon),
    "materials-energy": createTimelineItems(innovationsData.materialsEnergy, getMaterialsIcon),
    transportation: createTimelineItems(innovationsData.transportation, getTransportationIcon),
    science: createTimelineItems(innovationsData.science, getScienceIcon),
    medicine: createTimelineItems(innovationsData.medicine, getMedicineIcon),
    society: createTimelineItems(innovationsData.society, getSocietyIcon),
    culture: createTimelineItems(innovationsData.culture, getCultureIcon),
  }

  // For timelineData typing, ensure filtered and sorted objects are initialized with all required keys and empty arrays
  const emptyTimelineData = {
    "information-technology": [],
    "programming-tools": [],
    "text-editors": [],
    "materials-energy": [],
    transportation: [],
    science: [],
    medicine: [],
    society: [],
    culture: [],
  };

  // Optimized search with debouncing and memoization
  const filteredAndSortedTimelineData = useMemo(() => {
    let filtered: typeof timelineData = { ...emptyTimelineData };

    // Apply search filter using debounced query
    if (!debouncedSearchQuery.trim()) {
      filtered = timelineData;
    } else {
      const query = debouncedSearchQuery.toLowerCase();
      Object.entries(timelineData).forEach(([key, items]) => {
        const filteredItems = items.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.innovator.toLowerCase().includes(query) ||
            item.date.includes(query),
        );
        if (filteredItems.length > 0) {
          filtered[key as keyof typeof timelineData] = filteredItems;
        }
      });
    }

    // Apply sorting
    const sorted: typeof timelineData = { ...emptyTimelineData };
    Object.entries(filtered).forEach(([key, items]) => {
      const sortedItems = [...items].sort((a, b) => {
        // Parse years handling BCE and ranges
        const parseYear = (yearStr: string) => {
          let parsedYear = yearStr;

          // Handle ranges (take first value)
          if (parsedYear.includes("–") || parsedYear.includes("-")) {
            parsedYear = parsedYear.split(/[–-]/)[0].trim();
          }

          // Handle BCE years (convert to negative)
          if (parsedYear.toLowerCase().includes("bce")) {
            const yearNum = Number.parseInt(parsedYear.replace(/[^\d]/g, "")) || 0;
            return -yearNum;
          } else {
            return Number.parseInt(parsedYear.replace(/[^\d]/g, "")) || 0;
          }
        };

        const yearA = parseYear(a.date);
        const yearB = parseYear(b.date);
        return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
      });
      sorted[key as keyof typeof timelineData] = sortedItems;
    });

    return sorted;
  }, [debouncedSearchQuery, sortOrder]);

  const totalFilteredInnovations = Object.values(filteredAndSortedTimelineData).reduce(
    (total, items) => total + items.length,
    0,
  );

  // Auto-switch to first available tab when searching
  useEffect(() => {
    if (debouncedSearchQuery.trim() && Object.keys(filteredAndSortedTimelineData).length > 0) {
      const firstAvailableTab = Object.keys(filteredAndSortedTimelineData)[0];
      if (!filteredAndSortedTimelineData[activeTab as keyof typeof filteredAndSortedTimelineData]) {
        setActiveTab(firstAvailableTab);
      }
    }
  }, [filteredAndSortedTimelineData, activeTab, debouncedSearchQuery]);

  // Debounced search handler
  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
    setActiveTab("information-technology");
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const totalInnovations = Object.values(timelineData).reduce((total, items) => total + items.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Header with Enhanced Effects */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-lg">
        <div className="container flex h-12 items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <Lightbulb className="w-5 h-5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <Sparkles className="w-2.5 h-2.5 text-yellow-400 absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                Innovation Timeline
              </h1>
              <Badge variant="outline" className="text-xs w-fit">
                {totalInnovations} Innovations
              </Badge>
            </div>
          </div>

          {/* Search and Sort Controls */}
          <div className="flex items-center gap-2">
            {/* Search Box */}
            <div className="relative group">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5 transition-colors group-focus-within:text-primary" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-7 pr-7 h-8 w-28 sm:w-48 text-xs border transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20 bg-background/80 backdrop-blur-sm"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>

            {/* Flippable Hourglass Sort Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSortOrder}
              className="h-8 px-2 border transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20 bg-background/80 backdrop-blur-sm group flex items-center gap-1"
              title={`Sort by ${sortOrder === "asc" ? "Newest" : "Oldest"}`}
            >
              <Hourglass
                className={`w-4 h-4 transition-all duration-500 ${
                  sortOrder === "asc"
                    ? "rotate-0"
                    : "rotate-180"
                } group-hover:scale-110`}
              />
              <span className="hidden sm:inline text-xs font-medium">
                {sortOrder === "asc" ? "Newest" : "Oldest"}
              </span>
            </Button>
          </div>
        </div>

        {/* Search Results Badges */}
        {searchQuery && (
          <div className="border-t bg-muted/20">
            <div className="container py-1">
              <div className="flex flex-wrap gap-1">
                {debouncedSearchQuery !== searchQuery ? (
                  <Badge variant="outline" className="animate-pulse text-xs">
                    <Search className="w-3 h-3 mr-1" />
                    Searching...
                  </Badge>
                ) : (
                  <Badge variant="outline" className="animate-pulse text-xs">
                    <Search className="w-3 h-3 mr-1" />
                    {totalFilteredInnovations} results found
                  </Badge>
                )}
                {debouncedSearchQuery === searchQuery &&
                  Object.entries(filteredAndSortedTimelineData).map(([key, items]) => (
                    <Badge key={key} variant="secondary" className="text-xs">
                      {key.replace("-", " ")}: {items.length}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content with Enhanced Effects */}
      <main className="container py-6 sm:py-12 relative">
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in-50 slide-in-from-top-6 duration-1000 delay-200">
            {debouncedSearchQuery
              ? `Found ${totalFilteredInnovations} innovations matching "${debouncedSearchQuery}"`
              : searchQuery
                ? `Searching for "${searchQuery}"...`
                : ""}
          </p>

        <Separator className="mb-6 sm:mb-12 bg-gradient-to-r from-transparent via-border to-transparent" />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tabs in header style but within Tabs provider */}
          <div className="relative mb-8 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="flex w-max sm:w-full sm:grid sm:grid-cols-9 h-10 bg-muted/50 backdrop-blur-sm border-2 border-muted min-w-full">
              {[
                { value: "information-technology", icon: Computer, label: "IT", fullLabel: "Information Technology" },
                { value: "programming-tools", icon: Code, label: "Code", fullLabel: "Programming Tools" },
                { value: "text-editors", icon: Edit, label: "Editors", fullLabel: "Text Editors" },
                { value: "materials-energy", icon: Zap, label: "Materials", fullLabel: "Materials & Energy" },
                { value: "transportation", icon: Car, label: "Transport", fullLabel: "Transportation" },
                { value: "science", icon: Microscope, label: "Science", fullLabel: "Science" },
                { value: "medicine", icon: Heart, label: "Medicine", fullLabel: "Medicine" },
                { value: "society", icon: Users, label: "Society", fullLabel: "Society" },
                { value: "culture", icon: Palette, label: "Culture", fullLabel: "Culture" },
              ].map((tab) => {
                const hasData = filteredAndSortedTimelineData[tab.value as keyof typeof filteredAndSortedTimelineData]
                const count = hasData
                  ? filteredAndSortedTimelineData[tab.value as keyof typeof filteredAndSortedTimelineData].length
                  : 0

                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 transition-all duration-300 hover:scale-105 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg relative group"
                  >
                    <tab.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span className="hidden sm:inline font-medium">{tab.label}</span>
                    {searchQuery && hasData && (
                      <Badge variant="secondary" className="ml-1 text-xs animate-pulse">
                        {count}
                      </Badge>
                    )}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {/* Tab Contents with Enhanced Animations */}
          {[
            {
              value: "information-technology",
              icon: Computer,
              title: "Information Technology",
              data: filteredAndSortedTimelineData["information-technology"],
            },
            {
              value: "programming-tools",
              icon: Code,
              title: "Programming Tools",
              data: filteredAndSortedTimelineData["programming-tools"],
            },
            {
              value: "text-editors",
              icon: Edit,
              title: "Text Editors",
              data: filteredAndSortedTimelineData["text-editors"],
            },
            {
              value: "materials-energy",
              icon: Zap,
              title: "Materials & Energy",
              data: filteredAndSortedTimelineData["materials-energy"],
            },
            {
              value: "transportation",
              icon: Car,
              title: "Transportation",
              data: filteredAndSortedTimelineData["transportation"],
            },
            { value: "science", icon: Microscope, title: "Science", data: filteredAndSortedTimelineData["science"] },
            { value: "medicine", icon: Heart, title: "Medicine", data: filteredAndSortedTimelineData["medicine"] },
            { value: "society", icon: Users, title: "Society", data: filteredAndSortedTimelineData["society"] },
            { value: "culture", icon: Palette, title: "Culture", data: filteredAndSortedTimelineData["culture"] },
          ].map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
            >
              <Card className="border-2 border-muted bg-gradient-to-r from-background to-muted/20 shadow-xl">
                <CardContent className="p-4 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
                    <div className="flex items-center group">
                      <div className="relative mr-3 sm:mr-4">
                        <tab.icon className="w-7 h-7 sm:w-10 sm:h-10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
                        <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                          {tab.title}
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-1">
                          Discover the evolution of {tab.title.toLowerCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="text-xs sm:text-sm px-2 sm:px-3 py-1">
                        {sortOrder === "asc" ? "↑ Chronological" : "↓ Reverse"}
                      </Badge>
                    </div>
                  </div>

                  {tab.data && tab.data.length > 0 ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent rounded-lg blur-xl" />
                      <Timeline
                        items={tab.data}
                        animate
                        className="relative z-10"
                        connectorColor="primary"
                        iconColor="primary"
                        size="md"
                      />
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="relative inline-block">
                        <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                        <div className="absolute -inset-4 bg-muted/20 rounded-full blur-xl" />
                      </div>
                      <h3 className="text-xl font-semibold text-muted-foreground mb-2 flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                        No innovations found
                        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                      </h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search terms or explore other categories.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>

    </div>
  )
}

export { InnovationTimelines as TimelineMain };
