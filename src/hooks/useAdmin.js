import { useAuth } from '../context/AuthContext';

export const useAdmin = () => {
    const { user, isAuthenticated } = useAuth();

    // In a real app, we would check user.role === 'admin'
    // For this demo, we'll assume if they are authenticated in the admin route, they are admin
    // or check a specific flag in the user object
    const isAdmin = isAuthenticated && (user?.role === 'admin' || localStorage.getItem('admin_auth') === 'true');

    const checkPermission = (permission) => {
        if (!isAdmin) return false;
        // Mock permission check - admins have all permissions
        return true;
    };

    return {
        isAdmin,
        checkPermission,
        user
    };
};
