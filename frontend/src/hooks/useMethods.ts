import { useEffect, useState } from "react";
import { axiosAPI } from "../api/axios";

// Loads the list of supported methods from the backend (GET /methods)
export const useMethods = () => {
  const [methods, setMethods] = useState<string[]>([]);

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const response = await axiosAPI.get("/methods");
        setMethods(response.data.methods || []);
      } catch (error) {
        console.log("Error fetching methods: ", error);
      }
    };
    fetchMethods();
  }, []);

  return methods;
};
