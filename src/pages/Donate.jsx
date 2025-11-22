import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../components/atoms/Icon';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import { clsx } from 'clsx';

const Donate = () => {
    const { t } = useTranslation();
    const [donationType, setDonationType] = useState('one-time'); // 'one-time' or 'monthly'
    const [selectedAmount, setSelectedAmount] = useState(50);
    const [customAmount, setCustomAmount] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [step, setStep] = useState(1); // 1: amount, 2: details, 3: payment
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const predefinedAmounts = [25, 50, 100, 250, 500];

    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard', popular: true },
        { id: 'paypal', name: 'PayPal', icon: 'Wallet' },
        { id: 'bancontact', name: 'Bancontact', icon: 'Building' },
        { id: 'ideal', name: 'iDEAL', icon: 'Building2' },
        { id: 'bank', name: 'Bank Transfer', icon: 'Landmark' },
    ];

    const impactExamples = [
        { amount: 25, impact: t('donate_impact_25') || 'Provides school supplies for 1 child for a month' },
        { amount: 50, impact: t('donate_impact_50') || 'Supports a family with food for a week' },
        { amount: 100, impact: t('donate_impact_100') || 'Covers medical care for 2 children' },
        { amount: 250, impact: t('donate_impact_250') || 'Funds a small community project' },
        { amount: 500, impact: t('donate_impact_500') || 'Helps build a water well' },
    ];

    const getCurrentImpact = () => {
        const amount = customAmount ? parseInt(customAmount) : selectedAmount;
        const closest = impactExamples.reduce((prev, curr) =>
            Math.abs(curr.amount - amount) < Math.abs(prev.amount - amount) ? curr : prev
        );
        return closest.impact;
    };

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value;
        setCustomAmount(value);
        if (value) {
            setSelectedAmount(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would integrate with actual payment processor
        alert(t('donate_thank_you') || 'Thank you for your generous donation!');
    };

    const finalAmount = customAmount || selectedAmount;

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary via-white to-secondary/30 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mb-6 shadow-lg">
                        <Icon name="Heart" size={40} className="text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
                        {t('donate_title') || 'Make a Difference Today'}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t('donate_subtitle') || 'Your donation helps us support families and communities in Senegal'}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Donation Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {/* Progress Steps */}
                            <div className="bg-gradient-to-r from-primary to-accent p-6">
                                <div className="flex items-center justify-between max-w-md mx-auto">
                                    {[1, 2, 3].map((s) => (
                                        <React.Fragment key={s}>
                                            <div className="flex flex-col items-center">
                                                <div className={clsx(
                                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                                                    step >= s ? "bg-white text-primary" : "bg-white/30 text-white"
                                                )}>
                                                    {s}
                                                </div>
                                                <span className="text-xs text-white mt-2">
                                                    {s === 1 ? t('donate_step_amount') || 'Amount' :
                                                        s === 2 ? t('donate_step_details') || 'Details' :
                                                            t('donate_step_payment') || 'Payment'}
                                                </span>
                                            </div>
                                            {s < 3 && <div className={clsx("flex-1 h-1 mx-2", step > s ? "bg-white" : "bg-white/30")} />}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8">
                                {/* Step 1: Amount Selection */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        {/* Donation Type Toggle */}
                                        <div className="flex gap-4 p-1 bg-gray-100 rounded-lg">
                                            <button
                                                onClick={() => setDonationType('one-time')}
                                                className={clsx(
                                                    "flex-1 py-3 px-4 rounded-md font-semibold transition-all",
                                                    donationType === 'one-time'
                                                        ? "bg-white text-primary shadow-md"
                                                        : "text-gray-600 hover:text-text"
                                                )}
                                            >
                                                {t('donate_one_time') || 'One-time'}
                                            </button>
                                            <button
                                                onClick={() => setDonationType('monthly')}
                                                className={clsx(
                                                    "flex-1 py-3 px-4 rounded-md font-semibold transition-all",
                                                    donationType === 'monthly'
                                                        ? "bg-white text-primary shadow-md"
                                                        : "text-gray-600 hover:text-text"
                                                )}
                                            >
                                                <div className="flex items-center justify-center gap-2">
                                                    {t('donate_monthly') || 'Monthly'}
                                                    <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                                                        {t('donate_popular') || 'Popular'}
                                                    </span>
                                                </div>
                                            </button>
                                        </div>

                                        {/* Predefined Amounts */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                {t('donate_select_amount') || 'Select an amount'}
                                            </label>
                                            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                                {predefinedAmounts.map((amount) => (
                                                    <button
                                                        key={amount}
                                                        onClick={() => handleAmountSelect(amount)}
                                                        className={clsx(
                                                            "py-4 px-4 rounded-xl font-bold text-lg transition-all border-2",
                                                            selectedAmount === amount && !customAmount
                                                                ? "bg-primary text-white border-primary shadow-lg scale-105"
                                                                : "bg-white text-text border-gray-200 hover:border-primary hover:shadow-md"
                                                        )}
                                                    >
                                                        €{amount}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Custom Amount */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                {t('donate_custom_amount') || 'Or enter a custom amount'}
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">€</span>
                                                <input
                                                    type="number"
                                                    value={customAmount}
                                                    onChange={handleCustomAmountChange}
                                                    placeholder="0"
                                                    className="w-full pl-12 pr-4 py-4 text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                    min="1"
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => setStep(2)}
                                            disabled={!finalAmount}
                                            className="w-full py-4 text-lg"
                                        >
                                            {t('donate_continue') || 'Continue'}
                                        </Button>
                                    </div>
                                )}

                                {/* Step 2: Personal Details */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-text mb-4">
                                            {t('donate_your_details') || 'Your Details'}
                                        </h3>
                                        <Input
                                            label={t('form_name') || 'Full Name'}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                        <Input
                                            label={t('form_email') || 'Email'}
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-1">
                                                {t('donate_message_optional') || 'Message (Optional)'}
                                            </label>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 h-24"
                                                placeholder={t('donate_message_placeholder') || 'Share why you\'re donating...'}
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">
                                                {t('donate_back') || 'Back'}
                                            </Button>
                                            <Button onClick={() => setStep(3)} className="flex-1">
                                                {t('donate_continue') || 'Continue'}
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Payment Method */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-text mb-4">
                                            {t('donate_payment_method') || 'Payment Method'}
                                        </h3>
                                        <div className="space-y-3">
                                            {paymentMethods.map((method) => (
                                                <button
                                                    key={method.id}
                                                    onClick={() => setSelectedPayment(method.id)}
                                                    className={clsx(
                                                        "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                                                        selectedPayment === method.id
                                                            ? "border-primary bg-primary/5"
                                                            : "border-gray-200 hover:border-primary/50"
                                                    )}
                                                >
                                                    <div className={clsx(
                                                        "w-12 h-12 rounded-full flex items-center justify-center",
                                                        selectedPayment === method.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                                                    )}>
                                                        <Icon name={method.icon} size={24} />
                                                    </div>
                                                    <span className="flex-1 text-left font-semibold">{method.name}</span>
                                                    {method.popular && (
                                                        <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                                                            {t('donate_popular') || 'Popular'}
                                                        </span>
                                                    )}
                                                    {selectedPayment === method.id && (
                                                        <Icon name="CheckCircle2" size={24} className="text-primary" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                            <p className="text-sm text-gray-600 mb-4">
                                                {t('donate_secure_payment') || '🔒 Your payment is secure and encrypted'}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Icon name="Shield" size={16} />
                                                <span>{t('donate_ssl_encrypted') || 'SSL Encrypted'}</span>
                                                <span>•</span>
                                                <Icon name="Lock" size={16} />
                                                <span>{t('donate_pci_compliant') || 'PCI Compliant'}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">
                                                {t('donate_back') || 'Back'}
                                            </Button>
                                            <Button onClick={handleSubmit} className="flex-1 py-4 text-lg">
                                                {t('donate_complete') || `Donate €${finalAmount}`}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Impact & Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Donation Summary */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <h3 className="font-bold text-lg text-text mb-4">
                                {t('donate_summary') || 'Donation Summary'}
                            </h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>{t('donate_type') || 'Type'}:</span>
                                    <span className="font-semibold text-text">
                                        {donationType === 'monthly' ? t('donate_monthly') || 'Monthly' : t('donate_one_time') || 'One-time'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>{t('donate_amount') || 'Amount'}:</span>
                                    <span className="font-bold text-2xl text-primary">€{finalAmount || 0}</span>
                                </div>
                            </div>

                            {finalAmount > 0 && (
                                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
                                    <div className="flex items-start gap-3">
                                        <Icon name="Sparkles" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-text mb-1">
                                                {t('donate_your_impact') || 'Your Impact'}
                                            </p>
                                            <p className="text-sm text-gray-700">{getCurrentImpact()}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {donationType === 'monthly' && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-sm text-blue-800">
                                        <Icon name="Info" size={16} className="inline mr-1" />
                                        {t('donate_monthly_info') || 'You can cancel anytime'}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Why Donate */}
                        <div className="bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="font-bold text-lg mb-4">{t('donate_why_title') || 'Why Donate?'}</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <Icon name="Check" size={18} className="flex-shrink-0 mt-0.5" />
                                    <span>{t('donate_why_1') || '100% of donations go directly to projects'}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="Check" size={18} className="flex-shrink-0 mt-0.5" />
                                    <span>{t('donate_why_2') || 'Tax deductible in Belgium'}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="Check" size={18} className="flex-shrink-0 mt-0.5" />
                                    <span>{t('donate_why_3') || 'Transparent reporting on impact'}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="Check" size={18} className="flex-shrink-0 mt-0.5" />
                                    <span>{t('donate_why_4') || 'Direct connection with communities'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donate;
