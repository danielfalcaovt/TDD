import type { Config } from '@jest/types'

const baseDir = 'src/app/server_app/**/*.ts'
const testDir = 'src/test/server_app/**/*.test.ts'

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