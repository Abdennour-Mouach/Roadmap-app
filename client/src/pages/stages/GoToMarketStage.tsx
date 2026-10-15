import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Rocket, Plus, Trash2, CheckSquare } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchProject, updateProjectStage } from '../../store/slices/projectSlice';
import { addNotification } from '../../store/slices/uiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const GoToMarketStage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentProject, loading } = useAppSelector((state) => state.project);
  
  const [launchDate, setLaunchDate] = useState('');
  const [marketingStrategy, setMarketingStrategy] = useState({
    channels: [''],
    budget: '',
    campaigns: [] as any[],
  });
  const [successMetrics, setSuccessMetrics] = useState<any[]>([]);
  const [launchChecklist, setLaunchChecklist] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProject?.stages.goToMarket) {
      const stage = currentProject.stages.goToMarket;
      setLaunchDate(stage.launchDate ? new Date(stage.launchDate).toISOString().split('T')[0] : '');
      setMarketingStrategy(stage.marketingStrategy || { channels: [''], budget: '', campaigns: [] });
      setSuccessMetrics(stage.successMetrics || []);
      setLaunchChecklist(stage.launchChecklist || []);
    }
  }, [currentProject]);

  const handleSave = async () => {
    await dispatch(updateProjectStage({
      projectId: id!,
      stageName: 'goToMarket',
      stageData: {
        launchDate: launchDate ? new Date(launchDate) : undefined,
        marketingStrategy: {
          ...marketingStrategy,
          channels: marketingStrategy.channels.filter(c => c),
        },
        successMetrics,
        launchChecklist,
      },
    }));
    dispatch(addNotification({ type: 'success', message: 'Go-to-market plan saved!' }));
  };

  const addMetric = () => {
    setSuccessMetrics([...successMetrics, { name: '', target: '', current: '' }]);
  };

  const addChecklistItem = () => {
    setLaunchChecklist([...launchChecklist, { item: '', completed: false, assignee: '' }]);
  };

  if (loading && !currentProject) {
    return <LoadingSpinner fullScreen />;
  }

  const completedItems = launchChecklist.filter(item => item.completed).length;
  const progress = launchChecklist.length > 0 ? (completedItems / launchChecklist.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/projects/${id}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Rocket className="w-8 h-8 text-teal-500" />
              Go to Market
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Plan your product launch and marketing strategy
            </p>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Launch Date */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Launch Date</h2>
        <input
          type="date"
          value={launchDate}
          onChange={(e) => setLaunchDate(e.target.value)}
          className="input max-w-md"
        />
      </div>

      {/* Marketing Strategy */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Marketing Strategy</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Marketing Channels
            </label>
            {marketingStrategy.channels.map((channel, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={channel}
                  onChange={(e) => {
                    const updated = { ...marketingStrategy };
                    updated.channels[index] = e.target.value;
                    setMarketingStrategy(updated);
                  }}
                  className="input flex-1"
                  placeholder="E.g., Social Media, Email, SEO"
                />
                {marketingStrategy.channels.length > 1 && (
                  <button
                    onClick={() => {
                      const updated = { ...marketingStrategy };
                      updated.channels = updated.channels.filter((_, i) => i !== index);
                      setMarketingStrategy(updated);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                const updated = { ...marketingStrategy };
                updated.channels.push('');
                setMarketingStrategy(updated);
              }}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              + Add Channel
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Marketing Budget
            </label>
            <input
              type="text"
              value={marketingStrategy.budget}
              onChange={(e) => setMarketingStrategy({ ...marketingStrategy, budget: e.target.value })}
              className="input max-w-md"
              placeholder="E.g., $50,000"
            />
          </div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Success Metrics</h2>
          <button onClick={addMetric} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Metric
          </button>
        </div>

        <div className="space-y-3">
          {successMetrics.map((metric, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={metric.name}
                  onChange={(e) => {
                    const updated = [...successMetrics];
                    updated[index].name = e.target.value;
                    setSuccessMetrics(updated);
                  }}
                  className="input"
                  placeholder="Metric name"
                />
                <input
                  type="text"
                  value={metric.target}
                  onChange={(e) => {
                    const updated = [...successMetrics];
                    updated[index].target = e.target.value;
                    setSuccessMetrics(updated);
                  }}
                  className="input"
                  placeholder="Target"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={metric.current}
                    onChange={(e) => {
                      const updated = [...successMetrics];
                      updated[index].current = e.target.value;
                      setSuccessMetrics(updated);
                    }}
                    className="input flex-1"
                    placeholder="Current"
                  />
                  <button
                    onClick={() => setSuccessMetrics(successMetrics.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {successMetrics.length === 0 && (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No metrics added yet.
            </p>
          )}
        </div>
      </div>

      {/* Launch Checklist */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Launch Checklist</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {completedItems} of {launchChecklist.length} completed ({Math.round(progress)}%)
            </p>
          </div>
          <button onClick={addChecklistItem} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Item
          </button>
        </div>

        {launchChecklist.length > 0 && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          {launchChecklist.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={(e) => {
                  const updated = [...launchChecklist];
                  updated[index].completed = e.target.checked;
                  setLaunchChecklist(updated);
                }}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-5 h-5"
              />
              <input
                type="text"
                value={item.item}
                onChange={(e) => {
                  const updated = [...launchChecklist];
                  updated[index].item = e.target.value;
                  setLaunchChecklist(updated);
                }}
                className={`input flex-1 ${item.completed ? 'line-through text-gray-500' : ''}`}
                placeholder="Checklist item"
              />
              <input
                type="text"
                value={item.assignee}
                onChange={(e) => {
                  const updated = [...launchChecklist];
                  updated[index].assignee = e.target.value;
                  setLaunchChecklist(updated);
                }}
                className="input w-40"
                placeholder="Assignee"
              />
              <button
                onClick={() => setLaunchChecklist(launchChecklist.filter((_, i) => i !== index))}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          {launchChecklist.length === 0 && (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No checklist items added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoToMarketStage;
