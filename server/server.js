const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const app = express();
const PORT = 5000;

// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());
app.use(express.json());

// ==============================
// DATABASE
// ==============================

const db = new Database("campusx.db");

// ==============================
// PROVIDERS TABLE
// ==============================

db.prepare(`
  CREATE TABLE IF NOT EXISTS providers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`).run();

// Create demo provider if it doesn't exist
const existingProvider = db
  .prepare(`
    SELECT *
    FROM providers
    WHERE email = ?
  `)
  .get("provider@campusx.com");

if (!existingProvider) {
  const hashedPassword = bcrypt.hashSync(
    "CampusX123",
    10
  );

  db.prepare(`
    INSERT INTO providers (email, password)
    VALUES (?, ?)
  `).run(
    "provider@campusx.com",
    hashedPassword
  );

  console.log("Demo provider account created!");
}

// ==============================
// ACCOMMODATION REQUESTS TABLE
// ==============================

db.prepare(`
  CREATE TABLE IF NOT EXISTS accommodation_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    accommodation TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// ==============================
// NOTIFICATIONS TABLE
// ==============================

db.prepare(`
  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

console.log("Database connected successfully!");

// ==============================
// PROVIDER SESSIONS
// ==============================

const providerSessions = new Map();

// ==============================
// AUTHENTICATION MIDDLEWARE
// ==============================

function authenticateProvider(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  const token = authHeader.replace(
    "Bearer ",
    ""
  );

  const provider = providerSessions.get(token);

  if (!provider) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session.",
    });
  }

  req.provider = provider;

  next();
}

// ==============================
// HOME ROUTE
// ==============================

app.get("/", (req, res) => {
  res.json({
    message: "CampusX backend is running 🚀",
  });
});

// ==============================
// PROVIDER LOGIN
// ==============================

app.post("/api/provider-login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    const provider = db
      .prepare(`
        SELECT *
        FROM providers
        WHERE email = ?
      `)
      .get(
        email.trim().toLowerCase()
      );

    if (!provider) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid provider email or password.",
      });
    }

    const passwordMatch = bcrypt.compareSync(
      password,
      provider.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid provider email or password.",
      });
    }

    // Create secure session token
    const token = crypto
      .randomBytes(32)
      .toString("hex");

    providerSessions.set(token, {
      id: provider.id,
      email: provider.email,
    });

    res.json({
      success: true,
      message:
        "Provider login successful.",
      token,
      provider: {
        id: provider.id,
        email: provider.email,
      },
    });

  } catch (error) {
    console.error(
      "Provider login error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Provider login failed.",
    });
  }
});

// ==============================
// PROVIDER LOGOUT
// ==============================

app.post(
  "/api/provider-logout",
  authenticateProvider,
  (req, res) => {

    const token =
      req.headers.authorization.replace(
        "Bearer ",
        ""
      );

    providerSessions.delete(token);

    res.json({
      success: true,
      message:
        "Provider logged out successfully.",
    });
  }
);

// ==============================
// CREATE ACCOMMODATION REQUEST
// ==============================

app.post(
  "/api/accommodation-requests",
  (req, res) => {

    const {
      name,
      email,
      phone,
      accommodation,
      message,
      type,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !accommodation ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill in all required fields.",
      });
    }

    try {

      const statement = db.prepare(`
        INSERT INTO accommodation_requests
        (
          name,
          email,
          phone,
          accommodation,
          message,
          type
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      statement.run(
        name,
        email,
        phone,
        accommodation,
        message,
        type ||
          "Accommodation Request"
      );

      res.status(201).json({
        success: true,
        message:
          "Accommodation request submitted successfully!",
      });

    } catch (error) {

      console.error(
        "Database error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to save accommodation request.",
      });
    }
  }
);

// ==============================
// GET ALL ACCOMMODATION REQUESTS
// ==============================

app.get(
  "/api/accommodation-requests",
  authenticateProvider,
  (req, res) => {

    try {

      const requests = db
        .prepare(`
          SELECT *
          FROM accommodation_requests
          ORDER BY created_at DESC
        `)
        .all();

      res.json(requests);

    } catch (error) {

      console.error(
        "Database error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to retrieve requests.",
      });
    }
  }
);

// ==============================
// GET STUDENT NOTIFICATIONS
// ==============================

app.get(
  "/api/notifications/:email",
  (req, res) => {

    const email = req.params.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message:
          "Student email is required.",
      });
    }

    try {

      const notifications = db
        .prepare(`
          SELECT *
          FROM notifications
          WHERE email = ?
          ORDER BY created_at DESC
        `)
        .all(email);

      res.json(notifications);

    } catch (error) {

      console.error(
        "Notification database error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to retrieve notifications.",
      });
    }
  }
);

// ==============================
// MARK NOTIFICATION AS READ
// ==============================

app.patch(
  "/api/notifications/:id/read",
  (req, res) => {

    const { id } = req.params;

    try {

      const result = db
        .prepare(`
          UPDATE notifications
          SET read = 1
          WHERE id = ?
        `)
        .run(id);

      if (result.changes === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Notification not found.",
        });
      }

      res.json({
        success: true,
        message:
          "Notification marked as read.",
      });

    } catch (error) {

      console.error(
        "Notification update error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update notification.",
      });
    }
  }
);

// ==============================
// UPDATE REQUEST STATUS
// ==============================

app.patch(
  "/api/accommodation-requests/:id",
  authenticateProvider,
  (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    if (
      ![
        "Pending",
        "Approved",
        "Rejected",
      ].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    try {

      // Get the request first
      const request = db
        .prepare(`
          SELECT *
          FROM accommodation_requests
          WHERE id = ?
        `)
        .get(id);

      if (!request) {
        return res.status(404).json({
          success: false,
          message:
            "Request not found.",
        });
      }

      // Update request status
      const result = db
        .prepare(`
          UPDATE accommodation_requests
          SET status = ?
          WHERE id = ?
        `)
        .run(status, id);

      if (result.changes === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Request not found.",
        });
      }

      // ==============================
      // CREATE STUDENT NOTIFICATION
      // ==============================

      let title = "";
      let notificationMessage = "";

      if (status === "Approved") {

        title =
          "Accommodation Approved 🎉";

        notificationMessage =
          `Your accommodation request for ${request.accommodation} has been approved. The provider can now contact you using the details you submitted.`;

      } else if (status === "Rejected") {

        title =
          "Accommodation Request Rejected";

        notificationMessage =
          `Your accommodation request for ${request.accommodation} was rejected by the provider. You can explore other available accommodations on CampusX.`;
      }

      // Save notification
      db.prepare(`
        INSERT INTO notifications
        (
          email,
          title,
          message,
          type
        )
        VALUES (?, ?, ?, ?)
      `).run(
        request.email,
        title,
        notificationMessage,
        status
      );

      res.json({
        success: true,
        message:
          `Request ${status.toLowerCase()} successfully.`,
      });

    } catch (error) {

      console.error(
        "Database error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update request.",
      });
    }
  }
);

// ==============================
// START SERVER
// ==============================

app.listen(PORT, () => {
  console.log(
    `CampusX server running on http://localhost:${PORT}`
  );
});