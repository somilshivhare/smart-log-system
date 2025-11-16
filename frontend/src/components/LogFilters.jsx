/**
 * Log Filters Component
 * 
 * Provides filtering options for logs:
 * - Filter by level (info, warning, error, critical)
 * - Filter by source (search)
 * - Filter by category
 */

const LogFilters = ({ filters, onFilterChange }) => {
  const handleChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level
          </label>
          <select
            value={filters.level}
            onChange={(e) => handleChange('level', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Levels</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        {/* Source Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source
          </label>
          <input
            type="text"
            value={filters.source}
            onChange={(e) => handleChange('source', e.target.value)}
            placeholder="Search by source..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            <option value="system">System</option>
            <option value="security">Security</option>
            <option value="network">Network</option>
            <option value="application">Application</option>
            <option value="database">Database</option>
            <option value="iot">IoT</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(filters.level || filters.source || filters.category) && (
        <div className="mt-4">
          <button
            onClick={() => onFilterChange({ level: '', source: '', category: '' })}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default LogFilters;

