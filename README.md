# 충북 GEG 랜딩페이지

Google Educator Group Chungbuk(충북 GEG) 소개 랜딩페이지. Next.js (App Router) + TypeScript + Tailwind CSS로 제작한 정적 원페이지 사이트입니다.

## 개발

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 빌드

```bash
npm run build
```

## 연락처 채널 연결하기

`가입/참여 방법` 섹션의 연락처는 아직 실제 채널이 없어 예시 플레이스홀더로 표시됩니다. 실제 이메일/구글폼이 준비되면 Vercel 프로젝트의 환경변수에 아래 값을 설정하면 코드 수정 없이 반영됩니다.

- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_FORM_URL`

## 배포

Vercel에 저장소를 연결하면 별도 설정 없이 배포됩니다.
