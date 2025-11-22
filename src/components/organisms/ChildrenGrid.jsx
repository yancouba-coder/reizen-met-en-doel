import React from 'react';
import PropTypes from 'prop-types';
import ChildCard from '../molecules/ChildCard';

/**
 * Composant ChildrenGrid - Grille responsive d'affichage des enfants
 * 
 * Affiche une grille de cartes d'enfants avec gestion de 3 états:
 * 1. Loading: Affiche 8 cartes skeleton avec animation pulse
 * 2. Empty: Affiche un message "Aucun enfant trouvé"
 * 3. Data: Affiche les cartes d'enfants
 * 
 * Grid responsive:
 * - Mobile: 1 colonne
 * - Small: 2 colonnes
 * - Large: 3 colonnes
 * - XL: 4 colonnes
 * 
 * @component
 * @example
 * <ChildrenGrid
 *   children={childrenList}
 *   isLoading={loading}
 * />
 * 
 * @param {Object} props - Props du composant
 * @param {Array} [props.children] - Liste des enfants à afficher
 * @param {boolean} [props.isLoading=false] - Indique si les données sont en cours de chargement
 * 
 * @returns {JSX.Element} Grille de cartes d'enfants ou état de chargement/vide
 */
const ChildrenGrid = ({ children, isLoading }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse">
                        <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                        <div className="p-4 space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-20 bg-gray-200 rounded w-full"></div>
                            <div className="h-10 bg-gray-200 rounded w-full mt-auto"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!children || children.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No children found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {children.map((child) => (
                <ChildCard key={child.id} child={child} />
            ))}
        </div>
    );
};

ChildrenGrid.propTypes = {
    children: PropTypes.array,
    isLoading: PropTypes.bool,
};

export default ChildrenGrid;
