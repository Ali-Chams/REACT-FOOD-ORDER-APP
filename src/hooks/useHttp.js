import { useCallback,useEffect,useState} from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Request failed!");
  }
  return resData;
}

export default function useHttp(url, config) {

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function clearData() {
    setData(null);
    setError(null);
   }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {...config,body:data});
        setData(resData);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if(config && (config.method === 'GET' || !config.method) || !config) {
      sendRequest();
    }
  }, [sendRequest]);
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}
