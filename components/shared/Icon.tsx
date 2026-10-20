import React from "react";
import {
  Award,
  GraduationCap,
  Handshake,
  BadgeCheck,
  Eye,
  Target,
  Library,
  FlaskConical,
  Home,
  Bus,
  Heart,
  Shield,
  Palette,
  Trophy,
  Sparkles,
  Sparkle,
  Users,
  UsersRound,
  Code2,
  Wrench,
  Microscope,
  TrendingUp,
  Music,
  Image as ImageIcon,
  Building2,
  UserPlus,
  BookOpen,
  MessageSquare,
  FileCheck,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ArrowUp,
  Search,
  Menu,
  X,
  ExternalLink,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Play,
  Check,
  CheckCircle2,
  AlertCircle,
  Info,
  Clock,
  Download,
  Share2,
  HelpCircle,
  Compass,
  Briefcase,
  Bookmark,
  Globe,
  Lock,
  Layers,
  Cpu,
  Send,
  type LucideProps,
} from "lucide-react";

/** Social SVG components */
function FacebookIcon(props: LucideProps) {
  const { size = 24, className, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: LucideProps) {
  const { size = 24, className, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: LucideProps) {
  const { size = 24, className, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon(props: LucideProps) {
  const { size = 24, className, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" fill="currentColor" />
    </svg>
  );
}

function TwitterIcon(props: LucideProps) {
  const { size = 24, className, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

/**
 * Registry mapping icon names used in content to React icon components.
 */
export const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Award,
  GraduationCap,
  Handshake,
  BadgeCheck,
  Eye,
  Target,
  Library,
  FlaskConical,
  Home,
  Bus,
  Heart,
  Shield,
  Palette,
  Trophy,
  Sparkles,
  Sparkle,
  Users,
  Users2: UsersRound,
  Code2,
  Wrench,
  Microscope,
  TrendingUp,
  Music,
  Image: ImageIcon,
  Building2,
  UserPlus,
  BookOpen,
  MessageSquare,
  FileCheck,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ArrowUp,
  Search,
  Menu,
  X,
  ExternalLink,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Play,
  Check,
  CheckCircle2,
  AlertCircle,
  Info,
  Clock,
  Download,
  Share2,
  HelpCircle,
  Compass,
  Briefcase,
  Bookmark,
  Globe,
  Lock,
  Layers,
  Cpu,
  Send,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Linkedin: LinkedinIcon,
  Youtube: YoutubeIcon,
  Twitter: TwitterIcon,
};

export interface IconProps extends LucideProps {
  /** The string name of the icon as defined in content */
  name: string;
}

/**
 * Shared Icon component that renders an icon from its string name.
 * Falls back to HelpCircle if the icon name is not found in the registry.
 */
export function Icon({ name, ...props }: IconProps) {
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent aria-hidden="true" {...props} />;
}
