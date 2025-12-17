import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Icon from '../components/atoms/Icon';
import { useChildren } from '../hooks/useChildren';

const Admin = () => {
    const { t } = useTranslation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Dashboard state
    const { children, isLoading, addChild } = useChildren();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newChild, setNewChild] = useState({
        firstName: '',
        age: '',
        gender: 'male',
        village: '',
        story: '',
        sponsorCostMonthly: ''
    });

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (auth === 'true') setIsAuthenticated(true);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            localStorage.setItem('admin_auth', 'true');
            setIsAuthenticated(true);
            setError('');
        } else {
            setError(t('admin_invalid_password'));
        }
    };

    const handleAddChild = async (e) => {
        e.preventDefault();
        try {
            const childPayload = {
                ...newChild,
                age: parseInt(newChild.age),
                sponsorCostMonthly: parseInt(newChild.sponsorCostMonthly),
                needs: ['education'],
                status: 'waiting',
                priority: 'normal',
                photos: ['https://loremflickr.com/320/240/child'],
                shortStory: newChild.story.substring(0, 100) + '...'
            };

            addChild(childPayload);
            setIsAddModalOpen(false);
            setNewChild({ firstName: '', age: '', gender: 'male', village: '', story: '', sponsorCostMonthly: '' });
            alert(t('admin_child_added_success'));
        } catch (err) {
            alert(t('admin_child_add_error'));
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-primary/10"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Icon name="Lock" size={32} className="text-primary" />
                        </div>
                        <h1 className="font-display font-bold text-3xl text-primary">{t('admin_login_title')}</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input
                            type="password"
                            label={t('admin_password_label')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={error}
                            className="text-lg"
                        />
                        <Button type="submit" className="w-full py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                            {t('admin_login_button')}
                        </Button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div>
                        <h1 className="font-display font-black text-4xl text-primary mb-2">{t('admin_dashboard')}</h1>
                        <p className="text-text-muted">Manage children, sponsorships, and projects</p>
                    </div>
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all rounded-full px-6 py-3"
                    >
                        <Icon name="Plus" size={20} />
                        {t('add_child')}
                    </Button>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-primary/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-primary/60 uppercase tracking-wider">{t('admin_table_name')}</th>
                                    <th className="px-6 py-5 text-left text-xs font-bold text-primary/60 uppercase tracking-wider">{t('admin_table_status')}</th>
                                    <th className="px-6 py-5 text-left text-xs font-bold text-primary/60 uppercase tracking-wider">{t('admin_table_village')}</th>
                                    <th className="px-8 py-5 text-right text-xs font-bold text-primary/60 uppercase tracking-wider">{t('admin_table_actions')}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {isLoading ? (
                                    <tr><td colSpan="4" className="px-8 py-12 text-center text-text-muted">{t('loading')}</td></tr>
                                ) : (
                                    children?.map((child) => (
                                        <motion.tr
                                            key={child.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-8 py-5 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-12 w-12 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                                                        <img className="h-12 w-12 object-cover" src={child.photos[0]} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-base font-bold text-primary">{child.firstName}</div>
                                                        <div className="text-sm text-text-muted">{child.age} years old</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${child.status === 'sponsored'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {child.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap text-sm text-text-muted font-medium">
                                                {child.village}
                                            </td>
                                            <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-accent hover:text-accent-dark font-bold mr-6 transition-colors">{t('edit')}</button>
                                                <button className="text-red-400 hover:text-red-600 font-bold transition-colors">{t('delete')}</button>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Child Modal */}
                <AnimatePresence>
                    {isAddModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
                                onClick={() => setIsAddModalOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative z-10 max-h-[90vh] overflow-y-auto"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="font-display font-bold text-2xl text-primary">{t('admin_modal_title')}</h2>
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <Icon name="X" size={24} className="text-text-muted" />
                                    </button>
                                </div>

                                <form onSubmit={handleAddChild} className="space-y-5">
                                    <Input
                                        label={t('admin_modal_firstname')}
                                        required
                                        value={newChild.firstName}
                                        onChange={e => setNewChild({ ...newChild, firstName: e.target.value })}
                                        className="rounded-xl"
                                    />
                                    <div className="grid grid-cols-2 gap-5">
                                        <Input
                                            label={t('admin_modal_age')}
                                            type="number"
                                            required
                                            value={newChild.age}
                                            onChange={e => setNewChild({ ...newChild, age: e.target.value })}
                                            className="rounded-xl"
                                        />
                                        <div>
                                            <label className="block text-sm font-bold text-primary/80 mb-2">{t('admin_modal_gender')}</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 focus:border-accent focus:ring-accent transition-all appearance-none"
                                                    value={newChild.gender}
                                                    onChange={e => setNewChild({ ...newChild, gender: e.target.value })}
                                                >
                                                    <option value="male">{t('male')}</option>
                                                    <option value="female">{t('female')}</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                                                    <Icon name="ChevronDown" size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Input
                                        label={t('admin_modal_village')}
                                        required
                                        value={newChild.village}
                                        onChange={e => setNewChild({ ...newChild, village: e.target.value })}
                                        className="rounded-xl"
                                    />
                                    <Input
                                        label={t('admin_modal_cost')}
                                        type="number"
                                        required
                                        value={newChild.sponsorCostMonthly}
                                        onChange={e => setNewChild({ ...newChild, sponsorCostMonthly: e.target.value })}
                                        className="rounded-xl"
                                    />
                                    <div>
                                        <label className="block text-sm font-bold text-primary/80 mb-2">{t('admin_modal_story')}</label>
                                        <textarea
                                            className="w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 focus:border-accent focus:ring-accent transition-all min-h-[120px]"
                                            rows="4"
                                            value={newChild.story}
                                            onChange={e => setNewChild({ ...newChild, story: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setIsAddModalOpen(false)}
                                            className="flex-1 rounded-xl font-bold"
                                        >
                                            {t('admin_modal_cancel')}
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="flex-1 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                                        >
                                            {t('admin_modal_save')}
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Admin;
