import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../components/atoms/Icon';
import Button from '../components/atoms/Button';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-secondary min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://primary.jwwb.nl/public/o/g/p/temp-xicaueeotcluskqifwbc/2luqd0/reis20221-1.jpg?enable-io=true&enable=upscale&width=1600"
                        alt="Community in Senegal"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">{t('mission_title')}</h1>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 leading-relaxed">
                        {t('mission_intro')}
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2">
                            <div className="relative">
                                <img
                                    src="https://primary.jwwb.nl/public/o/g/p/temp-xicaueeotcluskqifwbc/img_20230207_195628.jpg"
                                    alt="Children learning"
                                    className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                                />
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                    Est. 2008
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl font-bold text-text mb-6 font-serif">{t('who_we_are_title')}</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                {t('who_we_are_intro')}
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                {t('who_we_are_location')}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-secondary/50 p-6 rounded-xl border border-secondary">
                                    <Icon name="Heart" className="text-accent mb-4" size={32} />
                                    <h3 className="font-bold text-text mb-2">{t('mission_value_friendship')}</h3>
                                    <p className="text-sm text-gray-600">Building lasting bonds across continents.</p>
                                </div>
                                <div className="bg-secondary/50 p-6 rounded-xl border border-secondary">
                                    <Icon name="Users" className="text-primary mb-4" size={32} />
                                    <h3 className="font-bold text-text mb-2">{t('mission_value_tolerance')}</h3>
                                    <p className="text-sm text-gray-600">Respecting and celebrating our differences.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* History Timeline */}
            <section className="py-20 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-text mb-4 font-serif">{t('who_we_are_history_title')}</h2>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="max-w-4xl mx-auto relative">
                        {/* Vertical Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 hidden md:block"></div>

                        {/* 2008 */}
                        <div className="flex flex-col md:flex-row items-center justify-between mb-12 relative">
                            <div className="w-full md:w-5/12 md:text-right order-2 md:order-1">
                                <div className="bg-white p-6 rounded-xl shadow-md">
                                    <span className="text-primary font-bold text-xl block mb-2">2008</span>
                                    <p className="text-gray-600">{t('who_we_are_history_2008')}</p>
                                </div>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-md hidden md:block order-1"></div>
                            <div className="w-full md:w-5/12 order-3"></div>
                        </div>

                        {/* 2015 */}
                        <div className="flex flex-col md:flex-row items-center justify-between mb-12 relative">
                            <div className="w-full md:w-5/12 order-1"></div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-brand-green rounded-full border-4 border-white shadow-md hidden md:block order-1"></div>
                            <div className="w-full md:w-5/12 order-2 md:order-3">
                                <div className="bg-white p-6 rounded-xl shadow-md">
                                    <span className="text-brand-green font-bold text-xl block mb-2">2015</span>
                                    <p className="text-gray-600">{t('who_we_are_history_2015')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stories */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-secondary/20 rounded-2xl p-8 md:p-12 border border-secondary/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -mr-16 -mt-16"></div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
                                    <Icon name="Quote" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-text">{t('who_we_are_patricia_title')}</h3>
                            </div>
                            <p className="text-gray-600 italic leading-relaxed text-lg relative z-10">
                                "{t('who_we_are_patricia')}"
                            </p>
                        </div>

                        <div className="bg-secondary/20 rounded-2xl p-0 border border-secondary/50 overflow-hidden flex flex-col">
                            <img
                                src="/assets/patricia-tato.jpg"
                                alt="Patricia and Tato"
                                className="w-full h-80 object-cover object-top"
                            />
                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green shrink-0">
                                        <Icon name="Quote" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-text">{t('who_we_are_tato_title')}</h3>
                                </div>
                                <p className="text-gray-600 italic leading-relaxed text-lg">
                                    "{t('who_we_are_tato')}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-text text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6 font-serif">{t('mission_join')}</h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                        {t('mission_values_text')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact">
                            <Button variant="primary" size="lg" className="min-w-[200px]">
                                {t('nav_contact')}
                            </Button>
                        </Link>
                        <Link to="/sponsorships/waiting">
                            <Button variant="outline" size="lg" className="min-w-[200px] border-white text-white hover:bg-white hover:text-text">
                                {t('sponsor_child')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
