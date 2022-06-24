import * as echarts from "echarts";
import axios from "axios";

const dom = document.createElement("canvas");
dom.setAttribute("width", 512);
dom.setAttribute("height", 512);

export const treemapSunburstChart = echarts.init(dom);
document.body.appendChild(dom);

axios
  .get(import.meta.env.BASE_URL + "echarts/echarts-package-size.json")
  .then((res) => {
    const data = res.data;
    const treemapOption = {
      series: [
        {
          type: "treemap",
          id: "echarts-package-size",
          animationDurationUpdate: 1000,
          roam: false,
          nodeClick: undefined,
          data: data.children,
          universalTransition: true,
          label: {
            show: true,
          },
          breadcrumb: {
            show: false,
          },
        },
      ],
    };
    const sunburstOption = {
      series: [
        {
          type: "sunburst",
          id: "echarts-package-size",
          radius: ["20%", "90%"],
          animationDurationUpdate: 1000,
          nodeClick: undefined,
          data: data.children,
          universalTransition: true,
          itemStyle: {
            borderWidth: 1,
            borderColor: "rgba(255,255,255,.5)",
          },
          label: {
            show: false,
          },
        },
      ],
    };
    let currentOption = treemapOption;
    treemapSunburstChart.setOption(currentOption);
    setInterval(function () {
      currentOption =
        currentOption === treemapOption ? sunburstOption : treemapOption;
      treemapSunburstChart.setOption(currentOption);
    }, 3000);
  });
