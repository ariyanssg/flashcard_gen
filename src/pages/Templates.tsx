import { useState } from 'react';

// Define templates array outside the component
const templateData = [
  {
    id: 1,
    name: 'Basic Template',
    description: 'A simple and clean flashcard design.',
    preview: 'https://via.placeholder.com/300x200?text=Basic+Template',
  },
  {
    id: 2,
    name: 'Modern Template',
    description: 'A sleek and modern flashcard layout.',
    preview: 'https://via.placeholder.com/300x200?text=Modern+Template',
  },
  {
    id: 3,
    name: 'Minimalist Template',
    description: 'A minimalist design for focused learning.',
    preview: 'https://via.placeholder.com/300x200?text=Minimalist+Template',
  },
];

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  // Add state for templates
  const [templates, setTemplates] = useState(templateData);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Templates</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Explore and customize flashcard templates to suit your needs.
      </p>

      {/* Template Grid */}
      {Array.isArray(templates) && templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {template.description}
              </p>
              <button
                onClick={() => handleSelectTemplate(template)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Select Template
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 mt-8">
          No templates available.
        </p>
      )}

      {/* Selected Template Preview */}
      {selectedTemplate && (
        <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Selected Template</h2>
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={selectedTemplate.preview}
              alt={selectedTemplate.name}
              className="w-full md:w-1/2 h-40 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h3 className="text-xl font-semibold">{selectedTemplate.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedTemplate.description}
              </p>
              <button
                onClick={() => alert(`Template "${selectedTemplate.name}" applied!`)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Apply Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}