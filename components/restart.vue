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
      <h1 :id='$style.pagenum'>5</h1>
    </div>
    <div :id='$style.body'>
      <div :id='$style.text'>
        <h2>Restarting controller..</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('restart')
    setTimeout(() => {
      document.location.href = '/done';
    }, 5000);
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

</style>
