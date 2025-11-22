import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
                <div className="animate-pulse">
                    <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
                    <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <p className="text-red-500 text-xl">Project not found</p>
                <Button onClick={() => navigate('/projects')} className="mt-4">
                    Back to Projects
                </Button>
            </div>
        );
    }

    const progress = Math.min((project.raisedAmount / project.targetAmount) * 100, 100);

    // Determine status display
    const getStatusBadge = () => {
        if (progress >= 100) return { label: 'Completed', className: 'bg-green-100 text-green-800' };
        if (progress > 0) return { label: 'In Progress', className: 'bg-blue-100 text-blue-800' };
        return { label: 'Planned', className: 'bg-gray-100 text-gray-800' };
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
            // Refresh user data to update the context
            refreshUser();
            setIsModalOpen(false);
            setShowSuccess(true);
            // Show success message briefly before redirecting
            setTimeout(() => {
                navigate('/dashboard/projects');
            }, 1500);
        } catch (err) {
            console.error(err);
            alert(err.message || 'Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
                &larr; Back
            </Button>

            {/* Header Image */}
            <div className="relative h-96 w-full bg-gray-200 rounded-xl overflow-hidden mb-8">
                <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${status.className}`}>
                        {status.label}
                    </span>
                </div>
            </div>

            {/* Project Info */}
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-text mb-4">{project.title}</h1>

                {/* Funding Progress */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-text mb-4">Funding Progress</h2>
                    <div className="mb-4">
                        <div className="flex justify-between text-lg mb-2">
                            <span className="font-semibold text-primary">€{project.raisedAmount.toLocaleString()}</span>
                            <span className="text-gray-500">of €{project.targetAmount.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-primary h-4 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{progress.toFixed(1)}% funded</p>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Total Cost</p>
                            <p className="text-2xl font-bold text-text">€{project.targetAmount.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Amount Raised</p>
                            <p className="text-2xl font-bold text-primary">€{project.raisedAmount.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Purpose */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-text mb-4">Purpose</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {project.purpose || project.description}
                    </p>
                </div>

                {/* Full Description */}
                {project.fullDescription && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-bold text-text mb-4">Project Details</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {project.fullDescription}
                        </p>
                    </div>
                )}

                {/* Support Button */}
                {progress < 100 && (
                    <div className="text-center mt-8">
                        <Button
                            variant="primary"
                            size="lg"
                            className="px-12"
                            onClick={handleSupportClick}
                        >
                            Support This Project
                        </Button>
                    </div>
                )}
            </div>

            {/* Support Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
                        <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icon name="Sprout" size={32} />
                        </div>

                        <h2 className="text-2xl font-bold text-text mb-2">
                            Support {project.title}
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Your contribution will help us achieve our goal. Every bit counts!
                        </p>

                        <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Donation Amount (€)
                            </label>
                            <Input
                                type="number"
                                min="1"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                className="text-lg font-bold"
                                placeholder="Enter amount"
                            />
                            <div className="flex gap-2 mt-4">
                                {[20, 50, 100].map(amount => (
                                    <button
                                        key={amount}
                                        onClick={() => setDonationAmount(amount)}
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${Number(donationAmount) === amount
                                            ? 'bg-brand-green text-white'
                                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        €{amount}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirmSupport}
                                className="flex-1 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all bg-brand-green hover:bg-brand-green/90 border-brand-green"
                                disabled={isSubmitting || !donationAmount || Number(donationAmount) <= 0}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    'Confirm Donation'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icon name="Check" size={40} />
                        </div>

                        <h2 className="text-3xl font-bold text-text mb-3">
                            Thank You! 🎉
                        </h2>

                        <p className="text-gray-600 text-lg mb-2">
                            Your donation of <span className="font-bold text-brand-green">€{donationAmount}</span> has been confirmed!
                        </p>

                        <p className="text-gray-500 text-sm">
                            Redirecting to your dashboard...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;
