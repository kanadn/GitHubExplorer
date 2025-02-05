import { type Repository } from "./api-types";

const GITHUB_API = "https://api.github.com";

export async function fetchGitHubRepos(page: number): Promise<Repository[]> {
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
