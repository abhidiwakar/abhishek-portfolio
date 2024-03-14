"use client";

import useProject from "@/hooks/useProject";
import Alert from "./ui/Alert";
import ProjectCard from "./ui/ProjectCard";
import { Button } from "./ui/shad/Button";

export default function Projects() {
  const { data: projects, isLoading, isError, mutate } = useProject();

  return (
    <div className="my-6 px-6 sm:p-0">
      <h4 className="text-2xl font-semibold">Projects</h4>
      <p className="text-sm text-slate-400">
        This is a list of projects I have recently worked on.
      </p>
      {isLoading ? (
        <Alert className="mt-2" variant="info">
          Loading projects. Please wait...
        </Alert>
      ) : isError ? (
        <Alert
          className="mt-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
          variant="error"
        >
          <p>Failed to load projects! Please try again.</p>
          <div>
            <Button
              variant="outline"
              className="border-red-300"
              onClick={() => mutate()}
            >
              Retry
            </Button>
          </div>
        </Alert>
      ) : (
        <>
          {(projects?.length ?? 0) > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                {projects?.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              <small className="text-slate-400 mt-1">
                Click on a project to view more details.
              </small>
            </>
          ) : (
            <div>
              <Alert title="Info" className="mt-2" variant="warning">
                <p>There&apos;s no project to show here at the moment.</p>
              </Alert>
            </div>
          )}
        </>
      )}
    </div>
  );
}
