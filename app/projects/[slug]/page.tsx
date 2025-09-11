import { notFound } from "next/navigation";
import { Header } from "./header";
import "./mdx.css";
import { projects } from "../../data/projects"; // 👈 import here

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug.toLowerCase();
  const project = projects.find(
    (project) => project.slug.toLowerCase() === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} views={project.views} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <p>{project.description}</p>
        <p>
          Check it out here:{" "}
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.url}
          </a>
        </p>
      </article>
    </div>
  );
}
