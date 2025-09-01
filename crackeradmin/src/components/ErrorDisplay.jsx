// components/ErrorDisplay.jsx
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorDisplay({ error }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center p-8 bg-white rounded-2xl shadow-2xl max-w-md w-full border border-red-100">
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-20"></div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{error}</p>
        
        <button
          onClick={() => window.location.reload()}
          className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
        >
          <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Try Again
        </button>
      </div>
    </div>
  );
}