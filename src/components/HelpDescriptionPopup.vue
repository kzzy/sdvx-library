<script setup lang="ts">
const props = defineProps(['description'])

const descriptionLookup: { [key:string]:string } = {
    'arcade':'Refers to the Sound Voltex Cabinets running on the Official servers',
    'konasute':'Konasute(コナステ) is the PC Port version of Sound Voltex that is playable through Bemani\'s online platform',
    'tierlist':'The ranking is based off of a Japanese Playerbase curated tier list that is recognized in the community. The tier list applies to level 15+ charts only'
}
</script>

<template>
    <div class="absolute bottom-8 w-64 h-fit bg-gray-800 rounded-lg text-sm z-10 text-blue-200 animate-fadeInUp">
        <p class="m-1.5">{{ descriptionLookup[props.description] }}</p>
    </div>
</template>