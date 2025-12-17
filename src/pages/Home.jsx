import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Button from '../components/atoms/Button';
import Icon from '../components/atoms/Icon';

const Home = () => {
    const { t } = useTranslation();

    // Fetch children data
    const { data: childrenData = [] } = useQuery({
        queryKey: ['children', 'waiting'],
        queryFn: async () => {
            const response = await fetch('/api/children?status=waiting');
            return response.json();
        },
        staleTime: 5 * 60 * 1000,
    });

    // Ensure children is always an array
    const children = Array.isArray(childrenData) ? childrenData : [];
    const featuredChildren = children.slice(0, 3);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-background min-h-screen pt-24 pb-16">
            {/* Hero Section */}
            <section className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
                    {/* Main Hero Card */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="lg:col-span-7 relative bg-gradient-to-br from-secondary via-secondary-light to-secondary rounded-[2.5rem] p-12 overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div>
                                <div className="inline-block mb-6">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                        <Icon name="Sparkles" size={32} className="text-accent" />
                                    </div>
                                </div>

                                <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl text-primary leading-[0.9] mb-6 whitespace-pre-line">
                                    {t('home_hero_title')}
                                </h1>

                                <p className="text-xl text-primary/80 font-medium max-w-md mb-8">
                                    {t('home_hero_subtitle')}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full shadow-xl">
                                    <span className="text-sm font-bold uppercase tracking-wide">{t('home_hero_from')}</span>
                                    <span className="text-4xl font-black">$25</span>
                                    <span className="text-sm font-medium">{t('home_hero_month')}</span>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                        <Icon name="Heart" size={28} className="text-accent" />
                                    </div>
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                        <Icon name="BookOpen" size={28} className="text-primary" />
                                    </div>
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                        <Icon name="Users" size={28} className="text-secondary-dark" />
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-primary/60 font-medium mt-6">
                                {t('home_hero_trusted')}
                            </p>
                        </div>
                    </motion.div>

                    {/* Side Cards */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <Link to="/projects" className="block flex-1">
                            <div className="relative bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] p-8 overflow-hidden shadow-2xl h-full hover:scale-[1.02] transition-transform cursor-pointer">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>

                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-display font-black text-4xl text-white mb-3">
                                            {t('home_card_education_title')}
                                        </h3>
                                        <p className="text-white/80 font-medium">
                                            {t('home_card_education_desc')}
                                        </p>
                                    </div>

                                    <div className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-bold shadow-lg self-start">
                                        <span>{t('home_card_explore')}</span>
                                        <Icon name="ArrowRight" size={20} />
                                    </div>
                                </div>

                                <div className="absolute bottom-8 right-8 opacity-20">
                                    <Icon name="GraduationCap" size={80} className="text-white" />
                                </div>
                            </div>
                        </Link>

                        <Link to="/projects" className="block flex-1">
                            <div className="relative bg-gradient-to-br from-accent to-accent-dark rounded-[2.5rem] p-8 overflow-hidden shadow-2xl h-full hover:scale-[1.02] transition-transform cursor-pointer">
                                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-display font-black text-4xl text-white mb-3">
                                            {t('home_card_projects_title')}
                                        </h3>
                                        <p className="text-white/90 font-medium">
                                            {t('home_card_projects_desc')}
                                        </p>
                                    </div>

                                    <div className="inline-flex items-center gap-2 bg-white text-accent px-6 py-3 rounded-full shadow-lg self-start font-bold">
                                        <span className="text-2xl font-black">$50+</span>
                                        <Icon name="ArrowRight" size={20} />
                                    </div>
                                </div>

                                <div className="absolute bottom-8 right-8 opacity-20">
                                    <Icon name="Building2" size={80} className="text-white" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Children */}
            {featuredChildren.length > 0 && (
                <section className="container mx-auto px-6 py-16">
                    <div className="text-center mb-12">
                        <h2 className="font-display font-black text-5xl md:text-6xl text-primary mb-4">
                            {t('home_meet_kids_title')}
                        </h2>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto">
                            {t('home_meet_kids_desc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredChildren.map((child) => (
                            <div
                                key={child.id}
                                className="relative bg-white rounded-[2rem] overflow-hidden shadow-xl hover:-translate-y-2 transition-transform"
                            >
                                <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 relative">
                                    {child.photos && child.photos[0] ? (
                                        <img
                                            src={child.photos[0]}
                                            alt={child.firstName}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = `https://placehold.co/600x800/264653/E76F51?text=${encodeURIComponent(child.firstName)}`;
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-6xl font-display font-black text-primary/20">
                                                {child.firstName?.charAt(0) || '?'}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="absolute top-6 right-6 w-20 h-20 bg-accent rounded-full flex flex-col items-center justify-center text-white shadow-2xl">
                                    <span className="text-xs font-bold">FROM</span>
                                    <span className="text-2xl font-black">${child.sponsorCostMonthly || 25}</span>
                                </div>

                                <div className="p-6">
                                    <h3 className="font-display font-black text-3xl text-primary mb-2">
                                        {child.firstName}
                                    </h3>
                                    <p className="text-text-muted font-medium mb-4">
                                        {child.age} years old • {child.village || 'Senegal'}
                                    </p>

                                    <Link to={`/sponsorships/${child.id}`}>
                                        <Button variant="primary" className="w-full rounded-2xl text-lg font-bold py-4">
                                            {t('home_sponsor_now')}
                                        </Button>
                                    </Link>
                                </div>

                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/20 rounded-tr-full"></div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/sponsorships/waiting">
                            <Button variant="outline" size="lg" className="rounded-full text-lg font-bold px-12 border-2 border-primary hover:bg-primary hover:text-white">
                                {t('home_view_all_children')}
                                <Icon name="ArrowRight" size={20} className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </section>
            )}

            {/* Impact Stats */}
            <section className="bg-gradient-to-br from-primary via-primary-dark to-primary-light py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5"></div>
                <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '1,200+', label: t('home_stat_children'), icon: 'Users' },
                            { value: '45', label: t('home_stat_projects'), icon: 'Briefcase' },
                            { value: '15', label: t('home_stat_years'), icon: 'Calendar' },
                            { value: '5,000+', label: t('home_stat_lives'), icon: 'Heart' },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 hover:scale-105 transition-transform"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                                    <Icon name={stat.icon} size={32} className="text-accent" />
                                </div>
                                <div className="font-display font-black text-5xl text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-white/80 font-medium uppercase tracking-wide text-sm">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="relative bg-gradient-to-br from-accent via-accent to-accent-dark rounded-[3rem] p-12 md:p-16 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <div className="inline-block mb-6">
                            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
                                <Icon name="Heart" size={48} className="text-accent" />
                            </div>
                        </div>

                        <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-6 whitespace-pre-line">
                            {t('home_cta_title')}
                        </h2>

                        <p className="text-xl text-white/90 font-medium mb-10">
                            {t('home_cta_desc')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/sponsorships/waiting">
                                <Button variant="primary" size="lg" className="bg-white text-accent hover:bg-white/90 rounded-full text-xl font-black px-12 py-6 shadow-2xl border-none">
                                    {t('home_cta_start')}
                                    <Icon name="ArrowRight" size={24} className="ml-3" />
                                </Button>
                            </Link>
                            <Link to="/about">
                                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-accent rounded-full text-xl font-bold px-12 py-6">
                                    {t('home_cta_learn_more')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
