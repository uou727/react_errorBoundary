import { useState } from "react";
import axios from "axios";

interface UrlParams {
  error: {
    message: string;
    stack: string;
  };
  data: {
    errTime: string;
  };
  browserInfo: {
    userAgent: string;
  };
}

const useErrorReporting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const reportError = async (urlParams: UrlParams) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:9999/reportVueError",
        urlParams
      );
      return response.data;
    } catch (err) {
      setError(err as Error);
      console.error("错误报告失败:", err);
    } finally {
      setLoading(false);
    }
  };

  return { reportError, loading, error };
};

export default useErrorReporting;
