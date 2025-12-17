import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useChildren } from '../../hooks/useChildren';
import { useToast } from '../../context/ToastContext';
import DataTable from './components/DataTable';
import FormModal from './components/FormModal';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';

const AdminChildren = () => {
    const { t } = useTranslation();
    const { children, isLoading, addChild, updateChild, deleteChild, isAdding, isUpdating } = useChildren();
    const { success, error } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingChild, setEditingChild] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: 'male',
        village: '',
        story: '',
        sponsorCostMonthly: '',
        status: 'waiting'
    });

    const columns = useMemo(() => [
        {
            header: 'Child',
            accessorKey: 'firstName',
            cell: info => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        {info.row.original.imageUrl ? (
                            <img src={info.row.original.imageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Icon name="User" size={20} />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{info.row.original.firstName} {info.row.original.lastName}</div>
                        <div className="text-xs text-gray-500">{info.row.original.age} years old</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: info => {
                const status = info.getValue();
                const colors = {
                    sponsored: 'bg-green-100 text-green-800',
                    waiting: 'bg-yellow-100 text-yellow-800',
                    urgent: 'bg-red-100 text-red-800'
                };
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
                        {status}
                    </span>
                );
            }
        },
        {
            header: 'Village',
            accessorKey: 'village',
        },
        {
            header: 'Monthly Cost',
            accessorKey: 'sponsorCostMonthly',
            cell: info => `€${info.getValue()}`
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
        setEditingChild(null);
        setFormData({
            firstName: '',
            lastName: '',
            age: '',
            gender: 'male',
            village: '',
            story: '',
            sponsorCostMonthly: '',
            status: 'waiting'
        });
        setIsModalOpen(true);
    };

    const handleEdit = (child) => {
        setEditingChild(child);
        setFormData({
            firstName: child.firstName,
            lastName: child.lastName || '',
            age: child.age,
            gender: child.gender,
            village: child.village,
            story: child.story || '',
            sponsorCostMonthly: child.sponsorCostMonthly,
            status: child.status
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this child record?')) {
            try {
                await deleteChild(id);
                success('Child record deleted successfully');
            } catch (err) {
                error('Failed to delete child record');
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...formData,
                age: parseInt(formData.age),
                sponsorCostMonthly: parseInt(formData.sponsorCostMonthly)
            };

            if (editingChild) {
                await updateChild({ id: editingChild.id, ...payload });
                success('Child record updated successfully');
            } else {
                await addChild(payload);
                success('New child added successfully');
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error('Failed to save child:', err);
            error('Failed to save child record');
        }
    };

    const handleBulkDelete = async (ids) => {
        try {
            await Promise.all(ids.map(id => deleteChild(id)));
            success(`Successfully deleted ${ids.length} child record(s)`);
        } catch (err) {
            error('Failed to delete some child records');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-end mb-8 border-b-2 border-primary/5 pb-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-primary mb-2">{t('admin_children') || 'Children Management'}</h1>
                    <p className="text-text-muted font-sans">Manage child profiles and sponsorships</p>
                </div>
            </div>

            <DataTable
                data={children || []}
                columns={columns}
                onAdd={handleAdd}
                onBulkDelete={handleBulkDelete}
                searchPlaceholder="Search children..."
            />

            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingChild ? 'Edit Child' : 'Add New Child'}
                onSubmit={handleSubmit}
                isSubmitting={isAdding || isUpdating}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            value={formData.firstName}
                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                            required
                        />
                        <Input
                            label="Last Name"
                            value={formData.lastName}
                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Age"
                            type="number"
                            value={formData.age}
                            onChange={e => setFormData({ ...formData, age: e.target.value })}
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                value={formData.gender}
                                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Village"
                            value={formData.village}
                            onChange={e => setFormData({ ...formData, village: e.target.value })}
                            required
                        />
                        <Input
                            label="Monthly Cost (€)"
                            type="number"
                            value={formData.sponsorCostMonthly}
                            onChange={e => setFormData({ ...formData, sponsorCostMonthly: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="waiting">Waiting List</option>
                            <option value="sponsored">Sponsored</option>
                            <option value="urgent">Urgent Need</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Story / Background</label>
                        <textarea
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-[100px]"
                            value={formData.story}
                            onChange={e => setFormData({ ...formData, story: e.target.value })}
                            placeholder="Tell the child's story..."
                        />
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default AdminChildren;
