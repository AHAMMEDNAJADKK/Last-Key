import { useEffect, useState } from "react";
import API from "../api";

export default function useVerification() {

  const [status, setStatus] = useState("loading");

  const fetchStatus = async () => {
    try {
      const { data } = await API.get("/verification/status");
      setStatus(data.status);
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return status;
}