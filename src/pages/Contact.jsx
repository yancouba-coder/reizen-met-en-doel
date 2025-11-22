import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const Contact = () => {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-text mb-8">{t('contact_title')}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <p className="text-lg text-gray-600 mb-6">
                        {t('contact_intro')}
                    </p>
                    <div className="space-y-4">
                        <p><strong>Email:</strong> info@reizenmeteendoel.be</p>
                        <p><strong>Phone:</strong> +32 123 45 67 89</p>
                        <p><strong>Address:</strong> Brussels, Belgium</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    {submitted ? (
                        <div className="text-center py-12 text-green-600">
                            <h3 className="text-xl font-bold mb-2">{t('contact_sent_title')}</h3>
                            <p>{t('contact_sent_message')}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input label={t('form_name')} required />
                            <Input label={t('form_email')} type="email" required />
                            <div>
                                <label className="block text-sm font-medium text-text mb-1">{t('form_message')}</label>
                                <textarea className="w-full rounded-md border border-gray-300 px-3 py-2 h-32" required></textarea>
                            </div>
                            <Button type="submit" className="w-full">{t('form_send')}</Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
