# ⚡ Smart Utility Bill Payment Dashboard

A responsive and multilingual web application for securely paying utility bills (Electricity, Water, Gas) with admin analytics, receipt generation, and email confirmation. Built using **Next.js**, **Tailwind CSS**, and **i18next**.

---

## 📌 Features

- 💳 Bill Payment Form with validation
- 📄 Downloadable PDF Receipts (jsPDF)
- 📧 Email Confirmation (EmailJS)
- 📊 Monthly Spending Bar Chart (Recharts)
- 🧑‍💼 Admin Panel (view all users and payments)
- 🌐 Multi-language Support (English, Hindi, Kannada)
- 🔒 Local storage authentication (JWT-like simulation)
- 🌓 Light/Dark mode ready (CSS variables)

---

## ⚙️ Technologies Used

| Tech          | Purpose                             |
|---------------|-------------------------------------|
| **Next.js**   | React framework for frontend        |
| **Tailwind CSS** | Styling and layout             |
| **jsPDF**     | PDF receipt generation              |
| **EmailJS**   | Email notifications after payment   |
| **Recharts**  | Data visualization (bar chart)      |
| **i18next**   | Language translation (i18n support) |
| **localStorage** | Storing users and payments     |

---

setup
cd utility-bill-dashboard

npm install

npm install jspdf emailjs-com react-i18next i18next recharts

npm run dev

Open your browser at http://localhost:3000
