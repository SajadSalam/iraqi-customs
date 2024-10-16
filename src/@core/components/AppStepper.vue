<script setup lang="ts">
interface Item {
  title: string
  icon?: string
  size?: string
  subtitle?: string
}

type Direction = 'vertical' | 'horizontal'

interface Props {
  items: Item[]
  currentStep?: number
  direction?: Direction
  iconSize?: string | number
  isActiveStepValid?: boolean
}

interface Emit {
  (e: 'update:currentStep', value: number): void
}

const props = withDefaults(defineProps<Props>(), {
  currentStep: 0,
  direction: 'horizontal',
  iconSize: 52,
  isActiveStepValid: undefined,
})

const emit = defineEmits<Emit>()

const currentStep = ref(props.currentStep || 0)

// check if step is completed or active and return class name accordingly
const activeOrCompletedStepsClasses = computed(() => (index: number) => (
  index < currentStep.value
    ? 'stepper-steps-completed'
    : index === currentStep.value ? 'stepper-steps-active' : ''
))

// check if step is horizontal and not last step
const isHorizontalAndNotLastStep = computed(() => (index: number) => (
  props.direction === 'horizontal'
  && props.items.length - 1 !== index
))

// check if validation is enabled
const isValidationEnabled = computed(() => {
  return props.isActiveStepValid !== undefined
})

watchEffect(() => {
  // we need to check undefined because if we pass 0 as currentStep it will be falsy
  if (
    props.currentStep !== undefined
    && props.currentStep < props.items.length
    && props.currentStep >= 0
  )
    currentStep.value = props.currentStep

  emit('update:currentStep', currentStep.value)
})
</script>

<template>
  <VSlideGroup
    v-model="currentStep"
    class="app-stepper"
    show-arrows
    :direction="props.direction"
  >
    <VSlideGroupItem
      v-for="(item, index) in props.items"
      :key="item.title"
      :value="index"
    >
      <div
        class="cursor-pointer mx-1"

        :class="[
          (!props.isActiveStepValid && (isValidationEnabled)) && 'stepper-steps-invalid',
          activeOrCompletedStepsClasses(index),

        ]"
        :style="`width:${100 / items.length}%`"
        @click="!isValidationEnabled && emit('update:currentStep', index)"
      >
        <!-- SECTION stepper step with icon -->
        <template v-if="item.icon">
          <div class="stepper-icon-step text-high-emphasis d-flex align-center gap-2">
            <!-- 👉 icon and title -->
            <div class="d-flex align-center gap-4 step-wrapper">
              <div class="stepper-icon">
                {{ index + 1 }}
              </div>

              <p class="stepper-title font-weight-medium mb-0">
                {{ item.title }}
              </p>
              <span
                v-if="item.subtitle"
                class="stepper-subtitle"
              >
                <span class="text-sm">{{ item.subtitle }}</span>
              </span>
            </div>

            <!-- 👉 append chevron -->
            <!--
              <VIcon
              v-if="isHorizontalAndNotLastStep(index)"
              class="flip-in-rtl stepper-chevron-indicator mx-6"
              size="24"
              icon="tabler-chevron-right"
              />
            -->
            <VDivider
              v-if="index !== items.length - 1"
              class="mx-4"
            />
            <!--
              <div
              v-if="index !== items.length - 1"
              style="width: 100%; height: 1px; background: #000;"
              />
            -->
          </div>
        </template>
        <!-- !SECTION  -->

        <!-- SECTION stepper step without icon -->
        <template v-else>
          <div class="d-flex align-center gap-x-2">
            <div class="d-flex align-center gap-2">
              <div
                class="d-flex align-center justify-center"
                style="block-size: 24px; inline-size: 24px;"
              >
                <!-- 👉 custom circle icon -->
                <template v-if="index >= currentStep">
                  <div
                    v-if="(!isValidationEnabled || props.isActiveStepValid || index !== currentStep)"
                    class="stepper-step-indicator"
                  />

                  <VIcon
                    v-else
                    icon="tabler-alert-circle"
                    size="24"
                    color="error"
                  />
                </template>

                <!-- 👉 step completed icon -->

                <VIcon
                  v-else
                  icon="mdi-check-circle"
                  class="stepper-step-icon"
                  size="24"
                />
              </div>

              <!-- 👉 Step Number -->
              <h4 class="text-h4 step-number">
                {{ (index + 1).toString().padStart(2, '0') }}
              </h4>
            </div>

            <!-- 👉 title and subtitle -->
            <div style="line-height: 0;">
              <h6 class="text-sm font-weight-medium step-title">
                {{ item.title }}
              </h6>

              <span
                v-if="item.subtitle"
                class="text-xs step-subtitle"
              >
                {{ item.subtitle }}
              </span>
            </div>

            <!-- 👉 stepper step line -->
            <div
              v-if="isHorizontalAndNotLastStep(index)"
              :style="`background-color: ${index < currentStep ? 'rgb(var(--v-theme-success))' : 'rgb(var(--v-theme-primary))'};`"
              class="stepper-step-line"
            />
          </div>
        </template>
        <!-- !SECTION  -->
      </div>
    </VSlideGroupItem>
  </VSlideGroup>
