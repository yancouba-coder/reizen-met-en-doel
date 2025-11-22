import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Avatar from '../atoms/Avatar';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

/**
 * Composant ChildCard - Carte d'affichage d'un enfant à parrainer
 * 
 * Affiche les informations essentielles d'un enfant dans une carte compacte avec:
 * - Photo de l'enfant
 * - Badges de statut (urgent, parrainé)
 * - Informations de base (nom, âge, village)
 * - Description tronquée (3 lignes max)
 * - Bouton d'action pour parrainer
 * 
 * @component
 * @example
 * <ChildCard child={{
 *   id: '123',
 *   firstName: 'Amina',
 *   age: 8,
 *   village: 'Dakar',
 *   description: 'Une jeune fille...',
 *   priority: 'urgent',
 *   status: 'waiting',
 *   imageUrl: '/images/amina.jpg'
 * }} />
 * 
 * @param {Object} props - Props du composant
 * @param {Object} props.child - Objet contenant les données de l'enfant
 * @param {string} props.child.id - Identifiant unique de l'enfant
 * @param {string} props.child.firstName - Prénom de l'enfant
 * @param {number} props.child.age - Âge de l'enfant
 * @param {string} [props.child.village] - Village d'origine
 * @param {string} props.child.description - Description/histoire de l'enfant
 * @param {string} [props.child.priority] - Priorité ('urgent' affiche un badge rouge)
 * @param {string} [props.child.status] - Statut ('sponsored' affiche un badge vert)
 * @param {string[]} [props.child.photos] - URLs des photos (fallback)
 * @param {string} [props.child.imageUrl] - URL principale de la photo (prioritaire)
 * 
 * @returns {JSX.Element} Carte d'enfant avec lien vers la page de détail
 */
const ChildCard = ({ child }) => {
    const { t } = useTranslation();
    const { id, firstName, age, village, description, priority, photos, status, imageUrl } = child;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            <div className="relative h-48 w-full bg-gray-200">
                <img
                    src={imageUrl || (photos && photos[0])}
                    alt={firstName}
                    className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                    {priority === 'urgent' && (
                        <Badge variant="danger">{t('urgent')}</Badge>
                    )}
                    {status === 'sponsored' && (
                        <Badge variant="success">{t('sponsored_list')}</Badge>
                    )}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-text">{firstName}, {age}</h3>
                    <Icon name="Heart" className="text-accent" size={20} />
                </div>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                    <Icon name="MapPin" size={14} /> {village}
                </p>
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                    {description}
                </p>
                <Link to={`/sponsorships/${id}`} className="mt-auto">
                    <Button variant="outline" className="w-full">
                        {t('sponsor_child')}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

ChildCard.propTypes = {
    child: PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        village: PropTypes.string,
        shortStory: PropTypes.string,
        priority: PropTypes.string,
        status: PropTypes.string,
        photos: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default ChildCard;
