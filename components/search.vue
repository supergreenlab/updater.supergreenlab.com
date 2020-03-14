<!--
      Copyright (C) 2020  SuperGreenLab <towelie@supergreenlab.com>
      Author: Constantin Clauzel <constantin.clauzel@gmail.com>

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <http://www.gnu.org/licenses/>.
 -->

<template>
  <div :id='$style.container'>
    <div>
      <h1 :id='$style.pagenum'>2</h1>
    </div>
    <div :id='$style.body'>
      <div :id='$style.text'>
        <h2>Looking for your controller</h2>
        <div v-if='notFound'>
          <b>Controller not found</b> by default name, please type it's <b>IP</b> address or its <b>name</b> below:
          <input :id='$style.input' placeholder='Ex: 192.168.1.42' type='text' v-model='query' />
          <div>
            <GreenButton :enabled='true' :onClick='_onResearch'>RESEARCH</GreenButton>
          </div>
        </div>
        <p v-else-if='!done'>Please wait..</p>
        <p v-else-if='done'>Found!</p>
      </div>
      <div :id='$style.buttons'>
        <GreenButton :enabled='done' :onClick='_onNext'>NEXT</GreenButton>
      </div>
    </div>
  </div>
</template>

<script>
import GreenButton from '~/components/green_button'

export default {
  components: {GreenButton,},
  props: ['onNext'],
  data() {
    return {
      query: '',
    }
  },
  mounted() {
    this.$store.dispatch('findController', { query: 'supergreencontroller' })
  },
  methods: {
    _onResearch() {
      console.log(this.$data.query)
      this.$store.dispatch('findController', { query: this.$data.query })
    },
    _onNext() {
      this.$props.onNext()
    },
  },
  computed: {
    notFound() {
      return this.$store.state.searchState == 'NOTFOUND'
    },
    done() {
      return this.$store.state.searchState == 'OK'
    },
  },
}
</script>

<style module lang=stylus>

#container
  display: flex

#pagenum
  color: grey
  font-size: 8em
  padding: 0 10pt 0 20pt

#body
  display: flex
  justify-content: center
  flex-direction: column
  color: dark-grey

#text
  display: flex
  flex-direction: column
  padding: 20pt

#text > h2
  margin: 0 0 20pt 0

#buttons
  display: flex
  justify-content: flex-end
  padding: 0 20pt

#input
  margin: 5pt 0 10pt 0

</style>
