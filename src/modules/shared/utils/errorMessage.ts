import AlertMessageAntd from '../components/AlertMessageAntd/AlertMessageAntd'

export const handleError = (err: unknown, defaultMessage?: string) => {
  if (
    err &&
    typeof err === 'object' &&
    'errors' in err &&
    Array.isArray(err.errors) &&
    err.errors.length > 0
  ) {
    return AlertMessageAntd.error(err.errors.map((error: { message: string }) => error.message))
  }
  if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
    return AlertMessageAntd.error(err.message, 3)
  }

  if (typeof err === 'string') {
    return AlertMessageAntd.error(err, 3)
  }

  return AlertMessageAntd.error(defaultMessage ?? 'Une erreur est survenue', 3)
}
