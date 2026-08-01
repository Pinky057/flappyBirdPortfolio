/**
 * The Trail — story script.
 *
 * The trail descends from the public self to the private one, and the light
 * descends with it: bright and professional at the top, warm and dim and
 * personal at the campfire. The light is the argument, not decoration.
 *
 *   intro     bright morning   who I am
 *   about     morning          the technical identity
 *   projects  midday           the work
 *   journey   afternoon        the road — what broke, what I learned
 *   voice     golden hour      writing and the tech channel
 *   person    dusk -> night    hobbies, cooking, the other channel, the game
 *   contact   campfire         the invitation
 *
 * This file IS the narration. Rewrite the lines freely — they are spoken by
 * Pinky in the companion bubble as each chapter takes the centre of the screen.
 */

export const CHAPTERS = {
  intro: {
    pose: "wave",
    lines: [
      "Hi — I'm Pinky.",
      "There's a trail through here. Walk it with me and it gets more personal the further down you go.",
    ],
  },

  about: {
    pose: "wave",
    lines: [
      "Start with the useful part.",
      "Full-stack, six years of stack, and a stubborn preference for the bits people actually touch.",
    ],
  },

  experience: {
    pose: "think",
    lines: [
      "Right now I'm a full-stack engineer at Princess Cruise Lines.",
      "Java and Spring Boot on one side, React on the other — and a pile of my own things running live alongside it.",
    ],
  },

  projects: {
    pose: "point",
    lines: [
      "Everything here is live — click through, none of it is a mockup.",
      "The dashboard nearly broke me. Ask me about that one.",
    ],
  },

  journey: {
    pose: "think",
    lines: [
      "This stretch took three years.",
      "It started with a div I could not centre, and it did not get gentler.",
    ],
  },

  voice: {
    pose: "point",
    lines: [
      "I write things down, mostly so I stop making the same mistake twice.",
      "Some of it ends up on dev.to. Some of it ends up on camera.",
    ],
  },

  person: {
    pose: "rest",
    lines: [
      "Alright — we're off the clock now.",
      "This is the part that isn't on the CV. Mochi supervises. Mochi contributes nothing.",
    ],
  },

  contact: {
    pose: "wave",
    lines: [
      "That's the whole trail.",
      "Still here? Then let's talk — I'm easy to find.",
    ],
  },
}

export const CHAPTER_ORDER = [
  "intro",
  "about",
  "experience",
  "projects",
  "journey",
  "voice",
  "person",
  "contact",
]
