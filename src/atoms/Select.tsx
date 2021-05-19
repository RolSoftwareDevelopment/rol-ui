import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { useOutsideAlerter } from "../util/useOutsideAlerter";
import AutosizeInput from "react-input-autosize";

export type Option<Value> = {
  value: Value;
  label: string;
  component?: any;
};

export type OptionWithId<Value> = Option<Value> & { id: number };

export type ValueWithId<Value> = Value & { id: number };

export interface Props<Value> {
  options?: Option<Value>[];
  initialValue?: Value[];
  inputProps?: HTMLAttributes<HTMLInputElement>;
  placeholder?: string;
  dontClearInputOnBlur?: boolean;
  onlyHandleDropdownWithDropdownHandler?: boolean;

  ComponentDropdownHandler: any;
  ComponentClear: any;
  ComponentNotFound: any;
  renderComponentSelected: (data: {
    removeValue: () => any;
    selectedOption: OptionWithId<Value>;
    props: Props<Value>;
    useValues: {
      values: ValueWithId<Value>[];
      setValues: React.Dispatch<React.SetStateAction<ValueWithId<Value>[]>>;
    };
  }) => any;

  filter?: (value: any, label: any) => OptionWithId<Value>[];

  multi?: boolean;
  disabled?: boolean;

  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onOpenChange?: (isOpen: boolean) => any;
  beforeSelect?: (values: Value[], newOption: OptionWithId<Value>) => any;
  onSelect?: (values: Value[], newOption: OptionWithId<Value>) => any;
  onChange?: (value: Value[]) => any;

  closeOnSelect?: boolean;

  className?: string;
  noDefaultClassNames?: string;
  classNameOnDropdownOpen?: string;
  classNameOnDropdownClose?: string;
  disabledClassName?: string;
  enabledClassName?: string;

  containerClassName?: string;
  containerClassNameOnDropdownOpen?: string;
  containerClassNameOnDropdownClose?: string;
  disabledContainerClassName?: string;
  enabledContainerClassName?: string;

  inputClassName?: string;
  inputClassNameOnDropdownOpen?: string;
  inputClassNameOnDropdownClose?: string;
  disabledInputClassName?: string;
  enabledInputClassName?: string;

  dropdownClassName?: string;
  dropdownClassNameOnDropdownOpen?: string;
  dropdownClassNameOnDropdownClose?: string;
  disabledDropdownClassName?: string;
  enabledDropdownClassName?: string;

  inputContainerClassName?: string;
  noInputContainerDefaultClassNames?: string;
  inputContainerClassNameOnDropdownOpen?: string;
  inputContainerClassNameOnDropdownClose?: string;
  disabledInputContainerClassName?: string;
  enabledInputContainerClassName?: string;

  noInputDefaultClassNames?: string;
  noDropdownDefaultClassNames?: boolean;
  noContainerDefaultClassNames?: boolean;

  optionContainerClassName?: string;
}

