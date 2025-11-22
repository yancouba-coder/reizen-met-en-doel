import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from '../atoms/Input';

/**
 * Composant FiltersBar - Barre de filtres pour rechercher et filtrer les enfants
 * 
 * Permet de filtrer la liste des enfants par:
 * - Recherche textuelle (nom, description)
 * - Genre (masculin/féminin)
 * - Statut (en attente/parrainé)
 * 
 * Utilise le pattern "controlled component" - l'état est géré par le parent.
 * 
 * @component
 * @example
 * const [filters, setFilters] = useState({ search: '', gender: '', status: '' });
 * 
 * <FiltersBar
 *   filters={filters}
 *   onFilterChange={setFilters}
 * />
 * 
 * @param {Object} props - Props du composant
 * @param {Object} props.filters - Objet contenant les valeurs actuelles des filtres
 * @param {string} [props.filters.search] - Terme de recherche
 * @param {string} [props.filters.gender] - Genre sélectionné ('', 'male', 'female')
 * @param {string} [props.filters.status] - Statut sélectionné ('', 'waiting', 'sponsored')
 * @param {Function} props.onFilterChange - Callback appelé lors du changement de filtre
 * 
 * @returns {JSX.Element} Barre de filtres responsive
 */
const FiltersBar = ({ filters, onFilterChange }) => {
    const { t } = useTranslation();

    const handleChange = (key, value) => {
        onFilterChange({ ...filters, [key]: value });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
            <div className="w-full md:w-auto flex-grow">
                <Input
                    placeholder={t('search')}
                    value={filters.search || ''}
                    onChange={(e) => handleChange('search', e.target.value)}
                    label={t('search')}
                    id="search-input"
                />
            </div>

            <div className="w-full md:w-48">
                <label className="block text-sm font-medium text-text mb-1">
                    {t('filter_by_gender')}
                </label>
                <select
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-terracotta"
                    value={filters.gender || ''}
                    onChange={(e) => handleChange('gender', e.target.value)}
                >
                    <option value="">{t('all')}</option>
                    <option value="male">{t('male')}</option>
                    <option value="female">{t('female')}</option>
                </select>
            </div>

            <div className="w-full md:w-48">
                <label className="block text-sm font-medium text-text mb-1">
                    {t('filter_by_status')}
                </label>
                <select
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-terracotta"
                    value={filters.status || ''}
                    onChange={(e) => handleChange('status', e.target.value)}
                >
                    <option value="">{t('all')}</option>
                    <option value="waiting">{t('waiting_list')}</option>
                    <option value="sponsored">{t('sponsored_list')}</option>
                </select>
            </div>
        </div>
    );
};

FiltersBar.propTypes = {
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default FiltersBar;
