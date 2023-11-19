import { Text } from "react-native";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

function ChartUI({ data, type }) {
  if (data.length === 0 && typeof data === 'object' && Array.isArray(data) ) {
    return <Text> Loading... </Text>;
  }
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 32;
  const chartHeight = 220;
  var uiData = [];
  //merge value, creat_at to object
  if (!Array.isArray(data)) {
    return <Text> No data... </Text>;
  } else {
    uiData = data.map((point) => {
      return {
        x: point.created_at,
        y: point.value,
      };
    });
  }


  //reverse the data
  uiData.reverse();

  console.log(uiData[data.length - 1]);

  const handleDataPointClick = ({ ...datasets }) => {
    const { dataset, index, value } = datasets;
    alert(`Giá trị: ${value}${type}\nThời gian:${dataset.label[index]}`);
  };

  return (
    <LineChart
      data={{
        labels: uiData.map((point) => point.x),
        datasets: [
          {
            data: uiData.map((point) => point.y),
            label: uiData.map((point) => point.x),
          },
        ],
      }}
      width={chartWidth}
      height={chartHeight}
      chartConfig={chartConfig}
      withVerticalLabels={false}
      yAxisSuffix={type}
      onDataPointClick={handleDataPointClick}
    />
  );
}

export default ChartUI;
