import axios from 'axios'

export default class RestService {

  constructor (path) {
    this.path = path
  }

  async get(file, params = []) {
    let url = this.path + file
    if (params.length > 0) {
      url += '?'
      url += params.join('&')
    }
    const ret = await axios.get(url)
    return ret
  }

}