import { useState, useEffect } from "react";
import { useSanityClient } from "@sanity/astro";

/**
 * Fetch data once from Sanity
 * @param query groq query
 * @returns
 */
export default function useDataFromSanity<T>(
  query: string,
  params?: any
): { resultData: T | undefined; loading: boolean; errorMsg: string } {
  const [resultData, setResultData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!query) return;

    async function fetchData() {
      setLoading(true);
      try {
        const result = await useSanityClient().fetch(query, params);
        if (result?.length == 0) return setErrorMsg("No items");
        setResultData(result);
      } catch (error) {
        setErrorMsg("No items");
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return { resultData, loading, errorMsg };
}
