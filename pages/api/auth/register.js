// pages/api/auth/register.js

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  const filePath = path.join(process.cwd(), 'data', 'users.json');

  try {
    const usersData = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(usersData);

    if (users.find(u => u.email === email)) {
      return res.status(409).json({ message: 'User already exists' });
    }

    users.push({ name, email, password });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed' });
  }
}
