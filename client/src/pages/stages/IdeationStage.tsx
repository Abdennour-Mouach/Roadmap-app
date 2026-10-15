import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Trash2, Edit2, Save, ArrowLeft, Lightbulb } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchProject, updateProjectStage } from '../../store/slices/projectSlice';
import { addNotification } from '../../store/slices/uiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const IdeationStage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentProject, loading } = useAppSelector((state) => state.project);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIdea, setNewIdea] = useState({
    title: '',
    description: '',
    scores: { feasibility: 5, impact: 5, innovation: 5 },
    notes: [''],
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProject?.stages.ideation.ideas) {
      setIdeas(currentProject.stages.ideation.ideas);
    }
  }, [currentProject]);

  const handleAddIdea = async () => {
    if (!newIdea.title || !newIdea.description) {
      dispatch(addNotification({ type: 'error', message: 'Please fill in all required fields' }));
      return;
    }

    const updatedIdeas = [...ideas, { ...newIdea, createdAt: new Date() }];
    
    await dispatch(updateProjectStage({
      projectId: id!,
      stageName: 'ideation',
      stageData: { ideas: updatedIdeas },
    }));

    dispatch(addNotification({ type: 'success', message: 'Idea added successfully!' }));
    setShowAddModal(false);
    setNewIdea({
      title: '',
      description: '',
      scores: { feasibility: 5, impact: 5, innovation: 5 },
      notes: [''],
    });
  };

  const handleDeleteIdea = async (index: number) => {
    const updatedIdeas = ideas.filter((_, i) => i !== index);
    
    await dispatch(updateProjectStage({
      projectId: id!,
      stageName: 'ideation',
      stageData: { ideas: updatedIdeas },
    }));

    dispatch(addNotification({ type: 'success', message: 'Idea deleted successfully!' }));
  };

  const getAverageScore = (scores: any) => {
    return ((scores.feasibility + scores.impact + scores.innovation) / 3).toFixed(1);
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
              <Lightbulb className="w-8 h-8 text-yellow-500" />
              Ideation
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Brainstorm and evaluate your ideas
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Idea
        </button>
      </div>

      {/* Ideas Grid */}
      {ideas.length === 0 ? (
        <div className="card text-center py-12">
          <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No ideas yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start brainstorming by adding your first idea
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Your First Idea
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea, index) => (
            <div key={index} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex-1">
                  {idea.title}
                </h3>
                <button
                  onClick={() => handleDeleteIdea(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {idea.description}
              </p>

              {/* Scores */}
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Feasibility</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {idea.scores.feasibility}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${idea.scores.feasibility * 10}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Impact</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {idea.scores.impact}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${idea.scores.impact * 10}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Innovation</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {idea.scores.innovation}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${idea.scores.innovation * 10}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Average Score */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Average Score</span>
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {getAverageScore(idea.scores)}
                  </span>
                </div>
              </div>

              {/* Notes */}
              {idea.notes && idea.notes.length > 0 && idea.notes[0] && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Notes:</strong> {idea.notes[0]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Idea Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Add New Idea
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Idea Title *
                </label>
                <input
                  type="text"
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                  className="input"
                  placeholder="E.g., AI-powered task manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={newIdea.description}
                  onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                  className="input"
                  rows={4}
                  placeholder="Describe your idea in detail..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Feasibility (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newIdea.scores.feasibility}
                    onChange={(e) => setNewIdea({
                      ...newIdea,
                      scores: { ...newIdea.scores, feasibility: parseInt(e.target.value) }
                    })}
                    className="w-full"
                  />
                  <div className="text-center text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {newIdea.scores.feasibility}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Impact (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newIdea.scores.impact}
                    onChange={(e) => setNewIdea({
                      ...newIdea,
                      scores: { ...newIdea.scores, impact: parseInt(e.target.value) }
                    })}
                    className="w-full"
                  />
                  <div className="text-center text-2xl font-bold text-green-600 dark:text-green-400">
                    {newIdea.scores.impact}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Innovation (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newIdea.scores.innovation}
                    onChange={(e) => setNewIdea({
                      ...newIdea,
                      scores: { ...newIdea.scores, innovation: parseInt(e.target.value) }
                    })}
                    className="w-full"
                  />
                  <div className="text-center text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {newIdea.scores.innovation}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={newIdea.notes[0]}
                  onChange={(e) => setNewIdea({ ...newIdea, notes: [e.target.value] })}
                  className="input"
                  rows={2}
                  placeholder="Additional notes or thoughts..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddIdea}
                  className="flex-1 btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Idea'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeationStage;
