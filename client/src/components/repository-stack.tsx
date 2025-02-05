import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { RepositoryCard } from "./repository-card";
import { type Repository } from "@/lib/api-types";

interface RepositoryStackProps {
  repositories: Repository[];
}

export function RepositoryStack({ repositories }: RepositoryStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (currentIndex < repositories.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div {...handlers} className="relative w-[350px] h-[600px]">
      <AnimatePresence>
        <RepositoryCard
          key={repositories[currentIndex].id}
          repository={repositories[currentIndex]}
        />
      </AnimatePresence>
    </div>
  );
}
