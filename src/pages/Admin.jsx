import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { useChildren } from '../hooks/useChildren';
import { apiClient } from '../api/client';

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
        if (password === 'admin123') { // Hardcoded password as requested
            localStorage.setItem('admin_auth', 'true');
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password');
        }
    };

    const handleAddChild = async (e) => {
        e.preventDefault();
        try {
            // Add some defaults for required fields not in the simple form
            const childPayload = {
                ...newChild,
                age: parseInt(newChild.age),
                sponsorCostMonthly: parseInt(newChild.sponsorCostMonthly),
                needs: ['education'],
                status: 'waiting',
                priority: 'normal',
                photos: ['https://loremflickr.com/320/240/child'], // Placeholder
                shortStory: newChild.story.substring(0, 100) + '...'
            };

            addChild(childPayload);
            setIsAddModalOpen(false);
            setNewChild({ firstName: '', age: '', gender: 'male', village: '', story: '', sponsorCostMonthly: '' });
            alert('Child added successfully');
        } catch (err) {
            alert('Failed to add child');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={error}
                        />
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t('admin_dashboard')}</h1>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    {t('add_child')}
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Village</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {isLoading ? (
                            <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : (
                            children?.map((child) => (
                                <tr key={child.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img className="h-10 w-10 rounded-full object-cover" src={child.photos[0]} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{child.firstName}</div>
                                                <div className="text-sm text-gray-500">{child.age} years old</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${child.status === 'sponsored' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {child.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {child.village}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-accent hover:text-accent/80 mr-4">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Child Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">{t('add_child')}</h2>
                        <form onSubmit={handleAddChild} className="space-y-4">
                            <Input
                                label="First Name"
                                required
                                value={newChild.firstName}
                                onChange={e => setNewChild({ ...newChild, firstName: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Age"
                                    type="number"
                                    required
                                    value={newChild.age}
                                    onChange={e => setNewChild({ ...newChild, age: e.target.value })}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-text mb-1">Gender</label>
                                    <select
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        value={newChild.gender}
                                        onChange={e => setNewChild({ ...newChild, gender: e.target.value })}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <Input
                                label="Village"
                                required
                                value={newChild.village}
                                onChange={e => setNewChild({ ...newChild, village: e.target.value })}
                            />
                            <Input
                                label="Monthly Cost (€)"
                                type="number"
                                required
                                value={newChild.sponsorCostMonthly}
                                onChange={e => setNewChild({ ...newChild, sponsorCostMonthly: e.target.value })}
                            />
                            <div>
                                <label className="block text-sm font-medium text-text mb-1">Story</label>
                                <textarea
                                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    rows="4"
                                    value={newChild.story}
                                    onChange={e => setNewChild({ ...newChild, story: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
