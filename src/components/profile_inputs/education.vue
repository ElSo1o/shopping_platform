<template>
    <div>
      <div class="titleEducation">
        <h2>Образование, специальность</h2>
      </div>
      <v-form v-model="valid" ref="form" class="formInput">
        <div>
          <v-select
            :items="itemsType"
            :loading="loading"
            v-model="valueProfile.type"
            :rules="typeRules"
            label="Тип"
          ></v-select>
          <v-select
            :items="itemsLevel"
            :loading="loading"
            v-model="valueProfile.level"
            :rules="typeRules"
            label="Тип"
          ></v-select>
          <v-text-field
            v-model="valueProfile.institute"
            :loading="loading"
            :rules="typeRules"
            label="Учебное заведение"
            required
          ></v-text-field>
          <v-text-field
            v-model="valueProfile.specialty"
            :loading="loading"
            label="Специальность"
            required
          ></v-text-field>
        </div>
      </v-form>
    </div>
</template>

<script>
export default {
  name: 'education',
  data () {
    return {
      valid: false,
      itemsType: ['Техническое', 'Гуманитарное', 'Медицинское', 'Другое'],
      itemsLevel: ['Среднее', 'Средне-специальное', 'Неоконченное высшее', 'Высшее', 'Научная степень'],
      typeRules: [
        v => !!v || 'Обязательное поле'
      ]
    }
  },
  computed: {
    valueProfile () {
      return this.$store.getters['dataStore/getDataInputProfile'].education
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
</style>
