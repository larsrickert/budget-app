<script lang="ts" setup>
import { getDatasetColors, registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Line } from "vue-chartjs";

// register default Chart.js plugins
Chart.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
);

registerOnyxPlugin(Chart);

const props = defineProps<{
  items: BudgetDevelopmentItem[];
  loading?: boolean;
}>();

const { d, n } = useI18n();

const chartData = computed<ChartData<"line">>(() => {
  return {
    labels: props.items.map((item) => d(item.date, "date")),
    datasets: [
      {
        data: props.items.map((item) => item.budget),
        label: "Label",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 8,
        ...getDatasetColors("info"),
      },
    ],
  };
});

const chartOptions = computed<ChartOptions<"line">>(() => {
  return {
    maintainAspectRatio: false, // needed to set height via CSS
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        grid: {
          lineWidth: (context) => (context.tick.value == 0 ? 3 : 1),
        },
        ticks: {
          callback: (value) => n(+value, "currencyCompact"),
        },
      },
    },
    hover: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        intersect: false,
        callbacks: {
          label: (item) => {
            const value = item.dataset.data[item.dataIndex] as number;
            return n(value, "currency");
          },
        },
      },
    },
  };
});
</script>

<template>
  <div class="chart">
    <OnyxLoadingIndicator v-if="props.loading" type="circle" />

    <ClientOnly v-else>
      <Line :data="chartData" :options="chartOptions" />

      <template #fallback>
        <OnyxLoadingIndicator type="circle" />
      </template>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 22rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
