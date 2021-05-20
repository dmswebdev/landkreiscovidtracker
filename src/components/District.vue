<template>
	<div @dblclick="$emit('remove-district', 123)" class="district flex flex-col justify-between shadow-xl p-5 mb-4 md:mb-0 rounded" :class="[getBgColor, padding]">
		<div class="flex">
			<div class="flex flex-1 items-center justify-start">
				<div>
					<span class="text-sm">Landkreis:</span><br>
					<h2 class="text-xl md:text-2xl">{{ district.name }}</h2>
				</div>
			</div>
			<div class="flex items-center justify-end">
				<span class="text-4xl">{{ roundedIncidence }}</span>
			</div>
		</div>
		<div v-if="history" class="chart flex mt-6 items-end justify-between">
			<div class="bar flex items-end p-1 justify-center bg-white" v-for="(item, index) in history" :key="index" v-bind:style="{ height: historyPercentages[index] + '%' }" :class="historyColors[index]">
				<span class="text-xs">{{ item }}</span><br>
			</div>
		</div>
		<div v-else class="pt-4">
			<span class="text-xs">Es besteht ein Problem mit der RKI API. Die Inzidenzwerte der letzten 7 Tage konnten nicht geladen werden.</span>
		</div>
	</div>
</template>

<script>

export default {
	name: 'District',
	props: ['district'],
	emits: ['remove-district'],
	data() {
		return {
			history: [],
			historyColors: [],
			historyPercentages: [],
			bgColor: 'bg-green-400',
			padding: 'pb-0'
		}
	},
	methods: {
		async getDistrictHistory() {
			try {
				const res = await fetch(`https://api.corona-zahlen.org/districts/${this.district.ags}/history/incidence`)
				const data = await res.json()
				const history = data['data'][this.district.ags]['history']
				const recentHistory = history.slice(history.length - 8, history.length - 1)
				const incidences = []
				recentHistory.forEach(function(item) {
					incidences.push(Math.round(item.weekIncidence))
				})
				return incidences
			} catch(e) {
				/* console.log(e)
				console.log('did not work :-(') */
			}
		},
		getHistoryItemBgColor(item) {
			let bgColor = 'bg-green-300'
			if (item > 100) bgColor = 'bg-yellow-300'
			if (item > 150) bgColor = 'bg-red-300'
			return bgColor
		},
	},
	async created() {
		try {
			this.history = await this.getDistrictHistory()

			this.history.forEach(item => {
				this.historyColors.push(this.getHistoryItemBgColor(item))
			})

			const calcPercentages = []
			const highestValue = Math.max(...this.history)
			this.history.forEach(function(item) {
				calcPercentages.push((item / highestValue).toFixed(2) * 100)
			})
			this.historyPercentages = calcPercentages
		} catch {
			this.padding = ''
			console.log('history could not be created')
		}
	},
	computed: {
		getBgColor: function() {
			if (this.district.weekIncidence > 100) this.bgColor = 'bg-yellow-400'
			if (this.district.weekIncidence > 150) this.bgColor = 'bg-red-400'
			return this.bgColor
		},
		roundedIncidence: function() {
			return Math.round(this.district.weekIncidence)
		}
	}
}
</script>

<style scoped>
.chart {
	height: 100px;
}
.bar {
	width: 12.5%;
	transition: height 0.45s ease-in-out;
	animation: rise 0.75s forwards;
}
@keyframes rise {
	0% {
		height: 0;
	}
	100% {
		max-height: 100%;
	}
}
</style>