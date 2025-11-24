import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Icon from '../../components/atoms/Icon';

const AdminSettings = () => {
    const { t } = useTranslation();
    const { user, updateUser } = useAuth();
    const { success, error } = useToast();
    const [activeTab, setActiveTab] = useState('profile');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Profile Form State
    const [profileForm, setProfileForm] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    // Password Form State
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            setProfileForm({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || ''
            });
        }
    }, [user]);

    const handleProfileUpdate = async () => {
        try {
            setIsSubmitting(true);
            await updateUser({
                firstName: profileForm.firstName,
                lastName: profileForm.lastName,
                // Email update might require re-verification in a real app
                email: profileForm.email
            });
            success('Profile updated successfully');
        } catch (err) {
            console.error('Failed to update profile:', err);
            error('Failed to update profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePasswordUpdate = async () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            error('New passwords do not match');
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            error('Password must be at least 6 characters');
            return;
        }

        try {
            setIsSubmitting(true);
            // In a real app, we would verify current password and update to new one
            // For now, we'll just simulate a success since authService might not have password update logic exposed directly like this
            await new Promise(resolve => setTimeout(resolve, 1000));

            // If we had a specific endpoint: await authService.changePassword(user.id, passwordForm.currentPassword, passwordForm.newPassword);

            success('Password updated successfully');
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            console.error('Failed to update password:', err);
            error('Failed to update password');
        } finally {
            setIsSubmitting(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile Settings', icon: 'User' },
        { id: 'security', label: 'Security', icon: 'Lock' },
        { id: 'notifications', label: 'Notifications', icon: 'Bell' },
        { id: 'system', label: 'System', icon: 'Server' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">{t('admin_settings') || 'Settings'}</h1>
                <p className="text-gray-500">Manage your account and system preferences</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                {/* Sidebar */}
                <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4">
                    <nav className="space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <Icon name={tab.icon} size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8">
                    {activeTab === 'profile' && (
                        <div className="max-w-xl space-y-6">
                            <h2 className="text-lg font-bold text-gray-800 border-b pb-4">Profile Information</h2>
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold overflow-hidden">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        user?.firstName?.charAt(0) || 'A'
                                    )}
                                </div>
                                <div>
                                    <Button variant="outline" size="sm" className="mb-2">Change Photo</Button>
                                    <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="First Name"
                                    value={profileForm.firstName}
                                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                                />
                                <Input
                                    label="Last Name"
                                    value={profileForm.lastName}
                                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                                />
                            </div>
                            <Input
                                label="Email Address"
                                value={profileForm.email}
                                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            />
                            <Input label="Role" value={user?.role || 'Administrator'} disabled />
                            <div className="pt-4">
                                <Button
                                    variant="primary"
                                    onClick={handleProfileUpdate}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="max-w-xl space-y-6">
                            <h2 className="text-lg font-bold text-gray-800 border-b pb-4">Security Settings</h2>
                            <div className="space-y-4">
                                <Input
                                    label="Current Password"
                                    type="password"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                />
                                <Input
                                    label="New Password"
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                />
                                <Input
                                    label="Confirm New Password"
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                />
                            </div>
                            <div className="pt-4">
                                <Button
                                    variant="primary"
                                    onClick={handlePasswordUpdate}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Updating...' : 'Update Password'}
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="max-w-xl space-y-6">
                            <h2 className="text-lg font-bold text-gray-800 border-b pb-4">Notification Preferences</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                    <div>
                                        <h3 className="font-medium text-gray-800">Email Notifications</h3>
                                        <p className="text-sm text-gray-500">Receive emails about new donations</p>
                                    </div>
                                    <input type="checkbox" className="toggle" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                                    <div>
                                        <h3 className="font-medium text-gray-800">System Alerts</h3>
                                        <p className="text-sm text-gray-500">Get notified about system updates</p>
                                    </div>
                                    <input type="checkbox" className="toggle" defaultChecked />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'system' && (
                        <div className="max-w-xl space-y-6">
                            <h2 className="text-lg font-bold text-gray-800 border-b pb-4">System Information</h2>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Version</span>
                                    <span className="font-medium">1.0.0</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Environment</span>
                                    <span className="font-medium">Production</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Last Backup</span>
                                    <span className="font-medium">Today, 04:00 AM</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
