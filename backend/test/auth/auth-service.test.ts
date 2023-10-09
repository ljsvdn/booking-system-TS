import AuthService, {
  AuthPayload,
} from '../../src/features/auth/services/auth-service'

// To be finished after frontend is done
describe('AuthService', () => {
  let authService: AuthService

  it('should generate a valid JWT token', () => {
    const payload = { userId: 1, role: 'user' }
    const token = authService.generateToken(payload)

    expect(typeof token).toBe('string')
    expect(token.length).toBeGreaterThan(0)
  })

  it('should verify a valid JWT token', () => {
    const payload: AuthPayload = { userId: 1, role: 'user' }
    const token = authService.generateToken(payload)

    const decoded = authService.verifyToken(token)
    expect(typeof decoded).toBe(typeof payload)

    const { userId, role } = decoded as AuthPayload
    expect(userId).toEqual(payload.userId)
    expect(role).toEqual(payload.role)
  })

  it('should hash a password', async () => {
    const password = 'password123'
    const hashedPassword = await authService.hashPassword(password)

    expect(hashedPassword.length).toBeGreaterThan(0)
  })

  it('should verify a password against a hash', async () => {
    const password = 'password123'
    const hashedPassword = await authService.hashPassword(password)
    const matches = await authService.verifyPassword(password, hashedPassword)
    expect(matches).toBe(true)
  })
})
