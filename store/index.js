/*
 * Copyright (C) 2020  SuperGreenLab <towelie@supergreenlab.com>
 * Author: Constantin Clauzel <constantin.clauzel@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const newOTAServerIP = '142.93.167.50'
const newOTAServerHostname = 'update.supergreenlab.com'

const newDriverOTABaseDir = '/DriverV2.1'
const newControllerOTABaseDir = '/ControllerV2.1'

export const state = () => {
  return {
    configJSONDriver: '',
    appHTMLDriver: '',

    configJSONController: '',
    appHTMLController: '',

    host: '',

    initState: '',
    searchState: '',
    uploadState: '',
    updateState: '',
  }
}

export const mutations = {
  setDriverFiles(state, { config, app }) {
    state.configJSONDriver = config
    state.appHTMLDriver = app
  },
  setControllerFiles(state, { config, app }) {
    state.configJSONController = config
    state.appHTMLController = app
  },
  setHost(state, { host }) {
    state.host = host
  },
  setInitState(state, { initState }) {
    state.initState = initState
  },
  setSearchState(state, { searchState }) {
    state.searchState = searchState
  },
  setUploadState(state, { uploadState }) {
    state.uploadState = uploadState
  },
  setUpdateState(state, { updateState }) {
    state.updateState = updateState
  },
  setHost(state, { host }) {
    state.host = host
  }
}

const isIP = (url) => {
  return url.match(/\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/)
}

export const actions = {
  async downloadConfig(context) {
    context.commit('setInitState', {initState: 'SEARCHING'})
    try {
      const driverTS = await this.$axios.$get(`http://${newOTAServerHostname}${newDriverOTABaseDir}/last_timestamp`, {responseType: 'text', headers: {'Accept': 'application/octet-stream'}})
      const driverConfig = await this.$axios.$get(`http://${newOTAServerHostname}${newDriverOTABaseDir}/${driverTS}/html_app/config.json`, {responseType: 'arraybuffer', headers: {'Accept': 'application/octet-stream'}})
      const driverApp = await this.$axios.$get(`http://${newOTAServerHostname}${newDriverOTABaseDir}/${driverTS}/html_app/app.html`, {responseType: 'arraybuffer', headers: {'Accept': 'application/octet-stream'}})
      context.commit('setDriverFiles', {config: driverConfig, app: driverApp})

      const controllerTS = await this.$axios.$get(`http://${newOTAServerHostname}${newControllerOTABaseDir}/last_timestamp`, {responseType: 'text', headers: {'Accept': 'application/octet-stream'}})
      const controllerConfig = await this.$axios.$get(`http://${newOTAServerHostname}${newControllerOTABaseDir}/${controllerTS}/html_app/config.json`, {responseType: 'arraybuffer', headers: {'Accept': 'application/octet-stream'}})
      const controllerApp = await this.$axios.$get(`http://${newOTAServerHostname}${newControllerOTABaseDir}/${controllerTS}/html_app/app.html`, {responseType: 'arraybuffer', headers: {'Accept': 'application/octet-stream'}})
      context.commit('setControllerFiles', {config: controllerConfig, app: controllerApp})
      context.commit('setInitState', {initState: 'OK'})
    } catch(e) {
      console.log(e)
      context.commit('setInitState', {initState: 'ERROR'})
    }
  },

  async findController(context, { query }) {
    context.commit('setSearchState', {searchState: 'SEARCHING'})
    if (!isIP(query)) {
      if (!query) {
        query = 'supergreencontroller'
      }
      query = `${query.toLowerCase()}.local`
    }
    let found = false
    for (let i = 0; i < 3; ++i) {
      try {
        const clientid = await this.$axios.$get(`http://${query}/s?k=BROKER_CLIENTID`, { timeout: 5000 })
        console.log(clientid)
        found = true
        break
      } catch(e) {
        console.log(e)
      }
    }
    if (!found) {
      context.commit('setSearchState', {searchState: 'NOTFOUND'})
      return
    }
    context.commit('setHost', {host: query})
    context.commit('setSearchState', {searchState: 'OK'})
  },

  async uploadConfigFiles(context) {
    context.commit('setUploadState', {uploadState: 'UPLOADING'})
    try {
      const { data: baseDir } = await this.$axios.get(`http://${this.state.host}/s?k=OTA_BASEDIR`)
      console.log(baseDir)
      if (baseDir.includes('Driver')) {
        await this.$axios.post(`http://${this.state.host}/fs/config.json`, this.state.configJSONDriver)
        await this.$axios.post(`http://${this.state.host}/fs/app.html`, this.state.appHTMLDriver)
      } else if (baseDir.includes('Controller')) {
        await this.$axios.post(`http://${this.state.host}/fs/config.json`, this.state.configJSONController)
        await this.$axios.post(`http://${this.state.host}/fs/app.html`, this.state.appHTMLController)
      }

      context.commit('setUploadState', {uploadState: 'OK'})
    } catch(e) {
      console.log(e)
      context.commit('setUploadState', {uploadState: 'ERROR'})
    }
  },

  async updateOTAParams(context) {
    context.commit('setUpdateState', {updateState: 'UPDATING'})
    try {
      await this.$axios.post(`http://${this.state.host}/s?k=OTA_SERVER_IP&v=${newOTAServerIP}`)
      await this.$axios.post(`http://${this.state.host}/s?k=OTA_SERVER_HOSTNAME&v=${newOTAServerHostname}`)

      const { data: baseDir } = await this.$axios.get(`http://${this.state.host}/s?k=OTA_BASEDIR`)
      if (baseDir.includes('Driver')) {
        await this.$axios.post(`http://${this.state.host}/s?k=OTA_BASEDIR&v=${newDriverOTABaseDir}`)
      } else if (baseDir.includes('Controller')) {
        await this.$axios.post(`http://${this.state.host}/s?k=OTA_BASEDIR&v=${newControllerOTABaseDir}`)
      }
      context.commit('setUpdateState', {updateState: 'OK'})
    } catch(e) {
      console.log(e)
      context.commit('setUpdateState', {updateState: 'ERROR'})
    }
  },

  async restart(context) {
    try {
      await this.$axios.post(`http://${this.state.host}/i?k=REBOOT&v=1`)
    } catch(e) {
      console.log(e)
    }
  }
}
