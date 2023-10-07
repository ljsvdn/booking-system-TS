import type { Config } from 'jest'

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.ts'],
} satisfies Config
