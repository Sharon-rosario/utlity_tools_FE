const API_BASE_URL = 'http://localhost:5000/api';

export const processTool = async (toolId: string, data: any, file?: File) => {
  try {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    
    if (data) {
      formData.append('data', JSON.stringify(data));
      // Also add individual fields for ease of use in controllers
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }

    const response = await fetch(`${API_BASE_URL}/tools/process/${toolId}`, {
      method: 'POST',
      body: formData,
      // We need to pass a device signature to satisfy the backend middleware
      headers: {
        'x-device-signature': 'antigravity-industrial-v1' 
      }
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Backend processing failed');
    }

    return result.result;
  } catch (error) {
    console.error(`API Error (${toolId}):`, error);
    throw error;
  }
};
