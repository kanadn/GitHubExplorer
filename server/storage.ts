import { type Repository, type InsertRepo } from "@shared/schema";

export interface IStorage {
  getRepositories(): Promise<Repository[]>;
  addRepositories(repos: InsertRepo[]): Promise<void>;
  clear(): Promise<void>;
}

export class MemStorage implements IStorage {
  private repositories: Repository[] = [];

  async getRepositories(): Promise<Repository[]> {
    return this.repositories;
  }

  async addRepositories(repos: InsertRepo[]): Promise<void> {
    this.repositories.push(...repos);
  }

  async clear(): Promise<void> {
    this.repositories = [];
  }
}

export const storage = new MemStorage();
