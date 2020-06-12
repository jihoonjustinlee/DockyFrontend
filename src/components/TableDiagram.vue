<template>
  <div class="table-diagram">
    <div class="column">
      <div class="section row-20"></div>
      <div class="section row-40"></div>
      <div class="section row-40"></div>
    </div>
    <div class="column">
      <div class="section row-50"></div>
      <div class="section row-50"></div>
    </div>
    <div class="column">
      <div class="section row-20"></div>
      <div class="section row-20"></div>
      <div class="section row-20"></div>
      <div class="section row-40"></div>
    </div>
    <div class="column">
      <div class="section row-70"></div>
      <div class="section row-30"></div>
    </div>
    <div class="column">
      <div class="section row-100"></div>
    </div>
  </div>
</template>

<style scoped>
  .table-diagram{
    width: 100%;
    height: 100%;
    max-width: 220px;
    display: flex;
  }

  .section{
    background: rgba(0, 40, 77, 0.6);
    width: 100%;
    margin: 6px 0;
    transition: all 0.1s ease-in-out;
    bottom: 0;
  }

  .row-20{
    height: calc(20% - 6px);
  }
  .row-30{
    height: calc(30% - 6px);
  }

  .row-40{
    height: calc(40% - 6px);
  }

  .row-50{
    height: calc(50% - 6px);
  }

  .row-70{
    height: calc(70% - 6px);
  }

  .row-100{
    height: calc(100% - 6px);
  }
  .column{
    height: 100%;
    padding: 0 3px;
    box-sizing: border-box;
    width: 20%;
  }

  .section:hover{
    background: rgba(0, 40, 77, 0.8);
    position: relative;
    bottom: 5px;
  }
</style>