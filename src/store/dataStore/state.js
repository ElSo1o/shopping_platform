export default {
  user: null,
  spinner: {
    show: false
  },
  itemsWelcome: [
    {
      title: 'Профиль',
      description: 'Заполни профиль Тайного Покупателя. Важно указывать корректные данные для получения более выгодных заказов и вознаграждения за выполненные задания. Все конфиденциально, мы ценим приватность своих друзей.',
      btn: {
        title: 'Заполнить',
        link: 'UserProfile'
      }
    },
    {
      title: 'Азбука тайного покупателя',
      description: 'Пройди Азбуку Тайного Покупателя. Докажи себе и заказчикам, что ты можешь справиться с любым заданием и заслуживаешь достойной оплаты',
      btn: {
        title: 'Пройти',
        link: 'UserProfile'
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
        value: 180
      },
      hair: {
        value: ''
      },
      weight: {
        value: 75
      },
      marital: {
        value: false
      }
    },
    location: {}
  }
}
