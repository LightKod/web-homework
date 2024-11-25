'use client'

import {
    ChevronRightIcon,
    XMarkIcon
} from '@heroicons/react/24/solid';
import { useSpring, animated } from '@react-spring/web'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { clsx } from 'clsx';

interface SheetProps {
    isVisible: boolean, 
    size: string,
    heading: string,
    onClose: () => void,
    children: React.ReactNode
}

// Expose the closeSheet function to parent node
export interface SheetRef {
    closeSheet: () => void
}

const Sheet = forwardRef<SheetRef, SheetProps>(function Sheet (props, ref) {
    const [spring, api] = useSpring(() => ({
        transformX: 'translateX(100%)',
        opacity: 0,
        rotate: 'rotate(180deg)',
        closeButtonOpacity: 0,
        closeButtonTransformX: 'translateX(3rem)'
    }))

    useEffect(() => {
        if (props.isVisible) {
            api.start({
                transformX: 'translateX(0%)',
                opacity: 0.5,
                rotate: 'rotate(0deg)',
                closeButtonOpacity: 1,
                closeButtonTransformX: 'translateX(0rem)'
            })
        }
    }, [props.isVisible])

    const closeSheet = () => {
        api.start({
            transformX: 'translateX(100%)',
            opacity: 0,
            rotate: 'rotate(180deg)',
            closeButtonOpacity: 0,
            closeButtonTransformX: 'translateX(3rem)',
            onRest: props.onClose
        })
    }

    useImperativeHandle(ref, () => ({
        closeSheet,
    }));

    let width = "w-[24rem]"

    switch (props.size) {
        case "sm":
            width = "w-[20rem]"
            break
        case "md":
            width = "w-[24rem]"
            break
        case "lg":
            width = "w-[28rem]"
            break
        case "xl":
            width = "w-[32rem]"
            break
    }
    
    const sheetStyle = `fixed flex flex-col gap-y-4 p-6 top-0 right-0 h-full bg-violet-50 ${width} max-w-full min-w-full md:min-w-0 md:drop-shadow-md`

    return (
        <div className={clsx(
            "z-50",
            {
                "hidden": !props.isVisible,
                "fixed": props.isVisible
            }
        )}>
            <animated.div onClick={closeSheet} className="fixed inset-0 bg-gray-950" style={{opacity: spring.opacity}}></animated.div>
            <animated.div className={sheetStyle} style={{transform: spring.transformX}}>
                {/* CLOSE BUTTON (LARGE SCREEN) */}
                <animated.button type="button" onClick={closeSheet} className="absolute hidden items-center justify-center top-0 -left-12 w-12 h-12 bg-violet-50 rounded-l-md cursor-pointer md:flex" style={{opacity: spring.closeButtonOpacity, transform: spring.closeButtonTransformX}}>
                    <animated.div style={{transform: spring.rotate}}>
                        <ChevronRightIcon className="w-5 text-gray-950"/>
                    </animated.div>
                </animated.button>
                {/* HEADING + CLOSE BUTTON (SMALL SCREEN) */}
                <div className="flex gap-x-4 items-center justify-between">
                    <h1 className="grow text-gray-950 font-bold text-xl break-words">{props.heading}</h1>
                    <div className="shrink-0">
                        <button type="button" onClick={closeSheet} className="flex items-center justify-center cursor-pointer md:hidden">
                        <animated.div style={{transform: spring.rotate}}>
                            <XMarkIcon className="w-8 text-gray-950"/>
                        </animated.div>
                        </button>
                    </div>
                </div>
                {/* SHEET'S CONTENT */}
                {props.children}
            </animated.div>
        </div>
    )
})

export default Sheet