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
    { href: "#members", label: "멤버" },
    { href: "#join", label: "참여방법" },
    { href: "/board", label: "게시판" },
  ],
  contact: {
    // Real join channels for the whole GEG community (not a specific subgroup).
    googleFormUrl:
      process.env.NEXT_PUBLIC_JOIN_FORM_URL ??
      "https://docs.google.com/forms/d/e/1FAIpQLScPhb3NH7QhhTbM95-hJB1W1jJXF1meM965xZec4zfPpw0R2w/viewform?usp=header",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "cbgeg@sds321.com",
  },
};
