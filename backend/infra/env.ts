export enum EnvKeys {
  ENV_NAME = 'ENV_NAME',
}

export const getEnvVariable = (key: EnvKeys): string => process.env[key] || ''

export const getEnvName = (): EnvName => {
  const envName = getEnvVariable(EnvKeys.ENV_NAME) as EnvName

  if (!Object.values(EnvName).includes(envName)) {
    throw new Error(`Invalid env name: "${envName}". Should be one of ${Object.values(EnvName).join(', ')}`)
  }

  return envName
}

export enum EnvName {
  LOCAL = 'LOCAL',
  PROD = 'PROD'
}

export const isDev = (env: EnvName): boolean => [EnvName.LOCAL].includes(env)
export const isProd = (env: EnvName): boolean => env === EnvName.PROD
