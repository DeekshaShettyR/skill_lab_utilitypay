


import '../i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jsPDF from 'jspdf';
import emailjs from '@emailjs/browser';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allPayments, setAllPayments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (!token || !userInfo) {
      router.push('/login');
    } else {
      setUser(userInfo);
      const stored = JSON.parse(localStorage.getItem(`payments_${userInfo.email}`)) || [];
      setPayments(stored);

      if (userInfo.email === 'admin@utilitypay.com') {
        const keys = Object.keys(localStorage);
        const all = [];
        keys.forEach(key => {
          if (key.startsWith('payments_')) {
            const userPayments = JSON.parse(localStorage.getItem(key));
            all.push(...userPayments);
          }
        });
        setAllPayments(all);

        fetch('/users.json')
          .then(res => res.json())
          .then(data => setAllUsers(data));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const utility = form.utility.value;
    const account = form.account.value;
    const amount = form.amount.value;

    const payment = {
      utility,
      account,
      amount,
      time: new Date().toISOString() // ✅ FIXED HERE
    };

    const existing = JSON.parse(localStorage.getItem(`payments_${user.email}`)) || [];
    const updated = [...existing, payment];
    localStorage.setItem(`payments_${user.email}`, JSON.stringify(updated));
    setPayments(updated);

    emailjs.send('', '', {
      user_name: user.name,
      email: user.email,
      utility,
      account,
      amount,
      payment_time: payment.time
    }, '');

    alert(t("paymentSuccess"));
  };

  const downloadReceipt = (payment, index) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(t("receipt"), 20, 20);
    doc.setFontSize(12);
    doc.text(`${t("name")}: ${user.name}`, 20, 40);
    doc.text(`${t("email")}: ${user.email}`, 20, 50);
    doc.text(`${t("utilityType")}: ${payment.utility}`, 20, 60);
    doc.text(`${t("accountNumber")}: ${payment.account}`, 20, 70);
    doc.text(`${t("amount")}: ₹${payment.amount}`, 20, 80);
    doc.text(`${t("paymentTime")}: ${payment.time}`, 20, 90);
    doc.save(`Receipt_${user.name}_${index + 1}.pdf`);
  };

  const monthlyTotals = {};
  payments.forEach(p => {
    const date = new Date(p.time);
    if (!isNaN(date)) {
      const month = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      monthlyTotals[month] = (monthlyTotals[month] || 0) + parseFloat(p.amount);
    }
  });

  const chartData = Object.entries(monthlyTotals).map(([month, amount]) => ({
    month,
    amount
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6 relative">

        {/* Header and Language */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{t("UTILITYPAY")}</h1>
          <div className="flex items-center space-x-4">
            <select
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="border p-1 rounded text-sm"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline text-sm"
            >
              🚪 {t("logout")}
            </button>
          </div>
        </div>

        {user && (
          <div className="mb-6">
            <p className="text-lg">👤 <strong>{user.name}</strong></p>
            <p className="text-sm text-gray-600">📧 {user.email}</p>
          </div>
        )}

        {user?.email === 'admin@utilitypay.com' && (
          <div className="bg-yellow-100 p-4 mb-6 border border-yellow-300 rounded">
            <h2 className="font-semibold mb-2">🧑‍💼 {t("adminPanel")}</h2>
            <h3 className="text-sm font-semibold mt-2 mb-1">👥 {t("registeredUsers")}</h3>
            <ul className="list-disc list-inside text-sm mb-3">
              {allUsers.map((u, i) => (
                <li key={i}>{u.name} ({u.email})</li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold mb-1">🧾 {t("allPayments")}</h3>
            <ul className="list-disc list-inside text-sm">
              {allPayments.map((p, i) => (
                <li key={i}>{p.utility} • ₹{p.amount} • {p.account} • {p.time}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-1 font-semibold">{t("utilityType")}</label>
            <select name="utility" className="w-full p-2 border rounded">
              <option value="Electricity">{t("electricity")}</option>
              <option value="Water">{t("water")}</option>
              <option value="Gas">{t("gas")}</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">{t("accountNumber")}</label>
            <input name="account" className="w-full p-2 border rounded" placeholder={t("accountPlaceholder")} />
          </div>
          <div>
            <label className="block mb-1 font-semibold">{t("amount")}</label>
            <input name="amount" className="w-full p-2 border rounded" placeholder={t("amountPlaceholder")} />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
              💳 {t("payNow")}
            </button>
          </div>
        </form>

        {/* Chart */}
        {chartData.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mt-8 mb-2">📊 {t("monthlyChart")}</h2>
            <div className="bg-gray-50 p-4 rounded mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Payment History */}
        <h2 className="text-xl font-semibold mb-2">📜 {t("paymentHistory")}</h2>
        {payments.length === 0 ? (
          <p>{t("noPayments")}</p>
        ) : (
          <ul className="space-y-2">
            {payments.map((p, i) => (
              <li key={i} className="border p-3 rounded flex justify-between items-center">
                <div>
                  <p><strong>{p.utility}</strong> • ₹{p.amount} • {p.account}</p>
                  <p className="text-sm text-gray-500">{p.time}</p>
                </div>
                <button
                  onClick={() => downloadReceipt(p, i)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  📄 {t("download")}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
