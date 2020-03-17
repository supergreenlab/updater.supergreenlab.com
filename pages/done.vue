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
        <Logo subtitle='Firmware upgrader'/>
      </div>
    </div>
    <div :id='$style.inner'>
      <div>
        <h1 :id='$style.pagenum'>5</h1>
      </div>
      <div :id='$style.body'>
        <div :id='$style.text'>
          <h2>Upgrade will occur in a few seconds.</h2>
          <p v-if='!done'><b>Leave the controller running</b>, after a few seconds it should <b>reboot again</b>, meaning that the upgrade is <b>done</b>.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/logo'

export default {
  components: {
    Logo,
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
  margin: 10pt
  font-size: 2em

#header
  height: 50pt

#body
  flex: 1
  display: flex
  justify-content: center
  flex-direction: column

#inner
  display: flex

#pagenum
  color: grey
  font-size: 8em
  padding: 0 10pt 0 20pt

#text
  display: flex
  flex-direction: column
  padding: 20pt

#text > h2
  margin: 0 0 20pt 0

</style>
