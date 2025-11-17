'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Rights Institute API Documentation</h1>
          <p className="text-blue-100">
            Interactive API documentation powered by OpenAPI 3.0 and Swagger UI
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SwaggerUI url="/openapi.json" />
      </div>
    </div>
  );
}
