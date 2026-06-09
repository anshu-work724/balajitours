# Shree Balaji Travels - MERN Stack Project

A modern, production-ready travel and tourism website built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Tailwind CSS.

## 🏗️ Production Folder Structure

While this environment uses consolidated files for demonstration, in a real-world repository, the code provided in `App.jsx` and `server.js` should be split into the following structure:

```
shree-balaji-travels/
├── frontend/
│   ├── .env
│   ├── src/
│   │   ├── assets/ (images, icons)
│   │   ├── components/
│   │   │   ├── layout/ (Navbar, Footer, Layout)
│   │   │   ├── ui/ (Button, Modal, Card)
│   │   │   └── shared/ (Loading, ErrorBoundary)
│   │   ├── pages/ (Home, Gallery, ComboTours, About, Contact)
│   │   ├── hooks/ (useApi, useScroll)
│   │   ├── context/ (ConfigContext)
│   │   ├── services/ (api.js)
│   │   ├── utils/ (formatters.js)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
│
└── backend/
    ├── .env
    ├── server.js (Entry point)
    ├── config/ (db.js)
    ├── models/ (TourPackage.js, GalleryImage.js, Contact.js, Config.js)
    ├── controllers/ (tourController.js, configController.js...)
    ├── routes/ (tourRoutes.js, apiRoutes.js)
    ├── middleware/ (errorHandler.js, rateLimiter.js)
    └── package.json
```

## 🚀 Environment Variables

### Frontend (`frontend/.env`)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/shree-balaji?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key
EMAIL_USER=admin@shreebalajitravels.com
EMAIL_PASS=your_email_password
# Dynamic Contact Config
CONTACT_PHONE=+919876543210
CONTACT_EMAIL=info@shreebalajitravels.com
WHATSAPP_NUMBER=919876543210
```

## 🛠️ Key Features
* **Clean Architecture:** Strict separation of concerns.
* **Dynamic Configuration:** Contact info (WhatsApp, Phone) is fetched from the backend `.env` securely.
* **Responsive UI:** Fully responsive Tailwind CSS layout with mobile hamburger menu.
* **Security:** Helmet, CORS, Rate Limiting, and express-mongo-sanitize configured.
