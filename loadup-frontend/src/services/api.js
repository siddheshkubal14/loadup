
export const fetchApplicants = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const url = query ? `${import.meta.env.VITE_BACKEND_BASE_URL}/fetch-applicants?${query}` : `${import.meta.env.VITE_BACKEND_BASE_URL}/fetch-applicants`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch applicants');
    }
    return await response.json();
    
  } catch (error) {
    console.error("Error while fetching applicants", error);
  }
};
