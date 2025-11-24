import { faker } from '@faker-js/faker';

const USERS_KEY = 'twap_users';
const CURRENT_USER_KEY = 'twap_current_user';

// Initialize users if empty
const initUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    if (!users) {
        // Seed with an admin user for testing
        const seedUsers = [
            {
                id: 'admin-001',
                email: 'admin@example.com',
                password: 'admin123',
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin',
                createdAt: new Date().toISOString(),
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
                sponsoredChildren: [],
                participatedProjects: []
            }
        ];
        localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
    }
};

export const authService = {
    login: async (email, password) => {
        initUsers();
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const { password, ...userWithoutPassword } = user;
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
            return userWithoutPassword;
        }

        throw new Error('Invalid email or password');
    },

    register: async (userData) => {
        initUsers();
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

        if (users.find(u => u.email === userData.email)) {
            throw new Error('Email already exists');
        }

        const newUser = {
            id: faker.string.uuid(),
            ...userData,
            role: 'sponsor', // Default role
            createdAt: new Date().toISOString(),
            avatar: faker.image.avatar(),
            sponsoredChildren: [],
            participatedProjects: []
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        const { password, ...userWithoutPassword } = newUser;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

        return userWithoutPassword;
    },

    logout: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem(CURRENT_USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },

    updateUser: async (userId, updates) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const index = users.findIndex(u => u.id === userId);

        if (index !== -1) {
            const updatedUser = { ...users[index], ...updates };
            users[index] = updatedUser;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));

            // Update current user if it's the same user
            const currentUser = authService.getCurrentUser();
            if (currentUser && currentUser.id === userId) {
                const { password, ...userWithoutPassword } = updatedUser;
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
            }

            const { password, ...userWithoutPassword } = updatedUser;
            return userWithoutPassword;
        }

        throw new Error('User not found');
    }
};
