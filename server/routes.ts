import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

const GITHUB_API = "https://api.github.com";

async function fetchGitHubRepos(page: number) {
  const res = await fetch(
    `${GITHUB_API}/search/repositories?q=stars:>500&sort=stars&order=desc&page=${page}&per_page=100`,
    {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "GitHub-Repository-Viewer"
      }
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const data = await res.json();
  return data.items.map((item: any) => ({
    id: item.id,
    name: item.name,
    fullName: item.full_name,
    description: item.description,
    htmlUrl: item.html_url,
    stargazersCount: item.stargazers_count,
    forksCount: item.forks_count,
    openIssuesCount: item.open_issues_count,
    owner: {
      avatarUrl: item.owner.avatar_url,
      login: item.owner.login
    }
  }));
}

export function registerRoutes(app: Express) {
  app.get("/api/repositories", async (_req, res) => {
    try {
      const repos = await storage.getRepositories();
      if (repos.length === 0) {
        // Fetch initial batch of repositories
        const promises = [1, 2, 3].map(page => fetchGitHubRepos(page));
        const results = await Promise.all(promises);
        const allRepos = results.flat();
        await storage.addRepositories(allRepos);
        return res.json(allRepos);
      }
      res.json(repos);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
