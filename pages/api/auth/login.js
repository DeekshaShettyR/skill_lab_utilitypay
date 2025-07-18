// pages/api/auth/login.js

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const filePath = path.join(process.cwd(), 'data', 'users.json');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(data);

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      return res.status(200).json({
        message: 'Login successful',
        token: 'fake-jwt-token-12345', // In real apps, generate a real JWT
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  } catch (error) {
    return res.status(500).json({ message: 'Error reading user data' });
  }
}
