const StringUtil = {
	
	leftPad: function(value, pad, length) {
		if(!pad || !length) {
			throw new Error('Invalid params: pad = ' + pad + ', length = ' + length);
		}
		
		value = '' + value;
		
		while(value.length < length) {
			value = pad + value;
		}
		
		return value;
	}
};

export default StringUtil;