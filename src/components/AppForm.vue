<template>
  <b-form @submit.stop.prevent="submit">
    <label :for="id" v-if="label">{{ label }}</label>
    <b-input-group>
      <b-form-input
        v-model="searchValue"
        :state="state"
        :id="id"
        aria-describedby="input-live-success input-live-error input-live-help"
      />
      <b-input-group-append>
        <b-button type="submit" variant="info" class="d-flex justify-content-center align-items-center">
          <b-spinner v-if="isLoading" label="Spinning" variant="light" small class="position-absolute" />
          <span :class="{'invisible': isLoading}">Search</span>
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <b-form-invalid-feedback id="input-live-error" :state="state">
      <slot name="invalid"/>
    </b-form-invalid-feedback>
    <b-form-valid-feedback id="input-live-success" :state="state">
     <slot name="valid"/>
    </b-form-valid-feedback>
    <b-form-text id="input-live-help">
      <slot name="help"/>
    </b-form-text>
  </b-form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    value: {
      type: String,
      required: true
    },
    state: {
      type: [Boolean, null],
      default: null
    },
    id: {
      type: String,
      default: Math.random().toString()
    },
    label: String,
    isLoading: Boolean
  },
  computed: {
    searchValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>
