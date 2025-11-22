import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Variantes de couleur sémantiques pour les badges
 * - default: Gris neutre pour information générale
 * - success: Vert pour statuts positifs (ex: "Parrainé")
 * - warning: Jaune pour avertissements
 * - danger: Rouge pour urgence ou erreurs (ex: "Urgent")
 * - info: Bleu pour informations (ex: besoins de l'enfant)
 * - primary: Couleur principale de l'application
 */
const variants = {
    default: 'bg-background-light text-text-light',
    success: 'bg-success/10 text-success-dark',
    warning: 'bg-warning/10 text-warning-dark',
    danger: 'bg-danger/10 text-danger-dark',
    info: 'bg-info/20 text-info-dark',
    primary: 'bg-primary/10 text-primary-dark',
};

/**
 * Composant Badge - Label coloré pour afficher des statuts ou catégories
 * 
 * Affiche un petit badge en forme de pilule avec différentes couleurs sémantiques.
 * Utilisé pour les statuts, priorités, catégories, etc.
 * 
 * @component
 * @example
 * // Badge de statut urgent
 * <Badge variant="danger">Urgent</Badge>
 * 
 * @example
 * // Badge de besoin d'enfant
 * <Badge variant="info">Éducation</Badge>
 * 
 * @param {Object} props - Props du composant
 * @param {React.ReactNode} props.children - Contenu du badge (texte)
 * @param {'default'|'success'|'warning'|'danger'|'info'|'terracotta'} [props.variant='default'] - Variante de couleur
 * @param {string} [props.className] - Classes CSS additionnelles
 * 
 * @returns {JSX.Element} Élément badge stylisé
 */
const Badge = ({ children, variant = 'default', className }) => {
    return (
        <span
            className={twMerge(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'success', 'warning', 'danger', 'info', 'primary']),
    className: PropTypes.string,
};

export default Badge;
