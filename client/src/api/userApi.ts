import { API_URL } from "./constants/baseUrl";

export const addUser = async (name: string) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Failed to add user');
    return await response.json();
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const updateUserWinCount = async (name: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${name}/win`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to update win count');
    return await response.json();
  } catch (error) {
    console.error('Error updating win count:', error);
    throw error;
  }
};
