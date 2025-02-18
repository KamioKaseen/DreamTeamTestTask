<template>
  <div 
    :class="$style.task" 
    :style="{ filter: task.completed ? 'brightness(0.6)' : 'none' }">

    <div :class="$style.task__checkbox">
      <TodoCheckBox
        :isChecked="task.completed"
        @update:checked="handleToggleTask"
      />
    </div>

    <div :class="$style.task__content">
      <div :class="$style.task__content" >
        <p :class="$style.task__date">{{ task.date.fullDate }}</p>
        <input
          :class="[$style.task__input, { shake: isShaking }]"
          v-if="isEditing"
          v-model="editedText"
          maxlength="200"
          @keyup.enter="saveEdit"
          @blur="saveEdit"
        />
        <p v-else
          :class="$style.task__text" 
          :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
            {{ task.text }}
        </p>
      </div>
    </div>
    
    <div :class="$style.task__actions">
      <button @click="enableEdit">
        <IconEdit :class="$style.task__icon" />
      </button>
      <button @click="handleRemoveTask">
        <IconDelete :class="$style.task__icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import IconEdit from '../icons/IconEdit.vue';
  import IconDelete from '../icons/IconDelete.vue';
  import TodoCheckBox from './AppCheckBox.vue';
  import useStore from '../store/store';

  const props = defineProps({
    task: {
      type: Object,
      required: true,
    },
  });

  const isEditing = ref(false);
  const editedText = ref(props.task.text);
  const isShaking = ref(false);
  const { removeTask, toggleTask, updateTask } = useStore();

  watch(editedText, (newValue, oldValue) => {
    if (newValue.length === 200 && newValue.length > oldValue.length) {
      isShaking.value = true;

      setTimeout(() => {
        isShaking.value = false;
      }, 500);
    }
  });

  const handleRemoveTask = () => {
    removeTask(props.task.id);
  }

  const handleToggleTask = () => {
    toggleTask(props.task.id, );
  }
 
  const enableEdit = () => {
    isEditing.value = true;
    editedText.value = props.task.text;
  };

  const saveEdit = () => {
    const updatedTask = {
      id: props.task.id,
      text: editedText.value,
    }

    if (editedText.value.trim()) {
      updateTask(updatedTask);
    }

    isEditing.value = false;
  };
</script>

<style lang="scss" module scoped>
  .task {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: repeat(1, 1fr);
    gap: 2%;
    width: 100%;
    padding: 1.5rem;
    border-radius: 1rem;
    background-color: $secondary;
    color: $font-primary;
    font-size: 1.8rem;
    font-family: $font-family;
    overflow-wrap: break-word;
   

    &__actions {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    &__content {
      flex: 1 1 auto;
      min-width: 0;
    }
    
    &__input {
      width: 100%;
      border-bottom: 1px $active solid;
      background-color: $secondary;
      font-size: 1.6rem;
      color: $font-primary;
      font-family: $font-family;
    }

    &__date {
      color: $font-secondary;
      font-size: 1.2rem;
      transform: translateY(-25%);
    }

    &__text {
      width: 100%;
      font-size: 1.6rem;
      overflow-wrap: break-word;
    }

    &__icon {
      width: 1.8rem;  

      &:hover {
        fill: $active;
      }
    }
  }
</style>
