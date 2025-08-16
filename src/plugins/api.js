import Cookie from 'js-cookie'
import axios from 'axios'

// Inject as a Vue plugin (global access via this.$http_post)
export default {
  install: (app) => {
    const baseUrl = {
      default: import.meta.env.VITE_API_BASE_URL || '', // gunakan .env
    }

    console.log(baseUrl)
    app.config.globalProperties.$http_post = async function (
      path,
      body,
      prefix = 'default',
      additionalHeaders = {},
      timeout = 60000
    ) {
      const endpoint = baseUrl[prefix] + path // path should NOT start with slash

      const token = Cookie.get('auth.token')
      const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0'
      const lang = navigator.language || 'en'

      const headers = {
        Authorization: `Bearer ${token}`,
        'x-api-version': appVersion,
        'Accept-Language': lang,
        ...additionalHeaders,
      }

      const client = axios.create({
        baseURL: baseUrl[prefix],
        timeout,
        headers,
      })

      return client.post(path, body)
    }
  }
}
