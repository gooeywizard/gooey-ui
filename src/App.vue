<template>
  <div class="gw-body gw-column">
		
		<header class="gw-header gw-column dark shadow center-h sticky">
			<h1>GooeyUI</h1>
			<h2>A modern UI for modern browsers</h2>
			<div class="gw-content">(built on VueJS)</div>
		</header>
		
		<article class="gw-main-content gw-column center-h">
			
			<form class="gw-box shadow" @submit.prevent="validateBeforeSubmit">
				<div class="gw-box-header">
					<h4>Form and Field Validation</h4>
				</div>
				
				<div class="gw-box-body">
					<gui-input type="email" label="Email" v-model="validationForm.inputOne" v-validate="'required|email'" :error="errors.first('email')" name="email"></gui-input>
					<gui-input type="text" label="Input Two" v-model="validationForm.inputTwo"></gui-input>
					<gui-input type="text" label="Input Three" v-model="validationForm.inputThree"></gui-input>
				</div>
				
				<div class="gw-box-footer">
					<button type="submit" class="gw-btn primary">Submit</button>
				</div>
			</form>
			
			<div class="gw-box shadow">
				<div class="gw-box-header">
					<h4>Forms and Fields</h4>
				</div>
				
				<div class="gw-box-body gw-row">
					
					<div class="gw-column col-50">
						<h5 class="gw-box-header">Editable</h5>

						<gui-input type="text" label="Dropdown" v-model="dropdown" :options="dropdownOptions" name="dropdown"></gui-input>
						
						<gui-input type="text" label="Full Name" v-model="fullName" validate="required" name="fullName" error-msg="Please enter your name."></gui-input>
						
						<gui-input type="email" label="Email Address" v-model="email" validate="required|email" name="email" error-msg="Please enter your email address in the format: email@email.com"></gui-input>

						<gui-input type="password" label="Password" v-model="password" validate="required" name="password" error-msg="Please enter a password."></gui-input>

						<gui-input type="date" label="Date" v-model="date" name="date"></gui-input>
						
						<gui-input type="text" class="border" label="Full Border Example" v-model="fullBorder" validate="required" name="borderExample" error-msg="You messed up!"></gui-input>
						
						<gui-input type="text" label="No Validation" v-model="noValidation" name="noValidation"></gui-input>
						
						<gui-input type="text" label="No Validation Border" v-model="noValidationBorder" name="noValidationBorder" class="border"></gui-input>
						
						<gui-input type="text" v-model="noLabel" name="noLabel"></gui-input>
						
						<gui-checkbox label="I agree to the <a href='' v-on:click='showTerms()'>Terms of Service</a>." name="terms"></gui-checkbox>
					</div>
					
					<div class="gw-column col-50">
						<h5 class="gw-box-header">Readonly</h5>
						
						<gui-input type="tel" label="Phone Number" v-model="phoneNumber" name="phoneNumber" mask="(___) ___-____"></gui-input>
						
						<gui-input type="text" label="Full Name" v-model="fullName" validate="required" name="fullName" readonly="true" error-msg="Please enter your name."></gui-input>
						
						<gui-input type="email" label="Email Address" v-model="email" validate="required|email" name="email" readonly error-msg="Please enter your email address in the format: email@email.com"></gui-input>

						<gui-input type="password" label="Password" v-model="password" validate="required" name="password" readonly error-msg="Please enter a password."></gui-input>

						<gui-input type="date" label="Date" v-model="date" name="date" readonly></gui-input>
						
						<gui-input type="text" class="border" label="Full Border Example" v-model="fullBorder" validate="required" name="borderExample" readonly="true" error-msg="You messed up!"></gui-input>
						
						<gui-input type="text" label="No Validation" v-model="noValidation" name="noValidation" readonly="true"></gui-input>
						
						<gui-input type="text" label="No Validation Border" v-model="noValidationBorder" name="noValidationBorder" class="border" readonly="true"></gui-input>
						
						<gui-input type="text" v-model="noLabel" name="noLabel" readonly="true"></gui-input>
						
						<gui-checkbox label="I agree to the <a href='' v-on:click='showTerms()'>Terms of Service</a>." name="terms" readonly="true"></gui-checkbox>
					</div>

				</div>
			</div>
			
			<div class="gw-box shadow">
				<div class="gw-box-header">
					<h4>Buttons</h4>
				</div>
				<div class="gw-box-body">
					<button type="button" class="gw-btn">Default</button>
					<button type="button" class="gw-btn primary">Primary</button>
					<button type="button" class="gw-btn success">Success</button>
					<button type="button" class="gw-btn error">Error</button>
				</div>
				<div class="gw-box-body">
					<gui-menu>
						<li class="gw-menu-item">Item #1</li>
						<li class="gw-menu-item">Item #2</li>
						<li class="gw-menu-item">Item #3</li>
					</gui-menu>
				</div>
			</div>
			
			<div class="gw-box shadow">
				<div class="gw-box-header">
					<h4>Lists</h4>
				</div>
				<div class="gw-box-body">
					<gui-list>
						<li class="gw-list-item">Result 1</li>
						<li class="gw-list-item">Result 2</li>
					</gui-list>
				</div>
			</div>
			
			<div class="gw-box shadow">
				<div class="gw-box-header">
					<h4>Grids</h4>
				</div>
				<div class="gw-box-body">
					<gui-grid :config="gridConfig"></gui-grid>
				</div>
			</div>
			
			<div class="gw-box shadow">
				<div class="gw-box-header">
					<h4>Modal</h4>
				</div>
				<div class="gw-box-body">
					<button type="button" class="gw-btn primary" @click="toggleModal">Show Modal Dialog</button>
					<gui-dialog v-if="displayDialog" @click-away="displayDialog = false">
						<div slot="header">
							<h4>Modal Header</h4>
						</div>
						<div slot="body">
							<div style="height: 800px;">Fill this space</div>
						</div>
						<div slot="footer">
							Modal Footer
						</div>
					</gui-dialog>
				</div>
			</div>
			
		</article>
		
		<footer class="gw-footer shadow dark sticky"></footer>
		
  </div>
