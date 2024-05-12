<script lang="ts" setup>
import { HorizontalNavGroup, HorizontalNavLink } from '@layouts/components'
import type { HorizontalNavItems, NavGroup, NavLink } from '@layouts/types'

defineProps<{
  navItems: HorizontalNavItems
}>()

const resolveNavItemComponent = (item: NavLink | NavGroup) => {
  if ('children' in item)
    return HorizontalNavGroup

  return HorizontalNavLink
}

const { isInRoles } = useUserStore()
</script>

<template>
  <ul class="nav-items">
    <template v-for="(item, index) in navItems">
      <Component
        :is="resolveNavItemComponent(item)"
        v-if="item.roles ? isInRoles(item.roles) : true"
        :key="index"
        :item="item"
      />
    </template>
  </ul>
</template>

<style lang="scss">
.layout-wrapper.layout-nav-type-horizontal {
  .nav-items {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
