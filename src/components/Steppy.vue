<script setup>
import { computed, reactive } from 'vue'
import { VIcon } from 'vuetify/lib/components/VIcon/index.mjs'

const props = defineProps({
  step: {
    type: Number,
    default: 1,
  },
  tabs: {
    type: Array,
    default: reactive([
      {
        title: 'Step 1',
        iconSuccess: null,
        isValid: true,
      },
      {
        title: 'Step 2',
        iconSuccess: null,
        isValid: true,
      },
      {
        title: 'Step 3',
        iconSuccess: null,
        isValid: true,
      },
    ]),
  },
  finalize: {
    type: Function,
    default() {
      return {}
    },
  },
  backText: {
    type: String,
    default: 'Back',
  },
  nextText: {
    type: String,
    default: 'Next',
  },
  doneText: {
    type: String,
    default: 'Done',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  primaryColor1: {
    type: String,
    default: '#22C36C',
  },
  primaryColor2: {
    type: String,
    default: '#fff',
  },
  backgroundColor: {
    type: String,
    default: '#fff',
  },
  circleSize: {
    type: Number,
    default: 68,
  },
})

const emit = defineEmits(['update:step'])

const cssVars = computed(() => {
  return {
    '--primaryColor1': props.primaryColor1,
    '--primaryColor2': props.primaryColor2,
    '--backgroundColor': props.backgroundColor,
    '--circleSize': `${props.circleSize}px`,
  }
})

const incrementStep = () => {
  const step = props.step + 1

  emit('update:step', step)
}

const decrementStep = () => {
  const step = props.step - 1

  emit('update:step', step)
}

const steppyProgress = computed(() => {
  return `${(100 / (props.tabs.length - 1)) * (props.step - 1)}%`
})

const circleStyles = computed(() => {
  return {
    height: `${props.circleSize}px`,
    width: `${props.circleSize}px`,
  }
})

const itemIconColor = index => {
  if (index === props.step - 1)
    return 'success'
  if (index < props.step - 1)
    return 'white'

  return 'primary'
}
</script>

<template>
  <div
    class="wrapper-steppy"
    :style="cssVars"
  >
    <div class="steppy">
      <div class="steppy-progress">
        <div
          class="steppy-progress-bar"
          :style="`width:${steppyProgress}`"
        />
      </div>

      <div
        v-for="(item, index) in props.tabs"
        :key="index"
        class="steppy-item"
        :class="{
          current: props.step === index + 1,
          success: props.step > index + 1,
        }"
      >
        <div
          class="steppy-item-counter"
          :style="circleStyles"
        >
          <VIcon
            :color="itemIconColor(index)"
            size="30"
          >
            {{ item.iconSuccess }}
          </VIcon>
        </div>
        <span class="steppy-item-title">{{ item.title }}</span>
      </div>
    </div>

    <div
      v-for="index in props.tabs.length"
      :key="index"
      class="steppy-content"
    >
      <div
        v-if="props.step === index"
        class="steppy-pane"
      >
        <slot :name="index" />
      </div>
    </div>

    <div class="controls">
      <button
        v-if="props.step !== 1"
        class="btn"
        type="button"
        @click="decrementStep"
      >
        {{ props.backText }}
      </button>
      <button
        v-if="props.step !== props.tabs.length"
        class="btn btn--default-2"
        type="button"
        :disabled="!props.tabs[props.step - 1].isValid"
        @click="incrementStep"
      >
        {{ props.nextText }}
      </button>
      <button
        v-else
        class="btn btn--default-2"
        type="button"
        :disabled="!props.tabs[props.step - 1].isValid || loading"
        @click="finalize"
      >
        <span
          v-if="loading"
          class="loader"
        />
        <span v-else>{{ props.doneText }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
$primary-1: var(--primaryColor1);
$primary-2: var(--primaryColor2);
$backgroundColor: var(--backgroundColor);
$transition: all 500ms ease;

body {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
}

.tx-default-2 {
  color: $primary-1;
  font-weight: 600;
}

.wrapper-steppy {
  padding-top: 60px;
  padding-bottom: 60px;
}

.steppy {
  position: relative;
  z-index: 0;
  display: flex;
  width: auto;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;

  &-progress {
    position: absolute;
    z-index: -1;
    right: 0;
    left: 0;
    height: 10px;
    margin: 0 auto;
    background-color: #d4e5f7;

    &-bar {
      position: absolute;
      right: 0;
      width: 0;
      height: 100%;
      background-color: $primary-1;
      transition: $transition;
    }
  }
}

.steppy-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #c5c5c5;
  transition: $transition;

  &-counter {
    position: relative;
    display: grid;
    width: 20px;
    height: 20px;
    border: 4px #d4e5f7 solid;
    border-radius: 100%;
    background-color: $primary-2;
    place-items: center;

    .icon-success {
      position: absolute;
      width: 24px;
      opacity: 0;
      transform: scale(0);
      transition: $transition;
    }

    .number {
      font-size: 22px;
      transition: $transition;
    }
  }

  &-title {
    position: absolute;
    bottom: -43px;
    font-size: 14px;
    text-align: center;
  }
}

.steppy-item.success {
  .steppy-item-counter {
    width: var(--circleSize);
    height: var(--circleSize);
    background-color: $primary-1;
    font-weight: 600;

    .icon-success {
      width: calc(var(--circleSize) * 0.35);
      color: white;
      opacity: 1;
      transform: scale(1);
    }

    .number {
      font-size: calc(var(--circleSize) * 0.32);
      opacity: 0;
      transform: scale(0);
    }
  }

  .steppy-item-title {
    color: $primary-1;
  }
}

.steppy-item.current {
  .steppy-item-counter {
    border-color: $primary-1;
    color: #fff;
    font-weight: 600;
  }

  .steppy-item-title {
    color: #818181;
  }
}

.steppy-pane {
  padding: 25px;
  border-radius: 15px;
  margin: 60px 0 20px;
  background-color: $backgroundColor;
  box-shadow: 0 0 10px rgba(0, 0, 0, 30%);
  color: #333;
  text-align: center;
}

.controls {
  display: flex;
}

.btn {
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: #333;
  cursor: pointer;
  font-size: 0.75rem;
  line-height: 1.5;
  text-align: center;
  transition: all 150ms;
  vertical-align: middle;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &--default-2 {
    border-color: $primary-1;
    margin-left: auto;
    background-color: $primary-1;
    color: #fff;
  }
}

.loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid #fff;
  border-radius: 50%;
  border-bottom-color: transparent;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
