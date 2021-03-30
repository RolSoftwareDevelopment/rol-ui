import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import cn from 'classnames'
import { useOutsideAlerter } from '../util/useOutsideAlerter'

type Option = {
    value: any, label: string, component?: any
}

type OptionWithId = Option & { id: number }

type Props = {
    options?: Option[]
    value?: any[]
    initialValue?: any[]
    inputProps?: HTMLAttributes<HTMLInputElement>
    placeholder?: string
    notFoundComponent?: any


    filter?: (value, label) => OptionWithId[]

    multi?: boolean

    className?: string
    inputClassName?: string
    dropdownClassName?: string
    optionContainerClassName?: string

    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => any
    onOpen?: (data) => any
    onClose?: (data) => any

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

const Select = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")
    const [value, setValue] = useState<any[]>([])
    const [options, setOptions] = useState<OptionWithId[]>([])
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

    const filterOptions: (options: OptionWithId[]) => OptionWithId[] = (options) => {
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
                                onClick={() => {
                                    setValue(prev => {
                                        if (props.multi) return [opt.value] //Si solo se puede seleccionar 1 valor entonces guardamos un array con 1 solo valor

                                        let vals = [...prev] //Sino
                                        const o = vals.find(v => v.id === opt.id) //Buscamos si la opcion que queremos agregar ya está en los valores seleccionados
                                        if (!o) vals.push(opt.value) // Si no está, entonces la agregamos a los valores seleccionados

                                    })
                                }}>{opt.component || opt.label}</div>
                        })
                        : props.notFoundComponent
                }
            </div>
        </div>
    );
};

export default Select;