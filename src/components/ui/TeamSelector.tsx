import { TeamMember } from "@/types/project";
import debouncePromise from "debounce-promise";
import {
  GroupBase,
  Options,
} from "node_modules/react-select/dist/declarations/src";
import Select from "node_modules/react-select/dist/declarations/src/Select";
import React, { useEffect, useMemo, useState } from "react";
import ReactSelect, { CreatableProps } from "react-select/creatable";
import { AddMemberDialog } from "./AddMemberDialog";
import { useGetMembers } from "@/hooks/useMember";

type Props = {
  errorMessage?: string;
  value?: string[];
  onChange?: (val: string[]) => void;
} & CreatableProps<unknown, boolean, GroupBase<unknown>>;

const TeamSelector = React.forwardRef<
  Select<unknown, boolean, GroupBase<unknown>>,
  Props
>(function ({ errorMessage, value, onChange, ...props }, ref) {
  const { data: members, isLoading } = useGetMembers();
  const values = useMemo(() => {
    return value?.map((v) => ({
      label: members?.find((m) => m.id === v)?.name || "",
      value: v,
    }));
  }, [value, members]);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [memberName, setMemberName] = useState("");

  const handleMemberCreate = (inputValue: string) => {
    setMemberName(inputValue);
    setAddMemberOpen(true);
  };

  const handleMemberCreateDialogClose = (member?: TeamMember) => {
    setAddMemberOpen(false);
    // If member is not undefined, then add the member to the list.
    if (member) {
      onChange?.([...(value || []), member.id]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Team Members <span className="text-red-500">*</span>
      </label>
      <ReactSelect
        onCreateOption={handleMemberCreate}
        ref={ref}
        className="mt-1"
        isMulti
        isSearchable={true}
        options={members?.map((m) => ({
          label: m.name,
          value: m.id,
        }))}
        isLoading={isLoading}
        {...props}
        value={values}
        onChange={(val, actionMeta) =>
          onChange?.(
            (val as { label: string; value: string }[]).map((v) => v.value),
            actionMeta
          )
        }
      />
      {errorMessage && (
        <small className="text-xs text-red-500 mt-1">{errorMessage}</small>
      )}
      {addMemberOpen && (
        <AddMemberDialog
          open={addMemberOpen}
          initialName={memberName}
          onClose={handleMemberCreateDialogClose}
        />
      )}
    </div>
  );
});

TeamSelector.displayName = "TeamSelector";

export { TeamSelector };
