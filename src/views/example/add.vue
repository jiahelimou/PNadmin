<template>
  <calendar-mgt-add :is-edit="true" />
</template>

<script>
import calendarmgtadd from './components/calendar-mgt-add'

export default {
  name: 'AddForm',
  components: { calendarmgtadd }
}
</script>

