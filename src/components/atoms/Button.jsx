import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

/**
 * Editorial Button Component
 * Distinctive, bold, and tactile with physics-based interactions.
 */
const variants = {
    primary: 'bg-accent text-white hover:bg-accent-dark shadow-editorial hover:shadow-editorial-hover border-2 border-accent',
    secondary: 'bg-secondary text-primary hover:bg-secondary-dark border-2 border-primary/10',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/5 hover:text-primary-dark',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
};

const sizes = {
    sm: 'px-4 py-1.5 text-sm font-medium',
    md: 'px-6 py-2.5 text-base font-medium',
    lg: 'px-8 py-3.5 text-lg font-semibold',
};

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading,
    disabled,
    ...props
}) => {
    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={twMerge(
                'rounded-editorial flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </motion.button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default Button;
