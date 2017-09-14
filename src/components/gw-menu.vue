<template>
  <div class="gw-menu-container">
		<button type="button" class="gw-menu-btn gw-btn" :class="getButtonClasses()" @click="toggleMenu" @blur="closeMenu">Menu</button>
		<ul class="gw-menu" v-show="menuOpen">
			<slot></slot>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'gw-input',
		data () {
			return {
				menuOpen: false
			}
		},
		props: [],
  	methods: {
			toggleMenu: function() {
				this.$data.menuOpen = !this.$data.menuOpen;
			},
			closeMenu: function() {
				this.$data.menuOpen = false;
			},
			getButtonClasses: function() {
				return this.$data.menuOpen ? 'gw-menu-open' : 'gw-menu-closed';
			}
		}
	}
</script>

<style scoped>
	.gw-menu-container {
		position: relative;
	}
	
	.gw-menu {
		position: absolute;
		z-index: 1000;
		background-color: white;
		border: 1px solid slategray;
		margin: 0px;
		margin-top: -1px;
		list-style-type: none;
		padding: 0px;
	}
	
	.gw-menu-btn:after {
		font-size: 13px;
		margin-left: 4px;
	}
	
	.gw-menu-btn.gw-menu-closed:after {
		content: '\25BC';
	}
	
	.gw-menu-btn.gw-menu-open:after {
		content: '\25B2';
	}
	
	.gw-menu li {
		decoration: none;
		border-bottom: 1px solid lightslategray;
		padding: 6px;
		cursor: pointer;
		font-size: 14px;
	}
	
	.gw-menu li:last-child {
		border-bottom: none;
	}
	
	.gw-menu li:hover {
		background-color: #DDD;
	}
</style>
