import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChildrenGrid from '../../components/organisms/ChildrenGrid';
import FiltersBar from '../../components/molecules/FiltersBar';
import { useChildren } from '../../hooks/useChildren';

const WaitingList = () => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({ status: 'waiting' });
    const { children, isLoading } = useChildren(filters);

    // Client-side filtering for search and gender (since mock API is simple)
    const filteredChildren = children?.filter(child => {
        if (filters.search && !child.firstName.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.gender && child.gender !== filters.gender) return false;
        return true;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text mb-4">{t('waiting_list')}</h1>
                <p className="text-gray-600 max-w-2xl">
                    These children are waiting for a sponsor to help change their lives.
                    Your support provides education, healthcare, and hope.
                </p>
            </div>

            <div className="mb-8">
                <FiltersBar filters={filters} onFilterChange={setFilters} />
            </div>

            <ChildrenGrid children={filteredChildren} isLoading={isLoading} />
        </div>
    );
};

export default WaitingList;
