import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FolderKanban, TrendingUp, Users, Clock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProjects } from '../store/slices/projectSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector((state) => state.project);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const activeProjects = projects.filter((p) => p.status === 'active');
  const completedProjects = projects.filter((p) => p.status === 'completed');
  const draftProjects = projects.filter((p) => p.status === 'draft');

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      icon: FolderKanban,
      color: 'bg-blue-500',
    },
    {
      label: 'Active Projects',
      value: activeProjects.length,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      label: 'Collaborations',
      value: projects.filter((p) => p.collaborators.length > 0).length,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      label: 'Draft Projects',
      value: draftProjects.length,
      icon: Clock,
      color: 'bg-yellow-500',
    },
  ];

  const recentProjects = projects.slice(0, 5);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Here's what's happening with your projects today.
          </p>
        </div>
        <Link to="/projects" className="btn btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Project
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Projects */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
          <Link to="/projects" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
            View all
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="text-center py-12">
            <FolderKanban className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get started by creating your first project
            </p>
            <Link to="/projects" className="btn btn-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Project
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project._id}`}
                className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`badge ${
                        project.status === 'active' ? 'badge-success' :
                        project.status === 'completed' ? 'badge-primary' :
                        'badge-warning'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        Stage {project.currentStage}/12
                      </span>
                      {project.collaborators.length > 0 && (
                        <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {project.collaborators.length}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {Math.round((project.currentStage / 12) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card hover:shadow-xl transition-shadow cursor-pointer">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FolderKanban className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Start New Project
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Begin your product development journey
            </p>
          </div>
        </div>

        <div className="card hover:shadow-xl transition-shadow cursor-pointer">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Invite Team
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Collaborate with your team members
            </p>
          </div>
        </div>

        <div className="card hover:shadow-xl transition-shadow cursor-pointer">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              View Analytics
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track your project progress
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
