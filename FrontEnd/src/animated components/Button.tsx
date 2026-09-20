import {type HTMLMotionProps, motion } from "motion/react"

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode,
    className?: string
}


const Button = ({ children, className = "", ...props }: ButtonProps) => {
    return (
        <motion.button
            whileHover={{ scale: 1.03, y: 0.5 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: "spring", stiffness: 300, damping: 17 }}
            className={`btn-primary w-full ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export default Button
