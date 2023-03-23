<template>
    <div class="w-full">
        <MainHeader class="border"/>
        <div class="container shadow-lg w-5/6 rounded-md mx-auto mt-20 p-1  bg-[#8a99996b]">
            <div class="description text-3xl rounded-md bg-yellow-50 p-10 text-center font-semibold">
                <p>Hello, this is a useful application with which you can find out useful information by zip code :)</p>
            </div>
            <div class="form flex flex-col justify-center items-center h-60">
                <input type="text" placeholder="Enter ZIP Code" class="w-1/4 mt-1 p-2 rounded-md border border-[#0e1213c7]" @input="inputValidation">
                <button 
                class="btn shadow-sm w-1/6 mt-5 font-bold" 
                @click="onClickBtn()" 
                :disabled="isDisabledBtn">Render</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const router = useRouter()

    let codeValue = ref('')
    const isDisabledBtn = ref(true)

    const inputValidation = (event) => {
        codeValue.value = event.target.value
        if (codeValue.value.length) {
            isDisabledBtn.value = false
        } else {
            isDisabledBtn.value = true 
        }
    }

    const onClickBtn = (event) => {
        router.push(`/${codeValue.value}`)
    }

</script>

<style scoped>

</style>