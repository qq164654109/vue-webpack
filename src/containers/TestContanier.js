import { requestTest } from '@/api/test';

export default {
  props: {},
  data() {
    return {
      loading: false,
      empty: false,
      tableData: [],
      page: 1,
      size: 12,
      total: 0
    }
  },
  created () {
    this.RequestTable();
  },
  methods: {
    RequestTable() {
      this.loading = true;
      requestTest({
        page: this.page - 1,
        size: this.size,
      }).then(data => {
        this.tableData = data;
        this.total = 100;
      }).finally(() => {
        this.loading = false;
      })
    },
    setPage(payload) {
      payload = Number(payload);
      if (this.page === payload) return;
      this.page = payload;
      this.RequestTable();
    }
  },
  render() {
    return this.$scopedSlots.default({
      loading: this.loading,
      tableData: this.tableData,
      page: this.page,
      size: this.size,
      total: this.total,
      setPage: this.setPage
    })
  }
}