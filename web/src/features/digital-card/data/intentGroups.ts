import type { IntentGroup } from "../types/IntentGroup";

export const intentGroups: IntentGroup[] = [
  {
    intent: "message",
    links: [
      {
        id: "eitaa-work",
        label: { en: "Eitaa (PV)", fa: "ایتا (PV)" },
        logo: "/digital-card/eitaa.svg",
        href: "https://eitaa.com/bahrami_work",
      },
      {
        id: "bale-work",
        label: { en: "Bale (PV)", fa: "بله (PV)" },
        logo: "/digital-card/bale.svg",
        href: "https://ble.ir/bahrami_work",
      },
      {
        id: "rubika-work",
        label: { en: "Rubika (PV)", fa: "روبيکا (PV)" },
        logo: "/digital-card/rubika.svg",
        href: "https://rubika.ir/bahrami_work",
      },
    ],
  },
  {
    intent: "learn",
    links: [
      {
        id: "eitaa-codes",
        label: {
          en: "Eitaa (Programming Education)",
          fa: "ایتا (آموزش برنامه‌نویسی)",
        },
        logo: "/digital-card/eitaa.svg",
        href: "https://eitaa.com/bahrami_codes",
      },
      {
        id: "bale-codes",
        label: {
          en: "Bale (Programming Education)",
          fa: "بله (آموزش برنامه‌نویسی)",
        },
        logo: "/digital-card/bale.svg",
        href: "https://ble.ir/bahrami_codes",
      },
      {
        id: "rubika-codes",
        label: {
          en: "Rubika (Programming Education)",
          fa: "روبيکا (آموزش برنامه‌نویسی)",
        },
        logo: "/digital-card/rubika.svg",
        href: "https://rubika.ir/bahrami_codes",
      },
      {
        id: "aparat-codes",
        label: {
          en: "Aparat (Programming Education)",
          fa: "آپارات (آموزش برنامه‌نویسی)",
        },
        logo: "/digital-card/aparat.svg",
        href: "https://www.aparat.com/bahrami_codes",
      },
      {
        id: "virasty-codes",
        label: {
          en: "Virasty (Programming Education)",
          fa: "ویراستی (آموزش برنامه‌نویسی)",
        },
        logo: "/digital-card/virasty.svg",
        href: "https://virasty.com/bahrami_codes",
      },
    ],
  },
  {
    intent: "follow",
    links: [
      {
        id: "eitaa-personal",
        label: {
          en: "Eitaa (Personal Channel)",
          fa: "ایتا (کانال شخصی)",
        },
        logo: "/digital-card/eitaa.svg",
        href: "https://eitaa.com/itsbahrami",
      },
      {
        id: "bale-personal",
        label: {
          en: "Bale (Personal Channel)",
          fa: "بله (کانال شخصی)",
        },
        logo: "/digital-card/bale.svg",
        href: "https://ble.ir/itsbahrami",
      },
      {
        id: "rubika-personal",
        label: {
          en: "Rubika (Personal Channel)",
          fa: "روبيکا (کانال شخصی)",
        },
        logo: "/digital-card/rubika.svg",
        href: "https://rubika.ir/iambahrami",
      },
      {
        id: "aparat-personal",
        label: {
          en: "Aparat (Personal Channel)",
          fa: "آپارات (کانال شخصی)",
        },
        logo: "/digital-card/aparat.svg",
        href: "https://www.aparat.com/itsbahrami",
      },
      {
        id: "virasty-personal",
        label: {
          en: "Virasty (Personal Channel)",
          fa: "ویراستی (کانال شخصی)",
        },
        logo: "/digital-card/virasty.svg",
        href: "https://virasty.com/itsbahrami",
      },
    ],
  },
  {
    intent: "work",
    links: [
      {
        id: "github",
        label: { en: "GitHub", fa: "گیت‌هاب" },
        logo: "/digital-card/github.svg",
        href: "https://github.com/gikdev",
      },
    ],
  },
]
