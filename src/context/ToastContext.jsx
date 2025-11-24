import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../components/atoms/Icon';
import { clsx } from 'clsx';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const Toast = ({ id, type, message, onClose }) => {
    const variants = {
        success: 'bg-white border-l-4 border-green-500 text-gray-800',
        error: 'bg-white border-l-4 border-red-500 text-gray-800',
        info: 'bg-white border-l-4 border-blue-500 text-gray-800',
        warning: 'bg-white border-l-4 border-yellow-500 text-gray-800',
    };

    const icons = {
        success: 'CheckCircle',
        error: 'AlertCircle',
        info: 'Info',
        warning: 'AlertTriangle',
    };

    const iconColors = {
        success: 'text-green-500',
        error: 'text-red-500',
        info: 'text-blue-500',
        warning: 'text-yellow-500',
    };

    return (
        <div className={clsx(
            "flex items-center gap-3 p-4 rounded shadow-lg min-w-[300px] max-w-md animate-in slide-in-from-right duration-300",
            variants[type]
        )}>
            <Icon name={icons[type]} size={20} className={iconColors[type]} />
            <p className="text-sm font-medium flex-1">{message}</p>
            <button onClick={() => onClose(id)} className="text-gray-400 hover:text-gray-600">
                <Icon name="X" size={16} />
            </button>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((type, message) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, type, message }]);

        setTimeout(() => {
            removeToast(id);
        }, 5000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const success = (message) => addToast('success', message);
    const error = (message) => addToast('error', message);
    const info = (message) => addToast('info', message);
    const warning = (message) => addToast('warning', message);

    return (
        <ToastContext.Provider value={{ success, error, info, warning }}>
            {children}
            {createPortal(
                <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
                    {toasts.map((toast) => (
                        <Toast key={toast.id} {...toast} onClose={removeToast} />
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};
