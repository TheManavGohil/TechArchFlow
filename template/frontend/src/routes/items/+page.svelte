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

			// Refresh the page to get updated data
			window.location.reload();
		} catch {
			createError = 'Could not connect to API';
		} finally {
			isCreating = false;
		}
	}

	async function deleteItem(id) {
		if (!confirm('Are you sure you want to delete this item?')) return;

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

	const statusBadge = (status) => {
		const map = {
			pending: 'badge-warning',
			active: 'badge-success',
			completed: 'badge-info',
			archived: 'badge-ghost'
		};
		return map[status] || 'badge-neutral';
	};
</script>

<div class="space-y-6">
	<h1 class="text-3xl font-bold">📦 Items</h1>

	<!-- Create Item Form -->
	<div class="card bg-base-100 shadow-md">
		<div class="card-body">
			<h2 class="card-title text-lg">Create New Item</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="form-control">
					<label class="label" for="item-name">
						<span class="label-text">Name</span>
					</label>
					<input
						id="item-name"
						type="text"
						placeholder="Item name"
						class="input input-bordered w-full"
						bind:value={newItem.name}
					/>
				</div>
				<div class="form-control">
					<label class="label" for="item-status">
						<span class="label-text">Status</span>
					</label>
					<select id="item-status" class="select select-bordered w-full" bind:value={newItem.status}>
						<option value="pending">Pending</option>
						<option value="active">Active</option>
						<option value="completed">Completed</option>
						<option value="archived">Archived</option>
					</select>
				</div>
				<div class="form-control md:col-span-2">
					<label class="label" for="item-desc">
						<span class="label-text">Description</span>
					</label>
					<textarea
						id="item-desc"
						placeholder="Item description"
						class="textarea textarea-bordered w-full"
						bind:value={newItem.description}
					></textarea>
				</div>
				<div class="form-control">
					<label class="label" for="item-priority">
						<span class="label-text">Priority</span>
					</label>
					<input
						id="item-priority"
						type="number"
						placeholder="0"
						class="input input-bordered w-full"
						bind:value={newItem.priority}
					/>
				</div>
			</div>

			{#if createError}
				<div class="alert alert-error mt-2">
					<span>{createError}</span>
				</div>
			{/if}

			<div class="card-actions justify-end mt-4">
				<button
					class="btn btn-primary"
					onclick={createItem}
					disabled={isCreating}
				>
					{isCreating ? 'Creating...' : '+ Create Item'}
				</button>
			</div>
		</div>
	</div>

	<!-- Error Message -->
	{#if data.error}
		<div class="alert alert-warning">
			<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
			</svg>
			<span>{data.error}</span>
		</div>
	{/if}

	<!-- Items Table -->
	{#if data.items.length > 0}
		<div class="card bg-base-100 shadow-md">
			<div class="card-body">
				<h2 class="card-title text-lg">All Items ({data.items.length})</h2>
				<div class="overflow-x-auto">
					<table class="table table-zebra">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Description</th>
								<th>Status</th>
								<th>Priority</th>
								<th>Created</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each data.items as item}
								<tr>
									<td class="font-mono text-sm">{item.ID}</td>
									<td class="font-semibold">{item.name}</td>
									<td class="max-w-xs truncate">{item.description || '—'}</td>
									<td>
										<span class="badge {statusBadge(item.status)}">{item.status}</span>
									</td>
									<td>{item.priority}</td>
									<td class="text-sm opacity-70">
										{new Date(item.CreatedAt).toLocaleDateString()}
									</td>
									<td>
										<button
											class="btn btn-error btn-xs"
											onclick={() => deleteItem(item.ID)}
										>
											Delete
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	{:else if !data.error}
		<div class="card bg-base-100 shadow-md">
			<div class="card-body text-center py-12">
				<p class="text-lg opacity-60">No items yet. Create one above or use the Django Admin!</p>
			</div>
		</div>
	{/if}
</div>
