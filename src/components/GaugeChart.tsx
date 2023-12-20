/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { DefaultArcObject } from "d3";

interface GaugeChartProps {
  value: number;
  max: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, max }) => {
  const ref = useRef<SVGSVGElement>(null);
  const size = 40;
  const percentage = value * (100 / max);

  useEffect(() => {
    drawGaugeChart();
  }, [percentage]);

  const drawGaugeChart = () => {
    if (ref.current) {
      const svg = d3.select(ref.current);
      const gaugeValue = Math.min(Math.max(percentage, 0), 100);
      svg.selectAll("*").remove();
      const g = svg
        .append("g")
        .attr("transform", `translate(${size / 2}, ${size / 2})`);

      const arc = d3
        .arc()
        .innerRadius(15)
        .outerRadius(20)
        .startAngle(-Math.PI / 2);

      g.append("path")
        .datum<DefaultArcObject>({
          endAngle: Math.PI / 2,
          startAngle: -Math.PI / 2,
          innerRadius: 15,
          outerRadius: 20,
        })
        .style("fill", "#ddd")
        .attr("d", arc);

      g.append("path")
        .datum<DefaultArcObject>({
          endAngle: -Math.PI / 2 + (gaugeValue / 100) * Math.PI,
          startAngle: -Math.PI / 2,
          innerRadius: 15,
          outerRadius: 20,
        })
        .style("fill", percentage > 80 ? "#820000" : "#ff7f50")
        .attr("d", arc);

      g.append("text")
        .attr("x", 0)
        .attr("y", 5)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "#000")
        .text(value);
    }
  };

  return (
    <svg
      aria-label={`Words count :${value}`}
      ref={ref}
      width={size}
      height={size}
    ></svg>
  );
};

export default GaugeChart;
