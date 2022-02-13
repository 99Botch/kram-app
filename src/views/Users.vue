<template>
  <div class="users" id="bite">
    <p>This is the users' page</p>
    {{ info }}
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
  name: 'bite',
  data () {
    return {
      info: null
    }
  },
mounted () {
    axios
      .get('http://localhost:3000/users/')
        .then(response => (this.info = response.data))
        .catch(e => { this.errors.push(e) })
  }
}
</script>
