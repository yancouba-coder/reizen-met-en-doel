import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useChild } from '../../hooks/useChildren';
import { useAuth } from '../../context/AuthContext';
import { sponsorshipService } from '../../services/sponsorshipService';
import ChildProfile from '../../components/organisms/ChildProfile';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';

const ChildDetail = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated, refreshUser } = useAuth();
    const { data: child, isLoading, error } = useChild(id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSponsoredByMe, setIsSponsoredByMe] = useState(false);

    useEffect(() => {
        if (user && user.sponsoredChildren && user.sponsoredChildren.includes(id)) {
            setIsSponsoredByMe(true);
        }
    }, [user, id]);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (error || !child) return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Child not found</h2>
            <Button onClick={() => navigate('/sponsorships/waiting')}>Browse Waiting List</Button>
        </div>
    );

    const handleSponsorClick = () => {
        if (!isAuthenticated) {
            // Redirect to login with return url
            navigate('/login', { state: { from: location } });
            return;
        }
        setIsModalOpen(true);
    };

    const handleConfirmSponsorship = async () => {
        setIsSubmitting(true);
        try {
            await sponsorshipService.sponsorChild(child.id);
            await refreshUser(); // Refresh user data to get updated sponsoredChildren list
            setIsSponsoredByMe(true);
            setIsModalOpen(false);
            // Show success message or redirect
            navigate('/dashboard/my-children');
        } catch (err) {
            console.error(err);
            alert(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2">
                <Icon name="ArrowLeft" size={16} />
                {t('back') || 'Back'}
            </Button>

            <ChildProfile
                child={child}
                onSponsorClick={handleSponsorClick}
                isSponsoredByMe={isSponsoredByMe}
            />

            {/* Sponsorship Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icon name="Heart" size={32} />
                        </div>

                        <h2 className="text-2xl font-bold text-text mb-2">
                            {t('confirm_sponsorship_title') || 'Confirm Sponsorship'}
                        </h2>

                        <p className="text-gray-600 mb-6">
                            {t('confirm_sponsorship_desc') || `You are about to sponsor ${child.firstName}. Your support will provide education, healthcare, and a better future.`}
                        </p>

                        <div className="bg-gray-50 p-4 rounded-xl mb-8 text-left">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Monthly Support</span>
                                <span className="font-bold text-text">€{child.sponsorCostMonthly}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Billed</span>
                                <span>Monthly</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1"
                                disabled={isSubmitting}
                            >
                                {t('cancel') || 'Cancel'}
                            </Button>
                            <Button
                                onClick={handleConfirmSponsorship}
                                className="flex-1 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    t('confirm') || 'Confirm Sponsorship'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChildDetail;
