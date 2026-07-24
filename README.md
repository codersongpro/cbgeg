# 충북 GEG 랜딩페이지

Google Educator Group Chungbuk(충북 GEG) 소개 랜딩페이지. Next.js (App Router) + TypeScript + Tailwind CSS + Firebase(Firestore)로 제작했습니다. 소모임 등록/가입 신청 기능은 관리자가 발급하는 인증 코드로 보호됩니다.

## 환경변수 설정

`.env.example`을 `.env.local`로 복사하고 값을 채워주세요.

- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`: Firebase 콘솔 > 프로젝트 설정 > 서비스 계정에서 "새 비공개 키 생성"으로 받은 JSON 파일의 값
- `SESSION_SECRET`: `openssl rand -base64 32`로 생성한 임의의 문자열
- `ADMIN_PASSWORD`: `/admin` 관리자 페이지 로그인 비밀번호
- `NEXT_PUBLIC_JOIN_FORM_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`: 선택사항 (기본값이 코드에 이미 설정되어 있음)

## 개발

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

### Firestore 에뮬레이터로 로컬 테스트하기

실제 Firebase 프로젝트 없이도 로컬에서 전체 기능을 테스트할 수 있습니다.

```bash
npx firebase-tools emulators:start --only firestore --project demo-cbgeg
```

에뮬레이터 실행 중에는 `.env.local`에 아래처럼 설정하면 실제 Firebase 대신 에뮬레이터를 사용합니다.

```
FIRESTORE_EMULATOR_HOST=localhost:8080
FIREBASE_PROJECT_ID=demo-cbgeg
```

## 빌드

```bash
npm run build
```

## 관리자 기능 (`/admin`)

`ADMIN_PASSWORD`로 로그인하면:

- **인증 코드 관리**: 소모임을 만들거나 가입하려면 회원이 입력해야 하는 코드를 등록/비활성화/삭제할 수 있습니다. 여러 개를 등록해두고 아무 코드나 맞으면 인증되는 방식입니다.
- **소모임 · 가입 신청 현황**: 모든 소모임의 개설자 정보(실명/소속/연락처)와 가입 신청 목록을 확인할 수 있습니다.

소모임 개설자는 소모임을 만들 때 한 번 표시되는 관리 링크(`/subgroups/[id]/manage?token=...`)로 로그인 없이 자신의 소모임에 온 가입 신청을 확인할 수 있습니다.

### 소모임 관리

- 개설자는 소모임 생성 시 문자 종류 제한 없이 4자 이상의 관리 비밀번호를 직접 설정합니다.
- 랜딩페이지의 `내 소모임 관리`에서 개설 당시 연락처와 관리 비밀번호로 로그인해 자신의 소모임을 수정·삭제하고 가입 신청을 확인할 수 있습니다.
- 기존 관리 링크는 계속 사용할 수 있지만 별도로 저장할 필요는 없습니다.
- 관리자는 `/admin`에서 모든 소모임을 추가·수정·삭제하고 개설자의 관리 비밀번호를 재설정할 수 있습니다. 저장된 비밀번호 원문은 누구도 조회할 수 없습니다.

## 개인정보 처리 방침

- 소모임 개설자 정보는 인증 코드를 입력한 방문자에게만 전체 공개되고, 그 외에는 성만 보이고 나머지는 마스킹됩니다(예: 김철수 → 김○○).
- 가입 신청서(소속/이름/연락처/하고 싶은 말)는 관리자와 해당 소모임 개설자(관리 링크 보유자)만 볼 수 있습니다.

## 연락처 채널

`가입/참여 방법` 섹션과 헤더/푸터의 참여 CTA는 실제 구글폼과 이메일로 연결되어 있습니다. 채널이 바뀌면 Vercel 환경변수에서 교체하면 됩니다.

- `NEXT_PUBLIC_JOIN_FORM_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`

## 배포

Vercel에 저장소를 연결하고 위 환경변수를 설정하면 배포됩니다.
