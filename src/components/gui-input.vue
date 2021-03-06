<template>
	<div class="gw-field" :class="getFieldClasses()" :readonly="readonly">

		<label v-if="label" :class="{ 'gw-field-label': type !== 'checkbox' }" :for="inputId" :style="labelStyle">{{ label }}</label>

		<div class="gw-field-body">
	
			<div class="gw-input">
			
				<input :type="type" ref="input" :id="inputId" :value="value" :name="name" :readonly="readonly"
						@focus="focusHandler" @blur="blurHandler" @input="onInput" @keydown="onKeyDown" @keyup="onKeyUp">
				
				<ul class="gw-list shadow" v-show="displayDropdown">
					<li class="gw-list-item" v-for="(item, i) in options" :key="i" :class="getHighlightedClass(i)" @mousedown="onMouseDownOption" @click="onClickOption(item)">
						{{ item }}
					</li>
				</ul>
				
				<g-date-picker v-show="displayDatePicker" :date="value" @select="onSelectDate"></g-date-picker>
			
			</div>
				
			<!-- <div class="gw-field-feedback" v-if="validate && !readonly && errorMessage && errors.has(name) && fields[name].dirty && fields[name].touched">{{ errorMessage }}</div> -->
			<!-- <div class="gw-field-feedback" v-if="validate && !readonly && errorMessage && error">{{ errorMessage }}</div> -->
			<div class="gw-field-feedback" v-if="error">{{ error }}</div>
			
		</div>
		
	</div>
</template>

