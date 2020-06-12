<template>
  <div class="horizontal-bar-graph">
    <div class="header">
      <div class="data">
        <div class="dot"></div>
        <div class="text"></div>
      </div>
      <div class="data">
        <div class="dot"></div>
        <div class="text"></div>
      </div>
      <div class="data">
        <div class="dot"></div>
        <div class="text"></div>
      </div>
      <div class="data">
        <div class="dot"></div>
        <div class="text"></div>
      </div>
    </div>
    <div class="line pink"></div>
    <div class="line yellow"></div>
    <div class="line green"></div>
    <div class="line red"></div>
    <div class="line blue"></div>
    <div class="line orange"></div>
    <div class="line grey"></div>
    <div class="line dark-blue"></div>
  </div>
</template>

<style scoped>
  .header{
    display: flex;
    justify-content: space-around;
    margin-bottom: 1em;
    padding: 0 1em;
  }
  .data{
    display: flex;
    flex-grow: 1;
    align-items: center;
  }

  .text{
    flex-grow: 1;
    height: 2px;
    background: black;
  }
  .dot{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: black;
    margin: 0 6px;
  }

  .horizontal-bar-graph{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .line{
    height: 15px;
    width: 100%;
    background: #ccc;
    transition: all 0.2s ease-in-out;
    margin: 0.3em 0;
    border-radius: 2px;
  }

  .line:hover{
    width: 100%;
    opacity: 0.8;
  }
  .pink{
    background: rgba(255, 51, 153, 0.7);
    width: 80%;
  }
  

  .yellow{
    background: rgba(255, 255, 0, 0.7);
    width: 70%;
  }

  .red{
    background: rgba(169, 27, 27, 0.9);
    width: 95%;
  }

  .green{
    background: rgba(51, 102, 0, 0.8);
    width: 85%;
  }

  .blue{
    background: rgba(0, 0, 255, 0.9);
    width: 40%;
  }

  .orange{
    width: 50%;
    background: rgba(204, 102, 0, 0.7);
  }

  .grey{
    width: 55%;
    background: rgba(153, 153, 153, 0.8);
  }

  .dark-blue{
    background: rgba(0, 51, 102, 0.9);
    width: 65%;
  }
</style>

