import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Icon from '../../components/atoms/Icon';

const Profile = () => {
    const { t } = useTranslation();
    const { user, updateUser } = useAuth();

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await updateUser(formData);
            setMessage({ type: 'success', text: t('profile_update_success') || 'Profile updated successfully' });
        } catch (error) {
            setMessage({ type: 'error', text: t('profile_update_error') || 'Failed to update profile' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl">
                        {user?.firstName?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-text">
                            {t('nav_profile') || 'My Profile'}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {t('profile_subtitle') || 'Manage your account information'}
                        </p>
                    </div>
                </div>

                <div className="p-6">
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-lg text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            <Icon name={message.type === 'success' ? 'Check' : 'AlertCircle'} size={16} />
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label={t('auth_firstname') || 'First Name'}
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                            <Input
                                label={t('auth_lastname') || 'Last Name'}
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>

                        <Input
                            label={t('auth_email') || 'Email Address'}
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            icon="Mail"
                            disabled // Email change usually requires verification, so disable for now
                            helperText={t('profile_email_disabled') || 'Contact support to change your email address'}
                        />

                        <div className="pt-4 flex justify-end">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="min-w-[120px]"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>{t('saving') || 'Saving...'}</span>
                                    </div>
                                ) : (
                                    t('save_changes') || 'Save Changes'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
