"use client";

import { Input } from "@/components/ui/Input";

import { Select } from "@/components/ui/Select";
import { TeamSelector } from "@/components/ui/TeamSelector";
import { TechnologySelector } from "@/components/ui/TechnologySelector";
import { Button } from "@/components/ui/shad/Button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { uploadFile } from "@/lib/uploadthing";
import { Project } from "@/types/project";
import { ADD_PROJECT_VALIDATION } from "@/validators/project-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export type ProjectFormValues = z.infer<typeof ADD_PROJECT_VALIDATION>;

type Props = {
  isLoading?: boolean;
  onSubmit: (data: ProjectFormValues) => void;
  initialData?: Project;
};

export default function ProjectForm({ initialData, ...props }: Props) {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const ref = React.useRef<Editor>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProjectFormValues>({
    defaultValues: {
      name: initialData?.name || "",
      smallDescription: initialData?.smallDescription || "",
      status: initialData?.status || "IN_PROGRESS",
      description: initialData?.description || "",
      team: initialData?.team.map((e) => e.id) || [],
      technologies: initialData?.technologies || [],
      thumbnail: initialData?.thumbnail || undefined,
    },
    resolver: zodResolver(ADD_PROJECT_VALIDATION),
  });

  const onSubmit = (data: ProjectFormValues) => {
    data.description = ref.current?.editor?.getContent() || "";
    if (data.status !== "COMPLETED" && data.endDate) {
      delete data.endDate;
    }

    props.onSubmit(data);
    reset();
  };

  const status = watch("status");

  return (
    <form noValidate className="my-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Name"
          placeholder="What is the project called?"
          required
          {...register("name")}
          errorMessage={errors.name?.message}
        />
        <Input
          label="Small Description (100 characters max)"
          placeholder="Write a little about the project..."
          required
          {...register("smallDescription")}
          errorMessage={errors.smallDescription?.message}
        />
        <Input
          label="Start Date"
          type="date"
          required
          {...register("startDate")}
          defaultValue={
            initialData?.startDate &&
            new Date(initialData?.startDate).toISOString().split("T")[0]
          }
          errorMessage={errors.startDate?.message}
        />
        <Select
          label="Status"
          required
          options={[
            { value: "IN_PROGRESS", label: "In Progress" },
            { value: "COMPLETED", label: "Completed" },
            { value: "PLANNED", label: "Planned" },
          ]}
          {...register("status")}
          errorMessage={errors.status?.message}
        />
        {status === "COMPLETED" && (
          <Input
            label="End Date"
            type="date"
            required
            {...register("endDate")}
            defaultValue={
              initialData?.endDate &&
              new Date(initialData?.endDate).toISOString().split("T")[0]
            }
            errorMessage={errors.endDate?.message}
          />
        )}
      </div>
      <div className="my-6">
        <label className="block text-sm font-semibold mb-2">Description</label>
        <Editor
          ref={ref}
          apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
          init={{
            images_upload_handler: (blob) =>
              uploadFile(new File([blob.blob()], blob.filename())),
            skin: isDarkMode ? "oxide-dark" : "oxide",
            content_css: isDarkMode ? "dark" : "default",
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks linkchecker",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
          initialValue={initialData?.description ?? ""}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller
          name="technologies"
          control={control}
          render={({ field: { ref, ...rest }, fieldState }) => (
            <TechnologySelector
              ref={ref}
              {...rest}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="team"
          control={control}
          render={({ field: { ref, ...rest }, fieldState }) => (
            <TeamSelector
              ref={ref}
              {...rest}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </div>
      <Button
        disabled={props.isLoading}
        type="submit"
        className="mt-4 bg-blue-600 text-white"
      >
        Submit
      </Button>
    </form>
  );
}
