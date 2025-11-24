import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Icon from '../../../components/atoms/Icon';
import Button from '../../../components/atoms/Button';
import { clsx } from 'clsx';

const PhotoUploader = ({ onUpload, isUploading }) => {
    const [previews, setPreviews] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        const newPreviews = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setPreviews(prev => [...prev, ...newPreviews]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxSize: 5242880, // 5MB
    });

    const handleUpload = async () => {
        if (previews.length === 0) return;
        await onUpload(previews);
        setPreviews([]);
    };

    const removePreview = (index) => {
        setPreviews(prev => {
            const newPreviews = [...prev];
            URL.revokeObjectURL(newPreviews[index].preview);
            newPreviews.splice(index, 1);
            return newPreviews;
        });
    };

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={clsx(
                    "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
                    isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary hover:bg-gray-50"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                        <Icon name="UploadCloud" size={24} />
                    </div>
                    <div>
                        <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                    </div>
                </div>
            </div>

            {previews.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Selected Files ({previews.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {previews.map((file, index) => (
                            <div key={file.name + index} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src={file.preview}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                                />
                                <button
                                    onClick={() => removePreview(index)}
                                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Icon name="X" size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <Button
                            onClick={handleUpload}
                            disabled={isUploading}
                            variant="primary"
                        >
                            {isUploading ? 'Uploading...' : 'Upload All Photos'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoUploader;
