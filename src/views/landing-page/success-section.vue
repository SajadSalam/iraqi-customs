<template>
  <div class="text-center d-flex justify-center align-center flex-column my-10 gap-5">
    <div class="success-circle">
      <VIcon
        size="100"
        color="success"
      >
        mdi-check
      </VIcon>
    </div>
    <h1 class="text-h2 font-weight-bold text-success">
      تم ارسال الطلب بنجاح
    </h1>
    <p>
      سيتم ارسالك رسالة نصية تحتوي على التفاصيل في اقرب وقت
      شكرا لتعاونك معنا!
    </p>
  </div>
</template>

<style lang="scss">
.success-circle {
  display: flex;
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  border: 2.5px solid rgba(var(--v-theme-success));
  border-radius: 50%;
}
</style>
