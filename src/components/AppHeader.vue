<template>
  <header :class="$style.header">
    <h2 :class="$style.header__greeting">Приветствую!</h2>

    <h1 :class="$style.header__date">{{monthName}}, {{day}}</h1>
  </header>
</template>

<script lang="ts" setup>
  import useStore from '../store/store';

  const { formatDate } = useStore();
  const { monthName, day } = formatDate();
</script>

<style module lang="scss" scoped>
  .header {
    display: flex;
    flex-direction: column;
    color: $font-primary;
    font-family: $font-family;
    
    @media (max-width: 768px) {
      justify-content: center;
    }

    &__date {
      font-size: 6rem;
      color: $active;
      font-weight: 500;
      
      @media (max-width: 480px) {
        font-size: 4.5rem;
      }
    }

    &__greeting {
      font-size: 4rem;
      font-weight: 500;
    
      @media (max-width: 480px) {
        font-size: 3rem;
      }
    }
  }
</style>