<script>
	import GDatePicker from './g-date-picker.vue'

	export default {
		name: 'gui-input',
		
		// $_veeValidate: {
		// 	name() {
		// 		console.log('TESTING', this.label);
		// 		return this.name;
		// 	},
		// 	value() {
		// 		return this.value;
		// 	}
		// },

		data () {
			return {
				hasFocus: false,
				dirty: false,
				inputId: this._uid + '-input',
				labelStyle: '',
				fieldTypes: ['text','email','password','date'],
				highlighted: -1,
				displayDropdown: false,
				displayDatePicker: false
				// inputMask: null,
				// maskedValue: ''
			}
		},
		
		components: {
			GDatePicker
		},

		props: ['label','validate','type','name','error-msg','readonly','value','label-width','options','mask','error'],

		created() {
			this.$data.labelStyle = 'width: ' + this.$props.labelWidth;
			// this.showDatePicker();
			// this.$data.maskValue = this.$props.value;
			
			// if(this.$props.type === 'tel') {
			// 	this.$data.inputMask = '(___) ___-____';
			// }
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
			},
			
			hasMask() {
				return this.$props.mask && this.$props.mask.length > 0;
			},
			
			hasDropdown() {
				return this.$props.options && this.$props.options.length > 0;
			},
			
			hasDatePicker() {
				return this.$props.type === 'date';
			}
		},
		
		methods: {
			onInput: function() {
				this.$emit('input', this.$refs.input.value);
				this.$data.dirty = true;
				// this.updateModel();

				if(this.$props.options && this.$props.options.length > 0) {
					this.showDropdown();
					this.updateHighlighted();
				}
				// console.log(event);
			},
			
			updateModel: function(value) {
				if(value === null || value === undefined) {
					value = this.$refs.input.value;
				}
				
				// if(this.$data.inputMask !== null) {
				// 	let count = 0;
				// 	let maskedValue = '';
				// 	for(let i in this.$data.inputMask) {
				// 		let char = this.$data.inputMask[i];
				// 		// if(count >= value.length) {
				// 		// 	break;
				// 		// }
						
				// 		if(char === '_' && count < value.length) {
				// 			maskedValue += value[count];
				// 			count++;
				// 		} else {
				// 			maskedValue += char;
				// 		}
				// 	}
					// 
					// this.$data.maskedValue = maskedValue;
				// }
				
				this.$emit('input', value);
			},
			
			onSelectDate: function(date) {
				this.updateModel(date);
				this.showDatePicker(false);
			},
			
			focusHandler: function() {
				if(!this.$props.readonly) {
					this.$data.hasFocus = true;
					this.showDropdown();
					this.showDatePicker();
				}
			},
			
			blurHandler: function() {
				this.$data.hasFocus = false;
				
				if(this.hasDropdown) {
					let found = false;
					let value = this.$refs.input.value.toLowerCase();
					for(let i = 0; i < this.$props.options.length; i++) {
						let option = this.$props.options[i].toLowerCase();
						if(value === option) {
							this.$emit('input', this.$props.options[i]);
							found = true;
							break;
						}
					}
					
					if(!found) {
						this.$emit('input', '');
					}
				}
				
				this.showDropdown(false);
				this.showDatePicker(false);
			},
			
			showDropdown: function(show=true) {
				if(this.hasDropdown) {
					if(show && !this.$data.displayDropdown) {
						this.$data.displayDropdown = true;
						this.updateHighlighted();
					} else if(!show && this.$data.displayDropdown) {
						this.$data.displayDropdown = false;
					}
				}
			},
			
			showDatePicker: function(show=true) {
				if(this.hasDatePicker) {
					if(show && !this.$data.displayDatePicker) {
						this.$data.displayDatePicker = true;
					} else if(!show && this.$data.displayDatePicker) {
						this.$data.displayDatePicker = false;
					}
				}
			},
			
			getFieldClasses: function() {
				let input = this.$refs.input;
				// console.log(this);
				// console.log(this.$validator.flags);
				// console.log(this.$props.error);
				if(input) {
					// console.log(this);
					return {
						'touched': this.$data.dirty && !this.$props.readonly && !this.$props.disabled,
						'untouched': !this.$data.dirty && !this.$props.readonly && !this.$props.disabled,
						'dirty': this.$data.dirty && !this.$props.readonly && !this.$props.disabled,
						'pristine': !this.$data.dirty && !this.$props.readonly && !this.$props.disabled,
						'invalid': this.$props.error && !this.$props.readonly && !this.$props.disabled,
						'valid': !this.$props.error && !this.$props.readonly && !this.$props.disabled,
						// 'touched': input.touched && !this.$props.readonly,
						// 'untouched': input.untouched && !this.$props.readonly,
						// 'dirty': input.dirty && !this.$props.readonly,
						// 'pristine': input.pristine && !this.$props.readonly,
						// 'invalid': input.invalid && !this.$props.readonly,
						// 'valid': input.valid && !this.$props.readonly,
						'has-focus': this.$data.hasFocus,
						'has-value': this.$props.value && this.$props.value.length > 0 || this.$props.readonly
					};
				}

				return {};
			},

			getHighlightedClass: function(i) {
				return { 'highlight': i === this.$data.highlighted };
			},

			updateHighlighted: function() {
				let items = this.$props.options || [];
				let value = this.$refs.input.value.toLowerCase();
				
				if(!value) {
					this.$data.highlighted = -1;
					return;
				}

				if(items.length > 0) {
					this.$data.highlighted = -1;

					for(let i = 0; i < items.length; i++) {
						let item = items[i].toLowerCase();
						if(item.indexOf(value) >= 0) {
							this.$data.highlighted = i;
							return;
						}
					}
				}
			},
			
			onKeyDown: function(event) {
				if(this.hasDatePicker && this.$data.displayDatePicker) {
					if(event.key === 'Escape') {
						this.showDatePicker(false);
					}
				}
				
				if(this.hasDropdown && this.$data.displayDropdown) {
					if(event.key === 'ArrowDown') {
						event.preventDefault();
						this.onDownArrow();
					} else if(event.key === 'ArrowUp') {
						event.preventDefault();
						this.onUpArrow();
					} else if(event.key === 'Enter') {
						event.preventDefault();
						if(this.$data.displayDropdown && this.$data.highlighted >= 0) {
							this.$emit('input', this.$props.options[this.$data.highlighted]);
							this.showDropdown(false);
						}
					} else if(event.key === 'Tab') {
						if(this.$data.displayDropdown && this.$data.highlighted >= 0) {
							this.$emit('input', this.$props.options[this.$data.highlighted]);
							this.showDropdown(false);
						}
					} else if(event.key === 'Escape') {
						let found = false;
						let value = this.$refs.input.value.toLowerCase();
						for(let i = 0; i < this.$props.options.length; i++) {
							let option = this.$props.options[i].toLowerCase();
							if(value === option) {
								this.$emit('input', option);
								found = true;
								break;
							}
						}
						
						if(!found) {
							this.$emit('input', '');
						}
						this.showDropdown(false);
					}
				} else if(this.hasMask) {
					const MASK_MARKER = '_';
					
					let mask = this.$props.mask;
					let value = this.$refs.input.value;
					
					if(event.key.length === 1) {
						// event.preventDefault();
						if(value.length >= mask.length) {
							event.preventDefault();
							return;
						}
						
						let appendValue = '';
						
						let maskChar = mask[value.length];
						while(maskChar !== MASK_MARKER && maskChar !== event.key) {
							appendValue += maskChar;
							
							// get next mask character
							maskChar = mask[value.length + appendValue.length];
						}
						
						if(this.isCharValid(event.key) || maskChar === event.key) {
							value += appendValue;
							this.$refs.input.value = value;
						}
					}
					
					// this.$emit('input', value);
				}
			},
			
			onKeyUp: function(event) {
				if(this.hasMask) {
					const MASK_MARKER = '_';
					
					let mask = this.$props.mask;
					let value = this.$refs.input.value;
					
					if(event.key.length === 1) {
						let remainingMask = mask.substring(value.length, mask.length);
						if(remainingMask.length > 0 && remainingMask.indexOf(MASK_MARKER) < 0) {
							value += remainingMask;
						}
					} else if(event.key === 'Backspace') {
						
						if(value.length > 0) {
							let maskChar = mask[value.length - 1];
							
							while(value.length > 0 && maskChar !== MASK_MARKER) {
								value = value.slice(0, -1);
								maskChar = mask[value.length - 1];
							}
						}
					}
					
					this.$emit('input', value);
				}
			},
			
			isCharValid: function(char) {
				let regex = /[0-9]/;
				return regex.test(char);
			},
			
			// isCharAllowed: function(char) {
			// 	// TODO implement character type restrictions
			// 	let mask = this.$data.inputMask;
			// 	let value = this.$refs.input.value;
				
			// 	if(mask !== null) {
			// 		if(value.length === mask.length) {
			// 			return false;
			// 		}
			// 	}
			// 	return true;
			// },
			
			// applyMask: function(char) {
			// 	console.log(char);
			// 	let MASK_MARKER = '_';
				
			// 	let mask = this.$data.inputMask;
			// 	let value = this.$refs.input.value;
			// 	if(mask !== null) {
					
			// 		let maskChar = mask[value.length];
					
			// 		while(maskChar !== MASK_MARKER) {
			// 			value += maskChar;
			// 			maskChar = mask[value.length];
			// 		}
					
			// 		value += char;
			// 	}
				
			// 	this.$emit('input', value);
			// 		// let count = 0;
			// 		// let maskedValue = '';
			// 		// for(let i in this.$data.inputMask) {
			// 		// 	let char = this.$data.inputMask[i];
			// 		// 	// if(count >= value.length) {
			// 		// 	// 	break;
			// 		// 	// }
						
			// 		// 	if(char === '_' && count < value.length) {
			// 		// 		maskedValue += value[count];
			// 		// 		count++;
			// 		// 	} else {
			// 		// 		maskedValue += char;
			// 		// 	}
			// 		// }
			// 	// }
			// },

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
				this.updateModel(option);
				this.showDropdown(false);
			},
			
			onMouseDownOption: function(event) {
				event.preventDefault();
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

/* hide default date input stuff */
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-clear-button {
	-webkit-appearance: none;
	display: none;
}

input[type="date"]::-ms-clear {
	display: none;
}

</style>
