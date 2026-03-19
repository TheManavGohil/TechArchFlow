<script>
	const stack = [
		{ name: 'SvelteKit', role: 'Frontend', port: '5173' },
		{ name: 'Go', role: 'API Server', port: '3000' },
		{ name: 'Django', role: 'Admin Panel', port: '8000' },
		{ name: 'PostgreSQL', role: 'Database', port: '5432' }
	];

	const services = [
		{ label: 'Frontend', url: 'http://localhost:5173', note: 'SvelteKit + Tailwind' },
		{ label: 'API Health', url: 'http://localhost:3000/api/health', note: 'Health check endpoint' },
		{ label: 'API Items', url: 'http://localhost:3000/api/items', note: 'CRUD endpoint' },
		{ label: 'Django Admin', url: 'http://localhost:8000/admin', note: 'admin / admin123' }
	];
</script>

<div class="flex flex-col items-center text-center pt-12 pb-16">
	<p class="text-sm font-medium tracking-widest uppercase text-gray-400 mb-4">Full-Stack Starter</p>
	<h1 class="text-4xl font-bold tracking-tight">{{PROJECT_NAME}}</h1>
	<p class="mt-4 text-gray-500 max-w-md leading-relaxed">
		Your project is running. Edit the source and start building.
	</p>
	<div class="mt-8 flex gap-3">
		<a href="/items"
			class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors">
			Items Demo
		</a>
		<a href="http://localhost:8000/admin" target="_blank"
			class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
			Open Admin
		</a>
	</div>
</div>

<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
	{#each stack as tech}
		<div class="border border-gray-200 rounded-lg px-4 py-5 text-center hover:border-gray-400 transition-colors">
			<p class="text-sm font-semibold text-gray-900">{tech.name}</p>
			<p class="text-xs text-gray-400 mt-1">{tech.role}</p>
			<p class="text-xs font-mono text-gray-300 mt-2">:{tech.port}</p>
		</div>
	{/each}
</div>

<div class="border-t border-gray-100 pt-8">
	<h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Services</h2>
	<div class="divide-y divide-gray-100">
		{#each services as svc}
			<div class="flex items-center justify-between py-3 text-sm">
				<div class="flex items-center gap-4">
					<span class="font-medium text-gray-900 w-28">{svc.label}</span>
					<span class="text-gray-400 hidden sm:inline">{svc.note}</span>
				</div>
				<a href={svc.url} target="_blank" rel="noopener"
					class="font-mono text-xs text-gray-500 hover:text-gray-900 transition-colors">
					{svc.url.replace('http://', '')}
				</a>
			</div>
		{/each}
	</div>
</div>
