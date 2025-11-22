import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

/**
 * Composant DefaultLayout - Layout par défaut pour les pages publiques
 * 
 * Structure de base de l'application avec:
 * - Header fixe en haut
 * - Zone de contenu principale (Outlet pour React Router)
 * - Footer en bas
 * 
 * Utilise flexbox pour garantir que le footer reste en bas de page
 * même si le contenu est court.
 * 
 * @component
 * @example
 * // Dans le routing
 * <Route element={<DefaultLayout />}>
 *   <Route path="/" element={<Home />} />
 *   <Route path="/about" element={<About />} />
 * </Route>
 * 
 * @returns {JSX.Element} Layout avec header, contenu et footer
 */
const DefaultLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-text">
            <Header />
            <main className="flex-grow pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
