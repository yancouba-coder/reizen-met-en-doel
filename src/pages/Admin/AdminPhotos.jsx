import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PhotoUploader from './components/PhotoUploader';
import PhotoGallery from './components/PhotoGallery';
import { photoService } from '../../services/photoService';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';

const AdminPhotos = () => {
    const { t } = useTranslation();
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        try {
            setIsLoading(true);
            const data = await photoService.getPhotos();
            setPhotos(data);
        } catch (error) {
            console.error('Failed to load photos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (files) => {
        try {
            setIsUploading(true);
            // Upload files sequentially
            for (const file of files) {
                await photoService.uploadPhoto(file);
            }
            await loadPhotos();
        } catch (error) {
            console.error('Failed to upload photos:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this photo?')) return;

        try {
            await photoService.deletePhoto(id);
            setPhotos(prev => prev.filter(p => p.id !== id));
            setSelectedPhotos(prev => prev.filter(pId => pId !== id));
        } catch (error) {
            console.error('Failed to delete photo:', error);
        }
    };

    const handleSelect = (id) => {
        setSelectedPhotos(prev => {
            if (prev.includes(id)) {
                return prev.filter(pId => pId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleBulkDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete ${selectedPhotos.length} photos?`)) return;

        try {
            for (const id of selectedPhotos) {
                await photoService.deletePhoto(id);
            }
            setPhotos(prev => prev.filter(p => !selectedPhotos.includes(p.id)));
            setSelectedPhotos([]);
        } catch (error) {
            console.error('Failed to delete photos:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('admin_photos') || 'Photo Management'}</h1>
                    <p className="text-gray-500">Upload and manage your media library</p>
                </div>
                <div className="flex gap-3">
                    {selectedPhotos.length > 0 && (
                        <Button variant="danger" size="sm" onClick={handleBulkDelete}>
                            <Icon name="Trash2" size={16} className="mr-2" />
                            Delete Selected ({selectedPhotos.length})
                        </Button>
                    )}
                    <div className="bg-white rounded-lg border border-gray-200 p-1 flex">
                        <button
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <Icon name="Grid" size={18} />
                        </button>
                        <button
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
                            onClick={() => setViewMode('list')}
                        >
                            <Icon name="List" size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Upload Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Upload New Photos</h2>
                <PhotoUploader onUpload={handleUpload} isUploading={isUploading} />
            </div>

            {/* Gallery Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Media Library ({photos.length})</h2>
                    {/* Filter/Search could go here */}
                </div>

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading photos...</p>
                    </div>
                ) : (
                    <PhotoGallery
                        photos={photos}
                        onDelete={handleDelete}
                        onSelect={handleSelect}
                        selectedPhotos={selectedPhotos}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPhotos;
