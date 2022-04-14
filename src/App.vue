<template>
  <div id="app" class="container py-5">
    <router-link to="/" class="d-block my-3">Home</router-link>
    <AppSearch
      :callback="fetchData"
      :currentState="currentState"
      :message="message"
      @clearState="clearState"
      class="mb-5"/>
    <router-view/>
  </div>
</template>

<script>
import AppSearch from '@/components/AppSearch'
import { mapActions, mapState } from 'vuex'
export default {
  components: { AppSearch },
  computed: {
    ...mapState('forks', ['forks', 'currentState', 'message']),
    rows () {
      return this.forks.length
    },
    tableData () {
    // eslint-disable-next-line camelcase
      return this.forks.map(({ full_name, owner, stargazers_count, url }) => {
        return {
          repository_name: full_name,
          owner: owner.login,
          stars: stargazers_count,
          url
        }
      })
    }
  },
  methods: {
    ...mapActions('forks', ['fetchForks', 'clearState']),
    async fetchData (data) {
      await this.fetchForks(data)
      if (this.$route.name === 'home') {
        await this.$router.push({ name: 'forks', query: { search: data } })
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
