"use strict"

import React from 'react'
import { render } from 'react-dom'

import AccountClient from '@realmjs/account-client'
import { UserProvider } from '@realmjs/react-user'

import env from './env'

import AppData from '../Templates/AppData'
import Error from '../Templates/Error'
import { Href } from '@realmjs/react-navi'

const content = {
  "id": "c-01",
  "materials": [
    {
      "downloadable": false,
      "title": "Embedded Text Book. Second Edition",
      "url": "https://google.com"
    },
    {
      "downloadable": false,
      "title": "GNU Compiler for C",
      "url": "https://google.com"
    },
    {
      "downloadable": true,
      "title": "Course handout - Practice C Problems and Answers 1",
      "url": "https://google.com"
    },
    {
      "downloadable": true,
      "title": "Course handout - Practice C Problems and Answers 2",
      "url": "https://google.com"
    },
    {
      "downloadable": true,
      "title": "Course handout - Practice C Problems and Answers 3",
      "url": "https://google.com"
    }
  ],
  "note": "<p>Thank you for chosing our service and Welcome to class <span class=\"bold italic\"> Basic C for Embedded </span>.<br /> During this class, you will learn about C programming Language and apply it to embedded project based on Arduino board. For study efficiency, we recommend you to look at the note after each lesson, and also practice with our quizzes.<br /> At the end, you can take an exam. Passing this exam will certify your C and Arduino skills at Novice level. <p class=\"w3-right\">Yours Sincerely,<br />Instructor</p>",
  "parts": [
    {
      "id": "p1",
      "title": "Cover Songs"
    },
    {
      "id": "p2",
      "title": "Two steps from hell"
    }
  ],
  "tests": [
    {
      "description": "Mid-term Test for course Embedded - 01",
      "examId": "c-01-m",
      "title": "Mid-term Exam"
    },
    {
      "description": "Final Test for course Embedded - 01",
      "examId": "c-01-f",
      "title": "Final Exam"
    }
  ],
  "topics": [
    {
      "id": "t1",
      "lessons": [
        {
          "id": "q1",
          "player": "QUIZ",
          "src": "quiz-0.json",
          "subLessons": [
            {
              "id": "0",
              "player": "YOUTUBE",
              "skip": 1,
              "src": "YHjA7nR1yYo"
            },
            {
              "id": "1",
              "player": "YOUTUBE",
              "src": "rZqJBjTP7Xk"
            },
            {
              "id": "2",
              "player": "QUIZ",
              "src": "quiz-1.json"
            },
            {
              "id": "3",
              "player": "YOUTUBE",
              "skip": 1,
              "src": "hKRUPYrAQoE"
            },
            {
              "id": "4",
              "player": "YOUTUBE",
              "src": "qwJj2EpC8vg"
            }
          ],
          "title": "QUIZ - Example 1"
        },
        {
          "id": "q2",
          "player": "QUIZ",
          "src": "quiz-3.json",
          "title": "QUIZ - Topic FInal Test"
        },
        {
          "id": "l2",
          "player": "YOUTUBE",
          "src": "VsjzB7GRZeA",
          "subLessons": [
            {
              "id": "0",
              "player": "PROMPT",
              "src": "{\"prompt\":\"Do you want to see next song?\",\"buttons\":[{\"label\":\"Yes, I want to see\"},{\"label\":\"No, move to next lesson\",\"action\":{\"skip\":1}}]}"
            },
            {
              "id": "1",
              "player": "YOUTUBE",
              "src": "YHjA7nR1yYo"
            }
          ],
          "title": "The Lord of The Rings - Piano cover by Mark Fowler"
        },
        {
          "id": "l3",
          "player": "YOUTUBE",
          "src": "dQiNVk_u0po",
          "title": "The Lord of The Rings - Cover by Linsay Stirling"
        },
        {
          "id": "l4",
          "player": "YOUTUBE",
          "src": "no3B0uS6nLk",
          "title": "The Elder Scrolls: Skyrim - Piano cover by Mark Fowler"
        },
        {
          "id": "l5",
          "player": "YOUTUBE",
          "src": "XQMnT9baoi8",
          "title": "The Elder Scrolls: Skyrim Dragonborn - Piano cover by Mark Fowler"
        },
        {
          "id": "l6",
          "player": "YOUTUBE",
          "src": "KNDT7EInclo",
          "title": "The Elder Scrolls: Skyrim Age of Aggression - Cover by Malukah"
        }
      ],
      "part": "p1",
      "title": "Epic songs cover from YOUTUBE"
    },
    {
      "id": "t2",
      "lessons": [
        {
          "id": "l1",
          "player": "YOUTUBE",
          "src": "5Y0LhI4pkas",
          "title": "Hotarubi No Mori E"
        },
        {
          "id": "l2",
          "player": "YOUTUBE",
          "src": "mF3DCa4TbD0",
          "title": "Sadness and Sorrow -Cover by Taylor Davis"
        },
        {
          "id": "l3",
          "player": "YOUTUBE",
          "src": "OJ4adTsgAPk",
          "title": "Hokage funeral"
        }
      ],
      "part": "p1",
      "title": "Japanese songs from anime"
    },
    {
      "id": "t3",
      "lessons": [
        {
          "id": "l1",
          "player": "YOUTUBE",
          "src": "hKRUPYrAQoE",
          "title": "Victory"
        },
        {
          "id": "l2",
          "player": "YOUTUBE",
          "src": "qwJj2EpC8vg",
          "title": "Strength of a Thousand Men"
        },
        {
          "id": "l3",
          "player": "YOUTUBE",
          "src": "ASj81daun5Q",
          "title": "Protectors of the Earth"
        },
        {
          "id": "l4",
          "player": "YOUTUBE",
          "src": "nziL13HF2DA",
          "title": "Merchant Prince"
        },
        {
          "id": "l5",
          "player": "YOUTUBE",
          "src": "DUZCedq9a4Q",
          "title": "Star Sky"
        }
      ],
      "part": "p2",
      "title": "Most favirote song from the album"
    }
  ]
}
const progress = {
  "id": "c-01",
  "study": {},
  "test": {}
}
const href = new Href();
const path = href.getPathName().split('/');
const contentId = path.length > 1 && path.shift();
if (!contentId) {
  render (<Error code = '400' message = 'Bad query' />, document.getElementById('root'));
} else {
  const acc = new AccountClient({
    app: env.app,
    baseurl: env.urlAccount
  })
  acc.sso( (status, user) => {
    if (user) {
      render(
        <UserProvider accountClient = {acc} >
          <AppData env = {env} contentId = {contentId} href={href} />
        </UserProvider>,
        document.getElementById('root')
      )
    } else {
      render (<Error code = '401' message = {`Please login from ${env.urlWebstore}`} />, document.getElementById('root'));
    }
  })
}
