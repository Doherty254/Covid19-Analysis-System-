const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3373ecc3efmshc0475dce52c3094p14eb97jsnad5c7217abe8',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

let api = 'https://covid-193.p.rapidapi.com/statistics'
let table = document.querySelector('table')

let tbody = document.querySelector('tbody')
let select = document.querySelector('select')

select.addEventListener('change', () => {
  let api = 'https://covid-193.p.rapidapi.com/statistics'
  if (select.value !== 'All') {
    api = `https://covid-193.p.rapidapi.com/statistics?country=${select.value}`
    // table.removeChild(tbody)
    while (tbody.childElementCount >= 1){
      tbody.removeChild(tbody.firstElementChild)
    }
  } 
  getData(api)
})




const getData = api => {
  fetch(api, options)
	.then(response => response.json())
	.then(response => {

    const rows = response.response.sort((a,b) => {
      if(a.country.toLowerCase() < b.country.toLowerCase()) {
        return -1
      }

      if(a.country.toLowerCase() > b.country.toLowerCase()) {
        return 1
      }
      return 0 
    })

    rows.filter(row => row.country !== 'All').forEach(row => {

      let option = document.createElement('option')
      option.value = option.textContent = row.country
      select.appendChild(option)
      
      const data = {
        country: row.country,
        cases: {
          new: row.cases.new,
          active: row.cases.active,
          critical: row.cases.critical,
          recovered: row.cases.recovered,
          total: row.cases.total
        },
        deaths: {
          new: row.deaths.new,
          total: row.deaths.total
        },
        tests: {
          total: row.tests.total
        }
      }

      let tr = document.createElement('tr')
      for(const property in data) {
        
        if(typeof data[property] === 'string'){
          let td = document.createElement('td')
          td.textContent = data[property].replace('+', '')
          tr.appendChild(td)
        } else {
          for(const prop in data[property]) {
            let td = document.createElement('td')
            if (typeof data[property][prop] === 'string') {
              td.textContent = data[property][prop].replace('+', '')
            } else {
              td.textContent = data[property][prop]
            }
            
            tr.appendChild(td)
          }
        }
          
      }
      tbody.appendChild(tr)
    })

  })
	.catch(err => console.error(err));
}


getData(api)
