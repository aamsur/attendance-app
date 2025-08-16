const Cookie = require('js-cookie')
export default ({ app }, inject) => {
  inject(
    'http_post',
    function (path, body, prefix = 'default', additional_headers = [], timeout = 60000) {
      const baseUrl = {
        default: process.env.baseUrl + '/',
      }

      endpoint = endpoint = baseUrl[prefix] + path // path should NOT started with slash
      const appversion = process.env.appVersion
      this.$axios.defaults.timeout = timeout
      this.$axios.setHeader(
        'Authorization',
        'Bearer ' + Cookie.get('auth.token')
      )
      this.$axios.setHeader('x-api-version', appversion)
      this.$axios.setHeader('Accept-Language', apiLang)

      return this.$axios.post(endpoint, body, additional_headers)
    }
  )
}
