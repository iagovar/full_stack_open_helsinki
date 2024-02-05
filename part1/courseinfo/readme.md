- Using [Vite](https://vitejs.dev/guide/#community-templates) to initialize a React APP with the react template.

``npm create vite@latest my-react-app -- --template react``

- Run the app in the browser: ``npm run dev``

- First instruction: Unfortunately, the entire application is in the same component. Refactor the code so that it consists of three new components: Header, Content, and Total. All data still resides in the App component, which passes the necessary data to each component using props. Header takes care of rendering the name of the course, Content renders the parts and their number of exercises and Total renders the total number of exercises.