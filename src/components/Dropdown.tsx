import React from "react";

export type DropdownOption = {
  id: string | number;
  label: string;
  icon?: string;
};

export interface IDropdownProps {
  label: string;
  options: Array<DropdownOption>;
  value: number | string | undefined;
  onChange: (value: number | string) => void;
}

const Dropdown: React.FC<IDropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const selectOption = (event: React.SyntheticEvent<HTMLUListElement>) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    setShowDropdown(false);
    onChange(target.id);
  };

  const valueLabel = options.find(({ id }) =>
    typeof value === "number"
      ? Number(id) === Number(value)
      : typeof value === "string"
      ? id === value
      : undefined
  );

  return (
    <div className="flex flex-col items-start">
      <span>{label}</span>
      <div
        className="border rounded-xl shadow-sm bg-white px-4 py-2 min-w-[200px] relative text-left cursor-pointer"
        onClick={() => setShowDropdown((val) => !val)}
      >
        <div className="flex items-center justify-between">
          {valueLabel ? (
            <span className="flex items-center">
              {valueLabel.icon && (
                <img
                  src={valueLabel.icon}
                  className="w-6 h-6 rounded-full mr-2"
                />
              )}
              {valueLabel.label}
            </span>
          ) : (
            <span className="capitalize">Select {label}</span>
          )}
          <span className="text-gray-500 relative -top-1">&#8964;</span>
        </div>
        {showDropdown && (
          <ul
            onClick={selectOption}
            className="absolute top-12 w-full left-0 bg-white rounded-sm border shadow-sm z-10"
          >
            {options.map((option) => {
              return (
                <li
                  key={option.id}
                  id={`${option.id}`}
                  value={option.label}
                  className={`px-1 py-2 hover:bg-hyphen-purple/20 flex items-center cursor-pointer ${
                    option.id === Number(value) ? "bg-hyphen-purple/10 " : ""
                  }`}
                >
                  {option.icon && (
                    <img
                      src={option.icon}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  )}
                  {option.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
