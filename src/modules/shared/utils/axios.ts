import axios from 'axios'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-CSRF': '1',
}

const axiosInstance = axios.create({
  baseURL: '',
  headers,
  withCredentials: true,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the active organization from local storage
    const activeOrganization = localStorage.getItem('active-org')

    // If it exists, set it as a header on every request
    if (activeOrganization && !config.headers['tenant']) {
      config.headers['tenant'] = JSON.parse(activeOrganization).value
    }

    // console.log('request', config)

    return config
  },
  (error) => {
    console.log('error', error)

    // Handle request errors here
    return Promise.reject(error)
  },
)

//they dont work
axiosInstance.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = `/bff/login?returnUrl=${window.location.pathname}`
    }

    if (error.response.status === 403) {
      localStorage.removeItem('active-org')
      window.location.href = '/403'
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
