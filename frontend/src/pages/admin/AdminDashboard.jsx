import { useEffect, useState } from "react";
import API from "../../api";

export default function AdminDashboard() {

  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔄 FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/verification/admin");
      setVerifications(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ APPROVE / REJECT
  const handleUpdate = async (id, status) => {
    try {
      await API.put(`/verification/admin/${id}`, { status });
      fetchData(); // refresh
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="mb-5 text-center">
        <h2>
          Admin <span className="gold">Verification Panel</span>
        </h2>

        <p className="text-muted">
          Review nominee verification requests before granting vault access.
        </p>
      </div>

      <div className="row g-4">

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : verifications.length === 0 ? (
          <p className="text-center">No verification requests</p>
        ) : (
          verifications.map((item) => (
            <div className="col-md-4" key={item._id}>

              <div className="glass-card hover-card p-4 text-center">

                {/* ICON */}
                <div className="card-icon mb-3">
                  📄
                </div>

                <h5 className="mb-2">
                  {item.nominee?.name}
                </h5>

                <p className="mb-1">
                  {item.nominee?.email}
                </p>

                <p className="mb-2">
                  Status: <b>{item.status}</b>
                </p>

                {/* VIEW FILE */}
                <a
                  href={item.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-gold btn-sm w-100"
                >
                  View Certificate
                </a>

                {/* ACTION BUTTONS */}
                {item.status === "pending" && (
                  <>
                    <button
                      className="btn btn-success btn-sm mt-2 w-100"
                      onClick={() =>
                        handleUpdate(item._id, "approved")
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-danger btn-sm mt-2 w-100"
                      onClick={() =>
                        handleUpdate(item._id, "rejected")
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}