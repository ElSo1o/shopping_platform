<template>
  <div>
    <div class="titleEducation">
      <h2>Места и опыт работы</h2>
    </div>
    <v-form v-model="valid" ref="form" class="formInput">
      <div>
        <v-select
          :items="itemsWork"
          :loading="loading"
          v-model="valueProfile.sphere.value"
          :rules="typeRules"
          label="Cфера"
        ></v-select>
        <v-text-field
          v-model="valueProfile.organization.value"
          :loading="loading"
          :rules="typeRules"
          label="Организация"
          required
        ></v-text-field>
        <v-text-field
          v-model="valueProfile.position.value"
          :loading="loading"
          :rules="typeRules"
          label="Должность"
          required
        ></v-text-field>
        <div class="workPickerSection">
          <div class="workPicker">
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
                v-model="valueProfile.period.value"
                :loading="loading"
                label="Период с"
                readonly
              ></v-text-field>
              <v-date-picker
                v-model="valueProfile.period.value"
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
                <v-btn flat color="primary" @click="$refs.menu.save(valueProfile.period.value)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <div class="switchPicker">
            <v-switch :label="`Сейчас работаю`" v-model="valueProfile.period.nowPeriod" style="display: inline-block;"></v-switch>
          </div>
          <div v-if="!valueProfile.period.nowPeriod" class="workPicker">
            <v-menu
              ref="menuTo"
              :close-on-content-click="false"
              v-model="menuTo"
              :nudge-right="40"
              :return-value.sync="dateTo"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="valueProfile.period.periodTo"
                :loading="loading"
                label="Период по"
                readonly
              ></v-text-field>
              <v-date-picker
                v-model="valueProfile.period.periodTo"
                :loading="loading"
                color="primary"
                header-color="green lighten-1"
                ref="picker"
                :max="new Date().toISOString().substr(0, 10)"
                :min="valueProfile.period.value"
                no-title
                locale="ru-ru"
                first-day-of-week="1"
                scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menuTo = false">Выйти</v-btn>
                <v-btn flat color="primary" @click="$refs.menuTo.save(valueProfile.period.periodTo)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </div>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'work',
  data () {
    return {
      valid: false,
      date: null,
      menu: false,
      dateTo: null,
      menuTo: false,
      itemsWork: ['Банки, инвестиции, лизинг', 'Маркетинг, реклама PR', 'Наука, образование', 'Производство'],
      typeRules: [
        v => !!v || 'Обязательное поле'
      ]
    }
  },
  computed: {
    valueProfile () {
      return this.$store.getters['dataStore/getDataInputProfile'].work
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
  .workPickerSection{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .workPicker{
    flex-basis: 33%;
    z-index: 4;
  }
  .switchPicker{
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    flex-basis: 25%;
    top: 60%;
    transform: translateY(-50%);
    z-index: 3;
  }
</style>
