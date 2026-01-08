import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <nav className="flex items-center gap-4">
          <a href="/" className="text-sm text-indigo-600 hover:underline">Home</a>
          <a href="/" className="px-3 py-2 bg-red-500 text-white rounded-md text-sm">Sign out</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li>Opened repository <strong>example-repo</strong></li>
            <li>Pushed 3 commits to <strong>main</strong></li>
            <li>Created pull request <strong>#42</strong></li>
          </ul>
        </section>

        <aside className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Stats</h3>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs">Repositories</div>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <div className="text-2xl font-bold">5</div>
              <div className="text-xs">PRs</div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default Dashboard
