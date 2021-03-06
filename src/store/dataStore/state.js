export default {
  user: {
    displayName: null
  },
  spinner: {
    show: false
  },
  itemsWelcome: [
    {
      title: 'Профиль',
      description: 'Заполни профиль Покупателя. Важно указывать корректные данные для получения более выгодных заказов и вознаграждения за выполненные задания. Все конфиденциально, мы ценим приватность своих друзей.',
      btn: {
        title: 'Заполнить',
        link: 'UserProfile'
      }
    },
    {
      title: 'Правила покупателя',
      description: 'Пройди Правила Покупателя. Докажи себе и заказчикам, что ты можешь справиться с любым заданием и заслуживаешь достойной оплаты',
      btn: {
        title: 'Пройти',
        link: 'Balance'
      }
    },
    {
      title: 'Вакансии',
      description: 'Теперь можешь выбрать интересную вакансию, пригласить друзей улучшать сервис в твоем городе и получить приятный денежный бонус. Список вакансий постоянно обновляется, мы будем информировать тебя о самых интересных.',
      btn: {
        title: 'Начать',
        link: 'UserProfile'
      }
    }
  ],
  settingUser: null,
  authUser: {
    profile: {
      welcome: [
        {
          active: true,
          complete: false,
          stepperNumber: 1
        },
        {
          active: false,
          complete: false,
          stepperNumber: 2
        },
        {
          active: false,
          complete: false,
          stepperNumber: 3
        }
      ],
      stepper: 1
    }
  },
  dataInputProfile: {
    personal: {
      filled: false,
      dob: {
        value: ''
      },
      tel: {
        value: ''
      },
      birthday: {
        value: ''
      },
      gender: {
        value: ''
      },
      height: {
        value: 120
      },
      hair: {
        value: ''
      },
      weight: {
        value: 50
      },
      marital: {
        value: '',
        isMarital: false
      }
    },
    location: {
      value: '',
      lat: null,
      lng: null,
      dataTable: []
    },
    education: {
      type: '',
      level: '',
      institute: '',
      specialty: '',
      dataTable: []
    },
    language: {
      level: {
        value: null,
        lng: '',
        valueMobile: ''
      },
      dataTable: []
    },
    work: {
      data: {
        sphere: '',
        organization: '',
        position: '',
        periodWith: '',
        nowPeriod: false,
        periodTo: ''
      },
      dataTable: []
    },
    hobby: {
      itemsValueFirst: [
        {
          name: 'Автосалоны',
          value: false
        },
        {
          name: 'Аптечные сети',
          value: false
        },
        {
          name: 'Банки,кредитные услуги',
          value: false
        },
        {
          name: 'Безопасность, охрана',
          value: false
        },
        {
          name: 'Гостиницы и отели',
          value: false
        },
        {
          name: 'Зоотовары, ветеринарные услуги',
          value: false
        },
        {
          name: 'Издательства и СМИ',
          value: false
        },
        {
          name: 'Казино, игорный бизнес',
          value: false
        }
      ],
      itemsValueSecond: [
        {
          name: 'Мебельные салоны',
          value: false
        },
        {
          name: 'Медицинские учреждения и услуги',
          value: false
        },
        {
          name: 'Недвижимость',
          value: false
        },
        {
          name: 'Образование, воспитание',
          value: false
        },
        {
          name: 'Продуктовые сети',
          value: false
        },
        {
          name: 'Промышленность, производство',
          value: false
        },
        {
          name: 'Рестораны, кафе, бары',
          value: false
        },
        {
          name: 'Ритуальные услуги, салоны',
          value: false
        }
      ]
    },
    car: {
      data: {
        mark: {
          value: ''
        },
        model: {
          value: ''
        },
        years: {
          value: ''
        },
        guarantee: {
          value: false
        }
      },
      dataTable: []
    },
    discount: {
      data: {
        discountValue: ''
      },
      dataTable: []
    }
  },
  showWarningProfile: {
    show: true
  },
  loadingInput: {
    loading: false
  },
  successSaveData: {
    show: false,
    component: null
  },
  itemsMenu: [
    { title: 'Основная информация', icon: 'dashboard', sure: true, component: 'personal', filled: false },
    { title: 'Местанахождения', icon: 'room', sure: true, component: 'location', filled: false },
    { title: 'Образование', icon: 'school', component: 'education', filled: false },
    { title: 'Язык', icon: 'language', component: 'language', filled: false },
    { title: 'Работа', icon: 'work', component: 'work', filled: false },
    { title: 'Интересы', icon: 'nature_people', component: 'hobby', filled: false },
    { title: 'Личный транспорт', icon: 'directions_car', component: 'car', filled: false },
    { title: 'Дисконтные программы', icon: 'timeline', component: 'discount', filled: false }
  ],
  showRepeat: {
    show: false,
    input: null
  }
}
