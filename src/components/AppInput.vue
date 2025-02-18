<template>
  <div :class="$style.container">
    <input
      :class="[$style.container__input, { shake: isShaking }]"
      maxlength="100"
      type="text"
      placeholder="Добавить задачу"
      v-model="newTask"
      @keyup.enter="handleAddTask"
    >
    <button :class="$style.container__button" @click="handleAddTask">
      Добавить
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import useStore from '../store/store';

  const newTask = ref('');
  const { addTask } = useStore();
  const isShaking = ref(false);

  const handleAddTask = () => {
    if (newTask.value.trim()) {
      addTask(newTask.value.trim());
      newTask.value = '';
    }
  };

  watch(newTask, (newValue, oldValue) => {
    if (newValue.length === 100 && newValue.length > oldValue.length) {
      isShaking.value = true;
    
      setTimeout(() => {
        isShaking.value = false;
      }, 500);
    }
  });
</script>

<style lang="scss" module scoped>
  .container {
    display: flex;
    gap: 1rem;

    &__input {
      width: 100%;
      padding: 2.5rem 2rem;
      border-radius: 1rem;
      background-color: $secondary;
      font-size: 1.8rem;
      color: $font-primary;
      font-family: $font-family;

      @media (max-width: 768px) {
        padding: 1.5rem 1rem;
        font-size: 1.5rem;
      }
    }

    &__button {
      width: fit-content;
      padding: 2.5rem 2rem;
      border-radius: 1rem;
      background-color: $active;
      font-size: 1.8rem;
      color: $font-active; 
      font-family: $font-family;

      @media (max-width: 768px) {
        padding: 1.5rem 1rem;
        font-size: 1.5rem;
      }

      &:hover {
        background-color: $tertiary;
      }
    }
  }
</style>
