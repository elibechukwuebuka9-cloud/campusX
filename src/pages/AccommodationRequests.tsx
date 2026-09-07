import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccommodationRequests.css";

interface Request {
  id: number;
  name: string;
  email: string;
  phone: string;
  accommodation: string;
  message: string;
  type: string;
  status: string;
  created_at: string;
}

function AccommodationRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // ==============================
  // GET PROVIDER TOKEN
  // ==============================

  const getToken = () => {
    return localStorage.getItem(
      "campusXProviderToken"
    );
  };

  // ==============================
  // FETCH REQUESTS
  // ==============================

  const fetchRequests = async () => {
    const token = getToken();

    if (!token) {
      navigate("/provider-login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/accommodation-requests",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Session expired or invalid
      if (response.status === 401) {
        localStorage.removeItem(
          "campusXProvider"
        );

        localStorage.removeItem(
          "campusXProviderToken"
        );

        navigate("/provider-login");

        return;
      }

      if (!response.ok) {
        throw new Error(
          "Failed to fetch requests"
        );
      }

      const data = await response.json();

      setRequests(data);

    } catch (error) {
      console.error(
        "Failed to fetch requests:",
        error
      );

    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // UPDATE REQUEST STATUS
  // ==============================

  const updateStatus = async (
    id: number,
    status: "Approved" | "Rejected"
  ) => {
    const token = getToken();

    if (!token) {
      navigate("/provider-login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/accommodation-requests/${id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      // Session expired
      if (response.status === 401) {
        localStorage.removeItem(
          "campusXProvider"
        );

        localStorage.removeItem(
          "campusXProviderToken"
        );

        navigate("/provider-login");

        return;
      }

      if (!response.ok) {
        throw new Error(
          "Failed to update request"
        );
      }

      // Refresh requests
      await fetchRequests();

    } catch (error) {
      console.error(
        "Failed to update request:",
        error
      );

      alert(
        "Failed to update request."
      );
    }
  };

  // ==============================
  // LOAD REQUESTS
  // ==============================

  useEffect(() => {
    fetchRequests();
  }, []);

  // ==============================
  // STATISTICS
  // ==============================

  const totalRequests =
    requests.length;

  const pendingRequests =
    requests.filter(
      (request) =>
        request.status === "Pending"
    ).length;

  const approvedRequests =
    requests.filter(
      (request) =>
        request.status === "Approved"
    ).length;

  const rejectedRequests =
    requests.filter(
      (request) =>
        request.status === "Rejected"
    ).length;

  // ==============================
  // FILTER
  // ==============================

  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter(
          (request) =>
            request.status === filter
        );

  // ==============================
  // UI
  // ==============================

  return (
    <div className="requests-page">

      {/* HEADER */}

      <div className="requests-header">

        <div>

          <p className="requests-label">
            CAMPUSX
          </p>

          <h1>
            Accommodation Dashboard
          </h1>

          <p>
            Manage accommodation requests
            submitted by students.
          </p>

        </div>

        <button
          className="refresh-button"
          onClick={fetchRequests}
        >
          Refresh
        </button>

      </div>

      {/* STATISTICS */}

      <div className="request-stats">

        <div className="stat-card">

          <span>
            Total Requests
          </span>

          <strong>
            {totalRequests}
          </strong>

        </div>

        <div className="stat-card">

          <span>
            Pending
          </span>

          <strong>
            {pendingRequests}
          </strong>

        </div>

        <div className="stat-card">

          <span>
            Approved
          </span>

          <strong>
            {approvedRequests}
          </strong>

        </div>

        <div className="stat-card">

          <span>
            Rejected
          </span>

          <strong>
            {rejectedRequests}
          </strong>

        </div>

      </div>

      {/* FILTER */}

      <div className="request-filter">

        <button
          className={
            filter === "All"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("All")
          }
        >
          All
        </button>

        <button
          className={
            filter === "Pending"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("Pending")
          }
        >
          Pending
        </button>

        <button
          className={
            filter === "Approved"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("Approved")
          }
        >
          Approved
        </button>

        <button
          className={
            filter === "Rejected"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("Rejected")
          }
        >
          Rejected
        </button>

      </div>

      {/* REQUESTS */}

      {loading ? (

        <div className="requests-message">

          <h2>
            Loading requests...
          </h2>

        </div>

      ) : filteredRequests.length === 0 ? (

        <div className="requests-message">

          <h2>
            No requests found
          </h2>

          <p>
            There are no requests in this
            category.
          </p>

        </div>

      ) : (

        <div className="requests-list">

          {filteredRequests.map(
            (request) => (

              <div
                className="request-card"
                key={request.id}
              >

                {/* TOP */}

                <div className="request-top">

                  <div>

                    <h2>
                      {request.name}
                    </h2>

                    <span className="request-type">
                      {request.type}
                    </span>

                  </div>

                  <span
                    className={`request-status ${request.status
                      .toLowerCase()
                      .replace(
                        " ",
                        "-"
                      )}`}
                  >
                    {request.status}
                  </span>

                </div>

                {/* INFORMATION */}

                <div className="request-info">

                  <p>
                    <strong>
                      Email:
                    </strong>{" "}
                    {request.email}
                  </p>

                  <p>
                    <strong>
                      Phone:
                    </strong>{" "}
                    {request.phone}
                  </p>

                  <p>
                    <strong>
                      Accommodation:
                    </strong>{" "}
                    {request.accommodation}
                  </p>

                  <p>
                    <strong>
                      Date:
                    </strong>{" "}
                    {new Date(
                      request.created_at
                    ).toLocaleString()}
                  </p>

                </div>

                {/* MESSAGE */}

                <div className="request-message">

                  <strong>
                    Message
                  </strong>

                  <p>
                    {request.message}
                  </p>

                </div>

                {/* ACTIONS */}

                {request.status ===
                  "Pending" && (

                  <div className="request-actions">

                    <button
                      className="approve-button"
                      onClick={() =>
                        updateStatus(
                          request.id,
                          "Approved"
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject-button"
                      onClick={() =>
                        updateStatus(
                          request.id,
                          "Rejected"
                        )
                      }
                    >
                      Reject
                    </button>

                  </div>

                )}

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}

export default AccommodationRequests;