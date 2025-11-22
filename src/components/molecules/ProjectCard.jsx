import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';

/**
 * Composant ProjectCard - Carte d'affichage d'un projet de financement
 * 
 * Affiche un projet avec sa progression de financement:
 * - Image du projet
 * - Titre et description
 * - Barre de progression visuelle
 * - Montants collectés vs objectif
 * - Bouton pour voir les détails
 * 
 * @component
 * @example
 * <ProjectCard project={{
 *   id: 'proj-1',
 *   title: 'Construction d'école',
 *   description: 'Construire une école...',
 *   image: '/images/school.jpg',
 *   targetAmount: 5000,
 *   raisedAmount: 1500
 * }} />
 * 
 * @param {Object} props - Props du composant
 * @param {Object} props.project - Objet contenant les données du projet
 * @param {string} props.project.id - Identifiant unique du projet
 * @param {string} props.project.title - Titre du projet
 * @param {string} [props.project.description] - Description du projet
 * @param {string} [props.project.image] - URL de l'image du projet
 * @param {number} [props.project.targetAmount] - Montant cible en euros
 * @param {number} [props.project.raisedAmount] - Montant collecté en euros
 * 
 * @returns {JSX.Element} Carte de projet avec barre de progression
 */
const ProjectCard = ({ project }) => {
    const { id, title, description, image, targetAmount, raisedAmount } = project;
    const progress = Math.min((raisedAmount / targetAmount) * 100, 100);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            <div className="h-48 w-full bg-gray-200">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-text mb-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                    {description}
                </p>

                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-accent">€{raisedAmount}</span>
                        <span className="text-gray-500">of €{targetAmount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-accent h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <Link to={`/projects/${id}`} className="mt-auto">
                    <Button variant="secondary" className="w-full">
                        View Project
                    </Button>
                </Link>
            </div>
        </div>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        image: PropTypes.string,
        targetAmount: PropTypes.number,
        raisedAmount: PropTypes.number,
    }).isRequired,
};

export default ProjectCard;
