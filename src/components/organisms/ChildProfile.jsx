import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import Icon from '../atoms/Icon';

/**
 * Composant ChildProfile - Profil détaillé d'un enfant à parrainer
 * 
 * Affiche le profil complet d'un enfant avec:
 * - Photo principale avec badges de statut
 * - Informations détaillées (nom, âge, genre, village)
 * - Histoire complète de l'enfant
 * - Liste des besoins (affichés en badges)
 * - Coût mensuel du parrainage
 * - Bouton d'action contextuel (parrainer/déjà parrainé/vous parrainez)
 * 
 * Layout en grid responsive (vertical mobile, 2 colonnes desktop).
 * 
 * @component
 * @example
 * <ChildProfile
 *   child={childData}
 *   onSponsorClick={handleSponsor}
 *   isSponsoredByMe={false}
 * />
 * 
 * @param {Object} props - Props du composant
 * @param {Object} props.child - Données complètes de l'enfant
 * @param {Function} props.onSponsorClick - Callback appelé lors du clic sur le bouton de parrainage
 * @param {boolean} [props.isSponsoredByMe=false] - Indique si l'utilisateur parraine déjà cet enfant
 * 
 * @returns {JSX.Element} Profil détaillé de l'enfant
 */
const ChildProfile = ({ child, onSponsorClick, isSponsoredByMe }) => {
    const { t } = useTranslation();
    const { firstName, age, gender, village, story, needs, status, priority, photos, sponsorCostMonthly } = child;

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-96 md:h-auto bg-gray-200 relative">
                    <img
                        src={child.imageUrl || (child.photos && child.photos[0])}
                        alt={firstName}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                        {priority === 'urgent' && <Badge variant="danger">{t('urgent')}</Badge>}
                        {status === 'sponsored' && <Badge variant="success">{t('sponsored_list')}</Badge>}
                    </div>
                </div>

                <div className="p-8 flex flex-col">
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold text-text mb-2">{firstName}</h1>
                        <div className="flex flex-wrap gap-4 text-gray-600">
                            <span className="flex items-center gap-1"><Icon name="Calendar" size={18} /> {age} years old</span>
                            <span className="flex items-center gap-1"><Icon name="User" size={18} /> {gender}</span>
                            <span className="flex items-center gap-1"><Icon name="MapPin" size={18} /> {village}</span>
                        </div>
                    </div>

                    <div className="prose prose-stone mb-8 flex-grow">
                        <h3 className="text-xl font-bold text-text mb-2">My Story</h3>
                        <p className="text-gray-600 whitespace-pre-line">{story}</p>

                        <h3 className="text-xl font-bold text-text mt-6 mb-2">Needs</h3>
                        <div className="flex flex-wrap gap-2">
                            {needs.map((need) => (
                                <Badge key={need} variant="info" className="capitalize">{need}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="bg-background-darker/20 p-6 rounded-lg mt-auto">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium text-text">{t('monthly_cost')}</span>
                            <span className="text-2xl font-bold text-accent">€{sponsorCostMonthly}</span>
                        </div>
                        <Button
                            size="lg"
                            className="w-full"
                            onClick={onSponsorClick}
                            disabled={status === 'sponsored' && !isSponsoredByMe}
                            variant={isSponsoredByMe ? "outline" : "primary"}
                        >
                            {isSponsoredByMe
                                ? (t('you_sponsor_this_child') || 'You Sponsor This Child')
                                : status === 'sponsored'
                                    ? (t('already_sponsored') || 'Already Sponsored')
                                    : t('sponsor_child')}
                        </Button>
                        <p className="text-xs text-gray-500 text-center mt-3">
                            Your sponsorship covers education, healthcare, and daily nutrition.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ChildProfile.propTypes = {
    child: PropTypes.object.isRequired,
    onSponsorClick: PropTypes.func.isRequired,
    isSponsoredByMe: PropTypes.bool,
};

export default ChildProfile;
