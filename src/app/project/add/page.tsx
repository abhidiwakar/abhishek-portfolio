"use client";

import { Input } from "@/components/ui/Input";

import { Select } from "@/components/ui/Select";
import { TeamSelector } from "@/components/ui/TeamSelector";
import { TechnologySelector } from "@/components/ui/TechnologySelector";
import { Button } from "@/components/ui/shad/Button";
import { useAddProject } from "@/hooks/useProject";
import { ADD_PROJECT_VALIDATION } from "@/validators/project-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type Values = z.infer<typeof ADD_PROJECT_VALIDATION>;

export default function AddProject() {
  const { mutate, isLoading, reset: resetApi } = useAddProject();
  const ref = React.useRef<Editor>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<Values>({
    defaultValues: {
      name: "",
      smallDescription: "",
      status: "IN_PROGRESS",
      description: "",
    },
    resolver: zodResolver(ADD_PROJECT_VALIDATION),
  });

  const onSubmit = (data: Values) => {
    data.description = ref.current?.editor?.getContent() || "";
    mutate({ ...data }).then(() => {
      ref.current?.editor?.setContent("");
      reset();
      resetApi();
    });
  };

  const status = watch("status");

  return (
    <div className="container my-6 px-4">
      <h1 className="text-2xl font-semibold">Add Project</h1>
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
              errorMessage={errors.endDate?.message}
            />
          )}
        </div>
        <div className="my-6">
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <Editor
            ref={ref}
            apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks linkchecker",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
            initialValue=""
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
          disabled={isLoading}
          type="submit"
          className="mt-4 bg-blue-600 text-white"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
