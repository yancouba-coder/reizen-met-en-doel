import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            // In a real app, check if user has admin role
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                        <Icon name="Shield" size={24} />
                    </div>
                </div>
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={error}
                        required
                    />
                    <Button type="submit" className="w-full" variant="primary">
                        Login to Admin Panel
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
