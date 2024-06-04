<script lang="ts" setup>
import Iraq from './Iraq.svg?raw'

const emits = defineEmits('refresh')

onMounted(() => {
  document.querySelectorAll('path').forEach(path => {
    path.addEventListener('click', e => {
      e.target.style.fill = '#3f5aa9'
      document.querySelectorAll('path').forEach(p => {
        if (p !== e.target)
          p.style.fill = ''
      })
      emits('refresh')
    })
  })
})
</script>

<template>
  <div>
    <div v-html="Iraq" />
  </div>
</template>

<style lang="scss">
path {
  transition: all 0.3s;

  &:hover {
    fill: #3f5aa9;
  }
}
</style>
