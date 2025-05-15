// Major cities by country and state/province
export const cities: Record<string, Record<string, string[]>> = {
  US: {
    CA: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento'],
    NY: ['New York City', 'Buffalo', 'Rochester', 'Syracuse', 'Albany'],
    TX: ['Houston', 'Austin', 'Dallas', 'San Antonio', 'Fort Worth'],
    FL: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Tallahassee'],
    IL: ['Chicago', 'Springfield', 'Aurora', 'Rockford', 'Joliet']
    // Add more states as needed
  },
  CA: {
    ON: ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton', 'London'],
    BC: ['Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Richmond'],
    QC: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil'],
    AB: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'Medicine Hat']
    // Add more provinces as needed
  },
  GB: {
    ENG: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'],
    SCT: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness'],
    WLS: ['Cardiff', 'Swansea', 'Newport', 'Bangor', 'St Davids'],
    NIR: ['Belfast', 'Derry', 'Lisburn', 'Bangor', 'Newry']
  }
  // Add more countries as needed
};