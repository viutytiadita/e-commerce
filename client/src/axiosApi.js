import axios from 'axios'

let ax = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    token: localStorage.getItem("token")
  }
})

export default ax