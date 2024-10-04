// pages/api/auth.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Obtém o cookie 'auth' da solicitação
  const cookies = cookie.parse(req.headers.cookie || '')
  const auth = cookies.auth

  // Verifica se o cookie 'auth' é válido
  const isAuthenticated = !!auth
  return res.status(200).json(isAuthenticated)
  
}
