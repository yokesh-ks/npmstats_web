async function handleErrors(response: Response): Promise<unknown> {
	if (!response.ok) {
		let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

		try {
			const errorData = await response.json();
			if (errorData.error) {
				errorMessage = errorData.error;
			}
		} catch {
			// If we can't parse the error response, use the default message
		}

		throw new Error(errorMessage);
	}

	if (response.status === 204) {
		return null;
	}

	return response.json();
}

function getHeaders() {
	const headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
	};

	return headers;
}

class Fetch {
	static getJSON(url: string, opts: RequestInit = {}) {
		return fetch(url, {
			headers: getHeaders(),
			...opts,
		}).then(handleErrors);
	}

	static postJSON(url: string, data: Record<string, unknown> = {}) {
		return fetch(url, {
			method: "POST",
			headers: getHeaders(),
			body: JSON.stringify(data),
		}).then(handleErrors);
	}
}

export default Fetch;
