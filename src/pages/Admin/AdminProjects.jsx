import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../../hooks/useProjects';
import { useToast } from '../../context/ToastContext';
import DataTable from './components/DataTable';
import FormModal from './components/FormModal';
import Input from '../../components/atoms/Input';
import Icon from '../../components/atoms/Icon';

const AdminProjects = () => {
    const { t } = useTranslation();
    const { projects, isLoading, addProject, updateProject, deleteProject, isAdding, isUpdating } = useProjects();
    const { success, error } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        targetAmount: '',
        currentAmount: '0',
        location: '',
        status: 'active'
    });

    const columns = useMemo(() => [
        {
            header: 'Project',
            accessorKey: 'title',
            cell: info => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden">
                        {info.row.original.imageUrl ? (
                            <img src={info.row.original.imageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Icon name="Briefcase" size={20} />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{info.row.original.title}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{info.row.original.description}</div>
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
                    active: 'bg-blue-100 text-blue-800',
                    completed: 'bg-green-100 text-green-800',
                    planned: 'bg-yellow-100 text-yellow-800'
                };
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
                        {status}
                    </span>
                );
            }
        },
        {
            header: 'Location',
            accessorKey: 'location',
        },
        {
            header: 'Progress',
            accessorKey: 'currentAmount',
            cell: info => {
                const current = parseInt(info.getValue() || 0);
                const target = parseInt(info.row.original.targetAmount || 1);
                const percentage = Math.min(Math.round((current / target) * 100), 100);
                return (
                    <div className="w-32">
                        <div className="flex justify-between text-xs mb-1">
                            <span>€{current}</span>
                            <span className="text-gray-500">of €{target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                                className="bg-primary h-1.5 rounded-full"
                                style={{ width: `${percentage}%` }}
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
        setEditingProject(null);
        setFormData({
            title: '',
            description: '',
            targetAmount: '',
            currentAmount: '0',
            location: '',
            status: 'active'
        });
        setIsModalOpen(true);
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description || '',
            targetAmount: project.targetAmount,
            currentAmount: project.currentAmount || '0',
            location: project.location || '',
            status: project.status
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(id);
                success('Project deleted successfully');
            } catch (err) {
                error('Failed to delete project');
            }
        }
    };

    const handleBulkDelete = async (ids) => {
        try {
            await Promise.all(ids.map(id => deleteProject(id)));
            success(`Successfully deleted ${ids.length} project(s)`);
        } catch (err) {
            error('Failed to delete some projects');
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...formData,
                targetAmount: parseInt(formData.targetAmount),
                currentAmount: parseInt(formData.currentAmount)
            };

            if (editingProject) {
                await updateProject({ id: editingProject.id, ...payload });
                success('Project updated successfully');
            } else {
                await addProject(payload);
                success('New project created successfully');
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error('Failed to save project:', err);
            error('Failed to save project');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{t('admin_projects') || 'Projects Management'}</h1>
                    <p className="text-gray-500">Track and manage ongoing projects</p>
                </div>
            </div>

            <DataTable
                data={projects || []}
                columns={columns}
                onAdd={handleAdd}
                onBulkDelete={handleBulkDelete}
                searchPlaceholder="Search projects..."
            />

            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingProject ? 'Edit Project' : 'Add New Project'}
                onSubmit={handleSubmit}
                isSubmitting={isAdding || isUpdating}
            >
                <div className="space-y-4">
                    <Input
                        label="Project Title"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Target Amount (€)"
                            type="number"
                            value={formData.targetAmount}
                            onChange={e => setFormData({ ...formData, targetAmount: e.target.value })}
                            required
                        />
                        <Input
                            label="Current Amount (€)"
                            type="number"
                            value={formData.currentAmount}
                            onChange={e => setFormData({ ...formData, currentAmount: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Location"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="planned">Planned</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-[100px]"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe the project..."
                        />
                    </div>
                </div>
            </FormModal>
        </div>
    );
};

export default AdminProjects;
