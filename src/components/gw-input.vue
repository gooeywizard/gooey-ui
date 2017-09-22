<template>
  <div class="gw-field" :class="getFieldClasses()">
		<div class="gw-input">
			
			<!-- text -->
			<input v-if="type === 'text'" type="text" :id="inputId" v-model="value" :name="name" v-validate="validate" v-on:focus="focusHandler()" v-on:blur="blurHandler()">
			
			<!-- email -->
			<input v-if="type === 'email'" type="email" :id="inputId" v-model="value" :name="name" v-validate="validate" v-on:focus="focusHandler()" v-on:blur="blurHandler()">
			
			<!-- password -->
			<input v-if="type === 'password'" type="password" :id="inputId" v-model="value" :name="name" v-validate="validate" v-on:focus="focusHandler()" v-on:blur="blurHandler()">
			
			<!-- date -->
			<input v-if="type === 'date'" type="date" :id="inputId" v-model="value" :name="name" v-validate="validate||''" v-on:focus="focusHandler()" v-on:blur="blurHandler()">
      
			<label class="gw-field-label" :for="inputId">{{ label }}</label>
			
		</div>
		
		<div class="gw-field-feedback" v-if="errorMsg && errors.has(name) && fields[name].dirty && fields[name].touched">{{ errorMsg }}</div>
		
	</div>
</template>

<script>
	export default {
		name: 'gw-input',
		data () {
			return {
				value: '',
				hasFocus: false,
				inputId: this._uid + '-input'
			}
		},
		props: ['label','validate','type','name','error-msg'],
		methods: {
			focusHandler: function() {
				this.$data.hasFocus = true;
			},
			blurHandler: function() {
				this.$data.hasFocus = false;
			},
			getFieldClasses: function() {
				let input = this.fields[this.$props.name];

				if(input) {
					return {
						'touched': input.touched,
						'untouched': input.untouched,
						'dirty': input.dirty,
						'pristine': input.pristine,
						'invalid': input.invalid,
						'valid': input.valid,
						'has-focus': this.$data.hasFocus,
						'has-value': this.$data.value.length > 0
					};
				}

				return {};
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
*/
</style>
