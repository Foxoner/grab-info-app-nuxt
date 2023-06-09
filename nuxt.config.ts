// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    app: {
        head: {
            title: 'Grab Info App',
            meta: [
                {name: 'description', content: 'grab user data by ZIP Code'}
            ],
            link: [
                {href:"https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap", rel: "stylesheet"}
            ]
        }
    }
})
