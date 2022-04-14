<template>
  <div>
    <div class="overflow-auto min-vh-100">

      <b-spinner label="Fetching" variant="primary" v-if="isFetching" class="d-block my-5 mx-auto"/>

       <b-alert show variant="warning" v-else-if="isEmpty || isError">Forks not found!</b-alert>

      <template v-else>
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
          aria-controls="forks-table"
          @input="setPage"
        ></b-pagination>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { STATES } from '@/api/apiService'

export default {
  name: 'ForksView',
  data () {
    return {
      perPage: 10,
      currentPage: 1
    }
  },
  computed: {
    ...mapState('forks', ['forks', 'currentState']),
    rows () {
      return this.forks.length
    },
    tableData () {
      /* eslint-disable */
      return this.forks.map(({
        full_name,
        owner,
        stargazers_count,
        url
      }) => {
        return {
          repository_name: full_name,
          owner: owner.login,
          stars: stargazers_count,
          url
        }
      })
      /* eslint-enable */
    },
    isFetching () {
      return this.currentState === STATES.FETCHING
    },
    isEmpty () {
      return this.currentState === STATES.EMPTY
    },
    isError () {
      return this.currentState === STATES.ERROR
    }
  },
  methods: {
    ...mapActions('forks', ['fetchForks']),
    setPage (page) {
      this.$router.push({ name: 'forks', query: { ...this.$route.query, page } })
    }
  },
  mounted () {
    const data = this.$route.query.search
    this.fetchForks(data)
  },
  watch: {
    $route: {
      handler ({ query }) {
        this.currentPage = query.page || 1
      },
      immediate: true
    }
  }
}
</script>
