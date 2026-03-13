<script>
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-base-200">
	<!-- Navbar -->
	<div class="navbar bg-base-100 shadow-lg">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost text-xl font-bold">
				🚀 {{PROJECT_NAME}}
			</a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li><a href="/">Home</a></li>
				<li><a href="/items">Items</a></li>
				<li>
					<a href="http://localhost:8000/admin" target="_blank" rel="noopener">
						Django Admin ↗
					</a>
				</li>
				<li>
					<a href="http://localhost:3000/api/health" target="_blank" rel="noopener">
						API Health ↗
					</a>
				</li>
			</ul>
		</div>
	</div>

	<!-- Page Content -->
	<main class="container mx-auto p-6">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
		<aside>
			<p>Built with ❤️ using <strong>TechArchFlow</strong> — Go · Django Admin · SvelteKit · PostgreSQL</p>
		</aside>
	</footer>
</div>
