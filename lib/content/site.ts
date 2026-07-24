export const site = {
  name: "충북 GEG",
  fullName: "충북 Google Educator Group",
  tagline: "열린 마음으로 모이고, 자발적으로 연구하고, 유쾌하게 나누는 교원 커뮤니티",
  founded: "2019",
  memberCount: "100",
  navLinks: [
    { href: "#about", label: "소개" },
    { href: "#subgroups", label: "소모임" },
    { href: "#activities", label: "활동" },
    { href: "#leaders", label: "멤버" },
    { href: "#join", label: "참여방법" },
  ],
  contact: {
    // No real channel exists yet. These placeholders are swapped in later
    // via Vercel environment variables — no code change required.
    email:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "chungbuk.geg@example.com",
    formUrl: process.env.NEXT_PUBLIC_CONTACT_FORM_URL ?? "",
    isPlaceholder: !process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  },
};
