<script>
export default {
    data() {
        return {
            newTask: '',
            selectedState: 'all',
        };
    },
    props: [
        'tasks'
    ],
    methods: {
        addTask() {
            if (this.newTask.trim() === '') return
            this.tasks.push({ text: this.newTask, completed: false });
            this.newTask = '';
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        setState() {
            this.$emit('update-state', this.selectedState);
        }
    }
}
</script>

<template lang="pug">
    .w-full.flex.justify-center.my-4
        .flex.flex-wrap.justify-center.items-center(class="w-3/4")
            input(type="text").h-14.ps-4.bg-sky-50(class="lg:w-96 w-3/4" v-model="newTask" @keyup.enter="addTask")
            button.h-14.bg-sky-50.px-4.text-purple-700(class="transition duration-300 hover:bg-purple-700 hover:text-sky-50 hover:ease-in-out" @click="addTask") <font-awesome-icon :icon="['fas', 'square-plus']" size="2xl" />
            select.h-10.bg-sky-50.mt-4.ps-4(class="lg:ms-4 lg:mt-0" v-model="selectedState" @change="setState")
                option(disabled value="" text="Choisissez une option")
                option(value="all" text="Toutes")
                option(value="completed" text="Complétées")
                option(value="uncompleted" text="À accomplir")
</template>