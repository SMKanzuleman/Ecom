import { motion } from "motion/react"

type ButtonProps = {
    children: React.ReactNode,
    className: String
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
