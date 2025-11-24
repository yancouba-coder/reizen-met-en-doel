import React from 'react';
import Icon from '../../../components/atoms/Icon';
import Button from '../../../components/atoms/Button';
import { format } from 'date-fns';

const PhotoGallery = ({ photos, onDelete, onSelect, selectedPhotos = [] }) => {
    if (photos.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <Icon name="Image" size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No photos uploaded yet</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {photos.map((photo) => {
                const isSelected = selectedPhotos.includes(photo.id);
                return (
                    <div
                        key={photo.id}
                        className={`group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-200'}`}
                        onClick={() => onSelect && onSelect(photo.id)}
                    >
                        <img
                            src={photo.url}
                            alt={photo.filename}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                        {/* Info Badge */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-xs truncate">{photo.filename}</p>
                            <p className="text-white/70 text-[10px]">
                                {format(new Date(photo.uploadedAt), 'MMM d, yyyy')}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(photo.id);
                                }}
                                className="w-8 h-8 bg-white text-red-500 rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
                                title="Delete photo"
                            >
                                <Icon name="Trash2" size={14} />
                            </button>
                        </div>

                        {/* Selection Checkbox */}
                        {onSelect && (
                            <div className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'bg-white/50 border-white'}`}>
                                {isSelected && <Icon name="Check" size={12} className="text-white" />}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default PhotoGallery;
