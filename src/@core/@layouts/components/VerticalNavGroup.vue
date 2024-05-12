<script lang="ts" setup>
import { injectionKeyIsVerticalNavHovered, useLayouts } from '@layouts';
import { VerticalNavLink } from '@layouts/components';
import { canViewNavMenuGroup } from '@layouts/plugins/casl';
import type { NavGroup } from '@layouts/types';

const props = defineProps<{
  item: NavGroup
}>()

defineOptions({
  name: 'VerticalNavGroup',
})

const route = useRoute()
const router = useRouter()
const { width: windowWidth } = useWindowSize()
const { isVerticalNavMini, dynamicI18nProps } = useLayouts()
const hideTitleAndBadge = isVerticalNavMini(windowWidth)

/*
  ℹ️ We provided default value `ref(false)` because inject will return `T | undefined`
  Docs: https://vuejs.org/api/composition-api-dependency-injection.html#inject
*/
const isVerticalNavHovered = inject(injectionKeyIsVerticalNavHovered, ref(false))

/*
  ℹ️ We have to add watcher for `isVerticalNavCollapsed` to open & close the group when menu collapse state is changed
  We can't rely on watcher for `isVerticalNavHovered` because nav menu can be collapsed via customizer (basically without entering mouse inside nav menu)
  Hence, watcher for `isVerticalNavHovered` won't get triggered and there will no change in open state of nav group when menu is collapsed via customizer.
*/
// watch(isVerticalNavCollapsed, value => {
//   // If mouse in nav menu `isVerticalNavHovered` watcher will take care of open/close group
//   if (isVerticalNavHovered.value)
//     return

//   isGroupOpen.value = value ? false : isGroupActive.value
// })

const isGroupActive = ref(false)
const isGroupOpen = ref(true)
</script>

<template>
  <li v-if="canViewNavMenuGroup(item)" class="nav-grousp">
    <div class="nav-group-label">
      <TransitionGroup name="transition-slide-x">
        <span @click="isGroupOpen = !isGroupOpen" class="ma-3 grey-text">
          {{ item.title }}
        </span>
        <VSpacer></VSpacer>
        <VBtn @click="isGroupOpen = !isGroupOpen" class="mx-3" variant="text" icon>
          <VIcon size="20"
            :style="isGroupOpen ? 'transform: rotate(180deg);' : 'transform: rotate(0deg);' + 'transition: all ease-in-out 0.5s'">
            mdi-chevron-down</VIcon>
        </VBtn>
      </TransitionGroup>
    </div>
    <VSlideYTransition>
      <ul class="nav-items my-1" v-if="isGroupOpen">
        <Component :is="'children' in child ? 'VerticalNavGroup' : VerticalNavLink" v-for="child in item.children"
          :key="child.title" :item="child" />
      </ul>
    </VSlideYTransition>
  </li>
</template>

<style lang="scss">
.grey-text {
  color: #6e879b;
}

.layout-vertical-nav {
  .nav-group {
    &-label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
