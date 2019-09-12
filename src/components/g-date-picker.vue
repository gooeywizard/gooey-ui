<template>
	<!-- <div class="g-date-picker shadow">
		<div class="gw-row" v-for="row in calendarRows" :key="row">
			<span v-if="row === 0">
				<div class="g-day" v-for="filler in currentMonthFirstDay" :key="filler"></div>
			</span>
			<span>
				<div class="g-day selectable" v-for="day in currentMonth"
		</div>
	</div> -->
	<div class="g-date-picker shadow">
		<div class="gw-row between-h">
			<button class="gw-btn" @mousedown="onMouseDownDate" @click="prevMonth">&#x3c;</button>
			<button class="gw-btn">{{ monthAndYear }}</button>
			<button class="gw-btn" @mousedown="onMouseDownDate" @click="nextMonth">&#x3e;</button>
		</div>
		<div class="gw-row" v-for="week in weeksInMonth" :key="week">
			<div class="g-day selectable"
					:class="dayClass(dayOfWeek, week)"
					v-for="dayOfWeek in 7"
					:key="dayOfWeek"
					@mousedown="onMouseDownDate"
					@click="onClickDate(dayOfWeek, week)">
				<span v-if="day(dayOfWeek,week) <= 0" class="other-month">{{ day(dayOfWeek,week) + daysInPrevMonth }}</span>
				<span v-if="isDayInMonth(dayOfWeek,week)">{{ day(dayOfWeek,week) }}</span>
				<span v-if="day(dayOfWeek,week) > daysInMonth" class="other-month">{{ day(dayOfWeek,week) - daysInMonth }}</span>
			</div>
		</div>
		<div class="gw-row center-h">
			<button class="gw-btn">Today</button>
		</div>
	</div>
</template>

<script>
import DateUtil from '../utils/DateUtil.js'

export default {
	name: 'g-date-picker',
	
	data() {
		return {
			currentDate: null
		}
	},
	
	props: ['date'],
	
	computed: {
		weeksInMonth: function() {
			return DateUtil.weeksInMonth(this.$data.currentDate);
		},
		
		monthPad: function() {
			return DateUtil.firstDayOfMonth(this.$data.currentDate);
		},
		daysInMonth: function() {
			return DateUtil.daysInMonth(this.$data.currentDate);
		},
		
		daysInPrevMonth: function() {
			let prevMonth = new Date(this.$data.currentDate);
			prevMonth.setMonth(prevMonth.getMonth() - 1);
			return DateUtil.daysInMonth(prevMonth);
		},
		
		monthAndYear: function() {
			// console.log(DateUtil);
			return DateUtil.monthName(this.$data.currentDate) + ', ' + this.$data.currentDate.getFullYear();
		}
	},
	
	created() {
		if(this.$props.date) {
			// console.log(this.$props.date);
			this.$data.currentDate = new Date(this.$props.date);
			// console.log(this.$data.currentDate.getDate());
		} else {
			this.$data.currentDate = new Date();
		}
	},
	
	methods: {
		day: function(dayOfWeek, week) {
			return (week - 1) * 7 + dayOfWeek - this.monthPad;
		},
		
		dayClass: function(dayOfWeek, week) {
			let active = new Date(this.$props.date);
			let current = this.$data.currentDate;
			
			if(!active || active.getFullYear() !== current.getFullYear() || active.getMonth() !== current.getMonth()) {
				return {};
			}
			
			return {
				'active': this.day(dayOfWeek, week) === active.getDate() + 1
			};
		},
		
		isDayInMonth: function(dayOfWeek, week) {
			return this.day(dayOfWeek,week) > 0 && this.day(dayOfWeek,week) <= this.daysInMonth;
		},
		
		onClickDate: function(dayOfWeek, week) {
			let date = new Date(this.$data.currentDate);
			date.setDate(this.day(dayOfWeek, week));
			
			this.$emit('select', DateUtil.toString(date, 'mm/dd/yyyy'));
			// this.$emit('select', date);
		},
		
		onMouseDownDate: function(event) {
			event.preventDefault();
		},
		
		prevMonth: function() {
			let date = new Date(this.$data.currentDate);
			date.setMonth(this.$data.currentDate.getMonth() - 1);
			
			this.$data.currentDate = date;
		},
		
		nextMonth: function() {
			let date = new Date(this.$data.currentDate);
			date.setMonth(this.$data.currentDate.getMonth() + 1);
			
			this.$data.currentDate = date;
		},
		
		selectToday: function() {
			this.$emit('select', DateUtil.toString(new Date(), 'mm/dd/yyyy'));
			// this.$emit('select', new Date());
		}
	}
}
</script>

<style scoped>
.g-date-picker {
	position: absolute;
	margin-top: 30px;
	z-index: 1000;
	background-color: #FFF;
	/* width: 100px; */
	/* height: 80px; */
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);
	font-size: 12px;
}

.g-date-picker .g-day {
	width: 26px;
	height: 26px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.g-date-picker .g-day .other-month {
	color: #AAA;
}

.g-date-picker .g-day .other-month:hover {
	color: #000;
}

.selectable:hover {
	cursor: pointer;
	background-color: #DDD;
	color: #000;
}

.active {
	background-color: #666;
	color: #FFF;
}

.between-h {
	justify-content: space-between;
}
</style>
