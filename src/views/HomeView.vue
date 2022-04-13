<template>
  <div class="container py-5">
    <h1>Welcome!</h1>
    <div class="form-group">
      <b-form-input size="lg" placeholder="Search" />
    </div>

    <div class="overflow-auto">
      <p class="mt-3">Current Page: {{ currentPage }}</p>

      <b-table
        striped hover
        :items="tableData"
        :per-page="perPage"
        :current-page="currentPage"
      ></b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  components: {
  },
  data () {
    return {
      perPage: 10,
      currentPage: 1
    }
  },
  computed: {
    ...mapState(['forks']),
    rows () {
      return this.forks.length
    },
    tableData () {
      // eslint-disable-next-line camelcase
      return this.forks.map(({ full_name, owner, stargazers_count, url }) =>
        ({ repository_name: full_name, owner: owner.login, stars: stargazers_count, url }))
    }
  },
  methods: mapActions(['getForks']),
  mounted () {
    this.getForks()
  }
}
</script>
