import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Variantes de style disponibles pour le bouton
 * - primary: Bouton principal avec couleur primaire
 * - secondary: Bouton secondaire avec fond clair
 * - outline: Bouton avec bordure primaire, transparent
 * - ghost: Bouton texte sans fond ni bordure
 */
const variants = {
    primary: 'bg-primary text-text-inverse hover:bg-primary-600',
    secondary: 'bg-secondary text-text hover:bg-secondary-dark',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-text-inverse',
    ghost: 'text-text hover:bg-background-light',
};

/**
 * Tailles disponibles pour le bouton
 * - sm: Petit (padding réduit, texte small)
 * - md: Moyen (taille par défaut)
 * - lg: Grand (padding augmenté, texte large)
 */
const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

/**
 * Composant Button - Bouton réutilisable avec multiples variantes et états
 * 
 * @component
 * @example
 * // Bouton primary avec état de chargement
 * <Button variant="primary" isLoading={isSubmitting} onClick={handleSubmit}>
 *   Soumettre
 * </Button>
 * 
 * @example
 * // Bouton outline de grande taille
 * <Button variant="outline" size="lg">
 *   En savoir plus
 * </Button>
 * 
 * @param {Object} props - Props du composant
 * @param {React.ReactNode} props.children - Contenu du bouton (texte, icônes, etc.)
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary'] - Variante de style
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Taille du bouton
 * @param {string} [props.className] - Classes CSS additionnelles pour personnalisation
 * @param {boolean} [props.isLoading=false] - Affiche un spinner et désactive le bouton
 * @param {boolean} [props.disabled=false] - Désactive le bouton
 * @param {Object} props...rest - Tous les autres attributs HTML natifs (onClick, type, etc.)
 * 
 * @returns {JSX.Element} Élément bouton stylisé
 */
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
        <button
            className={twMerge(
                'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
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
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default Button;
