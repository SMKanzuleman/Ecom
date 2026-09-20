import { motion } from "motion/react";

export const staggerContainer = (staggerTime = 0.1, delayTime = 0) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: staggerTime,
            delayChildren: delayTime,
        },
    },
});


export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
};


export const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
};


export const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
};
export const productcards = {
    hidden: {
        opacity: 0,
        x: -20 // 👈 30px left se aayega
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const
        },
    },
};