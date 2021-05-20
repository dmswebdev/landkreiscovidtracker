<template>
	<div class="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
		<District :key="district.ags" v-for="district in activeDistricts" :district="district" @remove-district="$emit('remove-district', district.ags)" />
	</div>
</template>

<script>
import District from '@/components/District'

export default {
	name: 'Districts',
	props: ['districts', 'selectedDistricts'],
	components: {
		District
	},
	emits: ['remove-district'],
	data() {
		return {
			
		}
	},
	computed: {
		activeDistricts: function() {
			const districts = this.districts // passed as prop
			const activeDistricts = []
			this.selectedDistricts.forEach(district => {
				activeDistricts.push(districts.find(el => el.ags === district))
			})
			return activeDistricts
		}
	}
}
</script>