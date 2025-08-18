import Cookie from 'js-cookie'
import axios from 'axios'

// Inject as a Vue plugin (global access via this.$http_post and this.$http_get)
export default {
  install: (app) => {
    const baseUrl = {
      default: import.meta.env.VITE_API_BASE_URL || '', // gunakan .env
    }

    const buildClient = (prefix = 'default', additionalHeaders = {}, timeout = 60000) => {
      const token = Cookie.get('auth.token')
      const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0'
      const lang = navigator.language || 'en'

      const headers = {
        Authorization: `Bearer ${token}`,
        'x-api-version': appVersion,
        'Accept-Language': lang,
        ...additionalHeaders,
      }

      return axios.create({
        baseURL: baseUrl[prefix],
        timeout,
        headers,
      })
    }

    app.config.globalProperties.$http_post = async function (
      path,
      body,
      prefix = 'default',
      additionalHeaders = {},
      timeout = 60000
    ) {
      const client = buildClient(prefix, additionalHeaders, timeout)
      return client.post(path, body)
    }

    app.config.globalProperties.$http_get = async function (
      path,
      prefix = 'default',
      additionalHeaders = {},
      timeout = 60000
    ) {
      const client = buildClient(prefix, additionalHeaders, timeout)
      return client.get(path)
    }
  }
}
