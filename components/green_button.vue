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
  <a
    :disabled='_enabled ? "" : "disabled"'
    :class='_enabled ? "" : $style.disabled'
    :id='$style.green_button'
    href='javascript:void(0)'
    @click='_onClick()'>
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: ['onClick', 'enabled'],
  data() {
    return {
      done: false
    }
  },
  methods: {
    _onClick() {
      if (!this.$props.enabled) return
      this.$data.done = true
      this.$props.onClick()
    }
  },
  computed: {
    _enabled() {
      return !this.$data.done && this.$props.enabled
    }
  },
}
</script>

<style module lang=stylus>

#green_button
  border: none
  border-radius: 3pt
  padding: 7pt 20pt
  background-color: #3bb30b
  color: white
  font-weight: 900
  cursor: pointer
  text-decoration: none

#green_button:hover
  background-color: #4bc31b

#green_button:active
  background-color: #2ba200

.disabled
  background-color: #dedede !important
  cursor: auto !important

</style>
