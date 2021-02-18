<template functional>
  <section
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    class="table-grid grow d-flex flex-column"
    v-on="listeners"
  >
    <slot name="top">
      <slot name="actions">
        <section
          v-if="props.actions.length"
          class="table-grid-actions py-2"
        >
          <window-action
            v-for="action in props.actions"
            :key="`action-${action.id}`"
            v-bind="action"
            @click="listeners[`handle-action-${action.id}`]()"
          />
        </section>
      </slot>
    </slot>
    <slot>
      <window-table
        v-if="props.table"
        v-bind="props.table"
      />
    </slot>
  </section>
</template>

<script>
export default {
  name: 'TableGrid',
  functional: true,
  props: {
    actions: {
      type: Array,
      default() {
        return []
      },
    },
    table: {
      type: Object,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.table-grid-actions {
  display: inline-flex;
}
</style>
