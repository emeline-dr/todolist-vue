<script>
import TodoForm from './TodoForm.vue'

export default {
    components: {
        TodoForm
    },
    data() {
        return {
            tasks: [],
            selectedState: 'all',
        };
    },
    computed: {
        filteredTasks() {
            return this.tasks.filter(task => {
                if (this.selectedState === 'completed') return task.completed;
                if (this.selectedState === 'uncompleted') return !task.completed;
                return true;
            });
        }
    },
    mounted() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    },
    methods: {
        isCompleted(task) {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        editingTask(task) {
            task.isEditing = !task.isEditing;
            this.editTask = this.task.text;
        },
        saveEdit(task) {
            if (this.editTask.trim() === '') return
                task.isEditing = false;
                task.text = this.editTask;
                this.editTask = '';
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        removeTask(index) {
            this.tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        updateSelectedState(newState) {
            this.selectedState = newState;
        }
    }
}
</script>

<template lang="pug">
    .w-full.flex.flex-wrap.p-4.justify-center
        h1.text-center.text-2xl.bg-sky-50.rounded.py-2(class="w-1/2") To Do List

    TodoForm(v-bind:tasks="tasks" @update-state="updateSelectedState")

    transition-group.w-full(name="fade" tag="div")
        .w-full.flex.flex-wrap.justify-center.my-2(v-for="(task, index) in filteredTasks" :key="index")
            .w-full.flex.flex-wrap.justify-evenly.items-center
                .h-14.flex.justify-between.items-center.w-full.ps-4(:class="[task.completed ? 'bg-slate-900 text-sky-50 line-through' : 'bg-sky-50']" class="lg:w-1/2") 
                    RouterLink(:to="{ name: 'item', params: { index: index}, query: { text: task.text, completed: task.completed }}" class="hover:font-bold").cursor-pointer {{ task.text }}
                    div
                        button.h-14.bg-green-800.text-sky-50.px-4(class="transition duration-300 hover:text-green-800 hover:bg-sky-50 hover:ease-in-out" @click="isCompleted(task)") <font-awesome-icon :icon="['fas', 'check']" size="2xl" />
                        button.h-14.bg-orange-500.text-sky-50.px-4(class="transition duration-300 hover:text-orange-500 hover:bg-sky-50 hover:ease-in-out" @click="editingTask(task)") <font-awesome-icon :icon="['fas', 'pen-to-square']" size="2xl" />
                        button.h-14.bg-red-800.text-sky-50.px-4(class="transition duration-300 hover:text-red-800 hover:bg-sky-50 hover:ease-in-out" @click="removeTask(index)") <font-awesome-icon :icon="['fas', 'trash']" size="2xl" />
            .flex.justify-center.mt-2(class="w-3/4 lg:w-1/2" v-if="task.isEditing")
                input(type="text").h-14.bg-sky-50.ps-4(class="w-3/4" v-model="editTask" @keyup.enter="saveEdit(task)")
                button.h-14.bg-green-800.text-sky-50.px-4(class="transition duration-300 hover:text-green-800 hover:bg-sky-50 hover:ease-in-out" @click="saveEdit(task)") <font-awesome-icon :icon="['fas', 'check']" size="2xl" />
</template>