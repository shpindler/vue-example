<template>
  <window
    :can-be-turned="false"
    :can-be-maximized="false"
  >
    <vue-form>
      <input
        v-model="form.relevanceDate"
        type="date"
        name="relevanceDate"
      >
      <input
        v-model="form.name"
        name="name"
      >
      <input
        type="file"
        name="file"
        @change="form.file = $event"
      >
    </vue-form>
    <template #footerButtons="{ close }">
      <vue-btn @click="save">
        Сохранить
      </vue-btn>
      <vue-btn @click="close">
        Отмена
      </vue-btn>
    </template>
  </window>
</template>

<script>
export default {
  name: 'UsefulDocument',
  props: {
    item: {
      type: Object,
      required: false,
    },
  },
  data() {
    const form = this.item
      ? { ...this.item }
      : {
        relevanceDate: null,
        name: '',
        file: null,
      }
    return {
      form,
    }
  },
  methods: {
    save() {
      // save
    },
  },
}
</script>

<style scoped></style>
