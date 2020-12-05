import React from "react";
import { ResponsiveLine } from "@nivo/line";



export default ({ data }) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 150, bottom: 50, left: 150 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", stacked: true, min: "auto", max: "auto" }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "last 12 hours",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "price",
        legendOffset: -40,
        legendPosition: "middle",
        tickValues: 8,
      }}
      enableGridX={false}
      enableGridY={false}
      colors={data[0].colors}
      lineWidth={4}
      enablePoints={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="y"
      pointLabelYOffset={-12}
      
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          itemTextColor: "#eee",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(100, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
