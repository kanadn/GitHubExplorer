import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { RepositoryStack } from "@/components/repository-stack";
import { type Repository } from "@/lib/api-types";

export default function Home() {
  const { data: repositories, isLoading, error } = useQuery<Repository[]>({
    queryKey: ["/api/repositories"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <Card className="w-[90vw] max-w-[600px] h-[60vh] max-h-[500px] md:w-[600px] md:h-[500px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <Card className="w-[90vw] max-w-[600px] h-[60vh] max-h-[500px] md:w-[600px] md:h-[500px] p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p className="text-muted-foreground">{(error as Error).message}</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!repositories?.length) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <Card className="w-[90vw] max-w-[600px] h-[60vh] max-h-[500px] md:w-[600px] md:h-[500px] p-6 flex items-center justify-center">
          <p className="text-muted-foreground">No repositories found</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <RepositoryStack repositories={repositories} />
    </div>
  );
}