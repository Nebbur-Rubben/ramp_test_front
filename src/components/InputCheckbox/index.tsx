import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { InputCheckboxComponent } from "./types";

export const InputCheckbox: InputCheckboxComponent = ({
  id,
  checked = false,
  disabled,
  onChange,
}) => {
  const { current: inputId } = useRef(`RampInputCheckbox-${id}`);
  const [isChecked, setIsChecked] = useState(() => {

    const savedChecked = localStorage.getItem(inputId);
    return savedChecked === null ? checked : JSON.parse(savedChecked);
  });

  useEffect(() => {

    localStorage.setItem(inputId, JSON.stringify(isChecked));
  }, [isChecked, inputId]);

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <div className="RampInputCheckbox--container" data-testid={inputId}>
      <label
        htmlFor={inputId}
        className={classNames("RampInputCheckbox--label", {
          "RampInputCheckbox--label-checked": isChecked,
          "RampInputCheckbox--label-disabled": disabled,
        })}
      >

      </label>
      <input
        id={inputId}
        type="checkbox"
        className="RampInputCheckbox--input"
        checked={isChecked}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.checked)}
      />
    </div>
  );
};
