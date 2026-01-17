function handleErrors(response: Response): any {
	return new Promise<void>((resolve, reject) => {
		if (!response.ok) {
			return reject(response);
		}

		if (response.status === 204) {
			return resolve();
		}

		return response.json().then(resolve).catch(resolve);
	});
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

	static postJSON(url: string, data: any = {}) {
		return fetch(url, {
			method: "POST",
			headers: getHeaders(),
			body: JSON.stringify(data),
		}).then(handleErrors);
	}
}

export default Fetch;
