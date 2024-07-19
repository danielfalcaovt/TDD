import type { Config } from '@jest/types'

const baseDir = 'src/app/password_checker/**/*.ts'
const testDir = 'src/test/password_checker/**/*.spec.ts'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `<rootDir>/${baseDir}`
    ],
    testMatch: [
        `<rootDir>/${testDir}`
    ]
}

export default config