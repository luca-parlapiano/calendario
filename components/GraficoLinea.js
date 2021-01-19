import React from 'react';

import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

import {
    LineChart,
} from "react-native-chart-kit";

const GraficoLinea = props => {
    const screenWidth = Dimensions.get("window").width;
    const mesi = props.mesi

    const chartConfig = {
        backgroundColor: props.backgroundColor,
        backgroundGradientFrom: props.backgroundGradientFrom,
        backgroundGradientTo: props.backgroundGradientTo,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    }

    return (
        <View>
            <LineChart
                data={{
                    labels: mesi,
                    datasets: [{ data: props.data }]
                }}
                width={screenWidth} // from react-native
                height={220}
                yAxisLabel={props.yAxisLabel}
                yAxisSuffix={props.yAxisSuffix}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={styles.graphStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    graphStyle: {
        marginVertical: 8,
        borderRadius: 16
    }
})

export default GraficoLinea