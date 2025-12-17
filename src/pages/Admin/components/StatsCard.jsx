import React from 'react';
import Icon from '../../../components/atoms/Icon';
import { clsx } from 'clsx';

const StatsCard = ({ title, value, icon, trend, trendLabel, color = 'primary' }) => {
    const colorClasses = {
        primary: 'bg-primary/10 text-primary',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        danger: 'bg-danger/10 text-danger',
        info: 'bg-info/10 text-info',
    };

    return (
        <div className="bg-white p-6 rounded-editorial shadow-editorial border-2 border-primary/5 hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={clsx("p-3 rounded-lg", colorClasses[color])}>
                    <Icon name={icon} size={24} />
                </div>
                {trend && (
                    <div className={clsx(
                        "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
                        trend > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    )}>
                        <Icon name={trend > 0 ? "TrendingUp" : "TrendingDown"} size={16} />
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>
            <h3 className="text-text-muted text-sm font-medium uppercase tracking-wider mb-1 font-sans">{title}</h3>
            <div className="flex items-end gap-2">
                <span className="text-4xl font-serif font-bold text-primary">{value}</span>
                {trendLabel && <span className="text-sm text-text-light mb-1.5">{trendLabel}</span>}
            </div>
        </div>
    );
};

export default StatsCard;
