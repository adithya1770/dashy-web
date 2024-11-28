<div class="lg:ml-0 ml-4 lg:mt-0 mt-5 lg:h-auto lg:w-auto h-52 w-72">
    <canvas id="myChart"></canvas>
</div>
  
<style>
  canvas {
  width: 100%;
  height: auto;
}

</style>

<script>
  export let parsedInfoArray;

  import Chart from 'chart.js/auto';
  import { onMount } from "svelte";

  onMount(() => {
    const ctx = document.getElementById('myChart');

    const labels = parsedInfoArray.map(item => item.Day);
    const data = parsedInfoArray.map(item => item.Cal);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Calories',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
</script>

