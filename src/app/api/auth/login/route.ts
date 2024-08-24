import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

// GET /api/auth/login
// Required query parameters: username, password
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const prisma = new PrismaClient()

  // Ensure this is a GET request
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, password } = req.query

  // Validate required query parameters
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  try {
    // Fetch the user with the provided credentials
    const user = await prisma.user.findUnique({
      where: {
        username: username as string,
        password: password as string,
      },
    })

    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error })
  } finally {
    await prisma.$disconnect()
  }
}
