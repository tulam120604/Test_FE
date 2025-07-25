# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Install

clone repo (https://github.com/tulam120604/Test_FE)

- npm i
- npm run dev
- npx json-server db.json

## source
- _root: gồm folder pages và layout. Trong page có login và dashboard
- components: có các component confirmDialog, CRUD task, loadingOverLay
- toàn bộ app.jsx được bọc bởi storeProvider dùng useContext & useReducer để tạo và cập nhật global state, sau đó cung cấp cho các component qua context
- data dùng json-server