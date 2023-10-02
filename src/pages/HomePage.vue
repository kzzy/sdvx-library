<script setup lang="ts">
import SearchPage from '../pages/SearchPage.vue'
</script>

<template>
	<body>
		<div class="bg-main absolute w-full h-screen -z-50">
			<ul class="bg-circles -z-40">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
			</ul>
		</div>
		<div id="background_container" class="flex">
			<SearchPage/>
		</div>
	</body>
</template>