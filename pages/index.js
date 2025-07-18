



// pages/index.js

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">⚡ Welcome to UtilityPay</h1>
        <p className="text-gray-600 text-lg mb-6">
          Easily manage and pay your utility bills for electricity, water, and gas. Fast, secure, and user-friendly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            🔐 Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50 transition"
          >
            📝 Register
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-8">
          <div className="p-4 border rounded shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-blue-600 mb-1">📊 Track Spending</h3>
            <p className="text-sm text-gray-600">Visualize your monthly expenses using beautiful charts.</p>
          </div>
          <div className="p-4 border rounded shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-blue-600 mb-1">📄 Download Receipts</h3>
            <p className="text-sm text-gray-600">Easily generate PDF receipts for your payment history.</p>
          </div>
          <div className="p-4 border rounded shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-blue-600 mb-1">📧 Email Confirmation</h3>
            <p className="text-sm text-gray-600">Receive email confirmation after every successful payment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
