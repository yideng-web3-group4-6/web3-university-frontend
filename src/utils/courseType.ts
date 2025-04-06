import { BookOpen, Code, Layers, Shield, Cpu, Database, Zap, Workflow } from 'lucide-react';

export type CoinType = 'ETH' | 'BTC' | 'USDT' | 'BNB';

export interface Chapter {
  id: string;
  title?: string;
  url: string;
  locked?: boolean;
}

export interface Course {
  id: string;
  icon: string | React.ReactElement;
  title: string;
  description: string;
  level: string;
  duration: number;
  price: number;
  tags: string;
  children: Chapter[];
  coverImage?: string;
}

export interface CourseData {
  courses: Course[];
  total: number;
}

export const iconMap = {
  BookOpen: BookOpen,
  Code: Code,
  Layers: Layers,
  Shield: Shield,
  Cpu: Cpu,
  Database: Database,
  Zap: Zap,
  Workflow: Workflow,
};
