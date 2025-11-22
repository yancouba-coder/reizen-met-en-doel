import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailles disponibles pour l'avatar
 * - sm: 32px (8 * 4px)
 * - md: 48px (12 * 4px)
 * - lg: 96px (24 * 4px)
 * - xl: 128px (32 * 4px)
 */
const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32',
};

/**
 * Composant Avatar - Image de profil circulaire avec fallback
 * 
 * Affiche une image de profil circulaire. Si aucune image n'est fournie,
 * affiche une icône utilisateur SVG par défaut.
 * 
 * @component
 * @example
 * // Avatar avec image
 * <Avatar src="/path/to/image.jpg" alt="John Doe" size="lg" />
 * 
 * @example
 * // Avatar sans image (fallback)
 * <Avatar size="md" />
 * 
 * @param {Object} props - Props du composant
 * @param {string} [props.src] - URL de l'image de profil
 * @param {string} [props.alt='Avatar'] - Texte alternatif pour l'accessibilité
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md'] - Taille de l'avatar
 * @param {string} [props.className] - Classes CSS additionnelles
 * 
 * @returns {JSX.Element} Élément avatar circulaire
 */
const Avatar = ({ src, alt, size = 'md', className }) => {
    return (
        <div
            className={twMerge(
                'relative inline-block overflow-hidden rounded-full bg-gray-200',
                sizes[size],
                className
            )}
        >
            {src ? (
                <img
                    className="h-full w-full object-cover"
                    src={src}
                    alt={alt || 'Avatar'}
                />
            ) : (
                <svg
                    className="h-full w-full text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </div>
    );
};

Avatar.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    className: PropTypes.string,
};

export default Avatar;
