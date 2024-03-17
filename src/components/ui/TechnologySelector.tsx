import debounce from "debounce-promise";
import {
  GroupBase,
  Options,
} from "node_modules/react-select/dist/declarations/src";
import Select from "node_modules/react-select/dist/declarations/src/Select";
import React from "react";
import ReactSelect, { AsyncCreatableProps } from "react-select/async-creatable";

type Props = {
  errorMessage?: string;
  value?: string[];
  onChange?: (val: string[]) => void;
} & AsyncCreatableProps<unknown, boolean, GroupBase<unknown>>;

const TechnologySelector = React.forwardRef<
  Select<unknown, boolean, GroupBase<unknown>>,
  Props
>(function ({ errorMessage, value, onChange, ...props }, ref) {
  const promiseOptions = debounce(
    (inputValue: string) =>
      fetch(`/api/technologies?search=${inputValue}`).then(async (res) => {
        const data = await res.json();
        return data.map((tech: any) => ({
          label: tech,
          value: tech,
        }));
      }),
    300
  );

  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
        Technologies <span className="text-red-500">*</span>
      </label>
      <ReactSelect
        ref={ref}
        className="mt-1 react-select-container"
        classNamePrefix="react-select"
        isMulti
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        {...props}
        value={value?.map((v) => ({ label: v, value: v }))}
        onChange={(val) =>
          onChange?.(
            val
              ? (val as Options<{ label: string; value: string }>).map(
                  (v) => v.value
                )
              : []
          )
        }
      />
      {errorMessage && (
        <small className="text-xs text-red-500 mt-1">{errorMessage}</small>
      )}
    </div>
  );
});

TechnologySelector.displayName = "TechnologySelector";

export { TechnologySelector };
