import React, { useState } from 'react';
import { User, Mail, Save } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { updateProfile } from '../store/slices/authSlice';
import { addNotification } from '../store/slices/uiSlice';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      dispatch(addNotification({ type: 'error', message: 'Please fill in all fields' }));
      return;
    }

    await dispatch(updateProfile(formData));
    dispatch(addNotification({ type: 'success', message: 'Profile updated successfully!' }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="card">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center text-white text-4xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input pl-10"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Account Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Projects Created</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">0</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Collaborations</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">0</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
