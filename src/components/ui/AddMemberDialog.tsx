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
import { TeamMember } from "@/types/project";
import { MEMBER_VALIDATION } from "@/validators/team-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Alert from "./Alert";
import { Input } from "./Input";

type Props = {
  open: boolean;
  initialName?: string;
  onClose: (member?: TeamMember) => void;
};

type FormValues = z.infer<typeof MEMBER_VALIDATION>;

export function AddMemberDialog({ open, onClose, ...props }: Props) {
  const { trigger, error, isMutating, reset: resetData } = useAddMember();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: props.initialName ?? "",
      occupation: "",
    },
    resolver: zodResolver(MEMBER_VALIDATION),
  });

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
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.stopPropagation();
            handleSubmit(handleMemberCreate)(event);
          }}
        >
          <div className="grid gap-4 py-4">
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
          </div>
          <DialogFooter>
            <Button className="bg-blue-500 text-white" type="submit">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
