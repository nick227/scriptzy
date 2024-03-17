const api = {
  async create(route, data) {
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async read(route, queryParams = {}) {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${route}?${queryString}`;
    const response = await fetch(url, {
      method: 'GET',
    });

    
    const clone = response.clone();

    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Response is not JSON, returning as string');
      const data = await clone.text();
      return data;
    }
  },

  async upload(route, data) {
    const response = await fetch(route, {
      method: 'POST',
      body: data,
    });
    return await response.json();
  },

  async update(route, data) {
    const response = await fetch(route, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async delete(route, queryParams = {}) {
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await fetch(`${route}?${queryString}`, {
      method: 'DELETE',
    });
    return await response.json();
  },
};
