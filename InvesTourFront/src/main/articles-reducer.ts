import { INIT_ARTICLES } from "./articles-actions";


export const INITIAL_NEWS_STATE = [
        {
          company: "./../assets/TSLA.png",
          text: "TSLA under 110$ this week",
          extendedText: "",
          time: "5 min"
        },
        {
          company: "../assets/META.png",
          text: "META up to 350$ this day",
          extendedText: "",
          time: "10 min"
        },
        {
          company: "../assets/APPLE.png",
          text: "AAPL under 323$ this hour",
          extendedText: "",
          time: "1 hour"
        },
        {
          company: "./../assets/TSLA.png",
          text: "TSLA under 110$ this week",
          extendedText: "",
          time: "2 hours"
        },
        {
          company: "../assets/META.png",
          text: "META up to 350$ this day",
          extendedText: "",
          time: "1 day"
        }
];

export const INITIAL_SOCIAL_MEDIA_STATE = [
    {
        company: "./../assets/Twitter.png",
        text: "TSLA is getting HOT!!!🔥",
        extendedText: "",
        time: "5 min"
      },
      {
        company: "./../assets/Facebook.png",
        text: "META getting boring",
        extendedText: "",
        time: "5 min"
      },
      {
        company: "./../assets/Twitter.png",
        text: "TSLA is getting HOT!!!🔥",
        extendedText: "",
        time: "5 min"
      },
      {
        company: "./../assets/Facebook.png",
        text: "META getting boring",
        extendedText: "",
        time: "5 min"
      },
      {
        company: "./../assets/Twitter.png",
        text: "TSLA is getting HOT!!!",
        extendedText: "",
        time: "5 min"
      },
      {
        company: "./../assets/Facebook.png",
        text: "META getting boring",
        extendedText: "",
        time: "5 min"
      },
      {
        company: "./../assets/Twitter.png",
        text: "TSLA is getting HOT!!!",
        extendedText: "",
        time: "5 min"
      },
      {
        company: "./../assets/Facebook.png",
        text: "META getting boring",
        extendedText: "",
        time: "5 min"
      },
      {
        company: "./../assets/Twitter.png",
        text: "TSLA is getting HOT!!!🔥",
        extendedText: "",
        time: "5 min"
      },
      {
        company: "./../assets/Facebook.png",
        text: "META getting boring",
        extendedText: "",
        time: "5"
      }
]

export const ARTICLES_INITIAL_STATE = {
    news: INITIAL_NEWS_STATE,
    socialMedia: INITIAL_SOCIAL_MEDIA_STATE
}
export function articlesReducer(state = ARTICLES_INITIAL_STATE, action) {
    switch(action.type) {
    case INIT_ARTICLES:
        state[action.payload.field] = action.payload.value
    default:
    return state;
    }
}

