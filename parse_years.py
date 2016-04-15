#! /usr/bin/python
import csv
import json

def parse():
    """
    Calculate the number of ships with 5+ guns in the Royal Navy
    for each year of the mid-Victorian era
    """
    data = []
    csvf = open('data.csv', 'r')
    jsonf = open('data.json', 'w')
    reader = csv.DictReader(csvf)
    next(reader)

    for row in reader:
        
        try:
            if int(row['guns']) >= 5:
                years = range(int(row['launch']), int(row['fate']))
            else: continue

        except ValueError:
            continue
        
        for year in years:
            try:
                data[year] += 1
            except KeyError:
                data[year] = 1

    jsonf.write(json.dumps(data))

if __name__ == '__main__':
    parse()
