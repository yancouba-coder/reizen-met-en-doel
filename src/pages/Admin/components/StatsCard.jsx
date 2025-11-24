import React from 'react';
import Icon from '../../../components/atoms/Icon';
import { clsx } from 'clsx';

const StatsCard = ({ title, value, icon, trend, trendLabel, color = 'primary' }) => {
    const colorClasses = {
        primary: 'bg-primary/10 text-primary',
        success: 'bg-admin-success/10 text-admin-success',
        warning: 'bg-admin-warning/10 text-admin-warning',
        danger: 'bg-admin-danger/10 text-admin-danger',
        info: 'bg-admin-active/10 text-admin-active',
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={clsx("p-3 rounded-lg", colorClasses[color])}>
                    <Icon name={icon} size={24} />
                </div>
                {trend && (
                    <div className={clsx(
                        "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
                        trend > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    )}>
                        <Icon name={trend > 0 ? "TrendingUp" : "TrendingDown"} size={16} />
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">{title}</h3>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-800">{value}</span>
                {trendLabel && <span className="text-sm text-gray-400 mb-1">{trendLabel}</span>}
            </div>
        </div>
    );
};

export default StatsCard;
