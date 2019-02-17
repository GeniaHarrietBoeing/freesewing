import { version } from "../package.json";

export default {
  name: "wahid",
  version,
  measurements: [
    "bicepsCircumference",
    "centerBackNeckToWaist",
    "chestCircumference",
    "naturalWaistToHip",
    "neckCircumference",
    "shoulderSlope",
    "shoulderToShoulder",
    "hipsCircumference",
    "naturalWaist",
    "shoulderToWrist",
    "wristCircumference"
  ],
  dependencies: {
    backBlock: "base",
    frontBlock: "backBlock",
    front: "frontBlock",
    back: "backBlock",
    frontFacing: "front",
    frontLining: "front"
  },
  inject: {
    backBlock: "base",
    frontBlock: "backBlock",
    front: "frontBlock",
    back: "backBlock",
    frontFacing: "front",
    frontLining: "front"
  },
  hide: ["base", "frontBlock", "backBlock"],
  parts: [
    //"frontFacing",
    //"frontLining",
    //"pocketWelt",
    //"pocketFacing",
    //"pocketBag",
    //"pocketInterfacing"
  ],
  options: {
    // These are needed because Brian expects them
    brianFitSleeve: false,
    brianFitCollar: false,
    collarFactor: 4.8,
    backNeckCutout: 0.05,
    shoulderSlopeReduction: 0,
    collarEase: 0.035,
    shoulderEase: 0,
    bicepsEase: 0.15,
    acrossBackFactor: 0.97,
    frontArmholeDeeper: 0.005,

    // Wahid options start here
    frontOverlap: 0.01,
    armholeDepthFactor: {
      pct: 70,
      min: 60,
      max: 80
    },
    pocketLocation: {
      pct: 35,
      min: 25,
      max: 55
    },
    pocketWidth: {
      pct: 10,
      max: 15,
      min: 8
    },
    weltHeight: {
      pct: 12.5,
      max: 20,
      min: 10
    },
    chestEase: {
      pct: 2,
      min: 1,
      max: 10
    },
    waistEase: {
      pct: 8,
      min: 2,
      max: 15
    },
    hipsEase: {
      pct: 8,
      min: 2,
      max: 15
    },
    lengthBonus: {
      pct: 1,
      min: 0,
      max: 8
    },
    backScyeDart: {
      deg: 2,
      min: 0,
      max: 6
    },
    frontScyeDart: {
      deg: 6,
      min: 0,
      max: 12
    },
    centerBackDart: {
      pct: 2,
      min: 0,
      max: 5
    },
    necklineDrop: {
      pct: 50,
      min: 35,
      max: 85
    },
    frontStyle: {
      dflt: "classic",
      list: ["classic", "rounded"]
    },
    hemStyle: {
      dflt: "classic",
      list: ["classic", "rounded"]
    },
    hemRadius: {
      pct: 6,
      min: 0,
      max: 12
    },
    buttons: {
      count: 6,
      min: 4,
      max: 12
    },
    backInset: {
      pct: 15,
      min: 10,
      max: 20
    },
    frontInset: {
      pct: 15,
      min: 10,
      max: 20
    },
    shoulderInset: {
      pct: 10,
      min: 0,
      max: 20
    },
    neckInset: {
      pct: 5,
      min: 0,
      max: 10
    },
    pocketAngle: {
      deg: 5,
      min: 0,
      max: 5
    }
  }
};
