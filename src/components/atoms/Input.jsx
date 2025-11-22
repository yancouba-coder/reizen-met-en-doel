import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Composant Input - Champ de saisie avec label et gestion d'erreurs
 * 
 * Utilise React.forwardRef pour permettre l'accès au DOM natif, nécessaire pour
 * l'intégration avec des bibliothèques de formulaires comme React Hook Form.
 * 
 * @component
 * @example
 * // Input simple avec label
 * <Input
 *   id="email"
 *   label="Email"
 *   type="email"
 *   placeholder="votre@email.com"
 * />
 * 
 * @example
 * // Input avec gestion d'erreur et ref
 * <Input
 *   id="password"
 *   label="Mot de passe"
 *   type="password"
 *   error="Le mot de passe doit contenir au moins 8 caractères"
 *   ref={passwordRef}
 * />
 * 
 * @param {Object} props - Props du composant
 * @param {string} [props.label] - Label affiché au-dessus de l'input
 * @param {string} [props.error] - Message d'erreur affiché en rouge sous l'input
 * @param {string} [props.className] - Classes CSS additionnelles
 * @param {string} [props.id] - ID HTML pour l'association label/input (accessibilité)
 * @param {Object} props...rest - Tous les attributs HTML natifs (type, placeholder, value, onChange, etc.)
 * @param {React.Ref} ref - Référence forwarded vers l'élément input natif
 * 
 * @returns {JSX.Element} Élément input avec label et message d'erreur optionnels
 */
const Input = React.forwardRef(({ label, error, className, id, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-text mb-1">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={id}
                className={twMerge(
                    'w-full rounded-md border border-gray-300 px-3 py-2 text-text placeholder-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
                    error && 'border-danger focus:border-danger focus:ring-danger',
                    className
                )}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

Input.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
};

export default Input;
