import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { PieChart, BarChart } from 'react-native-chart-kit'; // Import chart components
import { Dimensions } from 'react-native';
import moment from 'moment'; // To easily work with dates

const Stats = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [stats, setStats] = useState({
    incomeByCategory: [],
    expenseByCategory: [],
    paymentMethodIncome: [],
    paymentMethodExpense: [],
    dailyIncome: [],
    dailyExpense: [],
    weeklyIncome: [],
    weeklyExpense: [],
    monthlyIncome: [],
    monthlyExpense: [],
  });

  useEffect(() => {
    readTransactionData();
  }, []);

  const readTransactionData = async () => {
    try {
      const incomeFileUri = FileSystem.documentDirectory + 'income.json';
      const expenseFileUri = FileSystem.documentDirectory + 'expense.json';

      const incomeData = await readJSONFile(incomeFileUri);
      const expenseData = await readJSONFile(expenseFileUri);

      const incomeTransactions = incomeData ? incomeData.data : [];
      const expenseTransactions = expenseData ? expenseData.data : [];

      setIncomeData(incomeTransactions);
      setExpenseData(expenseTransactions);

      calculateStats(incomeTransactions, expenseTransactions);
    } catch (error) {
      console.log('Error reading transaction files:', error);
    }
  };

  const readJSONFile = async (fileUri) => {
    try {
      const fileContents = await FileSystem.readAsStringAsync(fileUri);
      return JSON.parse(fileContents);
    } catch (error) {
      console.log('Error reading the file:', error);
      return null;
    }
  };

  const calculateStats = (incomeTransactions, expenseTransactions) => {
    const incomeByCategory = categorizeTransactions(incomeTransactions);
    const expenseByCategory = categorizeTransactions(expenseTransactions);

    const paymentMethodIncome = categorizeByPaymentMethod(incomeTransactions);
    const paymentMethodExpense = categorizeByPaymentMethod(expenseTransactions);

    const dailyIncome = categorizeByTimeFrame(incomeTransactions, 'daily');
    const dailyExpense = categorizeByTimeFrame(expenseTransactions, 'daily');
    const weeklyIncome = categorizeByTimeFrame(incomeTransactions, 'weekly');
    const weeklyExpense = categorizeByTimeFrame(expenseTransactions, 'weekly');
    const monthlyIncome = categorizeByTimeFrame(incomeTransactions, 'monthly');
    const monthlyExpense = categorizeByTimeFrame(expenseTransactions, 'monthly');

    setStats({
      incomeByCategory,
      expenseByCategory,
      paymentMethodIncome,
      paymentMethodExpense,
      dailyIncome,
      dailyExpense,
      weeklyIncome,
      weeklyExpense,
      monthlyIncome,
      monthlyExpense,
    });
  };

  const categorizeTransactions = (transactions) => {
    const categories = transactions.reduce((acc, transaction) => {
      const category = transaction.category || 'Other';
      if (!acc[category]) acc[category] = 0;
      acc[category] += transaction.amount;
      return acc;
    }, {});

    return Object.keys(categories).map(key => ({
      name: key,
      amount: categories[key],
      color: getCategoryColor(key),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }));
  };

  const categorizeByPaymentMethod = (transactions) => {
    const methods = transactions.reduce((acc, transaction) => {
      const method = transaction.selectedAccount || 'Cash';
      if (!acc[method]) acc[method] = 0;
      acc[method] += transaction.amount;
      return acc;
    }, {});

    return Object.keys(methods).map(key => ({
      name: key,
      amount: methods[key],
      color: getPaymentMethodColor(key),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }));
  };

  const categorizeByTimeFrame = (transactions, timeFrame) => {
    const timeFrames = transactions.reduce((acc, transaction) => {
      const transactionDate = moment(transaction.date);
      let timePeriod;

      if (timeFrame === 'daily') {
        timePeriod = transactionDate.format('YYYY-MM-DD'); // Format as YYYY-MM-DD for daily
      } else if (timeFrame === 'weekly') {
        timePeriod = transactionDate.startOf('week').format('YYYY-MM-DD'); // Start of the week for weekly
      } else if (timeFrame === 'monthly') {
        timePeriod = transactionDate.format('YYYY-MM'); // Format as YYYY-MM for monthly
      }

      if (!acc[timePeriod]) acc[timePeriod] = 0;
      acc[timePeriod] += transaction.amount;

      return acc;
    }, {});

    return Object.keys(timeFrames).map(key => ({
      name: key,
      amount: timeFrames[key],
      color: timeFrame === 'daily' ? '#FF5722' : timeFrame === 'weekly' ? '#2196F3' : '#4CAF50',
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }));
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Allowance Payout": "#4CAF50", // Green
      "Money Transfer": "#00BCD4", // Cyan
      "Food": "#FF5722", // Deep Orange
      "Shopping": "#9C27B0", // Purple
      "Transpo": "#FF9800", // Amber
      "Bills": "#2196F3", // Blue
      "Other": "#607D8B" // Blue Grey
    };
    return colors[category] || "#607D8B"; // Default to Blue Grey if no category matches
  };

  const getPaymentMethodColor = (method) => {
    const colors = {
      "Cash": "#FFEB3B", // Yellow
      "Bank": "#3F51B5", // Indigo
      "Savings": "#8BC34A", // Light Green
      "GCash": "#E91E63", // Pink
    };
    return colors[method] || "#BDBDBD"; // Default to Grey if no method matches
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Income by Category</Text>
      <PieChart
        data={stats.incomeByCategory}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.title}>Expense by Category</Text>
      <PieChart
        data={stats.expenseByCategory}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.title}>Income by Payment Method</Text>
      <BarChart
        data={{
          labels: stats.paymentMethodIncome.map(item => item.name),
          datasets: [
            {
              data: stats.paymentMethodIncome.map(item => item.amount),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.title}>Expense by Payment Method</Text>
      <BarChart
        data={{
          labels: stats.paymentMethodExpense.map(item => item.name),
          datasets: [
            {
              data: stats.paymentMethodExpense.map(item => item.amount),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.title}>Daily Income</Text>
      <BarChart
        data={{
          labels: stats.dailyIncome.map(item => item.name),
          datasets: [
            {
              data: stats.dailyIncome.map(item => item.amount),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.title}>Daily Expense</Text>
      <BarChart
        data={{
          labels: stats.dailyExpense.map(item => item.name),
          datasets: [
            {
              data: stats.dailyExpense.map(item => item.amount),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.title}>Weekly Income</Text>
      <BarChart
        data={{
          labels: stats.weeklyIncome.map(item => item.name),
          datasets: [
            {
              data: stats.weeklyIncome.map(item => item.amount),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.title}>Weekly Expense</Text>
      <BarChart
        data={{
          labels: stats.weeklyExpense.map(item => item.name),
          datasets: [
            {
              data: stats.weeklyExpense.map(item => item.amount),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.title}>Monthly Income</Text>
      <BarChart
        data={{
          labels: stats.monthlyIncome.map(item => item.name),
          datasets: [
            {
              data: stats.monthlyIncome.map(item => item.amount),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.title}>Monthly Expense</Text>
      <BarChart
        data={{
          labels: stats.monthlyExpense.map(item => item.name),
          datasets: [
            {
              data: stats.monthlyExpense.map(item => item.amount),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: "#2C3E50", // Dark Blue
  backgroundGradientFrom: "#34495E", // Slightly lighter dark blue
  backgroundGradientTo: "#16A085", // Teal
  decimalPlaces: 2, // Optional
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White text for visibility
  style: {
    borderRadius: 16
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
  },
});

export default Stats;
