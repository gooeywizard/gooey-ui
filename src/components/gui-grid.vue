<template>
  <table class="gw-grid">
    <tr class="gw-row gw-grid-row gw-grid-header">
      <th class="gw-grid-cell" :class="{ 'gw-sort-desc': column.sortDir === 'desc', 'gw-sort-asc': column.sortDir === 'asc' }" v-for="(i, column) in orderedColumns" :key="i" @dblclick="sort(column, $event)">
        {{ column.header }}
      </th>
    </tr>
    <tr class="gw-row gw-grid-row" :class="{ highlight: config.highlightRows }" v-for="(i, record) in sortedData" :key="i">
      <td class="gw-grid-cell" v-for="(i, column) in orderedColumns" :key="i">
        {{ record[column.field] }}
      </td>
    </tr>
  </table>
</template>

<script>
	const ASC = 'asc';
	const DESC = 'desc';
	
	export default {
		name: 'gui-grid',
		data () {
			return {
				sortedData: [],
				orderedColumns: [],
				sortedField: '',
				sortDirection: DESC
			}
		},
		props: ['config'],
		methods: {
			sort: function(column) {
				// event.stopPropagation();
				// event.preventDefault();

				if(this.$data.sortedColumn && this.$data.sortedColumn.field !== column.field) {
					this.$data.sortedColumn.sortDir = undefined;
					this.$data.sortedColumn = column;
				} else if(!this.$data.sortedColumn) {
					this.$data.sortedColumn = column;
				}

				if(column.sortDir === DESC) {
					column.sortDir = ASC;
				} else if(column.sortDir === ASC) {
					column.sortDir = undefined;
				} else {
					column.sortDir = DESC;
				}

				if(column.sortDir === DESC) {
					this.$data.sortedData.sort(function(a, b) {
						if (a[column.field] < b[column.field])
							return -1;
						if (a[column.field] > b[column.field])
							return 1;
						return 0;
					});
				} else if(column.sortDir === ASC) {
					this.$data.sortedData.sort(function(a, b) {
						if (a[column.field] > b[column.field])
							return -1;
						if (a[column.field] < b[column.field])
							return 1;
						return 0
					});
				} else {
					this.$data.sortedData = JSON.parse(JSON.stringify(this.config.data));
					// return false;
				}
			}
		},
		created: function() {
			this.$data.orderedColumns = JSON.parse(JSON.stringify(this.config.columns));
			this.$data.sortedData = JSON.parse(JSON.stringify(this.config.data));
		}
	}
</script>

<style scoped>
</style>
