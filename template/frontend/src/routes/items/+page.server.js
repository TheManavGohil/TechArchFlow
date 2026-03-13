/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	try {
		const API_URL = process.env.API_URL || 'http://backend:3000';
		const response = await fetch(`${API_URL}/api/items`);

		if (!response.ok) {
			return { items: [], error: `API returned ${response.status}` };
		}

		const items = await response.json();
		return { items, error: null };
	} catch (err) {
		return {
			items: [],
			error: 'Could not connect to API. Is the backend running?'
		};
	}
}
