<template functional>
  <article
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    class="window-table-wrapper h-100"
    v-on="listeners"
  >
    <table class="window-table">
      <thead class="window-table__head">
        <tr>
          <th
            v-for="(column, i) in props.columns"
            :key="`column-header-${i}`"
            class="window-table__cell window-table__cell_header"
          >
            <slot
              :name="`column-header(${column.id})`"
              :column="column"
            >
              <span :inner-html.prop="column.title | nowrap" />
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in props.rows"
          :key="`row-${i}`"
        >
          <td
            v-for="(column, j) in props.columns"
            :key="`column-${j}`"
            class="window-table__cell"
          >
            <slot
              :name="`column(${column.id})`"
              :row="row"
              :column="column"
            >
              <span :inner-html.prop="row[column.id] | nowrap" />
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <vue-row
      tag="footer"
      class="window-table__footer"
      align-v="center"
      no-gutters
    >
      <slot name="footer">
        <vue-col
          cols="auto"
          class="mr-4"
        >
          <vue-btn
            class="window-table__btn window-table__btn_refresh"
            @click="listeners.refresh"
          >
            <vue-icon>refresh</vue-icon>
          </vue-btn>
        </vue-col>
        <vue-col
          cols="auto"
          class="d-flex align-items-center"
        >
          <vue-btn
            :disabled="props.currentPage === 1"
            class="window-table__btn window-table__btn_first-page"
            @click="listeners['update:current-page'](1)"
          >
            <vue-icon>first_page</vue-icon>
          </vue-btn>
          <vue-btn
            :disabled="props.currentPage === 1"
            class="window-table__btn window-table__btn_prev-page mr-3"
            @click="listeners['update:current-page'](props.currentPage - 1)"
          >
            <vue-icon>chevron_left</vue-icon>
          </vue-btn>

          <vue-text-field
            :value="String(props.currentPage)"
            class="window-table__page-input mr-2"
            @update:value="listeners['update:current-page']"
          />&nbsp;<span>
            из&nbsp;{{ Math.ceil(props.rows.length / props.rowsPerPage) }}
          </span>

          <vue-btn
            :disabled="
              props.currentPage ===
                Math.ceil(props.rows.length / props.rowsPerPage)
            "
            class="window-table__btn window-table__btn_next-page ml-3"
            @click="listeners['update:current-page'](props.currentPage + 1)"
          >
            <vue-icon>chevron_right</vue-icon>
          </vue-btn>
          <vue-btn
            :disabled="
              props.currentPage ===
                Math.ceil(props.rows.length / props.rowsPerPage)
            "
            class="window-table__btn window-table__btn_last-page"
            @click="
              listeners['update:current-page'](
                Math.ceil(props.rows.length / props.rowsPerPage)
              )
            "
          >
            <vue-icon>last_page</vue-icon>
          </vue-btn>
        </vue-col>
        <vue-col
          cols="auto"
          class="window-table__rows-info ml-auto"
        >
          <template v-if="props.rows.length">
            Показано&nbsp;записей&nbsp;{{
              (props.currentPage - 1) * props.rowsPerPage + 1
            }}&nbsp;-&nbsp;{{
              props.currentPage * props.rowsPerPage < props.rows.length
                ? props.currentPage * props.rowsPerPage
                : props.rows.length
            }}&nbsp;из&nbsp;{{ props.rows.length }}
          </template>
          <template v-else>
            Нет&nbsp;записей
          </template>
        </vue-col>
      </slot>
    </vue-row>
  </article>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'WindowTable',
  functional: true,
  props: {
    // TODO: Продумать тип для колонок.
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    // TODO: Продумать тип для строк.
    rows: {
      type: Array,
      default() {
        return []
      },
    },
    currentPage: {
      type: Number,
      default: 1,
    } as PropOptions<number>,
    rowsPerPage: {
      type: Number,
      default: 10,
    } as PropOptions<number>,
  },
})
</script>

<style lang="scss">
.window-table-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.window-table {
  width: 100%;
  border-collapse: collapse;
}

.window-table__head {
  border-top: 1px solid map_get($colors, gray);
  border-bottom: 1px solid map_get($colors, gray);
  background-color: map_get($colors, light-gray);
}

.window-table__cell {
  padding: 5px 20px;
  border-bottom: 1px solid map_get($colors, gray);
  font-size: 14px;
  line-height: 1.71;
  color: #3e3f42;

  &_header {
    padding: 10px 20px;
    text-transform: uppercase;
    font-size: 10px;
    line-height: 1.8;
    color: #4a4e5b;
  }
}

.vue-row.window-table__footer {
  flex-wrap: nowrap;
  padding: 10px 20px;
  border-top: 1px solid map_get($colors, gray);
  background-color: map_get($colors, light-gray);
}

.vue-btn.window-table__btn {
  padding: 0;
  border: none;
  box-shadow: none;
  background-color: transparent;
  color: map_get($colors, darkest);
  line-height: 1;
  transition: 0.2s;

  &:hover {
    background-color: transparent;
    color: map_get($colors, darkest);
  }

  &:disabled {
    opacity: 0.5;
  }

  &_refresh {
    width: 36px;
    height: 36px;
    border: 1px solid map_get($colors, gray);

    &:hover {
      border-color: map_get($colors, dark-gray);
    }
  }
}

.window-table__rows-info {
  font-size: 12px;
  font-weight: bold;
  line-height: 1.83;
  text-align: right;
  color: map_get($colors, dark-gray);
}

.window-table__page-input {
  width: 70px;
}
</style>
