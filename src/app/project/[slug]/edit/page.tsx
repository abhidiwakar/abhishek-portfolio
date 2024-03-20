"use client";

import ProjectForm, { ProjectFormValues } from "@/components/ProjectForm";
import Alert from "@/components/ui/Alert";
import useProject, {
    useUpdateProject
} from "@/hooks/useProject";
import { notFound, useRouter } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default function EditProject({ params: { slug } }: Props) {
  const router = useRouter();
  const { data: project, isLoading, isError } = useProject(slug);
  const {
    mutate,
    isLoading: isAddingProject,
    reset: resetApi,
  } = useUpdateProject();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Alert title="Loading...">
          <p>Loading project details...</p>
        </Alert>
      </div>
    );
  }

  if (isError) {
    console.log("Error fetching project details", isError);
    return (
      <div className="flex h-screen items-center justify-center">
        <Alert variant="error" title="Error">
          <p>Something went wrong!</p>
        </Alert>
      </div>
    );
  }

  if (!project || project.length === 0) {
    notFound();
  }

  const handleSubmit = (data: ProjectFormValues) => {
    mutate({ ...data, id: project[0].id }).then(() => {
      resetApi();
      router.push(`/project/${slug}`);
    });
  };

  return (
    <div className="container my-6 px-4">
      <h1 className="text-2xl font-semibold">Edit Project</h1>
      <ProjectForm
        initialData={project[0]}
        isLoading={isAddingProject}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
