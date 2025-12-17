import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTrips } from '../../hooks/useTrips';
import { useToast } from '../../context/ToastContext';
import DataTable from './components/DataTable';
import FormModal from './components/FormModal';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';
import { format } from 'date-fns';

const AdminTrips = () => {
    const { t } = useTranslation();
    const { trips, isLoading, addTrip, updateTrip, deleteTrip, isAdding, isUpdating } = useTrips();
    const { success, error } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTrip, setEditingTrip] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        destination: '',
        startDate: '',
        endDate: '',
        cost: '',
        maxParticipants: '',
        status: 'upcoming'
    });

    const columns = useMemo(() => [
        {
            header: 'Trip',
            accessorKey: 'title',
            cell: info => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden">
                        {info.row.original.imageUrl ? (
                            <img src={info.row.original.imageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Icon name="Plane" size={20} />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{info.row.original.title}</div>
                        <div className="text-xs text-gray-500">{info.row.original.destination}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Dates',
            accessorKey: 'startDate',
            cell: info => {
                const start = info.getValue();
                const end = info.row.original.endDate;
                if (!start) return '-';
                return (
                    <div className="text-sm">
                        <div>{format(new Date(start), 'MMM d, yyyy')}</div>
                        {end && <div className="text-gray-500 text-xs">to {format(new Date(end), 'MMM d, yyyy')}</div>}
                    </div>
                );
            }
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: info => {
                const status = info.getValue();
                const colors = {
                    upcoming: 'bg-blue-100 text-blue-800',
                    active: 'bg-green-100 text-green-800',
                    completed: 'bg-gray-100 text-gray-800',
                    cancelled: 'bg-red-100 text-red-800'
                };
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
                        {status}
                    </span>
                );
            }
        },
        {
            header: 'Cost',
            accessorKey: 'cost',
            cell: info => `€${info.getValue()}`
        },
        {
            header: 'Participants',
            accessorKey: 'maxParticipants',
            cell: info => {
                const max = info.getValue();
                const current = info.row.original.currentParticipants || 0;
                return (
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{current} / {max}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div
                                className="bg-primary h-1.5 rounded-full"
                                style={{ width: `${Math.min((current / max) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                );
            }
        },
        {
            header: 'Actions',
            id: 'actions',
            cell: info => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleEdit(info.row.original)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                    >
                        <Icon name="Edit" size={18} />
                    </button>
                    <button
                        onClick={() => handleDelete(info.row.original.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                    >
                        <Icon name="Trash2" size={18} />
                    </button>
                </div>
            )
        }
    ], []);

    const handleAdd = () => {
        setEditingTrip(null);
        setFormData({
            title: '',
            description: '',
            destination: '',
            startDate: '',
            endDate: '',
            cost: '',
            maxParticipants: '',
            status: 'upcoming'
        });
        setIsModalOpen(true);
    };

    const handleEdit = (trip) => {
        setEditingTrip(trip);
        setFormData({
            title: trip.title,
            description: trip.description || '',
            destination: trip.destination,
            startDate: trip.startDate ? new Date(trip.startDate).toISOString().split('T')[0] : '',
            endDate: trip.endDate ? new Date(trip.endDate).toISOString().split('T')[0] : '',
            cost: trip.cost,
            maxParticipants: trip.maxParticipants,
            status: trip.status
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this trip?')) {
            try {
                await deleteTrip(id);
                success('Trip deleted successfully');
            } catch (err) {
                error('Failed to delete trip');
            }
        }
    };

    const handleBulkDelete = async (ids) => {
        try {
            await Promise.all(ids.map(id => deleteTrip(id)));
            success(`Successfully deleted ${ids.length} trip(s)`);
        } catch (err) {
            error('Failed to delete some trips');
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...formData,
                cost: parseInt(formData.cost),
                maxParticipants: parseInt(formData.maxParticipants)
            };

            if (editingTrip) {
                await updateTrip({ id: editingTrip.id, ...payload });
                success('Trip updated successfully');
            } else {
                await addTrip(payload);
                success('New trip created successfully');
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error('Failed to save trip:', err);
            error('Failed to save trip');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-end mb-8 border-b-2 border-primary/5 pb-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-primary mb-2">{t('admin_trips') || 'Trips Management'}</h1>
                    <p className="text-text-muted font-sans">Organize and manage trips</p>
                </div>
            </div>

            <DataTable
                data={trips || []}
                columns={columns}
                onAdd={handleAdd}
                onBulkDelete={handleBulkDelete}
                searchPlaceholder="Search trips..."
            />

            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingTrip ? 'Edit Trip' : 'Add New Trip'}
                onSubmit={handleSubmit}
                isSubmitting={isAdding || isUpdating}
            >
                <div className="space-y-4">
                    <Input
                        label="Trip Title"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Destination"
                            value={formData.destination}
                            onChange={e => setFormData({ ...formData, destination: e.target.value })}
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Start Date"
                            type="date"
                            value={formData.startDate}
                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                            required
                        />
                        <Input
                            label="End Date"
                            type="date"
                            value={formData.endDate}
                            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Cost per Person (€)"
                            type="number"
                            value={formData.cost}
                            onChange={e => setFormData({ ...formData, cost: e.target.value })}
                            required
                        />
                        <Input
                            label="Max Participants"
                            type="number"
                            value={formData.maxParticipants}
                            onChange={e => setFormData({ ...formData, maxParticipants: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-[100px]"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe the trip itinerary..."
                        />
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default AdminTrips;
