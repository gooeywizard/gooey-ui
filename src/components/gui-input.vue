<template>
	<div class="gw-field" :class="getFieldClasses()" :readonly="readonly">

		<label v-if="label" :class="{ 'gw-field-label': type !== 'checkbox' }" :for="inputId" :style="labelStyle">{{ label }}</label>

		<div class="gw-field-body">
	
			<div class="gw-input">
			
				<input :type="type" ref="input" :id="inputId" :value="value" :name="name" :readonly="readonly" v-validate="validate && !readonly ? validate : ''"
						@focus="focusHandler" @blur="blurHandler"  @input="updateModel">
			
			</div>
				
			<div class="gw-field-feedback" v-if="validate && !readonly && errorMessage && errors.has(name) && fields[name].dirty && fields[name].touched">{{ errorMessage }}</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'gui-input',
		data () {
			return {
				hasFocus: false,
				inputId: this._uid + '-input',
				labelStyle: '',
				fieldTypes: ['text','email','password','date']
			}
		},
		props: ['label','validate','type','name','error-msg','readonly','value','label-width'],
		created() {
			this.$data.labelStyle = 'width: ' + this.$props.labelWidth;
		},
		
		computed: {
			errorMessage() {
				if(this.$props.errorMsg) {
					return this.$props.errorMsg;
				}
				
				if(this.$props.validate) {
					// default if field is required
					if(this.$props.validate.indexOf('required') >= 0) {
						return 'This field is required.';
					}
					
					// default
					return 'Invalid input.';
				}
				
				return '';
			}
		},
		
		methods: {
			updateModel: function() {
				this.$emit('input', this.$refs.input.value);
			},
			focusHandler: function() {
				if(!this.$props.readonly) {
					this.$data.hasFocus = true;
				}
			},
			blurHandler: function() {
				this.$data.hasFocus = false;
			},
			getFieldClasses: function() {
				let input = this.fields[this.$props.name];

				if(input) {
					return {
						'touched': input.touched && !this.$props.readonly,
						'untouched': input.untouched && !this.$props.readonly,
						'dirty': input.dirty && !this.$props.readonly,
						'pristine': input.pristine && !this.$props.readonly,
						'invalid': input.invalid && !this.$props.readonly,
						'valid': input.valid && !this.$props.readonly,
						'has-focus': this.$data.hasFocus,
						'has-value': this.$props.value && this.$props.value.length > 0 || this.$props.readonly
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
