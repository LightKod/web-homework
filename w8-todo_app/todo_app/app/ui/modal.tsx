'use client'

import {
    XMarkIcon
} from '@heroicons/react/24/solid';
import { useSpring, animated } from '@react-spring/web'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { clsx } from 'clsx';

interface ModalProps {
    isVisible: boolean, 
    size: string,
    heading: string,
    onClose: () => void,
    children: React.ReactNode
}

// Expose the closeSheet function to parent node
export interface ModalRef {
    closeModal: () => void
}

const Modal = forwardRef<ModalRef, ModalProps>(function Modal (props, ref) {
    const [spring, api] = useSpring(() => ({
        opacity: 0,
        modalOpacity: 0,
        modalTransform: 'scale(0.95) translate(-50%, -50%)',
    }))

    useEffect(() => {
        if (props.isVisible) {
            api.start({
                opacity: 0.5,
                modalOpacity: 1,
                modalTransform: 'scale(1) translate(-50%, -50%)',
                config: {
                    tension: 400,
                    friction: 40
                }
            })
        }
    }, [props.isVisible])

    const closeModal = () => {
        api.start({
            opacity: 0,
            modalOpacity: 0,
            modalTransform: 'scale(0.95) translate(-50%, -50%)',
            config: {
                tension: 400,
                friction: 40
            },
            onRest: props.onClose
        })
    }

    useImperativeHandle(ref, () => ({
        closeModal,
    }));

    let width = "sm:w-[40rem]"

    switch (props.size) {
        case "sm":
            width = "sm:w-[36rem]"
            break
        case "md":
            width = "sm:w-[40rem]"
            break
        case "lg":
            width = "md:w-[44rem]"
            break
        case "xl":
            width = "md:w-[48rem]"
            break
    }

    const modalStyle = `fixed flex flex-col origin-bottom-left top-1/2 left-1/2 w-full max-h-96 -translate-x-1/2 -translate-y-1/2 gap-y-4 p-6 bg-violet-50 rounded-md ${width} drop-shadow-md`

    return (
        <div className={clsx(
            "z-50",
            {
                "hidden": !props.isVisible,
                "fixed": props.isVisible
            }
        )}>
            <animated.div onClick={closeModal} className="fixed inset-0 bg-gray-950" style={{opacity: spring.opacity}}></animated.div>
            <animated.div className={modalStyle} style={{transform: spring.modalTransform, opacity: spring.modalOpacity}}>
                <div className="flex gap-x-4 items-center justify-between">
                    <h1 className="grow text-gray-950 font-bold text-lg break-words">{props.heading}</h1>
                    <div className="shrink-0">
                        <button type="button" onClick={closeModal} className="flex items-center justify-center cursor-pointer">
                                <XMarkIcon className="w-7 text-gray-950"/>
                        </button>
                    </div>
                </div>
                {props.children}
            </animated.div>
        </div>
    )
})

export default Modal