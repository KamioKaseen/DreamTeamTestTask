<template>  
  <div :class="$style.list">  
      <slot></slot>
  </div>  
</template>  

<script lang="ts">  
  export default {  
      name: 'TodoList',  
  };  
</script>  

<style lang="scss" module scoped>  
  .list {  
    display: flex;  
    flex-direction: column;  
    gap: 2rem;  
    width: 100%; 
    padding-right: .7rem;
    overflow-y: auto;
    font-family: $font-family;

    &::-webkit-scrollbar {  
      width: .5rem;
      height: .5rem;    
    }  
    &::-webkit-scrollbar-thumb {  
      background: $active; 
      border-radius: 6px;  
    }  
    &::-webkit-scrollbar-thumb:hover {  
      background: #555;
    }  
  }
</style>  