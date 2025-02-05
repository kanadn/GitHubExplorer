import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { RepositoryCard } from "./repository-card";
import { type Repository } from "@/lib/api-types";

interface RepositoryStackProps {
  repositories: Repository[];
}

export function RepositoryStack({ repositories: initialRepositories }: RepositoryStackProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Shuffle repositories when they are loaded
    const shuffled = [...initialRepositories].sort(() => Math.random() - 0.5);
    setRepositories(shuffled);
  }, [initialRepositories]);

  const handleNavigation = useCallback((direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex < repositories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'down' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex, repositories.length]);

  const handlers = useSwipeable({
    onSwipedUp: () => handleNavigation('up'),
    onSwipedDown: () => handleNavigation('down'),
    trackMouse: true
  });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        handleNavigation('up');
      } else if (e.deltaY < 0) {
        handleNavigation('down');
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleNavigation]);

  if (!repositories.length) return null;

  return (
    <div {...handlers} className="relative w-[90vw] max-w-[450px] h-[70vh] max-h-[750px] md:w-[450px] md:h-[750px]">
      <AnimatePresence>
        <RepositoryCard
          key={repositories[currentIndex].id}
          repository={repositories[currentIndex]}
        />
      </AnimatePresence>
    </div>
  );
}