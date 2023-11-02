<script setup lang="ts">
import { ref } from 'vue'
const showChangeLog = ref(false)
const showContacts = ref(false)

</script>

<template>
	<div class="h-screen w-full flex flex-col items-center font-mono text-white overflow-hidden">
		<div class="h-1/4"></div>
		<div class="min-w-fit w-full bg-black/60">
			<div class="min-w-max flex flex-col justify-center items-center">
				<div class="my-2 min-w-max h-fit text-5xl max-md:text-4xl">
					Sound Voltex Library
				</div>
			</div>
		</div>
		<div class="mt-32 w-fit h-fit text-4xl select-none border-2 rounded-full hover:bg-sky-600">
			<router-link to="/search" class="px-12">Song Search</router-link>
		</div>
		<div class="mt-32 text-lg text-gray-400">
			2023-10-31 - First release of SDVX Library
		</div>
		<div class="mt-4 text-lg flex">
			<div class="px-4 border-r border-white/70 hover:text-blue-400 hover:cursor-pointer" @click="showChangeLog = !showChangeLog; showContacts = false">
				Changelog
			</div>		
			<div class="px-4 hover:text-blue-400 hover:cursor-pointer" @click="showContacts = !showContacts;showChangeLog = false">
				Contact
			</div>	
		</div>
		<footer class="mt-auto hidden">
			SDVX Library was made by kazu, I can be reached at kazu#1635 on Discord
		</footer>
		<div v-if="showChangeLog" class="min-w-fit w-[706px] max-md:w-[300px] bg-black/80 mt-4">
			<div class="m-8 text-lg inline-flex">
				<div class="text-yellow-400">
					2023-10-31
				</div>
				<div class="text-white">
					&ensp;-&ensp;First release of SDVX Library
				</div>
			</div>
		</div>
		<div v-if="showContacts" class="min-w-fit w-[706px] max-md:w-[300px] bg-black/80 mt-4">
			<div class="m-8 text-lg inline-flex">
				<img class="w-10 h-8" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png">
				<div class="text-white">
					&emsp;&emsp;I can be reached at&nbsp;
				</div>
				<div class="text-yellow-400">
					kazu#1635
				</div>
			</div>
		</div>
	</div>
</template>