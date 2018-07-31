<template>
  <div>
    <v-form v-model="valid" ref="form" class="formInput">
      <div>
        <v-text-field
          v-model="valueProfile.dob.value"
          :loading="loading"
          :rules="nameRules"
          label="ФИО"
          required
        ></v-text-field>
        <v-text-field
          v-model="valueProfile.tel.value"
          :loading="loading"
          :counter="15"
          :rules="mobRules"
          label="Мобильный телефон"
          required
        ></v-text-field>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          :return-value.sync="date"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="valueProfile.birthday.value"
            :loading="loading"
            label="Дата Рождения"
            :rules="nameRules"
            readonly
          ></v-text-field>
          <v-date-picker
            v-model="valueProfile.birthday.value"
            :loading="loading"
            color="primary"
            header-color="green lighten-1"
            ref="picker"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            no-title
            locale="ru-ru"
            first-day-of-week="1"
            scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Выйти</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(valueProfile.birthday.value)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-select
          :items="itemsGender"
          :loading="loading"
          v-model="valueProfile.gender.value"
          label="Пол"
        ></v-select>
      </div>
      <div>
        <v-select
          :items="itemsHair"
          :loading="loading"
          v-model="valueProfile.hair.value"
          label="Цвет волос"
        ></v-select>
        <v-slider
          min="120"
          :loading="loading"
          label="Рост,см"
          v-model="valueProfile.height.value"
          :value="valueProfile.height.value"
          max="220"
          thumb-label
        ></v-slider>
        <v-slider
          label="Вес"
          :loading="loading"
          min="50"
          v-model="valueProfile.weight.value"
          :value="valueProfile.weight.value"
          max="120"
          thumb-label
        ></v-slider>
        <v-switch :label="`${displayDataMarital}`" v-model="valueProfile.marital.value"></v-switch>
      </div>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'personal',
    data () {
      return {
        date: null,
        menu: false,
        valid: false,
        slider: 160,
        nameRules: [
          v => !!v || 'Обязательное поле'
        ],
        mobRules: [
          v => !!v || 'Обязательное поле',
          v => {
            if (!/^\d+$/.test(v)) {
              this.valueProfile.tel.value = ''
            }
            return /^\d+$/.test(v) || 'Только цифры!'
          },
          v => v.length >= 5 || 'Введите не меньше 5-ти цифр',
          v => v.length <= 15 || 'Введите не больше 15-ти цифр'
        ],
        itemsGender: ['Мужчина', 'Женщина'],
        itemsWeight: ['до 160', 'от 160 до 170', 'от 170 до 180', 'от 180 до 190', 'от 200'],
        itemsHair: ['Блондин', 'Русый', 'Брюнет', 'Шатен', 'Рыжий', 'Лысый']
      }
    },
    computed: {
      valueProfile () {
        return this.$store.getters['dataStore/getDataInputProfile'].personal
      },
      displayDataMarital () {
        this.valueProfile.marital.isMarital = !this.valueProfile.marital.isMarital
        return this.valueProfile.marital.value ? 'Женат/замужем' : 'Холост/не замужем'
      },
      loading () {
        return this.$store.getters['dataStore/getLoadingInput']
      }
    },
    watch: {
      menu (val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    }
  }
</script>

<style scoped>
  .formInput{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .formInput > div{
    flex-basis: 45%;
  }
  @media screen and (max-width: 768px) {
    .formInput{
      flex-wrap: wrap;
    }
    .formInput > div {
      flex-basis: 100%;
    }
  }
</style>
