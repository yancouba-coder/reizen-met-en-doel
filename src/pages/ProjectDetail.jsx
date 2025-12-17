import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useProject } from '../hooks/useProject';
import { useAuth } from '../context/AuthContext';
import { sponsorshipService } from '../services/sponsorshipService';
import Button from '../components/atoms/Button';
import Icon from '../components/atoms/Icon';
import Input from '../components/atoms/Input';

const ProjectDetail = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, refreshUser } = useAuth();
    const { data: project, isLoading, error } = useProject(id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState(50);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="animate-pulse space-y-8">
                    <div className="h-[500px] bg-gray-200 rounded-3xl w-full"></div>
                    <div className="h-12 bg-gray-200 rounded-xl w-2/3"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <Icon name="AlertCircle" size={48} className="text-red-500" />
                </div>
                <h2 className="text-3xl font-display font-bold text-primary mb-4">{t('project_not_found')}</h2>
                <Button onClick={() => navigate('/projects')} variant="outline" className="rounded-full px-8">
                    {t('back_to_projects')}
                </Button>
            </div>
        );
    }

    const progress = Math.min((project.raisedAmount / project.targetAmount) * 100, 100);

    const getStatusBadge = () => {
        if (progress >= 100) return { label: t('status_completed'), className: 'bg-green-100 text-green-800 border-green-200' };
        if (progress > 0) return { label: t('status_in_progress'), className: 'bg-accent/10 text-accent-dark border-accent/20' };
        return { label: t('status_planned'), className: 'bg-gray-100 text-gray-800 border-gray-200' };
    };

    const status = getStatusBadge();

    const handleSupportClick = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location } });
            return;
        }
        setIsModalOpen(true);
    };

    const handleConfirmSupport = async () => {
        setIsSubmitting(true);
        try {
            await sponsorshipService.donateToProject(project.id, Number(donationAmount));
            refreshUser();
            setIsModalOpen(false);
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/dashboard/projects');
            }, 2000);
        } catch (err) {
            console.error(err);
            alert(err.message || 'Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Hero Image */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                />

                <div className="absolute top-24 left-4 sm:left-8 z-20">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border border-white/30 rounded-full px-6"
                    >
                        <Icon name="ArrowLeft" size={20} className="mr-2" />
                        {t('back_to_projects')}
                    </Button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 z-20">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider border mb-4 inline-block backdrop-blur-md ${status.className}`}>
                                {status.label}
                            </span>
                            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
                                {project.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 -mt-12 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Purpose Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl"
                        >
                            <h2 className="font-display font-bold text-3xl text-primary mb-6">{t('project_purpose')}</h2>
                            <p className="text-lg text-text-muted leading-relaxed whitespace-pre-line">
                                {project.purpose || project.description}
                            </p>
                        </motion.div>

                        {/* Full Details */}
                        {project.fullDescription && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl"
                            >
                                <h2 className="font-display font-bold text-3xl text-primary mb-6">{t('project_details')}</h2>
                                <p className="text-lg text-text-muted leading-relaxed whitespace-pre-line">
                                    {project.fullDescription}
                                </p>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Funding Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-primary/5 sticky top-24"
                        >
                            <h3 className="font-display font-bold text-2xl text-primary mb-6">{t('funding_progress')}</h3>

                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-4xl font-black text-accent">€{project.raisedAmount.toLocaleString()}</span>
                                    <span className="text-text-muted font-medium mb-1">{t('of_target')} €{project.targetAmount.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="bg-accent h-full rounded-full"
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-sm font-bold text-text-muted">
                                    <span>{progress.toFixed(0)}% {t('funded')}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-background rounded-2xl p-4 text-center">
                                    <div className="text-sm text-text-muted mb-1">{t('total_cost')}</div>
                                    <div className="font-bold text-primary text-lg">€{project.targetAmount.toLocaleString()}</div>
                                </div>
                                <div className="bg-background rounded-2xl p-4 text-center">
                                    <div className="text-sm text-text-muted mb-1">{t('amount_raised')}</div>
                                    <div className="font-bold text-accent text-lg">€{project.raisedAmount.toLocaleString()}</div>
                                </div>
                            </div>

                            {progress < 100 && (
                                <Button
                                    onClick={handleSupportClick}
                                    className="w-full rounded-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                                >
                                    {t('support_project')}
                                </Button>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Support Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 relative z-10 text-center"
                        >
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <Icon name="Sprout" size={40} />
                            </div>

                            <h2 className="font-display font-bold text-2xl text-primary mb-3">
                                {t('support_title', { title: project.title })}
                            </h2>

                            <p className="text-text-muted mb-8">
                                {t('support_desc')}
                            </p>

                            <div className="bg-background p-6 rounded-2xl mb-8 text-left">
                                <label className="block text-sm font-bold text-primary mb-2">
                                    {t('donation_amount')}
                                </label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={donationAmount}
                                    onChange={(e) => setDonationAmount(e.target.value)}
                                    className="text-2xl font-bold text-center rounded-xl"
                                    placeholder={t('enter_amount')}
                                />
                                <div className="flex gap-2 mt-4">
                                    {[20, 50, 100].map(amount => (
                                        <button
                                            key={amount}
                                            onClick={() => setDonationAmount(amount)}
                                            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${Number(donationAmount) === amount
                                                    ? 'bg-primary text-white shadow-md'
                                                    : 'bg-white border border-gray-200 text-text-muted hover:bg-gray-50'
                                                }`}
                                        >
                                            €{amount}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 rounded-xl font-bold"
                                    disabled={isSubmitting}
                                >
                                    {t('admin_modal_cancel')}
                                </Button>
                                <Button
                                    onClick={handleConfirmSupport}
                                    className="flex-1 rounded-xl font-bold shadow-lg hover:shadow-xl"
                                    disabled={isSubmitting || !donationAmount || Number(donationAmount) <= 0}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>{t('processing')}</span>
                                        </div>
                                    ) : (
                                        t('confirm_donation')
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-10 relative z-10 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                            >
                                <Icon name="Check" size={48} />
                            </motion.div>

                            <h2 className="font-display font-black text-3xl text-primary mb-4">
                                {t('thank_you_title')}
                            </h2>

                            <p className="text-text text-lg mb-2">
                                {t('donation_confirmed', { amount: donationAmount })}
                            </p>

                            <p className="text-text-muted text-sm font-medium">
                                {t('redirecting')}
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetail;
