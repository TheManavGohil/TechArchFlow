<script>
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-white text-gray-900">
	<nav class="border-b border-gray-200">
		<div class="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
			<a href="/" class="font-semibold tracking-tight text-base hover:opacity-70 transition-opacity">
				{{PROJECT_NAME}}
			</a>
			<div class="flex items-center gap-6 text-sm text-gray-500">
				<a href="/" class="hover:text-gray-900 transition-colors">Home</a>
				<a href="/items" class="hover:text-gray-900 transition-colors">Items</a>
				<a href="http://localhost:8000/admin" target="_blank" rel="noopener"
					class="hover:text-gray-900 transition-colors">Admin</a>
				<a href="http://localhost:3000/api/health" target="_blank" rel="noopener"
					class="hover:text-gray-900 transition-colors">API</a>
			</div>
		</div>
	</nav>

	<main class="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
		{@render children()}
	</main>

	<footer class="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
		TechArchFlow &mdash; Go · Django Admin · SvelteKit · PostgreSQL
	</footer>
</div>
