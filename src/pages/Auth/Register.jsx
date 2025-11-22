import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Icon from '../../components/atoms/Icon';

const Register = () => {
    const { t } = useTranslation();
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError(t('auth_password_mismatch') || 'Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || t('auth_registration_failed') || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            {/* Left Side - Image & Emotion */}
            <div className="hidden md:flex md:w-1/2 bg-accent relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/80 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Community gathering"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 flex flex-col justify-end p-12 text-white h-full">
                    <h2 className="text-4xl font-bold mb-4">
                        {t('auth_join_community_title') || 'Join Our Community'}
                    </h2>
                    <p className="text-lg opacity-90 max-w-md mb-6">
                        {t('auth_join_community_subtitle') || 'Become a sponsor and see the direct impact of your support on families in Senegal.'}
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <div className="bg-white/20 p-1 rounded-full">
                                <Icon name="Check" size={16} />
                            </div>
                            <span>{t('auth_benefit_1') || 'Track your sponsored child\'s progress'}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="bg-white/20 p-1 rounded-full">
                                <Icon name="Check" size={16} />
                            </div>
                            <span>{t('auth_benefit_2') || 'See projects you\'ve supported'}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="bg-white/20 p-1 rounded-full">
                                <Icon name="Check" size={16} />
                            </div>
                            <span>{t('auth_benefit_3') || 'Receive regular updates and photos'}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-12 bg-gray-50">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                            <div className="text-primary group-hover:scale-110 transition-transform">
                                <Icon name="HeartHandshake" size={40} />
                            </div>
                        </Link>
                        <h1 className="text-2xl font-bold text-text mb-2">
                            {t('auth_create_account') || 'Create your account'}
                        </h1>
                        <p className="text-gray-600">
                            {t('auth_have_account') || "Already have an account?"} {' '}
                            <Link to="/login" className="text-primary font-semibold hover:underline">
                                {t('auth_login_link') || 'Log in'}
                            </Link>
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
                            <Icon name="AlertCircle" size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label={t('auth_firstname') || 'First Name'}
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                                placeholder="John"
                            />
                            <Input
                                label={t('auth_lastname') || 'Last Name'}
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                                placeholder="Doe"
                            />
                        </div>

                        <Input
                            label={t('auth_email') || 'Email Address'}
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder="name@example.com"
                            icon="Mail"
                        />

                        <Input
                            label={t('auth_password') || 'Password'}
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            placeholder="••••••••"
                            icon="Lock"
                        />

                        <Input
                            label={t('auth_confirm_password') || 'Confirm Password'}
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                            placeholder="••••••••"
                            icon="Lock"
                        />

                        <div className="pt-2">
                            <Button
                                type="submit"
                                className="w-full py-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>{t('auth_creating_account') || 'Creating account...'}</span>
                                    </div>
                                ) : (
                                    t('auth_register_button') || 'Create Account'
                                )}
                            </Button>
                        </div>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            {t('auth_terms') || 'By creating an account, you agree to our Terms of Service and Privacy Policy.'}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
