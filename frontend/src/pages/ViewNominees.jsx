import { useEffect, useState } from "react";
import API from "../api";

export default function ViewNominees() {

  const [nominees, setNominees] = useState([]);

  const fetchNominees = async () => {
    try {
      const { data } = await API.get("/nominees");
      setNominees(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNominees();
  }, []);

  return (
    <div className="container py-5">

      <h2 className="text-center mb-5">
        Your <span className="gold">Nominees</span>
      </h2>

      <div className="row g-4">

        {nominees.length === 0 ? (
          <p className="text-center">No nominees added</p>
        ) : (
          nominees.map((nominee) => (
            <div className="col-md-4" key={nominee._id}>
              <div className="glass-card p-4 text-center">

                <h5>{nominee.name}</h5>
                <p>{nominee.email}</p>
                <p className="text-muted">{nominee.relation}</p>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}