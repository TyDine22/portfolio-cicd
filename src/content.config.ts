import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/projects",
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),

      technologies: z.array(z.string()),

      category: z.string(),
      year: z.number(),

      featured: z.boolean().default(false),
      order: z.number(),

      hero: image().optional(),
      heroAlt: z.string().optional(),

      github: z.string().optional(),
      demo: z.string().optional(),
    }),
});

export const collections = {
  projects,
};