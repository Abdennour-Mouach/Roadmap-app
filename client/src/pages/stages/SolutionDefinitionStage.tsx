import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchProject, updateProjectStage } from '../../store/slices/projectSlice';
import { addNotification } from '../../store/slices/uiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const SolutionDefinitionStage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentProject, loading } = useAppSelector((state) => state.project);
  
  const [solutionOverview, setSolutionOverview] = useState('');
  const [keyFeatures, setKeyFeatures] = useState<any[]>([]);
  const [alternatives, setAlternatives] = useState<any[]>([]);
  const [mvp, setMvp] = useState({ features: [''], timeline: '', resources: [''] });

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProject?.stages.solutionDefinition) {
      const stage = currentProject.stages.solutionDefinition;
      setSolutionOverview(stage.solutionOverview || '');
      setKeyFeatures(stage.keyFeatures || []);
      setAlternatives(stage.alternatives || []);
      setMvp(stage.mvp || { features: [''], timeline: '', resources: [''] });
    }
  }, [currentProject]);

  const handleSave = async () => {
    await dispatch(updateProjectStage({
      projectId: id!,
      stageName: 'solutionDefinition',
      stageData: {
        solutionOverview,
        keyFeatures,
        alternatives,
        mvp: {
          ...mvp,
          features: mvp.features.filter(f => f),
          resources: mvp.resources.filter(r => r),
        },
      },
    }));
    dispatch(addNotification({ type: 'success', message: 'Solution definition saved!' }));
  };

  const addFeature = () => {
    setKeyFeatures([...keyFeatures, {
      name: '',
      description: '',
      priority: 'medium',
      status: 'planned',
    }]);
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const updated = [...keyFeatures];
    updated[index] = { ...updated[index], [field]: value };
    setKeyFeatures(updated);
  };

  const removeFeature = (index: number) => {
    setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  };

  const addAlternative = () => {
    setAlternatives([...alternatives, {
      name: '',
      pros: [''],
      cons: [''],
      selected: false,
    }]);
  };

  const updateAlternative = (index: number, field: string, value: any) => {
    const updated = [...alternatives];
    updated[index] = { ...updated[index], [field]: value };
    setAlternatives(updated);
  };

  const removeAlternative = (index: number) => {
    setAlternatives(alternatives.filter((_, i) => i !== index));
  };

  if (loading && !currentProject) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/projects/${id}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              Solution Definition
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Define your solution and MVP
            </p>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Solution Overview */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Solution Overview
        </h2>
        <textarea
          value={solutionOverview}
          onChange={(e) => setSolutionOverview(e.target.value)}
          className="input"
          rows={6}
          placeholder="Describe your proposed solution in detail. How does it solve the problem?"
        />
      </div>

      {/* Key Features */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Key Features
          </h2>
          <button onClick={addFeature} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Feature
          </button>
        </div>

        <div className="space-y-4">
          {keyFeatures.map((feature, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">Feature {index + 1}</h3>
                <button
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={feature.name}
                  onChange={(e) => updateFeature(index, 'name', e.target.value)}
                  className="input"
                  placeholder="Feature name"
                />
                <textarea
                  value={feature.description}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  className="input"
                  rows={2}
                  placeholder="Feature description"
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={feature.priority}
                    onChange={(e) => updateFeature(index, 'priority', e.target.value)}
                    className="input"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                  <select
                    value={feature.status}
                    onChange={(e) => updateFeature(index, 'status', e.target.value)}
                    className="input"
                  >
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          {keyFeatures.length === 0 && (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No features added yet.
            </p>
          )}
        </div>
      </div>

      {/* Alternatives Considered */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Alternatives Considered
          </h2>
          <button onClick={addAlternative} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Alternative
          </button>
        </div>

        <div className="space-y-4">
          {alternatives.map((alt, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <input
                  type="text"
                  value={alt.name}
                  onChange={(e) => updateAlternative(index, 'name', e.target.value)}
                  className="input flex-1 mr-3"
                  placeholder="Alternative name"
                />
                <button
                  onClick={() => removeAlternative(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pros
                  </label>
                  {alt.pros.map((pro: string, proIndex: number) => (
                    <input
                      key={proIndex}
                      type="text"
                      value={pro}
                      onChange={(e) => {
                        const updated = [...alt.pros];
                        updated[proIndex] = e.target.value;
                        updateAlternative(index, 'pros', updated);
                      }}
                      className="input mb-2"
                      placeholder="Pro"
                    />
                  ))}
                  <button
                    onClick={() => updateAlternative(index, 'pros', [...alt.pros, ''])}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    + Add Pro
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cons
                  </label>
                  {alt.cons.map((con: string, conIndex: number) => (
                    <input
                      key={conIndex}
                      type="text"
                      value={con}
                      onChange={(e) => {
                        const updated = [...alt.cons];
                        updated[conIndex] = e.target.value;
                        updateAlternative(index, 'cons', updated);
                      }}
                      className="input mb-2"
                      placeholder="Con"
                    />
                  ))}
                  <button
                    onClick={() => updateAlternative(index, 'cons', [...alt.cons, ''])}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    + Add Con
                  </button>
                </div>
              </div>
              <label className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={alt.selected}
                  onChange={(e) => updateAlternative(index, 'selected', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Selected Alternative</span>
              </label>
            </div>
          ))}
          {alternatives.length === 0 && (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No alternatives added yet.
            </p>
          )}
        </div>
      </div>

      {/* MVP Planner */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          MVP (Minimum Viable Product) Planner
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              MVP Features
            </label>
            {mvp.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const updated = [...mvp.features];
                    updated[index] = e.target.value;
                    setMvp({ ...mvp, features: updated });
                  }}
                  className="input flex-1"
                  placeholder="MVP feature"
                />
                {mvp.features.length > 1 && (
                  <button
                    onClick={() => {
                      setMvp({ ...mvp, features: mvp.features.filter((_, i) => i !== index) });
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setMvp({ ...mvp, features: [...mvp.features, ''] })}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              + Add Feature
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Timeline
            </label>
            <input
              type="text"
              value={mvp.timeline}
              onChange={(e) => setMvp({ ...mvp, timeline: e.target.value })}
              className="input"
              placeholder="E.g., 3 months"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Resources Needed
            </label>
            {mvp.resources.map((resource, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={resource}
                  onChange={(e) => {
                    const updated = [...mvp.resources];
                    updated[index] = e.target.value;
                    setMvp({ ...mvp, resources: updated });
                  }}
                  className="input flex-1"
                  placeholder="Resource"
                />
                {mvp.resources.length > 1 && (
                  <button
                    onClick={() => {
                      setMvp({ ...mvp, resources: mvp.resources.filter((_, i) => i !== index) });
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setMvp({ ...mvp, resources: [...mvp.resources, ''] })}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              + Add Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDefinitionStage;
