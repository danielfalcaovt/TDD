import type { Config } from "@jest/types"

const config: Config.ConfigGlobals = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true
}

export default config