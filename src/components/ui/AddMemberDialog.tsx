"use client";

import { Button } from "@/components/ui/shad/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shad/Dialog";
import { useAddMember } from "@/hooks/useMember";
import { UploadButton } from "@/lib/uploadthing";
import { TeamMember } from "@/types/project";
import { MEMBER_VALIDATION } from "@/validators/team-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Alert from "./Alert";
import { Input } from "./Input";
import { Label } from "./shad/Label";

type Props = {
  open: boolean;
  initialName?: string;
  onClose: (member?: TeamMember) => void;
};

type FormValues = z.infer<typeof MEMBER_VALIDATION>;

export function AddMemberDialog({ open, onClose, ...props }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const { trigger, error, isMutating, reset: resetData } = useAddMember();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name: props.initialName ?? "",
      occupation: "",
    },
    resolver: zodResolver(MEMBER_VALIDATION),
  });
  const avatar = watch("avatar");

  const handleMemberCreate: SubmitHandler<FormValues> = (data) => {
    resetData();
    trigger({
      name: data.name,
      occupation: data.occupation,
      avatar: null,
    }).then((member) => {
      onClose(member);
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          resetData();
          reset();
          onClose();
        }
      }}
    >
      <DialogContent className="bg-white dark:bg-gray-900 dark:border-none sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.stopPropagation();
            handleSubmit(handleMemberCreate)(event);
          }}
        >
          <div className="grid gap-4 py-4 items-start">
            {error?.message && <Alert variant="error">{error.message}</Alert>}
            <Input
              label="Name"
              errorMessage={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Occupation"
              errorMessage={errors.occupation?.message}
              {...register("occupation")}
            />
            <div>
              <Label>Avatar</Label>
              {avatar ? (
                <div className="flex gap-2 items-center mt-1">
                  <Image
                    src={avatar}
                    height={48}
                    width={48}
                    alt="avatar"
                    className="rounded-full h-12 w-12"
                  />
                  <Button
                    className="mt-1"
                    onClick={() => {
                      setValue("avatar", undefined);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <UploadButton
                  className="items-start mt-1"
                  endpoint="imageUploader"
                  onBeforeUploadBegin={(files) => {
                    setIsUploading(true);
                    return files;
                  }}
                  onClientUploadComplete={(res) => {
                    setIsUploading(false);
                    setValue("avatar", res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Error: ", error);
                    setIsUploading(false);
                  }}
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={isMutating || isUploading}
              className="bg-blue-500 text-white"
              type="submit"
            >
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
