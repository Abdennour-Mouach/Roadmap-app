import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Lightbulb, 
  AlertCircle, 
  CheckCircle, 
  Users, 
  Palette, 
  Database, 
  Layout, 
  Code, 
  Rocket, 
  Globe,
  FileText,
  Target
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProject } from '../store/slices/projectSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentProject, loading } = useAppSelector((state) => state.project);

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [dispatch, id]);

  const stages = [
    { id: 1, name: 'Ideation', icon: Lightbulb, path: 'ideation', color: 'bg-yellow-500' },
    { id: 2, name: 'Problem Definition', icon: AlertCircle, path: 'problem-definition', color: 'bg-red-500' },
    { id: 3, name: 'Solution Definition', icon: CheckCircle, path: 'solution-definition', color: 'bg-green-500' },
    { id: 4, name: 'Audience/Market', icon: Target, path: 'audience-market', color: 'bg-blue-500' },
    { id: 5, name: 'Technical Spec', icon: FileText, path: 'technical-spec', color: 'bg-purple-500' },
    { id: 6, name: 'Database Design', icon: Database, path: 'database-design', color: 'bg-indigo-500' },
    { id: 7, name: 'Wireframing', icon: Layout, path: 'wireframe', color: 'bg-pink-500' },
    { id: 8, name: 'Development', icon: Code, path: 'development', color: 'bg-orange-500' },
    { id: 9, name: 'Go to Market', icon: Rocket, path: 'go-to-market', color: 'bg-teal-500' },
    { id: 10, name: 'Domain & Hosting', icon: Globe, path: 'domain-hosting', color: 'bg-cyan-500' },
  ];

  if (loading || !currentProject) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentProject.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {currentProject.description}
            </p>
            <div className="flex items-center gap-4">
              <span className={`badge ${
                currentProject.status === 'active' ? 'badge-success' :
                currentProject.status === 'completed' ? 'badge-primary' :
                'badge-warning'
              }`}>
                {currentProject.status}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span>{currentProject.collaborators.length + 1} members</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {Math.round((currentProject.currentStage / 12) * 100)}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stage {currentProject.currentStage}/12
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all"
              style={{ width: `${(currentProject.currentStage / 12) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stages Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Project Stages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isCompleted = stage.id < currentProject.currentStage;
            const isCurrent = stage.id === currentProject.currentStage;
            const isLocked = stage.id > currentProject.currentStage;

            return (
              <Link
                key={stage.id}
                to={`/projects/${id}/${stage.path}`}
                className={`card hover:shadow-xl transition-all ${
                  isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
                onClick={(e) => isLocked && e.preventDefault()}
              >
                <div className="flex items-start gap-4">
                  <div className={`${stage.color} p-3 rounded-lg flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {stage.name}
                      </h3>
                      {isCompleted && (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      )}
                      {isCurrent && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Locked'}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Total Ideas
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentProject.stages.ideation.ideas.length}
          </p>
        </div>

        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Features Planned
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentProject.stages.solutionDefinition.keyFeatures.length}
          </p>
        </div>

        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Development Tasks
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentProject.stages.development.tasks.length}
          </p>
        </div>
      </div>

      {/* Team Members */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Team Members
        </h2>
        <div className="flex flex-wrap gap-4">
          {/* Owner */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
              {currentProject.owner.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {currentProject.owner.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Owner</p>
            </div>
          </div>

          {/* Collaborators */}
          {currentProject.collaborators.map((collab: any) => (
            <div key={collab._id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-secondary-600 flex items-center justify-center text-white font-semibold">
                {collab.user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {collab.user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {collab.role}
                </p>
              </div>
            </div>
          ))}

          {/* Add Member Button */}
          <button className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Add Member
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Invite collaborator</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
