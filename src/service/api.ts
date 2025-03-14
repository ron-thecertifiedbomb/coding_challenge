


export const fetchApi = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data: T = await response.json(); 
      return data;
     
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
  
    console.error("Error fetching data:", error);
    return null; 
  }
};

    
    
    
