// useHomePage

export const useHomePage = defineStore('HomePage', () => {
  enum Route {
    HomeSection,
    ApplicationSection,
    DeliveryOrdersSection,
    SuccessSection,
  }
  const currentRoute = ref<Route>(Route.HomeSection)

  const changeRoute = (route: Route) => {
    currentRoute.value = route
  }

  const steps = [
    {
      title: 'معلومات المدير المفوض',

    },
    {
      title: 'معلومات الشركة',
    },
    {
      title: 'معلومات الحساب و التأكيد',
    },
  ]

  watch(currentRoute, () => {
    scrollTo(0, 0)
  }, { immediate: true })

  return {
    changeRoute,
    Route,
    currentRoute,
    steps,
  }
})
