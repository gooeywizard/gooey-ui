<template>
  <div class="gw-field">
		<div class="gw-checkbox gw-row">
      
      <input type="checkbox" :id="inputId" :name="name" v-model="value">
			
			<label :for="inputId" v-html="label"></label>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'gui-checkbox',
		data () {
			return {
				value: false,
				inputId: this._uid + '-input'
			}
		},
		props: ['label','type','name'],
		methods: {
		}
	}
</script>

<style scoped>
</style>
