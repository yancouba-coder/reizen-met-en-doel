import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import Icon from '../atoms/Icon';

/**
 * Langues supportées par l'application
 * Chaque langue contient:
 * - code: Code ISO de la langue (pour i18n)
 * - label: Nom complet de la langue
 * - flag: Emoji du drapeau
 * - short: Abréviation (2 lettres)
 */
const languages = [
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱', short: 'NL' },
    { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' },
    { code: 'fr', label: 'Français', flag: '🇫🇷', short: 'FR' },
];

/**
 * Composant LanguageSwitcher - Sélecteur de langue avec dropdown animé
 * 
 * Permet à l'utilisateur de changer la langue de l'interface.
 * Fonctionnalités:
 * - Dropdown animé avec transition
 * - Fermeture automatique au clic extérieur
 * - Indicateur visuel de la langue active
 * - Intégration avec react-i18next
 * 
 * @component
 * @example
 * <LanguageSwitcher />
 * 
 * @returns {JSX.Element} Sélecteur de langue avec dropdown
 */
const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (langCode) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/50 hover:bg-white border border-text/10 hover:border-primary/30 transition-all duration-200 group"
                aria-label="Change language"
            >
                <Icon name="Globe" size={18} className="text-text/60 group-hover:text-primary transition-colors" />
                <span className="text-2xl leading-none">{currentLanguage.flag}</span>
                <span className="text-sm font-medium text-text hidden sm:inline">{currentLanguage.short}</span>
                <Icon
                    name="ChevronDown"
                    size={16}
                    className={clsx(
                        "text-text/60 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={clsx(
                                "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                                i18n.language === lang.code
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-text hover:bg-secondary"
                            )}
                        >
                            <span className="text-2xl leading-none">{lang.flag}</span>
                            <span className="flex-1">{lang.label}</span>
                            {i18n.language === lang.code && (
                                <Icon name="Check" size={16} className="text-primary" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
