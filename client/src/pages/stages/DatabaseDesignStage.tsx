import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Database, Plus, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchProject, updateProjectStage } from '../../store/slices/projectSlice';
import { addNotification } from '../../store/slices/uiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const DatabaseDesignStage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentProject, loading } = useAppSelector((state) => state.project);
  
  const [entities, setEntities] = useState<any[]>([]);
  const [relationships, setRelationships] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProject?.stages.databaseDesign) {
      const stage = currentProject.stages.databaseDesign;
      setEntities(stage.entities || []);
      setRelationships(stage.relationships || []);
    }
  }, [currentProject]);

  const handleSave = async () => {
    await dispatch(updateProjectStage({
      projectId: id!,
      stageName: 'databaseDesign',
      stageData: { entities, relationships },
    }));
    dispatch(addNotification({ type: 'success', message: 'Database design saved!' }));
  };

  const addEntity = () => {
    setEntities([...entities, {
      name: '',
      attributes: [{ name: '', type: 'string', required: false, unique: false }],
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
              <Database className="w-8 h-8 text-indigo-500" />
              Database Design
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Design your database schema and relationships
            </p>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Entities</h2>
          <button onClick={addEntity} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Entity
          </button>
        </div>

        <div className="space-y-4">
          {entities.map((entity, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <input
                  type="text"
                  value={entity.name}
                  onChange={(e) => {
                    const updated = [...entities];
                    updated[index].name = e.target.value;
                    setEntities(updated);
                  }}
                  className="input flex-1 mr-3"
                  placeholder="Entity name (e.g., User, Product)"
                />
                <button
                  onClick={() => setEntities(entities.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Attributes
                </label>
                {entity.attributes.map((attr: any, attrIndex: number) => (
                  <div key={attrIndex} className="grid grid-cols-12 gap-2">
                    <input
                      type="text"
                      value={attr.name}
                      onChange={(e) => {
                        const updated = [...entities];
                        updated[index].attributes[attrIndex].name = e.target.value;
                        setEntities(updated);
                      }}
                      className="input col-span-4"
                      placeholder="Attribute name"
                    />
                    <select
                      value={attr.type}
                      onChange={(e) => {
                        const updated = [...entities];
                        updated[index].attributes[attrIndex].type = e.target.value;
                        setEntities(updated);
                      }}
                      className="input col-span-3"
                    >
                      <option value="string">String</option>
                      <option value="number">Number</option>
                      <option value="boolean">Boolean</option>
                      <option value="date">Date</option>
                      <option value="array">Array</option>
                      <option value="object">Object</option>
                    </select>
                    <label className="col-span-2 flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        checked={attr.required}
                        onChange={(e) => {
                          const updated = [...entities];
                          updated[index].attributes[attrIndex].required = e.target.checked;
                          setEntities(updated);
                        }}
                        className="rounded"
                      />
                      Required
                    </label>
                    <label className="col-span-2 flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        checked={attr.unique}
                        onChange={(e) => {
                          const updated = [...entities];
                          updated[index].attributes[attrIndex].unique = e.target.checked;
                          setEntities(updated);
                        }}
                        className="rounded"
                      />
                      Unique
                    </label>
                    <button
                      onClick={() => {
                        const updated = [...entities];
                        updated[index].attributes = updated[index].attributes.filter((_: any, i: number) => i !== attrIndex);
                        setEntities(updated);
                      }}
                      className="col-span-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const updated = [...entities];
                    updated[index].attributes.push({ name: '', type: 'string', required: false, unique: false });
                    setEntities(updated);
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  + Add Attribute
                </button>
              </div>
            </div>
          ))}
          {entities.length === 0 && (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No entities added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseDesignStage;
