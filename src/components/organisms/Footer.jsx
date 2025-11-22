import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../atoms/Icon';

/**
 * Composant Footer - Pied de page de l'application
 * 
 * Affiche:
 * - Logo et description de l'organisation
 * - Liens rapides vers les pages principales
 * - Informations de contact (email, téléphone, adresse)
 * - Liens réseaux sociaux
 * - Copyright dynamique avec année actuelle
 * 
 * Layout responsive en grid (1 colonne mobile, 4 colonnes desktop).
 * 
 * @component
 * @example
 * <Footer />
 * 
 * @returns {JSX.Element} Pied de page avec liens et informations
 */
const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-background-darker/30 pt-12 pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-accent mb-4">
                            <Icon name="HeartHandshake" size={24} />
                            <span>Reizen met een doel</span>
                        </Link>
                        <p className="text-gray-600 max-w-md">
                            {t('footer_description')}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-text mb-4">{t('footer_quick_links')}</h4>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-600 hover:text-accent">{t('about')}</Link></li>
                            <li><Link to="/projects" className="text-gray-600 hover:text-accent">{t('projects')}</Link></li>
                            <li><Link to="/sponsorships/waiting" className="text-gray-600 hover:text-accent">{t('sponsorships')}</Link></li>
                            <li><Link to="/contact" className="text-gray-600 hover:text-accent">{t('contact')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-text mb-4">{t('footer_contact')}</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center gap-2"><Icon name="Mail" size={16} /> info@reizenmeteendoel.be</li>
                            <li className="flex items-center gap-2"><Icon name="Phone" size={16} /> +32 123 45 67 89</li>
                            <li className="flex items-center gap-2"><Icon name="MapPin" size={16} /> Brussels, Belgium</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Reizen met een doel. {t('footer_rights')}
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-400 hover:text-accent"><Icon name="Facebook" size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-accent"><Icon name="Instagram" size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-accent"><Icon name="Twitter" size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
