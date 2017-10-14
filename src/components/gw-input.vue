<template>
  <div class="gw-field" :class="getFieldClasses()">
		<div class="gw-input">
			
			<!-- text -->
			<input v-if="type === 'text'" type="text" ref="input" :id="inputId" :name="name" v-validate="validate || ''" v-on:focus="focusHandler()" v-on:blur="blurHandler()" :value="value" @input="updateValue()">
			
			<!-- email -->
			<input v-if="type === 'email'" type="email" ref="input" :id="inputId" :name="name" v-validate="validate || ''" v-on:focus="focusHandler()" v-on:blur="blurHandler()" :value="value" @input="updateValue()">
			
			<!-- password -->
			<input v-if="type === 'password'" type="password" ref="input" :id="inputId" :name="name" v-validate="validate || ''" v-on:focus="focusHandler()" v-on:blur="blurHandler()" :value="value" @input="updateValue()">
			
			<!-- date -->
			<input v-if="type === 'date'" type="date" ref="input" :id="inputId" :name="name" v-validate="validate || ''" v-on:focus="focusHandler()" v-on:blur="blurHandler()" :value="value" @input="updateValue()">
			
			<label v-if="label" class="gw-field-label" :class="getLabelClasses()" :for="inputId">{{ label }}</label>
			
		</div>
		
		<div class="gw-field-feedback" v-if="errorMsg && errors.has(name) && fields[name].dirty && fields[name].touched">{{ errorMsg }}</div>
		
	</div>
</template>

<script>
	export default {
		name: 'gw-input',
		data () {
			return {
				hasFocus: false,
				inputId: this._uid + '-input'
			}
		},
		props: ['label','validate','type','name','error-msg','label-position','value'],
		methods: {
			updateValue: function() {
				this.$emit('input', this.$refs.input.value);
			},
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
						'has-value': this.$refs.input.value.length > 0
					};
				}

				return {};
			},
			getLabelClasses: function() {
				let classes = {};
				
				if(this.$props.labelPosition) {
					classes[this.$props.labelPosition] = true;
				}
				
				return classes;
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
