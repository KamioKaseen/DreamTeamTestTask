<template>
  <button :class="$style.checkbox" @click="toggle">
    <span :class="[$style.checkbox__state, isChecked ? $style['checkbox__state--completed'] : '']"></span>
  </button>
</template>
  
<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    isChecked: boolean;
  }>();
  
  const emit = defineEmits<{
    (e: 'update:checked', value: boolean): void;
  }>();
  
  const toggle = () => {
    emit('update:checked', !props.isChecked);
  };
</script>
  
<style lang="scss" module scoped>
  .checkbox {
    display: grid;
    place-content: center;
    padding: 0.3rem;
    border: 2px solid $font-secondary;
    border-radius: 50%;
    transition: background-color 0.3s;
  
    &:hover {
      border-color: $active;
    }

    &__state {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: transparent;
      transition: background-color 0.3s;
    }
    
    &__state--completed {
      background-color: $active;
    }
  }
</style>
  