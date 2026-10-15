import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, Server, Upload } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchProject, updateProjectStage } from '../../store/slices/projectSlice';
import { addNotification } from '../../store/slices/uiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const DomainHostingStage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentProject, loading } = useAppSelector((state) => state.project);
  
  const [domain, setDomain] = useState({
    name: '',
    provider: '',
    registrationDate: '',
    expiryDate: '',
    status: 'available',
  });
  const [hosting, setHosting] = useState({
    provider: '',
    plan: '',
    server: '',
    deploymentUrl: '',
    status: 'not-configured',
  });
  const [deployment, setDeployment] = useState({
    platform: '',
    lastDeployment: '',
    version: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProject?.stages.domainHosting) {
      const stage = currentProject.stages.domainHosting;
      setDomain({
        ...stage.domain,
        registrationDate: stage.domain.registrationDate ? new Date(stage.domain.registrationDate).toISOString().split('T')[0] : '',
        expiryDate: stage.domain.expiryDate ? new Date(stage.domain.expiryDate).toISOString().split('T')[0] : '',
      });
      setHosting(stage.hosting || { provider: '', plan: '', server: '', deploymentUrl: '', status: 'not-configured' });
      setDeployment({
        ...stage.deployment,
        lastDeployment: stage.deployment?.lastDeployment ? new Date(stage.deployment.lastDeployment).toISOString().split('T')[0] : '',
      });
    }
  }, [currentProject]);

  const handleSave = async () => {
    await dispatch(updateProjectStage({
      projectId: id!,
      stageName: 'domainHosting',
      stageData: {
        domain: {
          ...domain,
          registrationDate: domain.registrationDate ? new Date(domain.registrationDate) : undefined,
          expiryDate: domain.expiryDate ? new Date(domain.expiryDate) : undefined,
        },
        hosting,
        deployment: {
          ...deployment,
          lastDeployment: deployment.lastDeployment ? new Date(deployment.lastDeployment) : undefined,
        },
      },
    }));
    dispatch(addNotification({ type: 'success', message: 'Domain & hosting configuration saved!' }));
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
              <Globe className="w-8 h-8 text-cyan-500" />
              Domain & Hosting
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Configure your domain and hosting setup
            </p>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Domain Configuration */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="w-6 h-6" />
          Domain Configuration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Domain Name
            </label>
            <input
              type="text"
              value={domain.name}
              onChange={(e) => setDomain({ ...domain, name: e.target.value })}
              className="input"
              placeholder="example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Domain Provider
            </label>
            <input
              type="text"
              value={domain.provider}
              onChange={(e) => setDomain({ ...domain, provider: e.target.value })}
              className="input"
              placeholder="E.g., GoDaddy, Namecheap"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Registration Date
            </label>
            <input
              type="date"
              value={domain.registrationDate}
              onChange={(e) => setDomain({ ...domain, registrationDate: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              value={domain.expiryDate}
              onChange={(e) => setDomain({ ...domain, expiryDate: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={domain.status}
              onChange={(e) => setDomain({ ...domain, status: e.target.value })}
              className="input"
            >
              <option value="available">Available</option>
              <option value="registered">Registered</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hosting Configuration */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Server className="w-6 h-6" />
          Hosting Configuration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hosting Provider
            </label>
            <input
              type="text"
              value={hosting.provider}
              onChange={(e) => setHosting({ ...hosting, provider: e.target.value })}
              className="input"
              placeholder="E.g., AWS, Vercel, Netlify"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hosting Plan
            </label>
            <input
              type="text"
              value={hosting.plan}
              onChange={(e) => setHosting({ ...hosting, plan: e.target.value })}
              className="input"
              placeholder="E.g., Pro, Business"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Server Details
            </label>
            <input
              type="text"
              value={hosting.server}
              onChange={(e) => setHosting({ ...hosting, server: e.target.value })}
              className="input"
              placeholder="E.g., us-east-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deployment URL
            </label>
            <input
              type="text"
              value={hosting.deploymentUrl}
              onChange={(e) => setHosting({ ...hosting, deploymentUrl: e.target.value })}
              className="input"
              placeholder="https://your-app.vercel.app"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={hosting.status}
              onChange={(e) => setHosting({ ...hosting, status: e.target.value })}
              className="input"
            >
              <option value="not-configured">Not Configured</option>
              <option value="configured">Configured</option>
              <option value="deployed">Deployed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deployment Information */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Upload className="w-6 h-6" />
          Deployment Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deployment Platform
            </label>
            <input
              type="text"
              value={deployment.platform}
              onChange={(e) => setDeployment({ ...deployment, platform: e.target.value })}
              className="input"
              placeholder="E.g., Vercel, Netlify, Docker"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Deployment
            </label>
            <input
              type="date"
              value={deployment.lastDeployment}
              onChange={(e) => setDeployment({ ...deployment, lastDeployment: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Version
            </label>
            <input
              type="text"
              value={deployment.version}
              onChange={(e) => setDeployment({ ...deployment, version: e.target.value })}
              className="input"
              placeholder="E.g., v1.0.0"
            />
          </div>
        </div>
      </div>

      {/* Deployment Guide */}
      <div className="card bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800">
        <h3 className="text-lg font-semibold text-cyan-900 dark:text-cyan-100 mb-3">
          🚀 Deployment Guide
        </h3>
        <div className="space-y-3 text-sm text-cyan-800 dark:text-cyan-200">
          <div>
            <h4 className="font-semibold mb-1">Popular Hosting Options:</h4>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Vercel:</strong> Best for Next.js and React apps (free tier available)</li>
              <li><strong>Netlify:</strong> Great for static sites and JAMstack (free tier available)</li>
              <li><strong>AWS:</strong> Scalable cloud infrastructure (pay-as-you-go)</li>
              <li><strong>Heroku:</strong> Easy deployment for full-stack apps (free tier available)</li>
              <li><strong>DigitalOcean:</strong> VPS hosting with good pricing</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-1">Domain Providers:</h4>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Namecheap:</strong> Affordable domains with free privacy protection</li>
              <li><strong>GoDaddy:</strong> Popular registrar with many TLD options</li>
              <li><strong>Google Domains:</strong> Simple interface, integrated with Google services</li>
              <li><strong>Cloudflare:</strong> Domain + CDN + security features</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">Deployment Checklist:</h4>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Configure environment variables</li>
              <li>Set up SSL certificate (HTTPS)</li>
              <li>Configure DNS records</li>
              <li>Set up monitoring and analytics</li>
              <li>Configure backup strategy</li>
              <li>Test in production environment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      {hosting.deploymentUrl && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Quick Access
          </h3>
          <a
            href={hosting.deploymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Globe className="w-5 h-5" />
            Visit Deployed Site
          </a>
        </div>
      )}
    </div>
  );
};

export default DomainHostingStage;
