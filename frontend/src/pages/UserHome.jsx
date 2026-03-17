import { Link } from "react-router-dom";

export default function UserHome() {

  const actions = [
    {
      icon: "📂",
      title: "Add Documents",
      text: "Upload important files, credentials, and digital assets.",
      link: "/user/add-data"
    },
    {
      icon: "👥",
      title: "Add Nominee",
      text: "Choose trusted people who can access your data later.",
      link: "/user/select-nominee"
    },
    {
      icon: "📜",
      title: "View Stored Data",
      text: "Review and manage the documents stored in your vault.",
      link: "/user/view-data"
    }
  ];

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-5">

        <h2>
          Your <span className="gold">Digital Vault</span>
        </h2>

        <p className="text-muted">
          Manage your documents, memories, and trusted nominees securely.
        </p>

      </div>

      {/* ACTION CARDS */}
      <div className="row g-4">

        {actions.map((item, index) => (
          <div className="col-md-4" key={index}>

            <div className="glass-card hover-card p-4 text-center">

              <div className="card-icon mb-2">
                {item.icon}
              </div>

              <h5>{item.title}</h5>

              <p className="text-muted mt-2">
                {item.text}
              </p>

              <Link
                to={item.link}
                className="btn btn-gold mt-3"
              >
                Open
              </Link>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}