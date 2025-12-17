import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Icon from '../components/atoms/Icon';
import Button from '../components/atoms/Button';

const About = () => {
    const { t } = useTranslation();

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="bg-background min-h-screen font-sans overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-24 md:py-40 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        src="https://primary.jwwb.nl/public/o/g/p/temp-xicaueeotcluskqifwbc/2luqd0/reis20221-1.jpg?enable-io=true&enable=upscale&width=1600"
                        alt="Community in Senegal"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/60 mix-blend-multiply"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-8 font-serif leading-tight"
                    >
                        {t('mission_title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 leading-relaxed font-light"
                    >
                        {t('mission_intro')}
                    </motion.p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="w-full md:w-1/2"
                        >
                            <div className="relative">
                                <img
                                    src="https://primary.jwwb.nl/public/o/g/p/temp-xicaueeotcluskqifwbc/img_20230207_195628.jpg"
                                    alt="Children learning"
                                    className="rounded-editorial shadow-editorial w-full h-[500px] object-cover border-4 border-white"
                                />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
                                    className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white"
                                >
                                    Est. 2008
                                </motion.div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="w-full md:w-1/2"
                        >
                            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-primary mb-8 font-serif">{t('who_we_are_title')}</motion.h2>
                            <motion.p variants={fadeInUp} className="text-lg text-text-muted mb-6 leading-relaxed">
                                {t('who_we_are_intro')}
                            </motion.p>
                            <motion.p variants={fadeInUp} className="text-lg text-text-muted mb-10 leading-relaxed">
                                {t('who_we_are_location')}
                            </motion.p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <motion.div variants={fadeInUp} className="bg-background-subtle p-8 rounded-editorial border-2 border-secondary/20 hover:border-secondary transition-colors">
                                    <Icon name="Heart" className="text-accent mb-4" size={32} />
                                    <h3 className="font-bold text-primary mb-2 text-lg font-serif">{t('mission_value_friendship')}</h3>
                                    <p className="text-sm text-text-muted">Building lasting bonds across continents.</p>
                                </motion.div>
                                <motion.div variants={fadeInUp} className="bg-background-subtle p-8 rounded-editorial border-2 border-primary/10 hover:border-primary/30 transition-colors">
                                    <Icon name="Users" className="text-primary mb-4" size={32} />
                                    <h3 className="font-bold text-primary mb-2 text-lg font-serif">{t('mission_value_tolerance')}</h3>
                                    <p className="text-sm text-text-muted">Respecting and celebrating our differences.</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* History Timeline */}
            <section className="py-24 bg-background-subtle">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl font-bold text-primary mb-6 font-serif">{t('who_we_are_history_title')}</h2>
                        <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="max-w-4xl mx-auto relative">
                        {/* Vertical Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20 hidden md:block"></div>

                        {/* 2008 */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="flex flex-col md:flex-row items-center justify-between mb-16 relative group"
                        >
                            <div className="w-full md:w-5/12 md:text-right order-2 md:order-1">
                                <div className="bg-white p-8 rounded-editorial shadow-sm border-2 border-transparent group-hover:border-primary/10 transition-all">
                                    <span className="text-accent font-bold text-2xl block mb-3 font-serif">2008</span>
                                    <p className="text-text-muted leading-relaxed">{t('who_we_are_history_2008')}</p>
                                </div>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-md hidden md:block order-1 z-10"></div>
                            <div className="w-full md:w-5/12 order-3"></div>
                        </motion.div>

                        {/* 2015 */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="flex flex-col md:flex-row items-center justify-between mb-16 relative group"
                        >
                            <div className="w-full md:w-5/12 order-1"></div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-secondary rounded-full border-4 border-white shadow-md hidden md:block order-1 z-10"></div>
                            <div className="w-full md:w-5/12 order-2 md:order-3">
                                <div className="bg-white p-8 rounded-editorial shadow-sm border-2 border-transparent group-hover:border-secondary/20 transition-all">
                                    <span className="text-secondary-dark font-bold text-2xl block mb-3 font-serif">2015</span>
                                    <p className="text-text-muted leading-relaxed">{t('who_we_are_history_2015')}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stories */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="bg-primary text-white rounded-editorial p-10 md:p-14 relative overflow-hidden shadow-editorial"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-full -mr-20 -mt-20"></div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                                    <Icon name="Quote" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold font-serif">{t('who_we_are_patricia_title')}</h3>
                            </div>
                            <p className="text-white/90 italic leading-relaxed text-lg relative z-10 font-light">
                                "{t('who_we_are_patricia')}"
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="bg-background-subtle rounded-editorial p-0 border-2 border-primary/5 overflow-hidden flex flex-col shadow-sm"
                        >
                            <img
                                src="/assets/patricia-tato.jpg"
                                alt="Patricia and Tato"
                                className="w-full h-80 object-cover object-top"
                            />
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
                                        <Icon name="Quote" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-primary font-serif">{t('who_we_are_tato_title')}</h3>
                                </div>
                                <p className="text-text-muted italic leading-relaxed text-lg">
                                    "{t('who_we_are_tato')}"
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-primary text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl font-bold mb-8 font-serif"
                    >
                        {t('mission_join')}
                    </motion.h2>
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                    >
                        {t('mission_values_text')}
                    </motion.p>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <Link to="/contact">
                            <Button variant="primary" size="lg" className="min-w-[200px] bg-accent hover:bg-accent-dark border-accent text-white shadow-lg">
                                {t('nav_contact')}
                            </Button>
                        </Link>
                        <Link to="/sponsorships/waiting">
                            <Button variant="outline" size="lg" className="min-w-[200px] border-white text-white hover:bg-white hover:text-primary">
                                {t('sponsor_child')}
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
