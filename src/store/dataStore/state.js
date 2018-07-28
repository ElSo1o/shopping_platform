export default {
  user: null,
  spinner: {
    show: false
  },
  itemsWelcome: [
    {
      number: 1,
      title: 'Профиль',
      description: 'Заполни профиль Тайного Покупателя. Важно указывать корректные данные для получения более выгодных заказов и вознаграждения за выполненные задания. Все конфиденциально, мы ценим приватность своих друзей.',
      btn: {
        title: 'Заполнить',
        link: 'UserProfile'
      },
      active: true,
      complete: true
    },
    {
      number: 2,
      title: 'Азбука тайного покупателя',
      description: 'Пройди Азбуку Тайного Покупателя. Докажи себе и заказчикам, что ты можешь справиться с любым заданием и заслуживаешь достойной оплаты',
      btn: {
        title: 'Пройти',
        link: 'UserProfile'
      },
      active: false,
      complete: false
    },
    {
      number: 3,
      title: 'Вакансии',
      description: 'Теперь можешь выбрать интересную вакансию, пригласить друзей улучшать сервис в твоем городе и получить приятный денежный бонус. Список вакансий постоянно обновляется, мы будем информировать тебя о самых интересных.',
      btn: {
        title: 'Начать',
        link: 'UserProfile'
      },
      active: false,
      complete: false
    }
  ],
  settingUser: null,
  authUser: {}
}
