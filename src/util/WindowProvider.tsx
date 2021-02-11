import React, { createContext, useEffect, useState } from 'react';

export const WindowContext = createContext({
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xl2: true,
})

type Props = {
    maxWidthMobile?: number
    maxWidthTable?: number
    /* maxWidthDesktop: number */
    children?: any
    sm?: number
    md?: number
    lg?: number
    xl?: number
    xl2?: number
}

const defaultScreens = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xl2: 1536,
}

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}


export const WindowProvider = (props: Props) => {
    const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
    const [screen, setScreen] = useState({ sm: true, md: false, lg: false, xl: false, xl2: false })

    useEffect(() => {
        setWindowDimensions(getWindowDimensions())
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions())
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        setWindowProps(windowDimensions.width, windowDimensions.height)
    }, [windowDimensions])

    const setWindowProps = (width, height) => {
        let minSM = props.sm ? props.sm : defaultScreens.sm
        let minMD = props.md ? props.md : defaultScreens.md
        let minLG = props.lg ? props.lg : defaultScreens.lg
        let minXL = props.xl ? props.xl : defaultScreens.xl
        let minXL2 = props.xl2 ? props.xl2 : defaultScreens.xl2
        let isSM, isMD, isLG, isXL, isXL2
        isSM = true
        isMD = width >= minMD
        isLG = width >= minLG
        isXL = width >= minXL
        isXL2 = width >= minXL2
        setScreen({
            sm: isSM,
            md: isMD,
            lg: isLG,
            xl: isXL,
            xl2: isXL2
        })
    }


    return <WindowContext.Provider value={{ ...screen }}>
        {props.children}
    </WindowContext.Provider>
};

export default WindowProvider;