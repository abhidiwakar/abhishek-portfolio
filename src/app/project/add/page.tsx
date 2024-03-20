"use client";

import ProjectForm, { ProjectFormValues } from "@/components/ProjectForm";
import { useAddProject } from "@/hooks/useProject";
import { useRouter } from "next/navigation";

export default function AddProject() {
  const router = useRouter();
  const {
    mutate,
    isLoading: isAddingProject,
    reset: resetApi,
  } = useAddProject();

  const handleSubmit = (data: ProjectFormValues) => {
    mutate(data).then((project) => {
      resetApi();
      router.push(`/project/${project.slug}`);
    });
  };

  return (
    <div className="container my-6 px-4">
      <h1 className="text-2xl font-semibold">Add Project</h1>
      <ProjectForm onSubmit={handleSubmit} isLoading={isAddingProject} />
    </div>
  );
}
