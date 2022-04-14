import { Octokit } from '@octokit/core'

const octokit = new Octokit({ auth: process.env.VUE_APP_GITHUB_ACCESS_TOKEN })

export const STATES = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error',
  EMPTY: 'empty'
}

export const MESSAGES = {
  DEFAULT: 'Type Repository owner/name and hit Enter',
  WRONG_FORMAT: 'The query must be in :owner/:name format',
  NOT_FOUND: 'Repository not found',
  EMPTY_REQUEST: 'There is no results for this repo',
  SUCCESS: 'Success!',
  ERROR: 'Unknown Error. Try Again'
}

export const get = (url, params) => {
  const { options, type } = params
  return octokit.request(`GET ${url}/${type}`, options)
}
