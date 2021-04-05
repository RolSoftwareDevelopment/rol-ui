import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import cn from 'classnames'
import { useOutsideAlerter } from '../util/useOutsideAlerter'

type Option<Value> = {
    value: Value, label: string, component?: any
}

type OptionWithId<Value> = Option<Value> & { id: number }

type ValueWithId<Value> = Value & { id: number }

interface Props<Value> {
    options?: Option<Value>[]
    initialValue?: Value[]
    inputProps?: HTMLAttributes<HTMLInputElement>
    placeholder?: string
    notFoundComponent?: any


    filter?: (value, label) => OptionWithId<Value>[]

    multi?: boolean

    className?: string
    inputClassName?: string
    dropdownClassName?: string
    optionContainerClassName?: string

    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => any
    onOpen?: (data) => any
    onClose?: (data) => any,
    beforeSelect?: (values: Value[]) => any

    classNameOnDropdownOpen?: string
    classNameOnDropdownClose?: string

    inputClassNameOnDropdownOpen?: string
    inputClassNameOnDropdownClose?: string

    dropdownClassNameOnDropdownOpen?: string
    dropdownClassNameOnDropdownClose?: string

    noInputDefaultClassNames?: string
    noDropdownDefaultClassNames?: boolean
    noContainerDefaultClassNames?: boolean

}


const Select = <Value extends object>(props: Props<Value>) => {
    const [open, setOpen] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")
    const [value, setValue] = useState<ValueWithId<Value>[]>(
        (props.initialValue?.length && props?.initialValue?.map((iv, i) => { return { ...iv, id: i } })) || [])
    const [options, setOptions] = useState<OptionWithId<Value>[]>([])
    const ref = useRef(null)
    useOutsideAlerter(ref, () => {
        setOpen(false)
    })

    useEffect(() => {
        setOptions(props.options?.map((opt, i) => {
            return {
                ...opt,
                id: i
            }
        }) || [])
    }, [])


    const onSelect = (opt) => {
        props.beforeSelect && props.beforeSelect(opt)
        setValue(prev => {
            if (props.multi) return [{ ...opt.value, id: 0 }] //Si solo se puede seleccionar 1 valor entonces guardamos un array con 1 solo valor
            let vals = [...prev] //Sino
            const o = vals.find(v => v.id === opt.id) //Buscamos si la opcion que queremos agregar ya está en los valores seleccionados
            if (!o) vals.push({ ...opt.value, id: opt.id }) // Si no está, entonces la agregamos a los valores seleccionados
            return vals
        })
        console.log("selected")
    }

    const filterOptions: (options: OptionWithId<Value>[]) => OptionWithId<Value>[] = (options) => {
        if (props.filter) {
            return props.filter(inputValue, options)
        } else {
            const filteredOptions = []
            options.forEach(opt => {
                console.log(opt)
                if (contained(inputValue.toLowerCase(), opt.label.toLowerCase()))
                    filteredOptions.push(opt)
            })
            return filteredOptions
        }
    }

    const contained = (s1: string, s2: string) => {
        return s2.indexOf(s1) != -1
    }

    const filteredOptions = filterOptions(options)


    return (
        <div ref={ref} className={cn(
            props.className,
            {
                "relative": !props.noContainerDefaultClassNames,
                [props.classNameOnDropdownOpen]: open,
                [props.classNameOnDropdownClose]: !open
            }
        )}>
            <input {...props.inputProps}
                className={cn(
                    props.inputClassName,
                    {
                        "outline-none": !props.noInputDefaultClassNames,
                        [props.inputClassNameOnDropdownOpen]: open,
                        [props.inputClassNameOnDropdownClose]: !open
                    })}
                onFocus={() => setOpen(true)}
                onClick={(e) => {
                    setOpen(true)
                    props.inputProps?.onChange && props.inputProps?.onChange(e)
                }}
                onChange={(e) => {
                    console.log(e.target.value)
                    setInputValue(e.target.value)
                    props.onInputChange && props.onInputChange(e)
                }}
                placeholder={props.placeholder || ""}
                value={inputValue} />
            <div className={
                cn(
                    props.dropdownClassName,
                    {
                        "hidden": !props.noDropdownDefaultClassNames && !open,
                        "absolute": !props.noDropdownDefaultClassNames && open,
                        [props.dropdownClassNameOnDropdownOpen]: open,
                        [props.dropdownClassNameOnDropdownClose]: !open
                    }
                )}>
                {
                    filteredOptions.length
                        ? filteredOptions.map((opt, i) => {
                            return <div
                                key={i}
                                className={cn(props.optionContainerClassName)}
                                onClick={() => onSelect(opt)}>{opt.component || opt.label}</div>
                        })
                        : props.notFoundComponent
                }
            </div>
        </div>
    );
};

export default Select;