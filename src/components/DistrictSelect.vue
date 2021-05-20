<template>
	<!-- <select @change="onChange" v-model="selected" class="form-select mt-10 block w-full border p-3 rounded mt ">
		<option value="0">Landkreis auswählen</option>
		<option v-for="district in districts" :value="district.ags">
			{{ district.name }}
		</option>
	</select> -->
	<input type="text" v-model="districtName" placeholder="Landkreis hinzufügen" class="shadow-none w-full text-xl text-grey-darkest rounded border py-3 px-5 mt-6 mb-4"/>
	<ul>
		<li v-for="(district, index) in filterDistricts" :key="index" @click="onClick(district.ags)" class="bg-gray-100 text-md md:text-xl rounded py-3 px-5 mb-4 cursor-pointer transition-colors hover:bg-gray-700 hover:text-white flex justify-between items-center">
			<span>{{ district.name }}</span> <i class="fas fa-plus-circle fa-lg text-green-500"></i>
		</li>
	</ul>
</template>

<script>


export default {
	name: 'DistrictSelect',
	props: ['districts'],
	emits: ['get-district'],
	data() {
		return {
			selected: 0,
			districtName: ''
		}
	},
	methods: {
		onClick(district) {
			this.$emit('get-district', district)
		}
	},
	computed: {
		filterDistricts() {
			const search = this.districtName.toLowerCase().trim()

			if (!search) return null

			return this.districts.filter(district => district.name.toLowerCase().indexOf(search) > -1)
		}
	}
}
</script>