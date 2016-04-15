#! /usr/bin/python
import requests
from bs4 import BeautifulSoup

def scrape():
    """
    Parse data about the name, launch, and fate of ships in the Royal Navy
    in the mid-Victorian era.
    """
    csvout = open('data.csv', 'w')

    for i in range(1,14):

        r = requests.get('http://www.pdavis.nl/MidVicShips.php?page=' + str(i))
        s = BeautifulSoup(r.text, 'lxml')
        table = s.find('table', attrs={'class': 'tbl width100'})

        for tr in table.find_all('tr')[1:]:

            name = tr.find('td').get_text()
            launch = str(tr.find_all('td')[1].get_text())[:4]
            guns = str(tr.find_all('td')[7].get_text())[:4]
            fate = str(tr.find_all('td')[8].get_text())[:4]

            if launch and fate and name and guns:
                out = name + ',' + launch + ',' + guns + ',' + fate + '\n'
                csvout.write(out.encode('utf-8'))

    csvout.close()

if __name__ == '__main__':
    scrape()
