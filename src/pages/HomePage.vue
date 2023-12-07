<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const showChangeLog = ref(false)
const showContacts = ref(false)
const isSearchBarActive = ref(false)
const searchTerm = ref('')

const runHomepageSearch = () => {
	if(isSearchBarActive.value) { 
		router.push({ path: '/search', query: { q: searchTerm.value } })
	}
}
</script>

<template>
	<div class="h-screen w-full font-mono text-white overflow-x-hidden">
		<div class="h-fit">
			<img class="w-14 h-14 mt-9 ml-12 hover:animate-bounce cursor-pointer -translate-y-1/4" src="@/assets/pixel_grace.png" alt=":)">
		</div>
		<div class="h-1/5"></div>
		<div class="w-full flex flex-col items-center">
			<div class="min-w-fit w-full animate-fadeInUpTitle">
				<div class="min-w-max flex flex-col justify-center items-center">
					<div class="my-2 min-w-max h-28 bg-gradient-to-r from-pink-600 via-green-500  to-blue-600 text-8xl font-sans text-transparent bg-clip-text max-[880px]:text-6xl max-[545px]:text-5xl">
						<h1>SDVX Library</h1>
					</div>
				</div>
			</div>
			<div class="mt-28 w-16 h-16 text-4xl select-none rounded-full flex flex-nowrap items-center justify-end bg-black/80" :class="isSearchBarActive?'w-72 animate-widthChangeIncreaseBox':''" @mouseover="isSearchBarActive = true">
				<div class="mx-4 flex">
					<input v-if="isSearchBarActive" v-model="searchTerm" type="text" class="animate-widthChangeIncreaseText w-[14rem] text-2xl text-center bg-transparent focus:outline-none focus:ring-0 " placeholder="" autocomplete="off">
					<img class="h-8 w-8 hover:cursor-pointer hover:brightness-125" src="https://icons.veryicon.com/png/o/education-technology/education-app/search-137.png" @click="runHomepageSearch">
				</div>
			</div>
			<div class="mt-32 text-lg text-gray-400 flex">
				<p>2023-10-31 - First release of SDVX Library 🎉</p>
			</div>
			<div class="mt-4 text-lg flex select-none">
				<div class="px-4 border-r border-white/20 hover:text-blue-400 hover:cursor-pointer" @click="showChangeLog = !showChangeLog; showContacts = false">
					Changelog
				</div>		
				<div class="px-4 hover:text-blue-400 hover:cursor-pointer" @click="showContacts = !showContacts;showChangeLog = false">
					Contact
				</div>	
			</div>
			<footer class="mt-auto hidden">
				SDVX Library was made by kazu, I can be reached at kazu#1635 on Discord
			</footer>
			<div v-if="showChangeLog" class="h-24 min-w-fit w-[706px] max-md:w-[300px] max-[327px]:h-fit bg-black/80 mt-4">
				<div class="m-8 text-lg inline-flex">
					<div class="text-yellow-400 whitespace-nowrap">
						2023-10-31
					</div>
					<div class="text-white">
						&ensp;-&ensp;First release of SDVX Library
					</div>
				</div>
			</div>
			<div v-if="showContacts" class="h-24 w-[706px] max-md:w-fit max-[327px]:h-fit bg-black/80 mt-4">
				<div class="m-8 text-lg inline-flex min-w-fit">
					<img class="w-10 h-8" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png">
					<div class="text-white whitespace-nowrap">
						&emsp;&emsp;I can be reached at&nbsp;
					</div>
					<div class="text-yellow-400">
						kazu#1635
					</div>
				</div>
			</div>
		</div>
	</div>
</template>