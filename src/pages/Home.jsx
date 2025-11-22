import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/atoms/Button';
import Icon from '../components/atoms/Icon';

const Home = () => {
    const { t } = useTranslation();

    // Mock data for sponsored children
    const children = [
        { id: 1, name: 'Aires', image: 'https://primary.jwwb.nl/public/o/g/p/temp-xicaueeotcluskqifwbc/dsc_0676.jpg' },
        { id: 2, name: 'Fatou', image: 'https://primary.jwwb.nl/public/o/g/p/temp-xicaueeotcluskqifwbc/dsc02717.jpg' },
        { id: 3, name: 'Cheikh', image: 'https://primary.jwwb.nl/public/o/g/p/temp-xicaueeotcluskqifwbc/mip16.jpg' },
        { id: 4, name: 'Aicha', image: 'https://primary.jwwb.nl/public/o/g/p/temp-xicaueeotcluskqifwbc/dsc_3936.jpg' },
    ];

    return (
        <div className="bg-secondary min-h-screen">
            {/* Hero Section */}
            <section className="relative py-12 md:py-20 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2 z-10">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text mb-6 font-serif leading-tight whitespace-pre-line">
                                {t('hero_title')}
                            </h1>
                            <p className="text-lg text-text/80 mb-8 max-w-lg leading-relaxed">
                                {t('hero_subtitle')}
                            </p>
                            <Link to="/sponsorships/waiting">
                                <Button variant="primary" size="lg" className="rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                                    {t('hero_cta')}
                                </Button>
                            </Link>
                        </div>
                        <div className="w-full md:w-1/2 relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                                <img
                                    src="/assets/hero-image.png"
                                    alt="Smiling children in Senegal"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-green/10 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-text mb-4 font-serif">{t('how_it_works_title')}</h2>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connector Line (Desktop only) */}
                        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-200 -z-10"></div>

                        <div className="text-center relative">
                            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-white">
                                <Icon name="Search" className="text-primary" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-text mb-3">{t('how_it_works_step1_title')}</h3>
                            <p className="text-gray-600 leading-relaxed px-4">{t('how_it_works_step1_desc')}</p>
                        </div>

                        <div className="text-center relative">
                            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-white">
                                <Icon name="Heart" className="text-accent" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-text mb-3">{t('how_it_works_step2_title')}</h3>
                            <p className="text-gray-600 leading-relaxed px-4">{t('how_it_works_step2_desc')}</p>
                        </div>

                        <div className="text-center relative">
                            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-white">
                                <Icon name="MessageCircle" className="text-brand-green" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-text mb-3">{t('how_it_works_step3_title')}</h3>
                            <p className="text-gray-600 leading-relaxed px-4">{t('how_it_works_step3_desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Stats Section */}
            <section className="py-16 bg-text text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1,200+</div>
                            <div className="text-white/80">{t('impact_stat1')}</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-brand-green mb-2">45</div>
                            <div className="text-white/80">{t('impact_stat2')}</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">15</div>
                            <div className="text-white/80">{t('impact_stat3')}</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">5,000+</div>
                            <div className="text-white/80">{t('impact_stat4')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="py-20 bg-secondary/50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2 order-2 md:order-1">
                            <h2 className="text-4xl md:text-5xl font-bold text-text mb-6 font-serif">
                                {t('who_we_are_title')}
                            </h2>
                            <p className="text-lg text-text/80 mb-4 leading-relaxed">
                                {t('who_we_are_intro')}
                            </p>
                            <p className="text-lg text-text/80 mb-8 leading-relaxed">
                                {t('who_we_are_location')}
                            </p>
                            <Link to="/about" className="inline-block">
                                <Button variant="outline" className="rounded-full px-8 border-text text-text hover:bg-text hover:text-white">
                                    {t('nav_who_we_are')}
                                </Button>
                            </Link>
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2">
                            <div className="grid grid-cols-2 gap-4">
                                <img
                                    src="https://primary.jwwb.nl/public/o/g/p/temp-xicaueeotcluskqifwbc/414477141_6860502807351443_3996834204370000916_n-1.jpg"
                                    alt="Volunteer"
                                    className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8 transform hover:-translate-y-2 transition-transform duration-500"
                                />
                                <img
                                    src="https://primary.jwwb.nl/public/o/g/p/temp-xicaueeotcluskqifwbc/ngaparou3016.jpg"
                                    alt="Team member"
                                    className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:-translate-y-2 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sponsored Children Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-text mb-4 font-serif">
                                {t('sponsored_children_title')}
                            </h2>
                            <p className="text-gray-500 max-w-xl">{t('waiting_list_intro')}</p>
                        </div>
                        <Link to="/sponsorships/waiting" className="hidden md:block">
                            <Button variant="ghost" className="text-primary hover:text-accent group">
                                View All Children <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {children.map((child) => (
                            <Link to={`/sponsorships/${child.id}`} key={child.id} className="group block">
                                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                                    <img
                                        src={child.image}
                                        alt={child.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                        <span className="bg-white text-text font-bold px-6 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            {t('sponsor_me')}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-text text-center font-serif group-hover:text-primary transition-colors">
                                    {child.name}
                                </h3>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/sponsorships/waiting">
                            <Button variant="outline" className="w-full">
                                View All Children
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
