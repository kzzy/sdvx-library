<script setup lang="ts">
import MainSearchField from '../components/MainSearchField.vue'

</script>

<template>
    <body id='body_layout' class="relative h-screen overflow-hidden bg-main">
        <ul class="bg-circles">
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
        <main>
            <div id="background_container" class="relative flex min-h-screen">
                <MainSearchField />
            </div>
        </main>
    </body>
</template>