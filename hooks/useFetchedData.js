import axios from 'axios';

export function useFetchedData(code) {
    const codeData = ref({})
    const userData = ref({})
    const ipData = ref({})
    const locExist = ref()

    async function useAxiosData(code, string){
        await Promise.allSettled([
            axios.get(`http://postalcode.parseapi.com/api/fd12434ee7438ea0d3812760835c6798/${code}`),
            axios.get(`http://useragent.parseapi.com/api/fd12434ee7438ea0d3812760835c6798/` + string),
            axios.get(`http://ip-api.com/json/`)

        ])
        .then(results => {

            if (results[0].status == 'fulfilled') {
                codeData.value = results[0].value
                locExist.value = true
            } else {
                codeData.value = {data: `Ooops! Not found location with code ${code}`}
                locExist.value = false
            }
            userData.value = results[1].value.data
            ipData.value = results[2].value.data
        })
        .catch(e => console.log(e))
    }
    if (process.client){
        const userAgentString = encodeURIComponent(navigator.userAgent).replace(/%20/g,'+')
        useAxiosData(code, userAgentString)

        return {ipData, userData, codeData, locExist}

    }  
}
