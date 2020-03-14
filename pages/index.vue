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
  <div :id="$style.container">
    <div :id='$style.header'>
      <div :id='$style.logo'>
        <Logo />
      </div>
    </div>
    <div :id='$style.body'>
      <transition name='home'>
        <Welcome v-if='page == 0' :onNext='onNext' />
        <Search v-if='page == 1' :onNext='onNext' />
        <Upload v-if='page == 2' :onNext='onNext' />
        <Update v-if='page == 3' :onNext='onNext' />
        <Restart v-if='page == 4' :onNext='onNext' />
      </transition>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/logo'
import Welcome from '~/components/welcome'
import Search from '~/components/search'
import Upload from '~/components/upload'
import Update from '~/components/update'
import Restart from '~/components/restart'

export default {
  components: {
    Logo,
    Welcome,
    Search,
    Upload,
    Update,
    Restart,
  },
  data() {
    return {
      page: 0
    }
  },
  methods: {
    onNext() {
      this.$data.page += 1
    }
  },
}
</script>

<style module lang="stylus">

#container
  display:flex
  flex-direction: column
  margin: 0 auto
  width: 100vw
  height: 100vh
  display: flex
  justify-content: center
  align-items: center

#logo
  font-size: 2em

#header
  height: 50pt

#body
  flex: 1
  display: flex
  justify-content: center
  flex-direction: column


</style>
