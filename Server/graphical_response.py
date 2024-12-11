
import matplotlib.pyplot as plt
import os

# Data from the Teacher Table
names = ['Rohaan', 'Qadeer']
ages = [24, 26]
universities = ['Bahria', 'Virtual']

# Ensure the directory for the graph exists
graph_dir = './uploads/graphs/'
if not os.path.exists(graph_dir):
    os.makedirs(graph_dir)

# Create a bar chart
plt.figure(figsize=(8, 6))
plt.bar(names, ages, color='blue')

# Adding titles and labels
plt.title('Comparison of Teacher Ages')
plt.xlabel('Names')
plt.ylabel('Ages')

# Saving the chart to the specified directory
filename = 'teachers_age_chart.png'
plt.savefig(os.path.join(graph_dir, filename))

# Clear the figure to free memory
plt.clf()

# Output only the filename as a string
print(filename)
