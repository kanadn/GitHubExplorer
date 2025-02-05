import { pgTable, text, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const repositories = pgTable("repositories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  fullName: text("full_name").notNull(),
  description: text("description"),
  htmlUrl: text("html_url").notNull(),
  stargazersCount: integer("stargazers_count").notNull(),
  forksCount: integer("forks_count").notNull(),
  openIssuesCount: integer("open_issues_count").notNull(),
  owner: jsonb("owner").$type<{
    avatarUrl: string;
    login: string;
  }>().notNull(),
});

export const insertRepoSchema = createInsertSchema(repositories);

export type InsertRepo = z.infer<typeof insertRepoSchema>;
export type Repository = typeof repositories.$inferSelect;
