import { Card, CardContent } from "@/components/ui/card";
import { Star, GitFork, AlertCircle, ExternalLink } from "lucide-react";
import { type Repository } from "@/lib/api-types";
import { motion } from "framer-motion";

interface RepositoryCardProps {
  repository: Repository;
  style?: React.CSSProperties;
}

export function RepositoryCard({ repository, style }: RepositoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={style}
      className="absolute w-full h-full"
    >
      <Card className="w-full h-full overflow-hidden">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={repository.owner.avatarUrl}
              alt={repository.owner.login}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full"
            />
            <div className="flex-grow min-w-0">
              <h2 className="font-semibold text-lg md:text-xl truncate">{repository.name}</h2>
              <p className="text-muted-foreground text-sm truncate">by {repository.owner.login}</p>
            </div>
            <a 
              href={repository.htmlUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-accent rounded-full transition-colors flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="text-muted-foreground w-5 h-5" />
            </a>
          </div>

          <p className="text-muted-foreground text-sm md:text-base line-clamp-3 mb-auto">
            {repository.description || "No description available"}
          </p>

          <div className="flex justify-between items-center mt-4 md:mt-6">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 w-5 h-5" />
              <span className="font-medium text-sm md:text-base">
                {repository.stargazersCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="text-blue-500 w-5 h-5" />
              <span className="font-medium text-sm md:text-base">
                {repository.forksCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-500 w-5 h-5" />
              <span className="font-medium text-sm md:text-base">
                {repository.openIssuesCount.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}