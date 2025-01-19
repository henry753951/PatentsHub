# PatentsHub

- [PatentsHub](#patentshub)
   - [Technologies Used](#technologies-used)
   - [Project setup](#project-setup)
      - [Initial setup](#initial-setup)
      - [Development](#development)
      - [Production](#production)
   - [Development](#development-1)
      - [Git Workflow](#git-workflow)
      - [Code guidelines](#code-guidelines)

## Technologies Used

Main technologies used in this project are:

- Nuxt.js
- Vue.js
- Eletron.js

## Project setup
### 專案架構
```
.
├── dist/       # 打包後的檔案
├── .output/ .nuxt dist-electron/ # Compiled files
|
├── electron/   # Electron 檔案 [Main Process, Renderer Process]
├── server/     # tRPC 溝通 Router [Main Process]
|   └── ...     # 請看 server/README.md
|
└── ...         # Nuxt.js 檔案 [Renderer Process]
```
### Initial setup

```bash
pnpm install
pnpm run postinstall
```

### Development

```bash
pnpm run dev
```

### Production

```bash
pnpm run build:all # build for Electron and Nuxt

# or
pnpm run build:app # build for Electron
pnpm run build # build for Nuxt
```

## Development

### Git Workflow

- Branch naming convention

   - `release/v1.0.0` for releases
   - `refactor/refactor-name` for refactoring
   - `feature/feature-name` for new features
   - `bugfix/bug-name` for bug fixes
   - `chore/chore-name` for chores
   - `test/test-name` for testing

- Commit messages
  Use the following format for commit messages:
  `Type(scope): subject or Type: subject`

1. `feat(auth): ✨ add user login functionality`
2. `fix(api): 🐛 resolve missing headers in request`
3. `docs(readme): 📚 update setup instructions`
4. `style(ui): 🎨 fix alignment in header component`
5. `perf(db): ⚡ optimize query for user data`
6. `refactor(auth): ♻️ move login logic to separate file`

### Code guidelines

Check out the [our code guidelines](./docs/code-guidelines.md) for more information on how to write clean and maintainable code.
