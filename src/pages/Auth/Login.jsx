import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Icon from '../../components/atoms/Icon';

const Login = () => {
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(formData.email, formData.password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(t('auth_invalid_credentials') || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            {/* Left Side - Image & Emotion */}
            <div className="hidden md:flex md:w-1/2 bg-text relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-text/80 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Children smiling"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 flex flex-col justify-end p-12 text-white h-full">
                    <h2 className="text-4xl font-bold mb-4">
                        {t('auth_welcome_back_title') || 'Welcome Back'}
                    </h2>
                    <p className="text-lg opacity-90 max-w-md">
                        {t('auth_welcome_back_subtitle') || 'Continue your journey of making a difference in the lives of children in Senegal.'}
                    </p>
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
                            {t('auth_login_title') || 'Log in to your account'}
                        </h1>
                        <p className="text-gray-600">
                            {t('auth_no_account') || "Don't have an account?"} {' '}
                            <Link to="/register" className="text-primary font-semibold hover:underline">
                                {t('auth_register_link') || 'Sign up'}
                            </Link>
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
                            <Icon name="AlertCircle" size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label={t('auth_email') || 'Email Address'}
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder="name@example.com"
                            icon="Mail"
                        />

                        <div>
                            <Input
                                label={t('auth_password') || 'Password'}
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                placeholder="••••••••"
                                icon="Lock"
                            />
                            <div className="flex justify-end mt-1">
                                <Link to="/forgot-password" className="text-xs text-gray-500 hover:text-primary">
                                    {t('auth_forgot_password') || 'Forgot password?'}
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>{t('auth_logging_in') || 'Logging in...'}</span>
                                </div>
                            ) : (
                                t('auth_login_button') || 'Log In'
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
                        <p>
                            {t('auth_secure_login') || '🔒 Secure Login'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
