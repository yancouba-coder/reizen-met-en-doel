import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'lucide-react';
import { twMerge } from 'tailwind-merge';

/**
 * Composant Icon - Wrapper pour les icônes Lucide React
 * 
 * Charge dynamiquement une icône depuis la bibliothèque Lucide React par son nom.
 * Affiche un warning console et retourne null si l'icône n'existe pas.
 * 
 * @component
 * @example
 * // Icône simple
 * <Icon name="Heart" size={20} />
 * 
 * @example
 * // Icône avec classes personnalisées
 * <Icon name="MapPin" size={16} className="text-accent" />
 * 
 * @example
 * // Icône avec props Lucide additionnels
 * <Icon name="Menu" size={24} strokeWidth={2.5} color="#FF6B35" />
 * 
 * @param {Object} props - Props du composant
 * @param {string} props.name - Nom de l'icône Lucide (ex: 'Heart', 'Menu', 'User')
 * @param {number} [props.size=24] - Taille de l'icône en pixels
 * @param {string} [props.className] - Classes CSS additionnelles
 * @param {Object} props...rest - Props additionnels Lucide (color, strokeWidth, etc.)
 * 
 * @returns {JSX.Element|null} Élément icône ou null si l'icône n'existe pas
 */
const Icon = ({ name, size = 24, className, ...props }) => {
    const LucideIcon = Icons[name];

    if (!LucideIcon) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    return (
        <LucideIcon
            size={size}
            className={twMerge('inline-block', className)}
            {...props}
        />
    );
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    className: PropTypes.string,
};

export default Icon;
