# **Simple Test Job for AI-accelerated Mobile App Developer**

This test job consists of one task to assess your skills in React Native development accelerated with AI tools.

**Task:** build a small React Native app that replicates the "**Account setup**" experience from [https://dev-cf.visageneral.com/register](https://dev-cf.visageneral.com/register) (skip CAPTCHA). This is a local-only exercise: do not send any data to that site.

## **A. Requirements**

1. **Platform:** React Native with TypeScript.  
2. **Screens:**  
   1. **Registration:** replicate the fields and layout from the linked web form (except CAPTCHA). If the form uses dropdowns (e.g., country), provide local data (e.g., a JSON file).  
   2. **Login:** email/username \+ password.  
   3. **Home/Profile:** simple screen showing the registered user data and a logout button.  
3. **Form behavior & validation:**  
   1. All required fields must be enforced with inline errors and disabled submit until valid.  
   2. Validate common types (email format, password strength \+ confirm match, required text fields, phone format if present).  
   3. Persist partially filled registration state so it survives app restarts.  
4. **Local authentication:**  
   1. Store credentials securely on device (Keychain/Keystore via a library like Expo SecureStore or react-native-keychain). Do not store plaintext.  
   2. Session persistence across app restarts; logout clears session.  
   3. Optional: lockout after 5 failed login attempts; optional biometric unlock.  
5. **UX/UI:**  
   1. Make it visually appealing and consistent.  
   2. Accessible: proper labels, hints, focus order, sufficient color contrast, screen reader friendly.  
   3. Smooth keyboard handling on small screens; avoid layout jumps.  
   4. **Optional:** gamification and FOMO  
6. **Architecture:**  
   1. Reasonable project structure; minimal state management (Context/Zustand/Redux ok).  
   2. Prefer a form helper (Formik/React Hook Form) but hand-rolled is fine if clean.  
7. **Testing & quality:**  
   1. Unit tests for validation and auth logic.  
   2. ESLint \+ Prettier; no TypeScript errors (tsc passes).  
8. **Data & privacy:**  
   1. Do not call the actual website; no network calls required.  
   2. If reference data is needed (countries, etc.), ship it locally.

## **B. Deliverables**

1. **Public Git repository with:**  
   1. App source code.  
   2. **Scripts:** install, start, test, lint in package.json.  
   3. **README** with: setup/run instructions, architecture notes, validation rules implemented, security approach, and any trade-offs.  
   4. 3–5 screenshots or a short screen recording of the flow.  
   5. **Optional:** Android APK and/or iOS TestFlight link.  
2. **AI usage transparency**  
   1. Add a detailed section in AI-TOOLS.md describing any AI tools used, selection criteria, why and how.  
   2. Copy key prompts in a separate Markdown file (in case you need to repeat this exercise with a different AI agent).

## **C. Evaluation Criteria**

1. **Correctness:** fields and validation match the web form (excluding CAPTCHA) and local-only behavior.  
2. **UI:** UX/UI polish and accessibility.  
3. **Code quality:** structure, readability, TS types, linting.  
4. **Security baseline:** no plaintext secrets, secure credential storage, logout/session handling.  
5. **Tests:** meaningful coverage of validation/auth logic.  
6. **Documentation:** clarity and completeness of README.  
7. **Effective use of AI** to speed up delivery without sacrificing quality.

## **D. Timebox**

Aim for 4–8 hours. If you stop early, document gaps and next steps in the README.

## **E. Stretch Goals (optional)**

1. Biometric login (Face ID/Touch ID).  
2. Dark mode and theming (preferrably to be handled through a centralized store, either through Redux or the context API).  
3. E2E tests (Detox) for a happy path.

## **F. Submission**

Share the **GitHub public repository link** via Upwork.

Include any notes needed to run on iOS and Android.