</template>

<style lang="scss">
/* .success {
  background-color: rgb(var(--v-theme-success)) !important;
} */

.app-stepper {
  border-radius: 50px !important;

  // 👉 stepper step with bg color
  &.stepper-icon-step-bg {
    .stepper-icon-step {
      .step-wrapper {
        flex-direction: row !important;
      }

      .stepper-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.3125rem;
        background-color: rgba(var(--v-theme-on-surface), var(--v-selected-opacity));
        block-size: 2.5rem;
        color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
        inline-size: 2.5rem;
        margin-inline-end: 0.3rem;
      }

      .stepper-title,
      .stepper-subtitle {
        line-height: normal;
      }

      .stepper-title {
        color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
        font-size: 0.9375rem;
        font-weight: 500 !important;
      }

      .stepper-subtitle {
        color: rgba(var(--v-theme-on-surface), var(--v-disabled-opacity));
        font-size: 0.875rem;
      }
    }

    .stepper-steps-active {
      .stepper-icon-step {
        .stepper-icon {
          background-color: rgb(var(--v-theme-primary));
          color: rgba(var(--v-theme-on-primary));
        }
      }
    }

    .stepper-steps-completed {
      .stepper-icon-step {
        .stepper-icon {
          color: rgba(var(--v-theme-primary));
        }
      }
    }
  }

  // 👉 stepper step with icon and  default
  .v-slide-group__content {
    width: 100%;
    border-radius: 50px !important;

    .stepper-step-indicator {
      border: 0.3125rem solid rgb(var(--v-theme-primary));
      border-radius: 50%;
      background-color: rgb(var(--v-theme-surface));
      block-size: 1.25rem;
      inline-size: 1.25rem;
      opacity: var(--v-activated-opacity);
    }

    .stepper-step-line {
      border-radius: 0.1875rem;
      background-color: rgb(var(--v-theme-primary));
      block-size: 0.1875rem;
      inline-size: 55%;
      opacity: var(--v-activated-opacity);
    }

    .stepper-chevron-indicator {
      color: rgba(var(--v-theme-on-surface), var(--v-disabled-opacity));
    }

    .stepper-steps-completed,
    .stepper-steps-active {
      .stepper-icon-step,
      .stepper-step-icon {
        color: rgb(var(--v-theme-success)) !important;
      }

      .stepper-step-indicator {
        opacity: 1;
      }
    }

    .stepper-steps-completed {
      .stepper-step-line {
        opacity: 1;
      }

      .stepper-chevron-indicator {
        color: rgb(var(--v-theme-primary));
      }
    }

    .stepper-steps-invalid.stepper-steps-active {
      .stepper-icon-step,
      .step-number,
      .step-title,
      .step-subtitle {
        color: rgb(var(--v-theme-error)) !important;
      }
    }
  }
}
</style>
