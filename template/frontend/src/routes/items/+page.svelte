<script>
	let { data } = $props();

	let newItem = $state({ name: '', description: '', status: 'pending', priority: 0 });
	let isCreating = $state(false);
	let createError = $state('');

	async function createItem() {
		if (!newItem.name.trim()) {
			createError = 'Name is required';
			return;
		}

		isCreating = true;
		createError = '';

		try {
			const res = await fetch('http://localhost:3000/api/items', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newItem)
			});

			if (!res.ok) {
				const err = await res.json();
				createError = err.error || 'Failed to create item';
				return;
			}

			window.location.reload();
		} catch {
			createError = 'Could not connect to API';
		} finally {
			isCreating = false;
		}
	}

	async function deleteItem(id) {
		if (!confirm('Delete this item?')) return;

		try {
			const res = await fetch(`http://localhost:3000/api/items/${id}`, {
				method: 'DELETE'
			});

			if (res.ok) {
				window.location.reload();
			}
		} catch {
			alert('Failed to delete item');
		}
	}

	function statusLabel(status) {
		const styles = {
			pending: 'bg-gray-100 text-gray-600',
			active: 'bg-green-50 text-green-700',
			completed: 'bg-blue-50 text-blue-700',
			archived: 'bg-gray-50 text-gray-400'
		};
		return styles[status] || 'bg-gray-100 text-gray-600';
	}
</script>

<div>
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-2xl font-bold tracking-tight">Items</h1>
			<p class="text-sm text-gray-400 mt-1">Create, view, and delete items via the Go API.</p>
		</div>
		<a href="/" class="text-sm text-gray-400 hover:text-gray-900 transition-colors">&larr; Back</a>
	</div>

	<div class="border border-gray-200 rounded-lg p-6 mb-8">
		<h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">New Item</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
			<div>
				<label for="item-name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
				<input
					id="item-name"
					type="text"
					placeholder="Item name"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-300
					       focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
					bind:value={newItem.name}
				/>
			</div>
			<div>
				<label for="item-status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
				<select
					id="item-status"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white
					       focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
					bind:value={newItem.status}
				>
					<option value="pending">Pending</option>
					<option value="active">Active</option>
					<option value="completed">Completed</option>
					<option value="archived">Archived</option>
				</select>
			</div>
			<div class="md:col-span-2">
				<label for="item-desc" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
				<textarea
					id="item-desc"
					placeholder="Optional description"
					rows="2"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-300
					       focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
					bind:value={newItem.description}
				></textarea>
			</div>
			<div>
				<label for="item-priority" class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
				<input
					id="item-priority"
					type="number"
					placeholder="0"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-300
					       focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
					bind:value={newItem.priority}
				/>
			</div>
		</div>

		{#if createError}
			<p class="mt-3 text-sm text-red-600">{createError}</p>
		{/if}

		<div class="mt-5 flex justify-end">
			<button
				onclick={createItem}
				disabled={isCreating}
				class="px-4 py-2 text-sm font-medium rounded-md bg-gray-900 text-white
				       hover:bg-gray-800 disabled:opacity-40 transition-colors"
			>
				{isCreating ? 'Creating...' : 'Create Item'}
			</button>
		</div>
	</div>

	{#if data.error}
		<div class="border border-amber-200 bg-amber-50 rounded-lg px-4 py-3 mb-6 text-sm text-amber-800">
			{data.error}
		</div>
	{/if}

	{#if data.items.length > 0}
		<div class="border border-gray-200 rounded-lg overflow-hidden">
			<table class="w-full text-sm">
				<thead>
					<tr class="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
						<th class="px-4 py-3">ID</th>
						<th class="px-4 py-3">Name</th>
						<th class="px-4 py-3 hidden md:table-cell">Description</th>
						<th class="px-4 py-3">Status</th>
						<th class="px-4 py-3 hidden sm:table-cell">Priority</th>
						<th class="px-4 py-3 hidden sm:table-cell">Created</th>
						<th class="px-4 py-3"></th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					{#each data.items as item}
						<tr class="hover:bg-gray-50 transition-colors">
							<td class="px-4 py-3 font-mono text-xs text-gray-400">{item.ID}</td>
							<td class="px-4 py-3 font-medium text-gray-900">{item.name}</td>
							<td class="px-4 py-3 text-gray-500 max-w-xs truncate hidden md:table-cell">
								{item.description || '\u2014'}
							</td>
							<td class="px-4 py-3">
								<span class="inline-block px-2 py-0.5 rounded text-xs font-medium {statusLabel(item.status)}">
									{item.status}
								</span>
							</td>
							<td class="px-4 py-3 text-gray-500 hidden sm:table-cell">{item.priority}</td>
							<td class="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">
								{new Date(item.CreatedAt).toLocaleDateString()}
							</td>
							<td class="px-4 py-3 text-right">
								<button
									onclick={() => deleteItem(item.ID)}
									class="text-xs text-gray-400 hover:text-red-600 transition-colors"
								>
									Delete
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="text-xs text-gray-400 mt-3">{data.items.length} item{data.items.length === 1 ? '' : 's'}</p>
	{:else if !data.error}
		<div class="text-center py-16 text-gray-400 text-sm">
			No items yet. Create one above to get started.
		</div>
	{/if}
</div>
