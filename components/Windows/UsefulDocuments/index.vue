<template>
  <window title="Полезные документы">
    <table-grid
      :actions="actions"
      @handle-action-create="openCreateWindow"
      @handle-action-update="openCreateWindow"
      @handle-action-destroy="openCreateWindow"
      @handle-action-refresh="openCreateWindow"
    >
      <window-table
        v-bind="table"
        @update:current-page="setCurrentPage"
        @refresh="refresh"
      >
        <template #column(file)="{ row }">
          <a :href="row.file">row.file</a>
        </template>
      </window-table>
    </table-grid>
    <creation-window v-if="state === 'creation'" />
  </window>
</template>

<script>
import TableGrid from 'Windows/Grids/Table.vue'

export default {
  name: 'UsefulDocumentsWindow',
  components: {
    TableGrid,
    CreationWindow: () => import('Windows/UsefulDocuments/Item.vue'),
  },
  data() {
    return {
      state: 'normal',
      currentPage: 1,
      rowsPerPage: 10,
    }
  },
  computed: {
    actions() {
      return [
        { id: 'create', text: 'Добавить', icon: 'add' },
        { id: 'update', text: 'Изменить', icon: 'edit' },
        { id: 'destroy', text: 'Удалить', icon: 'delete' },
        { id: 'refresh', text: 'Обновить', icon: 'refresh' },
      ]
    },
    table() {
      return {
        columns: [
          { id: 'relevanceDate', title: 'Дата актуальности' },
          { id: 'name', title: 'Наименование' },
          { id: 'file', title: 'Файл' },
        ],
        rows: [
          {
            relevanceDate: '02.01.2020',
            name: 'Первая',
            file: 'http://google.com',
          },
        ],
        currentPage: this.currentPage,
        rowsPerPage: this.rowsPerPage,
      }
    },
    maxPage() {
      return Math.ceil(this.table.rows.length / this.rowsPerPage)
    },
  },
  methods: {
    openCreateWindow() {
      this.state = 'creation'
    },
    refresh() {
      // refresh
    },
    setCurrentPage(value) {
      const parsedValue = parseInt(value)
      this.currentPage =
        parsedValue > 0 && parsedValue <= this.maxPage ? parsedValue : 1
    },
  },
}
</script>

<style scoped></style>
