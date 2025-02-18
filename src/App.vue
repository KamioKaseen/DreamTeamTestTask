<template>
  <div :class="$style.container">
    <TodoHead />

    <main :class="$style.container__content">
      <TodoInput />

      <div 
        :class="$style.container__group"
        v-if="state.taskArray.length > 0">
        <TodoSort />

        <TodoList>
          <TotoListItem
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
          />
        </TodoList>

        <button 
          :class="$style.container__button" 
          @click="clearList">
            Очистить список
        </button>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import TodoHead from './components/AppHeader.vue';
  import TodoInput from './components/AppInput.vue';
  import TodoSort from './components/AppSort.vue';
  import TodoList from './components/AppList.vue';
  import TotoListItem from './components/AppListItem.vue';
  import useStore from './store/store';
  
  export default defineComponent({
    name: 'TodoApp',
    components: {
      TodoHead,
      TodoInput,
      TodoSort,
      TodoList,
      TotoListItem,
    },
    setup() {
      const {
        state,
        filteredTasks,
        clearList,
      } = useStore();

      return {
        state,
        filteredTasks,
        clearList,
      };
    },
});
</script>

<style module lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 40%;
    margin: 5% auto;
    padding: 1rem;

    @media (max-width: 1280px) {
      width: 65%;
    }

    @media (max-width: 768px) {
      width: 100%;
    }

    &__content {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 2rem 1.5rem;
      border: 3px $secondary solid;
      border-radius: 2rem;
    }

    &__group {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-height: 55vh;
    }

    &__button {
      align-self: center;
      font-family: $font-family;
      font-size: 1.6rem;
      color: $font-secondary;

      &:hover {
        color: $font-primary;
      }
    }
}
</style>
