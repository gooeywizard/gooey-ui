import StringUtil from './StringUtil.js'

const MONTH_NAME = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const DateUtil = class {
	
	static monthName(date) {
		return MONTH_NAME[date.getMonth()];
	}
	
	static monthAbbr(date) {
		return MONTH_ABBR[date.getMonth()];
	}
	
	static toString(date, format) {
		let day = StringUtil.leftPad(date.getDate(), '0', 2);
		let month = StringUtil.leftPad(date.getMonth() + 1, '0', 2);
		let year = date.getFullYear();
		
		// return month + '/' + day + '/' + year;
		return year + '-' + month + '-' + day;
	}
	
	static toDate(value) {
		if(value instanceof Date) {
			return value;
		}
		
		if(typeof value === 'string') {
			return new Date(value);
		}
		
		throw new Error('Invalid date: ' + value);
	}
	
	static daysInMonth(date) {
		date = DateUtil.toDate(date);
		
		date = new Date(date.getFullYear(), date.getMonth()+1, 0);
		
		return date.getDate();
	}
	
	static firstDayOfMonth(date) {
		date = DateUtil.toDate(date);
		
		date = new Date(date.getFullYear(), date.getMonth(), 1);
		
		return date.getDay();
	}
	
	static weekOfMonth(date) {
		let firstDay = DateUtil.firstDayOfMonth(date);
		
		return Math.floor((date.getDate() + firstDay) / 7);
	}
	
	static weeksInMonth(date) {
		let daysInMonth = DateUtil.daysInMonth(date);
		
		date = new Date(date.getFullYear(), date.getMonth(), daysInMonth - 1);
		
		return DateUtil.weekOfMonth(date) + 1;
	}
};

export default DateUtil;