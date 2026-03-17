import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="d-flex">

      {/* SIDEBAR */}
      <div
        style={{
          width: "240px",
          minHeight: "100vh",
          background: "#0f172a",
          padding: "20px"
        }}
      >
        <h4 className="text-warning mb-4">LastKey</h4>

        <div className="d-flex flex-column gap-3">

          <Link className="text-light text-decoration-none" to="/user/home">
            🏠 Dashboard
          </Link>

          <Link className="text-light text-decoration-none" to="/user/add-data">
            📂 Add Data
          </Link>

          <Link className="text-light text-decoration-none" to="/user/view-data">
            📜 View Vault
          </Link>

          <Link className="text-light text-decoration-none" to="/user/select-nominee">
            👤 Nominee
          </Link>

        </div>
      </div>

      {/* PAGE CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "40px",
          background: "#020617",
          minHeight: "100vh"
        }}
      >
        <Outlet />
      </div>

    </div>
  );
}