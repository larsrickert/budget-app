<script lang="ts" setup>
import { useCssVar, useMutationObserver } from "@vueuse/core";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { computed, ref } from "vue";
import { Line } from "vue-chartjs";

export interface ChartItem {
  label: string;
  value: number;
  /** Can be set to change label inside the tooltip. If not set, `label` will be used. */
  tooltipLabel?: string;
}

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const props = withDefaults(
  defineProps<{
    items: ChartItem[];
    color?: "primary" | "success" | "danger";
    xScaleLabel?: string;
    yScaleLabel?: string;
    yTicksFormatter?: (value: number) => string;
    maxXTicks?: number;
  }>(),
  {
    color: "primary",
  }
);

const primaryColor = useCssVar(computed(() => `--el-color-${props.color}-rgb`));
const borderColor = ref({
  color: useCssVar("--el-border-color-lighter"),
});

useMutationObserver(
  document.documentElement,
  () => {
    borderColor.value.color = useCssVar("--el-border-color-lighter").value;
  },
  {
    attributes: true,
    attributeFilter: ["class"],
  }
);

const chartData = computed<ChartData<"line">>(() => {
  const color = primaryColor.value;

  return {
    labels: props.items.map((item) => item.label),
    datasets: [
      {
        data: props.items.map((item) => item.value),
        label: "Label",
        tension: 0.4,
        backgroundColor: `rgba(${color}, 0.15)`,
        fill: true,
        borderColor: `rgb(${color})`,
        pointBorderColor: `rgb(${color})`,
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: `rgb(${color})`,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  };
});

const chartOptions = computed<ChartOptions<"line">>(() => {
  const gridColor = borderColor.value.color;

  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: !!props.xScaleLabel,
          text: props.xScaleLabel,
        },
        grid: {
          color: gridColor,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: props.maxXTicks,
        },
      },
      y: {
        title: {
          display: !!props.yScaleLabel,
          text: props.yScaleLabel,
        },
        grid: {
          color: gridColor,
          lineWidth: (context) => (context.tick.value == 0 ? 3 : 1),
        },
        ticks: {
          callback: props.yTicksFormatter
            ? (value) => props.yTicksFormatter?.(value as number)
            : undefined,
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
            const chartItem = props.items[item.dataIndex];
            return chartItem?.tooltipLabel ?? item.label;
          },
        },
        boxPadding: 4,
      },
    },
  };
});
</script>

<template>
  <div>
    <Line :data="chartData" :options="chartOptions" class="chart" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 350px;
}
</style>
