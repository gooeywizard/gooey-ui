<template>
	<div class="gw-dialog-wrapper" @click="onClickAway">
		<div class="gw-column center-h">
			<div class="gw-box shadow gw-dialog">
				<div class="gw-box-header">
					<slot name="header"></slot>
				</div>
				
				<div class="gw-box-body">
					<slot name="body"></slot>
				</div>
				
				<div class="gw-box-footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
		<!-- <div class="gw-dialog-mask"></div> -->
	</div>
</template>

<script>

export default {
	name: 'gui-dialog',
	
	mounted() {
		let body = document.getElementsByTagName('body')[0];
		body.classList.add('noscroll');
		
		// let mask = new Node('div');
		
		let mask = document.createElement('div');
			mask.classList.add('gw-dialog-mask');
			// console.log(el, elBox);
			// console.log(el.scrollWidth, el.offsetWidth, el.offsetLeft);
			// mask.setAttribute('style', 'width:' + elBox.width + 'px;height:' + elBox.height + 'px;x:' + elBox.x + ';y:' + elBox.y + ';');
			// console.log(mask.style.cssText);
			// mask.style.height = elBox.height;
			// mask.style.x = elBox.x;
			// mask.style.y = elBox.y;
			// el.parentNode.insertBefore(mask, el);
		
		this.$el.parentNode.appendChild(mask);
		// body.appendChild(mask);/
		
	},
	
	beforeDestroy() {
		let body = document.getElementsByTagName('body')[0];
		body.classList.remove('noscroll');
		
		let mask = document.getElementsByClassName('gw-dialog-mask')[0];
		mask.parentNode.removeChild(mask);
	},
	
	methods: {
		onClickAway: function() {
			this.$emit('click-away');
		}
	}
}
</script>

<style scoped>

</style>