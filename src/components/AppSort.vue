<template>
  <div :class="$style.sort">
    <TodoSortButton
      label="Все"
      filter="all"
      :active="state.currentFilter === 'all'"
      @set-filter="filterList"
    />
    <div :class="$style.sort__group">
      <TodoSortButton
        label="Выполненные"
        filter="completed"
        :active="state.currentFilter === 'completed'"
        @set-filter="filterList"
      />
      <TodoSortButton
        label="В работе"
        filter="uncompleted"
        :active="state.currentFilter === 'uncompleted'"
        @set-filter="filterList"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import TodoSortButton from './AppSortButton.vue';
  import useStore from '../store/store';

  const { state, filterList: filterList } = useStore();
</script>

<style lang="scss" module scoped>
  .sort {
    display: flex;
    width: fit-content;
  
    &__group {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-left: 1rem;
      padding-left: 1rem;
      border-left: 2px solid $secondary;
    }
  }
</style>
