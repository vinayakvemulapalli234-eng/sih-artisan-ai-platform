const API_BASE = 'http://127.0.0.1:8080';

const getToken = () => localStorage.getItem('kalakriti_token');

export const createProductOnServer = async (productData) => {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Failed to create product' };
    }
    return { success: true, product: data };
  } catch (err) {
    return { success: false, error: 'Could not reach server' };
  }
};

export const fetchMyProducts = async () => {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE}/products/mine`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Failed to fetch products' };
    }
    return { success: true, products: data };
  } catch (err) {
    return { success: false, error: 'Could not reach server' };
  }
};
export const fetchAllProducts = async () => {
  try {
    const res = await fetch(`${API_BASE}/products/`);
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Failed to fetch products' };
    }
    return { success: true, products: data };
  } catch (err) {
    return { success: false, error: 'Could not reach server' };
  }
};
export const fetchMyStats = async () => {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE}/orders/my-stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Failed to fetch stats' };
    }
    return { success: true, stats: data };
  } catch (err) {
    return { success: false, error: 'Could not reach server' };
  }
};
export const fetchSellers = async () => {
  try {
    const res = await fetch(`${API_BASE}/products/sellers/list`);
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Failed to fetch artisans' };
    }
    return { success: true, sellers: data };
  } catch (err) {
    return { success: false, error: 'Could not reach server' };
  }
};
export const placeOrderOnServer = async (productId, quantity) => {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ product_id: productId, quantity })
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Failed to place order' };
    }
    return { success: true, order: data };
  } catch (err) {
    return { success: false, error: 'Could not reach server' };
  }
};
export const fetchMyOrders = async () => {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE}/orders/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Failed to fetch orders' };
    }
    return { success: true, orders: data };
  } catch (err) {
    return { success: false, error: 'Could not reach server' };
  }
};
export const fetchIncomingOrders = async () => {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE}/orders/incoming`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Failed to fetch orders' };
    }
    return { success: true, orders: data };
  } catch (err) {
    return { success: false, error: 'Could not reach server' };
  }
};
export const updateOrderStatus = async (orderId, newStatus) => {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}/status?new_status=${newStatus}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.detail || 'Failed to update status' };
    }
    return { success: true, order: data };
  } catch (err) {
    return { success: false, error: 'Could not reach server' };
  }
};