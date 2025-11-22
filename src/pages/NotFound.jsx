import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/atoms/Button';
import Icon from '../components/atoms/Icon';

const NotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/5 via-white to-brand-green/5 px-4">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-primary/10 text-primary rounded-full mb-6">
                        <Icon name="MapPin" size={64} />
                    </div>
                    <h1 className="text-9xl font-bold text-text mb-4">404</h1>
                </div>

                {/* Error Message */}
                <h2 className="text-4xl font-bold text-text mb-4">
                    {t('error_page_not_found_title') || 'Page Not Found'}
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                    {t('error_page_not_found_desc') || 'Oops! The page you\'re looking for doesn\'t exist. It might have been moved or deleted.'}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => navigate('/')}
                        className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                    >
                        <Icon name="Home" size={20} className="mr-2" />
                        {t('error_go_home') || 'Go to Homepage'}
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigate(-1)}
                        className="shadow-sm hover:shadow-md transition-all"
                    >
                        <Icon name="ArrowLeft" size={20} className="mr-2" />
                        {t('error_go_back') || 'Go Back'}
                    </Button>
                </div>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">
                        {t('error_helpful_links') || 'Here are some helpful links instead:'}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => navigate('/children')}
                            className="text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                            {t('nav_children') || 'Browse Children'}
                        </button>
                        <span className="text-gray-300">•</span>
                        <button
                            onClick={() => navigate('/projects')}
                            className="text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                            {t('nav_projects') || 'Browse Projects'}
                        </button>
                        <span className="text-gray-300">•</span>
                        <button
                            onClick={() => navigate('/about')}
                            className="text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                            {t('nav_about') || 'About Us'}
                        </button>
                        <span className="text-gray-300">•</span>
                        <button
                            onClick={() => navigate('/contact')}
                            className="text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                            {t('nav_contact') || 'Contact'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
