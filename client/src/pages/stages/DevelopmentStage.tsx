import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Code, Plus, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchProject, updateProjectStage } from '../../store/slices/projectSlice';
import { addNotification } from '../../store/slices/uiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const DevelopmentStage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentProject, loading } = useAppSelector((state) => state.project);
  
  const [tasks, setTasks] = useState<any[]>([]);
  const [repositories, setRepositories] = useState<any[]>([]);
  const [bugs, setBugs] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProject?.stages.development) {
      const stage = currentProject.stages.development;
      setTasks(stage.tasks || []);
      setRepositories(stage.repositories || []);
      setBugs(stage.bugs || []);
    }
  }, [currentProject]);

  const handleSave = async () => {
    await dispatch(updateProjectStage({
      projectId: id!,
      stageName: 'development',
      stageData: { tasks, repositories, bugs },
    }));
    dispatch(addNotification({ type: 'success', message: 'Development data saved!' }));
  };

  const addTask = () => {
    setTasks([...tasks, {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      tags: [],
    }]);
  };

  const addRepository = () => {
    setRepositories([...repositories, {
      name: '',
      url: '',
      branch: 'main',
    }]);
  };

  const addBug = () => {
    setBugs([...bugs, {
      title: '',
      description: '',
      severity: 'medium',
      status: 'open',
      reportedBy: '',
      reportedAt: new Date(),
    }]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'review':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  if (loading && !currentProject) {
    return <LoadingSpinner fullScreen />;
  }

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const reviewTasks = tasks.filter(t => t.status === 'review');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/projects/${id}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Code className="w-8 h-8 text-orange-500" />
              Development
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Track development tasks and manage code repositories
            </p>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400">To Do</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{todoTasks.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
          <p className="text-3xl font-bold text-blue-600">{inProgressTasks.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400">In Review</p>
          <p className="text-3xl font-bold text-yellow-600">{reviewTasks.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400">Done</p>
          <p className="text-3xl font-bold text-green-600">{doneTasks.length}</p>
        </div>
      </div>

      {/* Tasks Kanban */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tasks</h2>
          <button onClick={addTask} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* To Do Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              To Do ({todoTasks.length})
            </h3>
            {todoTasks.map((task, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => {
                    const updated = [...tasks];
                    const taskIndex = tasks.findIndex(t => t === task);
                    updated[taskIndex].title = e.target.value;
                    setTasks(updated);
                  }}
                  className="input mb-2"
                  placeholder="Task title"
                />
                <select
                  value={task.status}
                  onChange={(e) => {
                    const updated = [...tasks];
                    const taskIndex = tasks.findIndex(t => t === task);
                    updated[taskIndex].status = e.target.value;
                    setTasks(updated);
                  }}
                  className="input text-sm mb-2"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
                <div className="flex items-center justify-between">
                  <span className={`badge ${
                    task.priority === 'high' ? 'badge-danger' :
                    task.priority === 'medium' ? 'badge-warning' :
                    'badge-primary'
                  }`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={() => setTasks(tasks.filter(t => t !== task))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* In Progress Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              In Progress ({inProgressTasks.length})
            </h3>
            {inProgressTasks.map((task, index) => (
              <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-gray-900 dark:text-white mb-2">{task.title}</p>
                <select
                  value={task.status}
                  onChange={(e) => {
                    const updated = [...tasks];
                    const taskIndex = tasks.findIndex(t => t === task);
                    updated[taskIndex].status = e.target.value;
                    setTasks(updated);
                  }}
                  className="input text-sm"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
            ))}
          </div>

          {/* Review Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              Review ({reviewTasks.length})
            </h3>
            {reviewTasks.map((task, index) => (
              <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="font-medium text-gray-900 dark:text-white mb-2">{task.title}</p>
                <select
                  value={task.status}
                  onChange={(e) => {
                    const updated = [...tasks];
                    const taskIndex = tasks.findIndex(t => t === task);
                    updated[taskIndex].status = e.target.value;
                    setTasks(updated);
                  }}
                  className="input text-sm"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
            ))}
          </div>

          {/* Done Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              Done ({doneTasks.length})
            </h3>
            {doneTasks.map((task, index) => (
              <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Repositories */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Code Repositories</h2>
          <button onClick={addRepository} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Repository
          </button>
        </div>

        <div className="space-y-3">
          {repositories.map((repo, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={repo.name}
                  onChange={(e) => {
                    const updated = [...repositories];
                    updated[index].name = e.target.value;
                    setRepositories(updated);
                  }}
                  className="input"
                  placeholder="Repository name"
                />
                <input
                  type="text"
                  value={repo.url}
                  onChange={(e) => {
                    const updated = [...repositories];
                    updated[index].url = e.target.value;
                    setRepositories(updated);
                  }}
                  className="input"
                  placeholder="Repository URL"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={repo.branch}
                    onChange={(e) => {
                      const updated = [...repositories];
                      updated[index].branch = e.target.value;
                      setRepositories(updated);
                    }}
                    className="input flex-1"
                    placeholder="Branch"
                  />
                  <button
                    onClick={() => setRepositories(repositories.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {repositories.length === 0 && (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No repositories added yet.
            </p>
          )}
        </div>
      </div>

      {/* Bugs */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bug Tracking</h2>
          <button onClick={addBug} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Report Bug
          </button>
        </div>

        <div className="space-y-3">
          {bugs.map((bug, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <input
                  type="text"
                  value={bug.title}
                  onChange={(e) => {
                    const updated = [...bugs];
                    updated[index].title = e.target.value;
                    setBugs(updated);
                  }}
                  className="input flex-1 mr-3"
                  placeholder="Bug title"
                />
                <button
                  onClick={() => setBugs(bugs.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select
                  value={bug.severity}
                  onChange={(e) => {
                    const updated = [...bugs];
                    updated[index].severity = e.target.value;
                    setBugs(updated);
                  }}
                  className="input"
                >
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={bug.status}
                  onChange={(e) => {
                    const updated = [...bugs];
                    updated[index].status = e.target.value;
                    setBugs(updated);
                  }}
                  className="input"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <input
                  type="text"
                  value={bug.reportedBy}
                  onChange={(e) => {
                    const updated = [...bugs];
                    updated[index].reportedBy = e.target.value;
                    setBugs(updated);
                  }}
                  className="input"
                  placeholder="Reported by"
                />
              </div>
            </div>
          ))}
          {bugs.length === 0 && (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No bugs reported yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevelopmentStage;
