import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";

export default function useVerification() {
  const { user } = useAuth();

  const [status, setStatus] = useState(null); // ✅ FIX (was "loading")

  useEffect(() => {

    // 🚫 ONLY run for nominee
    if (!user || user.role !== "nominee") {
      return;
    }

    const fetchStatus = async () => {
      try {
        setStatus("loading"); // ✅ move loading here

        const { data } = await API.get("/verification/status");

        setStatus(data.status);
      } catch (err) {
        setStatus("not_uploaded");
      }
    };

    fetchStatus();

  }, [user]);

  return status;
}