import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Target, TrendingUp } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchProject, updateProjectStage } from '../../store/slices/projectSlice';
import { addNotification } from '../../store/slices/uiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const AudienceMarketStage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentProject, loading } = useAppSelector((state) => state.project);
  
  const [marketSize, setMarketSize] = useState({ tam: '', sam: '', som: '' });
  const [segments, setSegments] = useState<any[]>([]);
  const [competitors, setCompetitors] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProject?.stages.audienceMarket) {
      const stage = currentProject.stages.audienceMarket;
      setMarketSize(stage.marketSize || { tam: '', sam: '', som: '' });
      setSegments(stage.segments || []);
      setCompetitors(stage.competitors || []);
    }
  }, [currentProject]);

  const handleSave = async () => {
    await dispatch(updateProjectStage({
      projectId: id!,
      stageName: 'audienceMarket',
      stageData: { marketSize, segments, competitors },
    }));
    dispatch(addNotification({ type: 'success', message: 'Market analysis saved!' }));
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
              <Target className="w-8 h-8 text-blue-500" />
              Audience & Market Analysis
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Define your target market and analyze competition
            </p>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Market Size
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              TAM (Total Addressable Market)
            </label>
            <input
              type="text"
              value={marketSize.tam}
              onChange={(e) => setMarketSize({ ...marketSize, tam: e.target.value })}
              className="input"
              placeholder="E.g., $10B"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              SAM (Serviceable Addressable Market)
            </label>
            <input
              type="text"
              value={marketSize.sam}
              onChange={(e) => setMarketSize({ ...marketSize, sam: e.target.value })}
              className="input"
              placeholder="E.g., $2B"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              SOM (Serviceable Obtainable Market)
            </label>
            <input
              type="text"
              value={marketSize.som}
              onChange={(e) => setMarketSize({ ...marketSize, som: e.target.value })}
              className="input"
              placeholder="E.g., $100M"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <p className="text-gray-600 dark:text-gray-400">
          Market segments and competitor analysis features coming soon...
        </p>
      </div>
    </div>
  );
};

export default AudienceMarketStage;