</template>

<script>
	import GuiInput from './components/gui-input.vue'
	import GuiCheckbox from './components/gui-checkbox.vue'
	import GuiMenu from './components/gui-menu.vue'
	import GuiGrid from './components/gui-grid.vue'
	import GuiList from './components/gui-list.vue'
	import GuiDialog from './components/gui-dialog.vue'
	
	export default {
		name: 'app',
		components: {
			GuiInput,
			GuiCheckbox,
			GuiMenu,
			GuiGrid,
			GuiList,
			GuiDialog
		},
		data() {
			return {
				displayDialog: false,
				gridConfig: {
					highlightRows: true,
					highlightColumns: true,
					columns: [{
						field: 'one',
						header: 'Column One'
					},{
						field: 'two',
						header: 'Column Two'
					},{
						field: 'three',
						header: 'Column Tres'
					},{
						field: 'four',
						header: 'Column 4'
					}],
					data: [{
						one: 'First!',
						two: 'value 2',
						three: '333333',
						four: 'Fourth'
					},{
						one: 'number 21',
						two: 'Second!',
						three: '333333',
						four: 'Fourth'
					},{
						one: '111111',
						two: 'value 2',
						three: 'Third!',
						four: 'Fourth'
					},{
						one: 'firs...',
						two: 'value 2',
						three: '333333',
						four: 'Fourth!!!! (for real)'
					},{
						one: 'Fifth!',
						two: 'value 2',
						three: '333333',
						four: 'Fourth'
					},{
						one: 'Sixth!',
						two: 'value 2',
						three: '333333',
						four: 'Fourth'
					}]
				},
				fullName: '',
				email: '',
				password: '',
				date: '',
				fullBorder: '',
				noValidation: '',
				noValidationBorder: '',
				noLabel: '',
				phoneNumber: '',
				dropdown: '',
				dropdownOptions: ['one','Two','three','FoUr'],
				validationForm: {
					inputOne: '',
					inputTwo: '',
					inputThree: ''
				}
			}
		},
		
		methods: {
			toggleModal: function() {
				this.$data.displayDialog = !this.$data.displayDialog;
			},
			
			validateBeforeSubmit: function() {
				this.$validator.validateAll().then((result) => {
					if(result) {
						console.log('Form Submitted!');
						return;
					}
					
					console.log('Correct them errors!');
				});
			}
		}
	}
</script>

<style lang="scss">
	@import '../src/assets/scss/gooey-ui.scss';
	
	.noscroll {
		overflow: hidden;
	}
</style>