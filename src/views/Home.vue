<template>
  <main class="container pt-24" v-if="!loading">
    <Districts :districts="districts" :selectedDistricts="selectedDistricts" @remove-district="removeDistrict" />
    <span class="block text-sm mt-10 text-center"><i class="fas fa-info-circle"></i> Tippe doppelt auf einen Landkreis, um ihn zu entfernen.</span>
    <DistrictSelect @get-district="getDistrict" :districts="districts" />
    
  </main>

  <main v-else>
    <p>Daten werden geladen</p>
  </main>
</template>

<script>
// @ is an alias to /src
import Districts from '@/components/Districts'
import DistrictSelect from '@/components/DistrictSelect'

export default {
  name: 'Home',
  components: {
    Districts,
    DistrictSelect,
  },
  data() {
    return {
      districts: [],
      selectedDistricts: ['07141', '06533'],
      loading: true,
    }
  },
  methods: {
    async getDistricts() {
      const res = await fetch('https://api.corona-zahlen.org/districts/')
      const data = await res.json()
      return data.data
    },
    getDistrict(district) {
      // push selected district to array of selected districts IF it isn't already there
      if (this.selectedDistricts.indexOf(district) === -1) {
        this.selectedDistricts.push(district)
      } else {
        alert('Dieser Landkreis wurde bereits hinzugefügt')
      }
    },
    removeDistrict(district) {
      if (confirm('Diesen Landkreis wirklich löschen?')) {
        const index = this.selectedDistricts.indexOf(district)
        if (index > -1) this.selectedDistricts.splice(index, 1)
      }
    }
  },
  async created() {
    const districtsData = await this.getDistricts()

    // convert fetched object data to array with objects
    // most JSON APIs actually do not require to do that
    for (var i in districtsData) {
      this.districts.push(districtsData[i])
    }
    this.loading = false
    /* for (const key in newData) {
      this.districts.push([newData[key]['ags'], newData[key]['county']])
    } */
  }
}
</script>
