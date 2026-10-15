import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Layout, Plus, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchProject, updateProjectStage } from '../../store/slices/projectSlice';
import { addNotification } from '../../store/slices/uiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const WireframeStage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentProject, loading } = useAppSelector((state) => state.project);
  
  const [screens, setScreens] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProject?.stages.wireframe) {
      setScreens(currentProject.stages.wireframe.screens || []);
    }
  }, [currentProject]);

  const handleSave = async () => {
    await dispatch(updateProjectStage({
      projectId: id!,
      stageName: 'wireframe',
      stageData: { screens },
    }));
    dispatch(addNotification({ type: 'success', message: 'Wireframes saved!' }));
  };

  const addScreen = () => {
    setScreens([...screens, {
      name: '',
      type: 'low-fidelity',
      elements: [],
      notes: '',
    }]);
  };

  if (loading && !currentProject) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/projects/${id}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Layout className="w-8 h-8 text-pink-500" />
              Wireframing & Design
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create wireframes and high-fidelity mockups
            </p>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Screens</h2>
          <button onClick={addScreen} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Screen
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {screens.map((screen, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={screen.name}
                    onChange={(e) => {
                      const updated = [...screens];
                      updated[index].name = e.target.value;
                      setScreens(updated);
                    }}
                    className="input mb-2"
                    placeholder="Screen name"
                  />
                  <select
                    value={screen.type}
                    onChange={(e) => {
                      const updated = [...screens];
                      updated[index].type = e.target.value;
                      setScreens(updated);
                    }}
                    className="input"
                  >
                    <option value="low-fidelity">Low Fidelity</option>
                    <option value="high-fidelity">High Fidelity</option>
                  </select>
                </div>
                <button
                  onClick={() => setScreens(screens.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-3">
                <Layout className="w-12 h-12 text-gray-400" />
              </div>

              <textarea
                value={screen.notes}
                onChange={(e) => {
                  const updated = [...screens];
                  updated[index].notes = e.target.value;
                  setScreens(updated);
                }}
                className="input"
                rows={2}
                placeholder="Notes about this screen..."
              />
            </div>
          ))}
        </div>

        {screens.length === 0 && (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">
            No screens added yet. Start by adding your first wireframe.
          </p>
        )}
      </div>

      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 Wireframing Tips
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Start with low-fidelity sketches to focus on layout and flow</li>
          <li>• Progress to high-fidelity mockups with colors and branding</li>
          <li>• Consider mobile, tablet, and desktop views</li>
          <li>• Test your designs with potential users early</li>
        </ul>
      </div>
    </div>
  );
};

export default WireframeStage;
