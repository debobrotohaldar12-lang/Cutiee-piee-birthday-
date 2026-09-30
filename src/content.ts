/**
 * ==============================================================================
 * BIRTHDAY WEBSITE CONTENT & CONFIGURATION
 * ==============================================================================
 * You can easily customize her name, photos, and messages right here!
 */

export const HER_NAME = "Cutiee piee 🫠🙃🌷";

export interface PhotoMemory {
  id: number;
  title: string;
  caption: string;
  defaultImage: string; // Base64, local path, or URL
  aspectRatio?: string;
  note?: string;
}

export const BIRTHDAY_DATA = {
  // Page 1: Opening
  page1: {
    greeting: "Hey, wait...",
    subtitle: "I made something for you.",
    buttonText: "Open this →",
  },

  // Page 2: Alien Birthday Transmission
  page2: {
    header: "TRANSMISSION RECEIVED 👽",
    metaFrom: "From: Earth",
    metaTo: "To: Birthday Girl",
    message: "A very important birthday message has arrived.",
    buttonText: "Receive message →",
  },

  // Page 3: 4-Photo Memory Wall
  page3: {
    title: "Classified Evidence 📁",
    subtitle: "Some strictly un-curated moments of Madam",
    photos: [
      {
        id: 1,
        title: "Photo 01: Floral Pout 🌸",
        caption: "Baalon mein phool laga ke innocent banne ki full koshish! 🤘",
        defaultImage: "",
      },
      {
        id: 2,
        title: "Photo 02: Rare Decent Click ✨",
        caption: "Okay okay, ye wali actually achi hai... zyada hawa mein mat udna. 🙄🌷",
        defaultImage: "",
      },
      {
        id: 3,
        title: "Photo 03: Saree Swag 🥻",
        caption: "Yellow saree mein madam ka iconic look — 100% drama! 💛",
        defaultImage: "",
      },
      {
        id: 4,
        title: "Photo 04: Candid Pose 📸",
        caption: "Hair adjust karne ka candid drama... Certified Cutiee piee! 🫠🙃",
        defaultImage: "",
      },
    ],
    closingPrompt1: "Waise photos toh kaafi hain... bas ek cheez missing hai.",
    closingPrompt2: "I am still waiting... jb ham saath mein photo lenge 🫠🌷",
    buttonText: "Keep going →",
  },

  // Page 4: Birthday Letter
  page4: {
    title: "A handwritten letter for you",
    letterPages: [
      {
        pageNumber: 1,
        content: `Happy Birthday to my cutieee piee 🫠🙃🌷

Sabse pehle, thank you so much meri itni achi dost banne ke liye. 🙃 I genuinely don't think mujhe kabhi properly realise hua hai ki ek saal ke andar humne kitni saari memories bana li, kitni saari random baatein share ki, aur ek dusre ke baare mein kitna kuch jaan liya.

I still remember Richa ne tumse pucha tha ki main kaun hoon Instagram pe, aur tumne bataya tha ki main tumhara BFF hoon. Ye October mein hua tha, aur tab se October mere liye bohot saari memories se bhara hua hai. 🌷`,
      },
      {
        pageNumber: 2,
        content: `It's actually crazy ki sirf ek saal mein hum kitna close ho gaye. Kabhi random bakchodi, kabhi serious talks, kabhi ek dusre ko irritate karna, aur kabhi bina kuch bole hi samajh jaana. And honestly, tumne mujhe jitna support aur samjha hai, probably utna main deserve bhi nahi karta tha. 😭

Mostly tum hi mujhe samjhati ho ki mujhe kya nahi karna chahiye, kya sahi hai aur kya nahi... aur main phir bhi kabhi kabhi sunta nahi hoon. I know that gets frustrating, and I'm genuinely sorry for that. 🙃 Aur kuch cheezon ke liye bhi sorry... reasons tumhe pata hain, so I don't think mujhe unhe yaha explain karne ki zarurat hai. Chhodo, birthday hai tumhara, aaj unnecessary serious nahi hona. 😭`,
      },
      {
        pageNumber: 3,
        content: `But there's one thing I don't say enough.

Kabhi kabhi jab mujhe koi do best friends aapas mein baat karte hue dikhte hain, pata nahi kyun, but I miss you a little more. I miss our old days. Woh random conversations, woh stupid si baatein, woh bina kisi reason ke ek dusre ko tang karna... sab kuch.

And maybe time ke saath things change. School khatam hoga, hum yaha se dur honge, apni-apni life mein busy honge. But please, kabhi mujhe bhulna mat. I really hope ki distance sirf distance rahe, aur hum waise hi bina kisi reason ke ek dusre ko tang karte rahein. 🙃`,
      },
      {
        pageNumber: 4,
        content: `I don't know future mein kitni cheezein same rahengi, but I genuinely hope ki ek cheez same rahe... humari friendship. 🧿

So today, bas enjoy your day. Don't overthink anything, don't stress about anything, and please smile a lot because birthday girl ko aaj ye sab allowed hai. 🌷

And haan, birthday hai toh party bhi deni padegi. Aise nahi chalega 🙄

Once again, happiest birthday to youuu. I hope this year brings you a lot of happiness, good memories, and all the little things that make you genuinely happy.

Thank you again for being my Bestesttttttttttttttt Friend. 🧿🌷👽

And yes... I'll probably keep annoying you for absolutely no reason.

Love you 🌷

Thank you. 🧿🌷👽👽👽`,
      },
    ],
    buttonText: "There's more →",
  },

  // Page 5: Little Surprise Cards
  page5: {
    title: "A few things you should know 👽",
    subtitle: "Tap each card to open secret notes",
    cards: [
      {
        id: "wish",
        label: "One wish",
        icon: "✨",
        reveal: "Ki tum hamesha aisi hi raho — thodi pagal, thodi dramatic, but genuinely the sweetest person. Aur haan, saare dreams poore ho jayein!",
      },
      {
        id: "memory",
        label: "One memory",
        icon: "📸",
        reveal: "Jab Richa ne tumse Insta pe pucha tha aur tumne officially bola tha 'ye mera BFF hai'. Us din se level hi alag ho gaya tha.",
      },
      {
        id: "warning",
        label: "One warning",
        icon: "⚠️",
        reveal: "Birthday girl ko party deni hi padegi. 🙄 No excuses accepted anywhere in the galaxy.",
      },
      {
        id: "surprise",
        label: "One surprise",
        icon: "🎁",
        reveal: "Aapke liye ek special manual aur background verification pending hai... get ready!",
      },
    ],
    buttonText: "Continue →",
  },

  // Page 6: Fake Ending
  page6: {
    line1: "Happy Birthday, cutieee piee 🌷",
    line2: "Thank you for being my Bestesttttt Friend. 🧿",
    theEnd: "The End.",
    buttonText: "Close this little thing →",
  },

  // Page 7: The Twist
  page7: {
    line1: "Tumhe kya laga website khatam ho gaya? 👽",
    line2: "Abhi toh shuru hua hai.",
    buttonText: "Continue →",
  },

  // Page 8: The Unofficial Bestie Manual
  page8: {
    title: "THE UNOFFICIAL BESTIE MANUAL 👽",
    subtitle: "Clause 302 of the Intergalactic Bestie Code",
    rules: [
      {
        number: "RULE #01",
        text: "Isko bina reason tang karna mandatory.",
        tag: "Daily Requirement",
      },
      {
        number: "RULE #02",
        text: "Advice degi. Ignore karna optional. Consequences guaranteed. 🫠",
        tag: "High Hazard",
      },
      {
        number: "RULE #03",
        text: "Birthday girl ko party deni hi padegi. Aise nahi chalega 🙄",
        tag: "Non-Negotiable",
      },
      {
        number: "RULE #04",
        text: "School ke baad bhi friendship ki expiry date nahi hai. 🧿",
        tag: "Permanent Clause",
      },
    ],
    buttonText: "Understood, boss →",
  },

  // Page 9: BFF Verification Test
  page9: {
    title: "⚠️ IMPORTANT VERIFICATION",
    subtitle: "Ek bahut serious sawaal hai. Soch samajh ke answer dena.",
    question: "Kya main tumhara BFF hoon? 👽",
    yesOption: "Haan obviously 🙄🌷",
    noOption: "Nahi",
    yesBranch: {
      step1: "Verification successful. ✅",
      step2: "Mujhe pata hi tha. Itna obvious question tha. 🙄",
      step3: "BFF status: PERMANENT 🧿",
      buttonText: "Okay, continue →",
    },
    noBranch: {
      step1: "Okay 🥺",
      step2: "Thik hai 🥺🥺",
      step3: "...but ek baar aur soch lo na? 👽",
      reconsiderButton: "Haan yaar, tum BFF ho 😭",
      afterReconsider1: "Good. Crisis avoided. 😌",
      afterReconsider2: "Mujhe laga birthday ke din hi meri BFF position chali jayegi. 🙄🌷",
      buttonText: "Continue →",
    },
  },

  // Page 10: One Thing I Never Say
  page10: {
    intro: "There's one thing I don't say enough...",
    revealButton: "Open it →",
    text1: "I'm genuinely grateful that somehow, out of all the people we could've met, we ended up becoming this close.",
    text2: "Aur I really hope school ke baad bhi humare paas random messages, stupid jokes aur bina reason ke ek dusre ko tang karne ke reasons hote rahenge.",
    text3: "Distance aaye, life busy ho, cheezein change ho... bas mujhe bhulna mat. 🌷",
    buttonText: "Continue →",
  },

  // Page 11: Actual Final Ending
  page11: {
    line1: "Happy Birthday, {HER_NAME} 🌷",
    line2: "Keep being you, meri personal chudail. 🤘",
    line3: "Bestesttttttt Friend 🧿",
    footerText: "Made with too much effort, too many thoughts & probably questionable sleep hours 👽",
  },
};
