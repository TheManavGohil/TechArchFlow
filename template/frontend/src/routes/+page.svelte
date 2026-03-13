<script>
	const stack = [
		{
			name: 'Go API',
			icon: '⚡',
			description: 'Blazing fast HTTP server with net/http + GORM. Hot-reload via Air.',
			port: '3000',
			color: 'primary'
		},
		{
			name: 'Django Admin',
			icon: '🛠️',
			description: 'Best-in-class database management UI. Auto-generated admin panel.',
			port: '8000',
			color: 'secondary'
		},
		{
			name: 'SvelteKit',
			icon: '🎨',
			description: 'Compiler-first framework. No virtual DOM. Lightning fast.',
			port: '5173',
			color: 'accent'
		},
		{
			name: 'PostgreSQL',
			icon: '🐘',
			description: 'ACID compliant, battle-tested. JSONB, full-text search, CTEs.',
			port: '5432',
			color: 'info'
		}
	];
</script>

<div class="space-y-8">
	<!-- Hero Section -->
	<div class="hero bg-base-100 rounded-box shadow-xl">
		<div class="hero-content text-center py-12">
			<div class="max-w-2xl">
				<h1 class="text-5xl font-bold">🚀 {{PROJECT_NAME}}</h1>
				<p class="py-6 text-lg opacity-80">
					Your project is up and running! This starter was built with
					<strong>TechArchFlow</strong> — the most optimal full-stack combo,
					each technology chosen for maximum performance in its domain.
				</p>
				<div class="flex gap-3 justify-center flex-wrap">
					<a href="/items" class="btn btn-primary">View Items Demo →</a>
					<a href="http://localhost:8000/admin" target="_blank" class="btn btn-outline">
						Open Django Admin ↗
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Stack Cards -->
	<h2 class="text-2xl font-bold text-center">The Stack</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each stack as tech}
			<div class="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
				<div class="card-body">
					<h3 class="card-title">
						<span class="text-2xl">{tech.icon}</span>
						{tech.name}
					</h3>
					<p class="text-sm opacity-70">{tech.description}</p>
					<div class="card-actions justify-end mt-2">
						<div class="badge badge-{tech.color} badge-outline">:{tech.port}</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Quick Links -->
	<div class="card bg-base-100 shadow-md">
		<div class="card-body">
			<h3 class="card-title">🔗 Quick Links</h3>
			<div class="overflow-x-auto">
				<table class="table">
					<thead>
						<tr>
							<th>Service</th>
							<th>URL</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="font-semibold">Frontend</td>
							<td><a href="/" class="link link-primary">http://localhost:5173</a></td>
							<td>This page — SvelteKit + Tailwind + DaisyUI</td>
						</tr>
						<tr>
							<td class="font-semibold">API Health</td>
							<td><a href="http://localhost:3000/api/health" target="_blank" class="link link-primary">http://localhost:3000/api/health</a></td>
							<td>Go API health check endpoint</td>
						</tr>
						<tr>
							<td class="font-semibold">API Items</td>
							<td><a href="http://localhost:3000/api/items" target="_blank" class="link link-primary">http://localhost:3000/api/items</a></td>
							<td>Go API items CRUD endpoint</td>
						</tr>
						<tr>
							<td class="font-semibold">Django Admin</td>
							<td><a href="http://localhost:8000/admin" target="_blank" class="link link-primary">http://localhost:8000/admin</a></td>
							<td>Database management UI (admin / admin123)</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
