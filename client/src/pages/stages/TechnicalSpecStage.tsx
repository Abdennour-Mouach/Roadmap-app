import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Plus, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchProject, updateProjectStage } from '../../store/slices/projectSlice';
import { addNotification } from '../../store/slices/uiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const TechnicalSpecStage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentProject, loading } = useAppSelector((state) => state.project);
  
  const [userStories, setUserStories] = useState<any[]>([]);
  const [functionalReqs, setFunctionalReqs] = useState<string[]>([]);
  const [nonFunctionalReqs, setNonFunctionalReqs] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProject?.stages.technicalSpec) {
      const stage = currentProject.stages.technicalSpec;
      setUserStories(stage.userStories || []);
      setFunctionalReqs(stage.functionalRequirements || []);
      setNonFunctionalReqs(stage.nonFunctionalRequirements || []);
    }
  }, [currentProject]);

  const handleSave = async () => {
    await dispatch(updateProjectStage({
      projectId: id!,
      stageName: 'technicalSpec',
      stageData: {
        userStories,
        functionalRequirements: functionalReqs.filter(r => r),
        nonFunctionalRequirements: nonFunctionalReqs.filter(r => r),
      },
    }));
    dispatch(addNotification({ type: 'success', message: 'Technical specifications saved!' }));
  };

  const addUserStory = () => {
    setUserStories([...userStories, {
      title: '',
      asA: '',
      iWant: '',
      soThat: '',
      acceptanceCriteria: [''],
      priority: 'medium',
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
              <FileText className="w-8 h-8 text-purple-500" />
              Technical Specifications
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Define user stories and technical requirements
            </p>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Stories</h2>
          <button onClick={addUserStory} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add User Story
          </button>
        </div>

        <div className="space-y-4">
          {userStories.map((story, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <input
                  type="text"
                  value={story.title}
                  onChange={(e) => {
                    const updated = [...userStories];
                    updated[index].title = e.target.value;
                    setUserStories(updated);
                  }}
                  className="input flex-1 mr-3"
                  placeholder="Story title"
                />
                <button
                  onClick={() => setUserStories(userStories.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={story.asA}
                  onChange={(e) => {
                    const updated = [...userStories];
                    updated[index].asA = e.target.value;
                    setUserStories(updated);
                  }}
                  className="input"
                  placeholder="As a..."
                />
                <input
                  type="text"
                  value={story.iWant}
                  onChange={(e) => {
                    const updated = [...userStories];
                    updated[index].iWant = e.target.value;
                    setUserStories(updated);
                  }}
                  className="input"
                  placeholder="I want..."
                />
                <input
                  type="text"
                  value={story.soThat}
                  onChange={(e) => {
                    const updated = [...userStories];
                    updated[index].soThat = e.target.value;
                    setUserStories(updated);
                  }}
                  className="input"
                  placeholder="So that..."
                />
                <select
                  value={story.priority}
                  onChange={(e) => {
                    const updated = [...userStories];
                    updated[index].priority = e.target.value;
                    setUserStories(updated);
                  }}
                  className="input"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
            </div>
          ))}
          {userStories.length === 0 && (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No user stories added yet.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Functional Requirements
          </h2>
          <button
            onClick={() => setFunctionalReqs([...functionalReqs, ''])}
            className="btn btn-secondary mb-3 w-full"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Requirement
          </button>
          <div className="space-y-2">
            {functionalReqs.map((req, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => {
                    const updated = [...functionalReqs];
                    updated[index] = e.target.value;
                    setFunctionalReqs(updated);
                  }}
                  className="input flex-1"
                  placeholder="Requirement"
                />
                <button
                  onClick={() => setFunctionalReqs(functionalReqs.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Non-Functional Requirements
          </h2>
          <button
            onClick={() => setNonFunctionalReqs([...nonFunctionalReqs, ''])}
            className="btn btn-secondary mb-3 w-full"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Requirement
          </button>
          <div className="space-y-2">
            {nonFunctionalReqs.map((req, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => {
                    const updated = [...nonFunctionalReqs];
                    updated[index] = e.target.value;
                    setNonFunctionalReqs(updated);
                  }}
                  className="input flex-1"
                  placeholder="Requirement"
                />
                <button
                  onClick={() => setNonFunctionalReqs(nonFunctionalReqs.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecStage;
