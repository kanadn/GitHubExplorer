import { Card, CardContent } from "@/components/ui/card";
import { Star, GitFork, AlertCircle, ExternalLink } from "lucide-react";
import { type Repository } from "@/lib/api-types";
import { motion } from "framer-motion";

interface RepositoryCardProps {
  repository: Repository;
  style?: React.CSSProperties;
}

export function RepositoryCard({ repository, style }: RepositoryCardProps) {
  const handleClick = () => {
    window.open(repository.htmlUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={style}
      className="absolute w-full h-full"
    >
      <Card className="w-[350px] h-[600px] overflow-hidden cursor-pointer" onClick={handleClick}>
        <CardContent className="p-6 h-full flex flex-col">
          <div className="mb-6 flex items-center">
            <img
              src={repository.owner.avatarUrl}
              alt={repository.owner.login}
              className="w-16 h-16 rounded-full"
            />
            <div className="ml-4">
              <h2 className="font-semibold text-xl">{repository.name}</h2>
              <p className="text-muted-foreground text-sm">by {repository.owner.login}</p>
            </div>
            <ExternalLink className="ml-auto text-muted-foreground" />
          </div>

          <p className="text-muted-foreground mb-6 flex-grow">
            {repository.description || "No description available"}
          </p>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" />
              <span className="font-medium">
                {repository.stargazersCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="text-blue-500" />
              <span className="font-medium">
                {repository.forksCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-500" />
              <span className="font-medium">
                {repository.openIssuesCount.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
