import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Eye } from "lucide-react";
import { projects } from "../data/projects";

export default function ProjectsPage() {
  const featured = projects.find((p) => p.slug === "croppdf")!;
  const top2 = projects.find((p) => p.slug === "currency");
  const top3 = projects.find((p) => p.slug === "weather-project");

  const sorted = projects
    .filter((p) => ![featured.slug, top2?.slug, top3?.slug].includes(p.slug))
    .sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          {/* Featured */}
          <Card>
            <Link href={`/projects/${featured.slug}`}>
              <article className="relative w-full h-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-100">
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(featured.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Eye className="w-4 h-4" />
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      featured.views
                    )}
                  </span>
                </div>

                <h2 className="mt-4 text-3xl font-bold text-zinc-100 sm:text-4xl font-display">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-8 text-zinc-400">
                  {featured.description}
                </p>
              </article>
            </Link>
          </Card>

          {/* Top 2 + Top 3 */}
          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3]
              .filter((p): p is (typeof projects)[number] => Boolean(p))
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={project.views} />
                </Card>
              ))}
          </div>
        </div>

        <div className="hidden w-full h-px md:block bg-zinc-800" />

        {/* Grid of others */}
        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          {[0, 1, 2].map((col) => (
            <div key={col} className="grid grid-cols-1 gap-4">
              {sorted
                .filter((_, i) => i % 3 === col)
                .map((project) => (
                  <Card key={project.slug}>
                    <Article project={project} views={project.views} />
                  </Card>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
