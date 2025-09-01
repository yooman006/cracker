// components/ErrorDisplay.jsx
import { Package } from 'lucide-react';

export default function ErrorDisplay({ error }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <Package className="mx-auto h-16 w-16 text-red-500" />
        <h3 className="mt-4 text-xl font-medium text-gray-900">Loading orders</h3>
        <p className="mt-2 text-sm text-gray-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    </div>
  );
}