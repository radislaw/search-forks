<template>
  <AppForm
    v-model="searchText"
    placeholder="Search"
    :state="inputState"
    :isLoading="isFetching"
    @input="clearState"
    @submit="search"
    debounce="300"
  >
    <template #invalid>
      {{message}}
    </template>
    <template #valid>
      {{message}}
    </template>
    <template #help v-if="isIdle">
      {{message}}
    </template>
  </AppForm>
</template>

<script>
import AppForm from '@/components/AppForm'
import { STATES } from '@/api/apiService'

export default {
  name: 'AppSearch',
  components: { AppForm },
  props: {
    message: {
      type: String
    },
    callback: {
      type: Function,
      required: true
    },
    currentState: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    inputState () {
      switch (this.currentState) {
        case STATES.SUCCESS:
          return true
        case STATES.ERROR:
          return false
        default:
          return null
      }
    },
    isFetching () {
      return this.currentState === STATES.FETCHING
    },
    isIdle () {
      return this.currentState === STATES.IDLE
    }
  },
  methods: {
    async search () {
      try {
        const data = await this.callback(this.searchText)
        this.$emit('success', data)
      } catch (e) {
        this.$emit('error', e)
        throw e
      }
    },
    clearState () {
      this.$emit('clearState')
    }
  },
  watch: {
    searchText (val) {
      if (!val) {
        this.clearState()
      }
    },
    $route ({ query }) {
      this.searchText = query.search || ''
    }
  }
}
</script>
