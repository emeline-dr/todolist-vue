<script>
export default {
    data() {
        return {
            tasks: [],
            task: null,
            editTask: '',
        };
    },
    mounted() {
        const { text, completed } = this.$route.query;

        if (text) {
            this.task = { text, completed: completed === 'true' };
        }

        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    },
    methods: {
        editingTask() {
            this.task.isEditing = !this.task.isEditing;
            this.editTask = this.task.text;
        },
        saveEdit() {
            if (this.editTask.trim() === '') return
            const taskIndex = this.tasks.findIndex(t => t.text === this.task.text);

            if (taskIndex !== -1) {
                this.tasks[taskIndex].text = this.editTask;
            }

            this.task.isEditing = false;
            this.task.text = this.editTask;
            this.editTask = '';
            
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        removeOneTask(index) {
            this.tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            this.$router.push('/');
        },
    }
};
</script>

<template lang="pug">
    .w-full.flex.flex-wrap.p-4.justify-center
        RouterLink.h1.text-center.text-2xl.bg-sky-50.font-bold.rounded.py-2(to="/" class="w-1/2") To Do List

    .w-full.flex.flex-wrap.justify-center.my-2
        .w-full.flex.flex-wrap.justify-evenly.items-center
            .h-14.flex.justify-between.items-center.w-full.ps-4(:class="[task?.completed ? 'bg-slate-900 text-sky-50' : 'bg-sky-50']" class="lg:w-1/2") 
                p.w-full.text-center.text-2xl {{ task?.text }}
                button.h-14.bg-orange-500.text-sky-50.px-4(class="transition duration-300 hover:text-orange-500 hover:bg-sky-50 hover:ease-in-out" @click="editingTask(task)") <font-awesome-icon :icon="['fas', 'pen-to-square']" size="2xl" />
                button.h-14.bg-red-800.text-sky-50.px-4(class="transition duration-300 hover:text-red-800 hover:bg-sky-50 hover:ease-in-out" @click="removeOneTask($route.params.index)") <font-awesome-icon :icon="['fas', 'trash']" size="2xl" />
        .flex.justify-center.mt-2(class="w-3/4 lg:w-1/2" v-if="task?.isEditing")
            input(type="text").h-14.bg-sky-50.ps-4(class="w-3/4" v-model="editTask" @keyup.enter="saveEdit()")
            button.h-14.bg-green-800.text-sky-50.px-4(class="transition duration-300 hover:text-green-800 hover:bg-sky-50 hover:ease-in-out" @click="saveEdit(task)") <font-awesome-icon :icon="['fas', 'check']" size="2xl" />
</template>