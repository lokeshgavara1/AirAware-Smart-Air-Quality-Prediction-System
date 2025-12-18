import pandas as pd
import json

# Read the cleaned CSV file
df = pd.read_csv('../data/cleaned/delhi_air_quality_cleaned.csv')

# Convert Date column to proper format
df['Date'] = pd.to_datetime(df['Date'])
df['Date'] = df['Date'].dt.strftime('%Y-%m-%d %H:%M:%S')

# Convert to JSON
data = df.to_dict('records')

# Save to JSON file
with open('../data/cleaned/air_quality_data.json', 'w') as f:
    json.dump(data, f, indent=2)

print(f'Converted {len(data)} records to JSON format')
print('JSON data saved to ../data/cleaned/air_quality_data.json')