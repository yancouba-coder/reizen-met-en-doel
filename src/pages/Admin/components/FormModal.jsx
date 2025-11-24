import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../../../components/atoms/Icon';
import Button from '../../../components/atoms/Button';

const FormModal = ({ isOpen, onClose, title, children, onSubmit, isSubmitting, size = 'md' }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const maxWidthClasses = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className={`bg-white rounded-xl shadow-2xl w-full ${maxWidthClasses[size]} max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200`}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    >
                        <Icon name="X" size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default FormModal;
