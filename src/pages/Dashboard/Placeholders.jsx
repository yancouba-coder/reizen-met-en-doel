import React from 'react';

const PlaceholderPage = ({ title }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <h2 className="text-2xl font-bold text-text mb-4">{title}</h2>
        <p className="text-gray-500">Coming soon...</p>
    </div>
);

export const MySponsoredChildren = () => <PlaceholderPage title="My Sponsored Children" />;
export const MyProjects = () => <PlaceholderPage title="My Projects" />;
export const BrowseChildren = () => <PlaceholderPage title="Browse Children" />;
export const BrowseProjects = () => <PlaceholderPage title="Browse Projects" />;
export const Profile = () => <PlaceholderPage title="My Profile" />;
