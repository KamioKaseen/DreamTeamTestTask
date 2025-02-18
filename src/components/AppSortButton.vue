<template>
  <button
    :class="[$style.button, active ? $style.active : '']"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  type FilterType = 'all' | 'completed' | 'uncompleted';
  
  const props = defineProps<{
    label: string;
    filter: FilterType;
    active: boolean;
  }>();
  
  const emit = defineEmits<{ (e: 'set-filter', filter: FilterType): void }>();
  
  const handleClick = () => {
    emit('set-filter', props.filter);
  };
</script>

<style lang="scss" module scoped>
  .button {
    flex: 1;
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    background-color: $secondary;
    color: $font-secondary;
    font-family: $font-family;
    font-size: 1.5rem;
    white-space: nowrap;

    &:hover {
      color: $font-primary;
    }
  }

  .active {
    color: $active;
  }
</style>
