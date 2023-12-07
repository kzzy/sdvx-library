<script setup lang="ts">
import { ref } from 'vue'
import { sendEmail } from '@/ses/ses'

const props = defineProps(['song'])
const state = ref('form')
const message = ref()

// https://media.tenor.com/rt-b5wrDLisAAAAC/bocchi-the-rock-bocchi.gif
</script>

<template>
    <div v-show="state == 'form'" class="h-[592px] w-[798px] max-md:w-[422px] flex flex-col items-center" >
        <div class="text-5xl">🛠️</div>
        <h3 class="mt-4">There might be some missing or incorrect information for this song.</h3>
        <h3 class="mb-4">Please help submit a screenshot or fill in the form with the right information.</h3>
        <label for="reportSong" class="w-1/2 mt-5 mb-1 pl-3 font-medium text-lg">Song</label>
        <div id="reportSong" class="w-1/2 mb-6 border-0 rounded-xl pointer-events-none select-none bg-slate-900 filter drop-shadow-md">
            <input type="text" :placeholder="props.song" class="w-full ml-3 my-1 focus:outline-none focus:ring-0 bg-transparent select-none" :class="(props.song.length>46)?'text-sm':'text-base'">
        </div>
        <label for="reportDescription" class="w-1/2 mt-7 mb-1 pl-3 font-medium text-lg">Message</label>
        <textarea id="reportDescription" v-model="message" rows="6" required placeholder="Enter your message here!" class="filter drop-shadow-md resize-none bg-slate-900 text-white rounded-xl w-1/2 h-48 pl-3 pr-1 py-1 my-1 focus:outline-none focus:ring-0"></textarea>
        <button type="submit" class="text-2xl font-normal my-6 px-4 py-2 rounded-xl outline-none outline-offset-2 hover:text-blue-200 hover:outline hover:bg-[#0F0F0F]" @click="sendEmail(props.song, message);state='result'" >Submit</button>
    </div>
    <div v-show="state == 'result'" class="h-[592px] w-[798px] max-md:w-[422px] flex flex-col justify-center items-center">
        <p class="text-3xl">Message sent!</p>
    </div>
</template>