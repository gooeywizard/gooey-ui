<template>
	<div class="gw-field" :class="getFieldClasses()" :readonly="readonly">

		<label v-if="label" :class="{ 'gw-field-label': type !== 'checkbox' }" :for="inputId" :style="labelStyle">{{ label }}</label>

		<div class="gw-field-body">
	
			<div class="gw-input">
			
				<input :type="type" ref="input" :id="inputId" :value="value" :name="name" :readonly="readonly" v-validate="validate && !readonly ? validate : ''"
						@focus="focusHandler" @blur="blurHandler" @input="onInput" @keydown="onKeyDown">
				
				<ul class="gw-list shadow" v-if="displayDropdown">
					<li class="gw-list-item" v-for="(item, i) in options" :key="i" :class="getHighlightedClass(i)" @click="onClickOption(item)">
						{{ item }}
					</li>
				</ul>
			
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
				fieldTypes: ['text','email','password','date'],
				highlighted: -1,
				displayDropdown: false
			}
		},

		props: ['label','validate','type','name','error-msg','readonly','value','label-width','options'],

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
			onInput: function(event) {
				this.updateModel();

				if(this.$props.options && this.$props.options.length > 0) {
					let items = this.$props.options || [];
					this.updateHighlighted(this.$refs.input.value, items);
					this.$data.displayDropdown = true;
				}
			},
			
			updateModel: function(value) {
				if(value === null || value === undefined) {
					value = this.$refs.input.value;
				}
				this.$emit('input', value);
			},
			
			focusHandler: function() {
				if(!this.$props.readonly) {
					this.$data.hasFocus = true;
				}
			},
			
			blurHandler: function() {
				this.$data.hasFocus = false;
				// this.$data.displayDropdown = false;
				// this.$data.highlighted = -1;
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
			},

			getHighlightedClass: function(i) {
				return { 'highlight': i === this.$data.highlighted };
			},

			updateHighlighted: function(value, items) {
				if(!value) {
					this.$data.highlighted = -1;
					return;
				}

				if(items.length > 0) {
					this.$data.highlighted = -1;

					for(let i = 0; i < items.length; i++) {
						let item = items[i];
						if(item.indexOf(value) >= 0) {
							this.$data.highlighted = i;
							return;
						}
					}
				}
			},

			onKeyDown: function(event) {
				if(event.key === 'ArrowDown') {
					event.preventDefault();
					this.onDownArrow();
				} else if(event.key === 'ArrowUp') {
					event.preventDefault();
					this.onUpArrow();
				} else if(event.key === 'Enter') {
					event.preventDefault();
					if(this.$data.displayDropdown && this.$data.highlighted >= 0) {
						this.updateModel(this.$props.options[this.$data.highlighted]);
						this.$data.displayDropdown = false;
						this.$data.highlighted = -1;
					}
				} else if(event.key === 'Tab') {
					if(this.$data.displayDropdown && this.$data.highlighted >= 0) {
						this.updateModel(this.$props.options[this.$data.highlighted]);
						this.$data.displayDropdown = false;
						this.$data.highlighted = -1;
					}
				}
			},

			onDownArrow: function() {
				if(!this.$props.options) {
					return;
				}

				this.$data.highlighted++;
				this.$data.highlighted = Math.min(this.$data.highlighted, this.$props.options.length - 1);
			},

			onUpArrow: function() {
				if(!this.$props.options) {
					return;
				}

				this.$data.highlighted--;
				this.$data.highlighted = Math.max(this.$data.highlighted, 0);
			},
			
			onClickOption: function(option) {
				console.log('click', option);
				this.updateModel(option);
				this.$data.displayDropdown = false;
				this.$data.highlighted = -1;
			}
		}
	}
</script>

<style scoped>
.gw-list {
	position: absolute;
	margin-top: 30px;
	z-index: 1000;
	background-color: #FFF;
	min-width: 100px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);
}

.gw-list-item {

}
</style>
