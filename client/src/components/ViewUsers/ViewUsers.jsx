import "./ViewUsers.css";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const ViewUsers = () => {
  const [name, setName] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [application_user_id, setApplication_user_id] = useState("");
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      setApplication_user_id(user.sub);
    }
    fetch("https://deliver-greeting-cards.herokuapp.com/api/addresses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const addressIds = data.data.map((address) => address.id);
        setAddresses(addressIds);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [user, isAuthenticated]);

  async function fetchText() {
    let response = await fetch(
      "https://deliver-greeting-cards.herokuapp.com/api/users",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    let data = await response.json();
    setName(data);
    console.log(data);
  }

  useEffect(() => {
    fetchText();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://deliver-greeting-cards.herokuapp.com/api/users/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );
      console.log(response);
      window.location.reload();
    } catch (err) {
      console.error("Error deleting user", err.message);
    }
  };

  return (
    <div>
      <div className="header">
        <div className="home">
          <table>
            <thead>
              <tr>
                <th className="header-cell">Name</th>
              </tr>
            </thead>
            {name
              .filter(
                (data) => data.application_user_id === application_user_id,
              )
              .map((data, i) => (
                <tr key={i}>
                  <td>{data.name ? data.name : "Tameem"}</td>
                </tr>
              ))}
          </table>
        </div>
        <div className="home addr">
          <table>
            <thead>
              <tr>
                <th className="header-cell">Address ID</th>
              </tr>
            </thead>
            <tbody>
              {name
                .filter(
                  (data) => data.application_user_id === application_user_id,
                )
                .map((data, i) => {
                  const isMatch = addresses.includes(data.address_id);
                  return (
                    <tr key={i}>
                      <td>
                        {isMatch ? (
                          <a
                            href={`https://dashboard.lob.com/addresses/${data.address_id}`}
                            target="_blank"
                          >
                            {data.address_id}
                          </a>
                        ) : (
                          data.address_id || "N/A"
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="home butt">
          <table>
            <thead>
              <tr>
                <th className="header-cell">Delete</th>
              </tr>
            </thead>
            {name
              .filter(
                (data) => data.application_user_id === application_user_id,
              )
              .map((data, i, filteredArray) => (
                <tr
                  key={i}
                  className={i === filteredArray.length - 1 ? "last-row" : ""}
                >
                  <td>
                    <button onClick={() => handleDelete(data.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
};
export default ViewUsers;
