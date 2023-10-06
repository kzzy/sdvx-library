<script setup lang="ts">
const props = defineProps(['description'])

const descriptionLookup: { [key:string]:string } = {
    'arcade':'Corresponds to the Official Sound Voltex cabinet version',
    'konasute':'Konasute(コナステ) is the PC Port version of Sound Voltex that is playable through Bemani\'s online platform',
    'tierlist': 'The ranking is based off of a Japanese Playerbase curated tier list that is recognized in the community'
}
</script>

<template>
    <div class="absolute bottom-8 border-2 w-64 h-fit bg-gray-800 rounded-lg text-sm z-10">
        <p class="m-1">{{ descriptionLookup[props.description] }}</p>
    </div>
</template>