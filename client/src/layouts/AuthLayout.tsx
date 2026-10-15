import React from 'react';
import { Outlet } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-secondary-600 p-12 flex-col justify-between">
        <div className="flex items-center gap-3 text-white">
          <Rocket className="w-10 h-10" />
          <h1 className="text-3xl font-bold">Roadmap App</h1>
        </div>
        
        <div className="text-white space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Transform Your Ideas Into Reality
          </h2>
          <p className="text-xl text-primary-100">
            A comprehensive platform for product development roadmapping, from ideation to deployment.
          </p>
          
          <div className="space-y-4 mt-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Structured Workflow</h3>
                <p className="text-sm text-primary-100">Follow a proven 12-stage process from idea to launch</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Real-time Collaboration</h3>
                <p className="text-sm text-primary-100">Work together with your team in real-time</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Comprehensive Tools</h3>
                <p className="text-sm text-primary-100">Everything you need from wireframing to deployment</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-primary-100 text-sm">
          © 2025 Roadmap App. All rights reserved.
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center justify-center gap-3">
            <Rocket className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Roadmap App</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
