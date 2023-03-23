<template>
    <div class="w-full">
        <MainHeader />
        <button class="btn my-5 mx-auto block" @click="changeView">Change data visualisation</button>
        <div class="container-1 shadow-lg w-5/6 rounded-md mx-auto flex mt-7 p-2 flex-wrap justify-center bg-[#8a99996b]" v-if="minimizeData">
            <div class="card location p-2 border rounded m-2">
                <h2>Location Data:</h2>
                <div v-if="locationExist.value">
                    <p>Continent: {{ pageCodeData?.value?.data?.continent?.name }}</p>
                    <p>Country: {{ pageCodeData?.value?.data?.country?.name}}</p>
                    <p>State: {{ pageCodeData?.value?.data?.state?.name }}</p>
                    <p>City: {{ pageCodeData?.value?.data?.city?.name }}</p>
                    <p>ZIP Code: {{ pageCodeData?.value?.data?.code?.name }}</p>
                </div>
                <div v-else>
                    <p >{{ pageCodeData?.value?.data }}</p>
                </div>
            </div>
            <div class="card useragent p-2 border rounded m-2">
                <h2>UserAgent:</h2>
                <p>Browser: {{ pageUserData?.value?.name }}</p>
                <p>Device-desktop: {{ pageUserData?.value?.device?.type }}</p>
                <p>OS: {{ pageUserData?.value.os?.name }} {{ pageUserData?.value.os?.version }}</p>
            </div>
            <div class="card extra p-2 border rounded m-2">
                <h2>Referrer:</h2>
                <p>{{ myReferrer }}</p>
                <h2>IP Data:</h2>
                <p>Country: {{ pageIpData?.value?.country_name }}</p>
                <p>Country-code: {{ pageIpData?.value?.country_code }}</p>
                <p>Region-name: {{ pageIpData?.value?.region }}</p>
                <p>City: {{ pageIpData?.value?.city }}</p>
                <p>User IP: {{ pageIpData?.value?.ip }}</p>
                <h2>UTM tags:</h2>
                <p>{{ pageUTMtags }}</p>
            </div>
        </div>
        <div class="container-2 shadow-lg w-5/6 rounded-md mx-auto flex mt-7 p-2 flex-wrap justify-center bg-[#8a99996b]" v-else>
            <div class="card location p-2 border rounded m-2">
                <h2>Location Data:</h2>
                <p>{{ pageCodeData?.value?.data }}</p>
            </div>
            <div class="card useragent p-2 border rounded m-2">
                <h2>UserAgent:</h2>
                <p>{{ pageUserData }}</p>
            </div>
            <div class="card extra p-2 border rounded m-2">
                <h2>Referrer:</h2>
                <p>{{ myReferrer }}</p>
                <h2>IP Data:</h2>
                <p>{{ pageIpData }}</p>
                <h2>UTM tags:</h2>
                <p>{{ pageUTMtags }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import {useFetchedData} from '@/hooks/useFetchedData'

    const { code } = useRoute().params
    
    const myReferrer = ref('some')
    const pageCodeData = ref({})
    const pageUserData = ref({})
    const pageIpData = ref({})
    const pageUTMtags = ref([])
    const locationExist = ref()
    const minimizeData = ref(true)

    const changeView = () => {
        minimizeData.value = !minimizeData.value
    }

    //test query
    // const testpath = 'http://localhost:3000/4654?utm1=someTag1&utm2=someTag2&params=some'
    // ===========
    const getUTMtags = (path) => {
        if (path.includes('?')) {
            const mypath = path.split('?')
            const pathParamsArr = mypath[1].split('&').map(item => item.split('='))
            const utmTagsArr = pathParamsArr.filter(item => /^utm/.test(item[0]))
            return utmTagsArr
        } else {
            return []
        }
        
    }


    if (process.client){
        myReferrer.value = document.referrer
        pageUTMtags.value = getUTMtags(myReferrer.value)
        const {codeData, userData, ipData, locExist} = useFetchedData(code)
        pageCodeData.value = codeData
        pageUserData.value = userData
        pageIpData.value = ipData
        locationExist.value = locExist
    }
    
</script>

<style scoped>
.card {
    width: 30%;
    height: 600px;
    min-width: 300px;
    overflow-y: auto;
}
</style>