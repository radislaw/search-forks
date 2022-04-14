<template>
  <div class="my-5">
    <WelcomeMessage :msg="message"/>
  </div>
</template>

<script>
import WelcomeMessage from '@/components/WelcomeMessage'

export default {
  name: 'HomeView',
  components: { WelcomeMessage },
  data () {
    return {
      message: 'Welcome! This is application for search forks from github repos'
    }
  }
}
</script>
