# 🏥 Health Hub - Premium Hospital Management System

Health Hub is a full-stack Hospital Management System built using the **MERN** stack (MongoDB, Express, React, Node.js). It features a modern dark-themed dashboard, JWT authentication, role-based dashboards, appointment booking workflows, digital prescriptions with PDF downloads, and email alerts.

---

## 🚀 Features & Modules

### 👤 Patient Module
- **Registration & Vitals Profile**: Demographic records (Blood Group, DOB, Address).
- **Consultation Booker**: Book appointments with specialist physicians based on their schedules.
- **Medical Log**: View clinical condition tracking records and discharge states.
- **Prescription Drawer**: Instantly retrieve prescriptions and download them as high-quality PDF files.

### 🩺 Doctor Module
- **Schedule Management**: Confirm or cancel patient consultations.
- **Rx Editor**: Complete patient consultation sessions by compiling diagnosis notes and writing medicine prescriptions (with dynamic row addition).
- **Patient History Access**: Review previous conditions and vitals.

### 🔑 Admin Module
- **Analytics Dashboard**: Dynamic metrics showing patient logs, doctor counts, and booking statuses.
- **Doctor CRUD**: Add, edit, and delete physicians.
- **Patients Directory**: Track patient parameters, adjust admit/discharge statuses, and review patient history logs.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, PDFKit, Nodemailer
- **Frontend**: React.js, Vite, Vanilla CSS (harmonious dark/light theme, custom scrollbars, micro-animations), Lucide React, Canvas Confetti

---

## 📂 Folder Structure

```
hospital-management-system/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Controller logic (Auth, Admin, Doctors, Patients, Appointments, Prescriptions)
│   ├── middleware/      # JWT auth & Role guards
│   ├── models/          # Mongoose Schema definitions
│   ├── routes/          # Express route bindings
│   ├── utils/           # Nodemailer email sender & PDFKit prescription generator
│   ├── seed.js          # DB seeder file
│   └── server.js        # Main entry point
└── frontend/
    ├── src/
    │   ├── components/  # Core pages & Dashboards
    │   ├── context/     # Auth Context Provider
    │   ├── styles/      # CSS Variables, resets, and styling tokens
    │   └── main.jsx     # Vite React mount
```

---

## 🏁 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally on `mongodb://127.0.0.1:27017/` or use an Atlas connection string)

---

### 2. Backend Setup
1. Open a terminal in the `backend/` folder:
   ```bash
   cd backend
   ```
2. Create a `.env` file in the `backend` folder (we have supplied a default `.env` template):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/hospital-management
   JWT_SECRET=supersecretjwtkey12345_healthhub
   NODE_ENV=development
   ```
3. Populate database with default seeder values:
   ```bash
   npm run seed
   ```
4. Start the backend server in development mode:
   ```bash
   npm run dev
   ```
   *The server will start listening on port `5000`.*

---

### 3. Frontend Setup
1. Open a new terminal in the `frontend/` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:5173](http://localhost:5173) in your web browser.*

---

## 🔐 Seeder Demo Accounts

You can log in immediately using these seeded records:

| Role | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@healthhub.com` | `adminpassword` | Full system control |
| **Doctor** | `doctor@healthhub.com` | `doctorpassword` | Dr. Robert Carter (Cardiologist) |
| **Patient** | `patient@healthhub.com` | `patientpassword` | Sarah Jenkins (Blood Group A+) |

---

## 📡 API Documentation Schema

### Auth Routes (`/api/auth`)
- `POST /register` - Register a patient (demographics) or doctor.
- `POST /login` - Log in, returns JWT token.
- `GET /me` - Returns logged-in user profile details (guarded).

### Appointment Routes (`/api/appointments`)
- `GET /` - List appointments filtered by role.
- `POST /` - Book an appointment.
- `PUT /:id/status` - Change appointment status (pending/confirmed/cancelled/completed).

### Prescription Routes (`/api/prescriptions`)
- `POST /` - Create prescription (Doctor only).
- `GET /` - View prescription logs.
- `GET /:id/download` - Stream prescription PDF binary.
