import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft, AlertCircle, Users, Target } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchProject, updateProjectStage } from '../../store/slices/projectSlice';
import { addNotification } from '../../store/slices/uiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProblemDefinitionStage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentProject, loading } = useAppSelector((state) => state.project);
  
  const [problemStatement, setProblemStatement] = useState('');
  const [personas, setPersonas] = useState<any[]>([]);
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [objectives, setObjectives] = useState<any[]>([]);
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [newPersona, setNewPersona] = useState({
    name: '',
    age: '',
    occupation: '',
    goals: [''],
    frustrations: [''],
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProject?.stages.problemDefinition) {
      const stage = currentProject.stages.problemDefinition;
      setProblemStatement(stage.problemStatement || '');
      setPersonas(stage.personas || []);
      setPainPoints(stage.painPoints || []);
      setObjectives(stage.objectives || []);
    }
  }, [currentProject]);

  const handleSave = async () => {
    await dispatch(updateProjectStage({
      projectId: id!,
      stageName: 'problemDefinition',
      stageData: {
        problemStatement,
        personas,
        painPoints,
        objectives,
      },
    }));
    dispatch(addNotification({ type: 'success', message: 'Problem definition saved!' }));
  };

  const handleAddPersona = () => {
    if (!newPersona.name) {
      dispatch(addNotification({ type: 'error', message: 'Persona name is required' }));
      return;
    }

    setPersonas([...personas, {
      ...newPersona,
      age: newPersona.age ? parseInt(newPersona.age) : undefined,
      goals: newPersona.goals.filter(g => g),
      frustrations: newPersona.frustrations.filter(f => f),
    }]);
    setShowPersonaModal(false);
    setNewPersona({
      name: '',
      age: '',
      occupation: '',
      goals: [''],
      frustrations: [''],
    });
  };

  const addPainPoint = () => {
    setPainPoints([...painPoints, '']);
  };

  const updatePainPoint = (index: number, value: string) => {
    const updated = [...painPoints];
    updated[index] = value;
    setPainPoints(updated);
  };

  const removePainPoint = (index: number) => {
    setPainPoints(painPoints.filter((_, i) => i !== index));
  };

  const addObjective = () => {
    setObjectives([...objectives, { description: '', metric: '', target: '' }]);
  };

  const updateObjective = (index: number, field: string, value: string) => {
    const updated = [...objectives];
    updated[index] = { ...updated[index], [field]: value };
    setObjectives(updated);
  };

  const removeObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
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
              <AlertCircle className="w-8 h-8 text-red-500" />
              Problem Definition
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Define the problem you're solving
            </p>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Problem Statement */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Problem Statement
        </h2>
        <textarea
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          className="input"
          rows={6}
          placeholder="Clearly describe the problem you're trying to solve. What pain points exist? Who is affected?"
        />
      </div>

      {/* Personas */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6" />
            User Personas
          </h2>
          <button
            onClick={() => setShowPersonaModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Persona
          </button>
        </div>

        {personas.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No personas yet. Add your first user persona.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personas.map((persona, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <button
                    onClick={() => setPersonas(personas.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {persona.name}
                </h3>
                {persona.age && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">Age: {persona.age}</p>
                )}
                {persona.occupation && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{persona.occupation}</p>
                )}
                {persona.goals.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Goals:</p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc list-inside">
                      {persona.goals.map((goal: string, i: number) => (
                        <li key={i}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pain Points */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Pain Points
          </h2>
          <button onClick={addPainPoint} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Pain Point
          </button>
        </div>

        <div className="space-y-3">
          {painPoints.map((point, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={point}
                onChange={(e) => updatePainPoint(index, e.target.value)}
                className="input flex-1"
                placeholder="Describe a pain point..."
              />
              <button
                onClick={() => removePainPoint(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          {painPoints.length === 0 && (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No pain points added yet.
            </p>
          )}
        </div>
      </div>

      {/* Objectives */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Target className="w-6 h-6" />
            Measurable Objectives
          </h2>
          <button onClick={addObjective} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Objective
          </button>
        </div>

        <div className="space-y-4">
          {objectives.map((obj, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">Objective {index + 1}</h3>
                <button
                  onClick={() => removeObjective(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={obj.description}
                  onChange={(e) => updateObjective(index, 'description', e.target.value)}
                  className="input"
                  placeholder="Description"
                />
                <input
                  type="text"
                  value={obj.metric}
                  onChange={(e) => updateObjective(index, 'metric', e.target.value)}
                  className="input"
                  placeholder="Metric (e.g., Users)"
                />
                <input
                  type="text"
                  value={obj.target}
                  onChange={(e) => updateObjective(index, 'target', e.target.value)}
                  className="input"
                  placeholder="Target (e.g., 1000)"
                />
              </div>
            </div>
          ))}
          {objectives.length === 0 && (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No objectives added yet.
            </p>
          )}
        </div>
      </div>

      {/* Persona Modal */}
      {showPersonaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Add User Persona
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={newPersona.name}
                    onChange={(e) => setNewPersona({ ...newPersona, name: e.target.value })}
                    className="input"
                    placeholder="E.g., Sarah Johnson"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={newPersona.age}
                    onChange={(e) => setNewPersona({ ...newPersona, age: e.target.value })}
                    className="input"
                    placeholder="E.g., 32"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Occupation
                </label>
                <input
                  type="text"
                  value={newPersona.occupation}
                  onChange={(e) => setNewPersona({ ...newPersona, occupation: e.target.value })}
                  className="input"
                  placeholder="E.g., Product Manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Goals
                </label>
                {newPersona.goals.map((goal, index) => (
                  <input
                    key={index}
                    type="text"
                    value={goal}
                    onChange={(e) => {
                      const updated = [...newPersona.goals];
                      updated[index] = e.target.value;
                      setNewPersona({ ...newPersona, goals: updated });
                    }}
                    className="input mb-2"
                    placeholder="E.g., Increase productivity"
                  />
                ))}
                <button
                  onClick={() => setNewPersona({ ...newPersona, goals: [...newPersona.goals, ''] })}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  + Add Goal
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frustrations
                </label>
                {newPersona.frustrations.map((frustration, index) => (
                  <input
                    key={index}
                    type="text"
                    value={frustration}
                    onChange={(e) => {
                      const updated = [...newPersona.frustrations];
                      updated[index] = e.target.value;
                      setNewPersona({ ...newPersona, frustrations: updated });
                    }}
                    className="input mb-2"
                    placeholder="E.g., Too many tools to manage"
                  />
                ))}
                <button
                  onClick={() => setNewPersona({ ...newPersona, frustrations: [...newPersona.frustrations, ''] })}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  + Add Frustration
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowPersonaModal(false)}
                  className="flex-1 btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPersona}
                  className="flex-1 btn btn-primary"
                >
                  Add Persona
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemDefinitionStage;
