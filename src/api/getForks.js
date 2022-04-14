import { get } from '@/api/apiService'

export default (options) => {
  return get('/repos/{owner}/{repo}', { options, type: 'forks' })
}
