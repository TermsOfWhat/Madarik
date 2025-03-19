import { motion } from 'framer-motion';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import { LearningRoadmap } from '../types';

interface RoadmapCardProps {
  roadmap: LearningRoadmap;
  index: number;
  onClick: () => void;
}

export function RoadmapCard({ roadmap, index, onClick }: RoadmapCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
      className="roadmap-card"
      onClick={onClick}
    >
      <div className="roadmap-content">
        <h3>{roadmap?.name}</h3>
        <p>{roadmap?.description}</p>
        <div className="roadmap-meta">
          <span className="roadmap-modules">
            <BookOpen className="w-4 h-4" />
            {roadmap?.modules} Modules
          </span>
          <span className="roadmap-time">
            <Clock className="w-4 h-4" />
            {roadmap?.estimatedTime}
          </span>
        </div>
        <div className="roadmap-level">
          <span>{roadmap?.difficulty}</span>
        </div>
      </div>
      <div className="roadmap-action">
        <ChevronRight className="w-5 h-5" />
      </div>
    </motion.div>
  );
}
