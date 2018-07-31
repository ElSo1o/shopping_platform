<template>
  <div>
    <div class="titleEducation">
      <h2>Укажите языки, которыми владеете</h2>
    </div>
    <v-form v-model="valid" ref="form" class="formInput">
      <div>
        <v-select
          :items="itemsLanguage"
          :loading="loading"
          v-model="valueProfile.lng"
          :rules="typeRules"
          label="Язык"
        ></v-select>
        <div class="sliderLng">
          <v-slider
            v-model="valueProfile.level.value"
            :tick-labels="valueProfile.level.template"
            :max="4"
            step="1"
            :disabled="isEnterLng"
            ticks="always"
            tick-size="3"
          ></v-slider>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'language',
  data () {
    return {
      valid: false,
      isEnterLng: true,
      valueSlider: 0,
      itemsLanguage: ['Русский', 'Украинский', 'Английский'],
      itemsLevel: ['Среднее', 'Средне-специальное', 'Неоконченное высшее', 'Высшее', 'Научная степень'],
      typeRules: [
        v => {
          const valide = !!v
          valide ? this.isEnterLng = false : this.isEnterLng = true
          return !!v || 'Обязательное поле'
        }
      ]
    }
  },
  computed: {
    valueProfile () {
      return this.$store.getters['dataStore/getDataInputProfile'].language
    },
    loading () {
      return this.$store.getters['dataStore/getLoadingInput']
    }
  }
}
</script>

<style scoped>
  .titleEducation{
    text-align: left;
  }
  .titleEducation h2{
    font-weight: 400;
  }
  .sliderLng{
    margin-top: 10px;
  }
</style>