const Select = <Value extends object>(props: Props<Value>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [values, setValues] = useState<ValueWithId<Value>[]>(
    (props.initialValue?.length &&
      props?.initialValue?.map((iv, i) => {
        return { ...iv, id: i };
      })) ||
      []
  );
  const ref = useRef(null);
  const inputRef = useRef(null);
  useOutsideAlerter(ref, () => {
    handleDropdown({ isOpen: false });
    setInputValue("");
  });

  useEffect(() => {
    props.onOpenChange && props.onOpenChange(isOpen);
  }, [isOpen]);

  const handleDropdown = (
    options:
      | {
          isDropdownHandler: true;
          isOpen?: boolean;
        }
      | { isOpen: boolean; isDropdownHandler?: boolean }
  ) => {
    
    if (options.isDropdownHandler) {
      setIsOpen((prev) => !prev);
    } else {
      if (!props.onlyHandleDropdownWithDropdownHandler) {
        setIsOpen(options.isOpen);
      }
    }

  };

  const options =
    props.options?.map((opt, i) => {
      return {
        ...opt,
        id: i,
      };
    }) || [];

  useEffect(() => {
    props.onChange && props.onChange(values);
  }, [values]);

  const onSelect = (opt: OptionWithId<Value>) => {
    props.onSelect && props.onSelect(values, opt);
    setValues((prev) => {
      if (!props.multi) return [{ ...opt.value, id: opt.id }]; //Si solo se puede seleccionar 1 valor entonces guardamos un array con 1 solo valor
      let vals = [...prev]; //Sino
      const o = vals.find((v) => v.id === opt.id); //Buscamos si la opcion que queremos agregar ya está en los valores seleccionados
      if (!o) vals.push({ ...opt.value, id: opt.id }); // Si no está, entonces la agregamos a los valores seleccionados
      return vals;
    });
    props.closeOnSelect && !props.disabled && handleDropdown({ isOpen: false });
  };

  const filterOptions: (
    options: OptionWithId<Value>[]
  ) => OptionWithId<Value>[] = (options) => {
    if (props.filter) {
      return props.filter(inputValue, options);
    } else {
      const filteredOptions: any[] = [];
      options.forEach((opt) => {
        if (contained(inputValue.toLowerCase(), opt.label.toLowerCase()))
          filteredOptions.push(opt);
      });
      return filteredOptions;
    }
  };

  const contained = (s1: string, s2: string) => {
    return s2.indexOf(s1) != -1;
  };

  const removeValue = (id: any) => {
    setValues((prev) => {
      const aux = [...prev];
      const i = aux.findIndex((v) => v.id === id);
      aux.splice(i, 1);
      return aux;
    });
  };

  const filteredOptions = filterOptions(options);

  return (
    // Container
    <div
      ref={ref}
      className={cn(props.containerClassName, {
        [props.enabledContainerClassName]: !props.disabled,

        [props.disabledContainerClassName]: props.disabled,
        relative: !props.noContainerDefaultClassNames,

        [props.containerClassNameOnDropdownOpen]: isOpen,

        [props.containerClassNameOnDropdownClose]: !isOpen,
      })}
    >
      <div
        className={cn(props.className, {
          [props.enabledClassName]: !props.disabled,

          [props.disabledClassName]: props.disabled,
          flex: !props.noDefaultClassNames,

          [props.classNameOnDropdownOpen]: isOpen,

          [props.classNameOnDropdownClose]: !isOpen,
        })}
      >
        {/* Selected and Input  Container */}
        <div
          onClick={() => {
            inputRef.current.focus();
          }}
          className={cn(
            props.inputContainerClassName,
            "w-full flex flex-wrap gap-1 items-center",
            {
              [props.enabledClassName]: !props.disabled,
              [props.disabledClassName]: props.disabled,
              flex: !props.noInputContainerDefaultClassNames,
              [props.inputContainerClassNameOnDropdownOpen]: isOpen,
              [props.inputContainerClassNameOnDropdownClose]: !isOpen,
            }
          )}
        >
          {props.renderComponentSelected &&
            !!values?.length &&
            values.map((v) => {
              const comp = props.renderComponentSelected({
                removeValue: () => removeValue(v.id),
                selectedOption: options[v.id],
                props,
                useValues: {
                  values,
                  setValues,
                },
              });
              return React.cloneElement(comp, {
                ...comp.props,
                onClick: (e) => {
                  e?.stopPropagation();
                  comp.props.onClick && comp.props.onClick();
                },
              });
            })}
          <AutosizeInput
            ref={inputRef}
            onBlur={() => {
              // setTimeout(() => {
              //   setIsOpen(false);
              // }, 100);//This is a temporarly if in case someone use "tab" to change focus
              !props.dontClearInputOnBlur && setInputValue("");
            }}
            {...props.inputProps}
            disabled={props.disabled}
            inputClassName={cn(props.inputClassName, {
              [props.enabledInputClassName]: !props.disabled,
              [props.disabledInputClassName]: props.disabled,
              "outline-none": !props.noInputDefaultClassNames,
              [props.inputClassNameOnDropdownOpen]: isOpen,
              [props.inputClassNameOnDropdownClose]: !isOpen,
            })}
            onFocus={() => !props.disabled && handleDropdown({ isOpen: true })}
            onClick={(e) => {
              if (!props.disabled) {
                handleDropdown({ isOpen: true });
                props.inputProps?.onChange && props.inputProps?.onChange(e);
              }
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
              props.onInputChange && props.onInputChange(e);
            }}
            placeholder={props.placeholder || ""}
            value={inputValue}
          />
        </div>
        {props.ComponentClear &&
          React.cloneElement(props.ComponentClear, {
            ...props.ComponentClear.props,
            onClick: () => {
              props.ComponentClear.onClick && props.ComponentClear.onClick();
              setInputValue("");
              setValues([]);
            },
          })}
        {props.ComponentDropdownHandler &&
          React.cloneElement(props.ComponentDropdownHandler, {
            ...props.ComponentDropdownHandler.props,
            onClick: () => {
              handleDropdown({ isDropdownHandler: true });
              props.ComponentDropdownHandler.props.onClick &&
                props.ComponentDropdownHandler.props.onClick();
            },
          })}
      </div>
      <div
        className={cn(props.dropdownClassName, {
          [props.enabledDropdownClassName]: !props.disabled,
          [props.disabledDropdownClassName]: props.disabled,
          hidden: !props.noDropdownDefaultClassNames && !isOpen,
          absolute: !props.noDropdownDefaultClassNames && isOpen,
          [props.dropdownClassNameOnDropdownOpen]: isOpen,
          [props.dropdownClassNameOnDropdownClose]: !isOpen,
        })}
      >
        {filteredOptions.length
          ? filteredOptions.map((opt, i) => {
              return (
                <div
                  key={i}
                  className={cn(props.optionContainerClassName)}
                  onClick={() => !props.disabled && onSelect(opt)}
                >
                  {/* {React.isValidElement(opt.component) ? React.cloneElement(opt.component, {...opt.component, active})} */}
                  {opt.component || opt.label}
                </div>
              );
            })
          : props.ComponentNotFound}
      </div>
    </div>
  );
};

export default Select;
