import type { Config } from '@jest/types'

const baseDir = 'src/app/server_app/server/*.ts'
const testDir = 'src/test/server_app/server/*.spec.ts'

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