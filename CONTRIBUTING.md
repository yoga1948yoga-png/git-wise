# Contributing to gitwise

Thank you for taking the time to contribute!

## Getting started

```bash
git clone https://github.com/YOUR_USERNAME/gitwise.git
cd gitwise
npm install
npm run dev   # watch mode
```

## Submitting changes

1. Fork the repo and create a branch: `git checkout -b feat/your-feature`
2. Make your changes and ensure `npm run build` passes with no errors
3. Open a Pull Request — use `gitwise pr` to generate the description 😉

## Reporting bugs

Open an issue at https://github.com/YOUR_USERNAME/gitwise/issues and include:
- Your OS and Node.js version
- The command you ran
- The error output

## Code style

- TypeScript strict mode is enabled — no `any` types
- Keep functions small and focused
- Add JSDoc comments for public functions
