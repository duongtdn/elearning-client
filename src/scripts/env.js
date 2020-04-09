"use strict"

/*
  enviroment parameter for client script must be udated when deploy
*/

export default {
  urlAccount: 'http://localhost:3100',
  app: 'elearn',
  urlBasePath: '/api',
  urlQuizzesBasePath: '/api/quizzes',
  urlExamBasePath: '/api/exam',
  urlTestResultBasePath: '/api/result',
  urlWebstore: 'http://localhost:3200',
  template: {
    avata: {
      male: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100',
      female: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100'
    }
  },
  mode: 'developnent'
}
