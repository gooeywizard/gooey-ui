<template>
  <div class="gw-body gw-column" :class="{'noscroll': displayDialog}">
		
		<header class="gw-header dark shadow text-center sticky">
			<h1>GooeyUI</h1>
			<h2>A modern UI for modern browsers</h2>
			<div class="gw-content">(built on VueJS)</div>
		</header>
		
		<article class="gw-main-content gw-column gw-center-h">
			
			<div class="gw-box shadow">
				<div class="gw-box-header">
					<h4>Forms and Fields</h4>
				</div>
				
				<div class="gw-box-body gw-row">
					
					<div class="gw-column col-50">
						<h5 class="gw-box-header">Editable</h5>
						
						<gw-input type="text" label="Full Name" v-model="fullName" validate="required" name="fullName" error-msg="Please enter your name."></gw-input>
						
						<gw-input type="email" label="Email Address" v-model="email" validate="required|email" name="email" error-msg="Please enter your email address in the format: email@email.com"></gw-input>

						<gw-input type="password" label="Password" v-model="password" validate="required" name="password" error-msg="Please enter a password."></gw-input>

						<gw-input type="date" label="Date" v-model="date" name="date"></gw-input>
						
						<gw-input type="text" class="border" label="Full Border Example" v-model="fullBorder" validate="required" name="borderExample" error-msg="You messed up!"></gw-input>
						
						<gw-input type="text" label="No Validation" v-model="noValidation" name="noValidation"></gw-input>
						
						<gw-input type="text" label="No Validation Border" v-model="noValidationBorder" name="noValidationBorder" class="border"></gw-input>
						
						<gw-input type="text" v-model="noLabel" name="noLabel"></gw-input>
						
						<gw-checkbox label="I agree to the <a href='' v-on:click='showTerms()'>Terms of Service</a>." name="terms"></gw-checkbox>
					</div>
					
					<div class="gw-column col-50">
						<h5 class="gw-box-header">Readonly</h5>
						
						<gw-input type="text" label="Full Name" v-model="fullName" validate="required" name="fullName" readonly="true" error-msg="Please enter your name."></gw-input>
						
						<gw-input type="email" label="Email Address" v-model="email" validate="required|email" name="email" readonly error-msg="Please enter your email address in the format: email@email.com"></gw-input>

						<gw-input type="password" label="Password" v-model="password" validate="required" name="password" readonly error-msg="Please enter a password."></gw-input>

						<gw-input type="date" label="Date" v-model="date" name="date" readonly></gw-input>
						
						<gw-input type="text" class="border" label="Full Border Example" v-model="fullBorder" validate="required" name="borderExample" readonly="true" error-msg="You messed up!"></gw-input>
						
						<gw-input type="text" label="No Validation" v-model="noValidation" name="noValidation" readonly="true"></gw-input>
						
						<gw-input type="text" label="No Validation Border" v-model="noValidationBorder" name="noValidationBorder" class="border" readonly="true"></gw-input>
						
						<gw-input type="text" v-model="noLabel" name="noLabel" readonly="true"></gw-input>
						
						<gw-checkbox label="I agree to the <a href='' v-on:click='showTerms()'>Terms of Service</a>." name="terms" readonly="true"></gw-checkbox>
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
					<gw-menu>
						<li class="gw-menu-item">Item #1</li>
						<li class="gw-menu-item">Item #2</li>
						<li class="gw-menu-item">Item #3</li>
					</gw-menu>
				</div>
			</div>
			
			<div class="gw-box shadow">
				<div class="gw-box-header">
					<h4>Lists</h4>
				</div>
				<div class="gw-box-body">
					<gw-list>
						<li class="gw-list-item">Result 1</li>
						<li class="gw-list-item">Result 2</li>
					</gw-list>
				</div>
			</div>
			
			<div class="gw-box shadow">
				<div class="gw-box-header">
					<h4>Grids</h4>
				</div>
				<div class="gw-box-body">
					<gw-grid :config="gridConfig"></gw-grid>
				</div>
			</div>
			
			<div class="gw-box shadow">
				<div class="gw-box-header">
					<h4>Modal</h4>
				</div>
				<div class="gw-box-body">
					<button type="button" class="gw-btn primary" @click="toggleModal">Show Modal Dialog</button>
					<gui-dialog v-if="displayDialog">
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
	import GwInput from './components/gw-input.vue'
	import GwCheckbox from './components/gw-checkbox.vue'
	import GwMenu from './components/gw-menu.vue'
	import GwGrid from './components/gw-grid.vue'
	import GwList from './components/gw-list.vue'
	import GuiDialog from './components/gui-dialog.vue'
	
	export default {
		name: 'app',
		components: {
			GwInput,
			GwCheckbox,
			GwMenu,
			GwGrid,
			GwList,
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
				noLabel: ''
			}
		},
		
		methods: {
			toggleModal: function() {
				this.$data.displayDialog = !this.$data.displayDialog;
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