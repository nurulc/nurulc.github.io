function createWorldData(frame, ) {
	var contMap = {
	  Brunei: 'Asia',
	  Curacao: 'North America',
	  'Democratic Republic of Congo': 'Africa',
	  'Faeroe Islands': 'Europe',
	  International: 'Asia',
	  Palestine: 'Asia',
	  Russia: 'Europe',
	  'Saint Barthlemy': 'North America',
	  'Saint Martin (French part)': 'North America',
	  'South Korea': 'Asia',
	  'United Kingdom': 'Europe',
	  'United States': 'North America',
	  Vatican: 'Europe',
	  World: 'World'
	};


	var projCols = arrProd('1.', frame.columns).map(r =>r[0]+r[1]).concat(['2.continent']);
	var conts = continents.groupBy(['Country_Name', gb.min('Continent_Name', 'continent')]);
	conts = conts.project(['location', 'Country_Name', 'continent'], {location: r => r.Country_Name.split(/,| \(/)[0] },true)
	var corona = frame.leftJoin(conts, projCols, 'location');//.filter(r => r.location === 'Azerbaijan');
	var infec = corona.groupBy(['location', 'continent', gb.max('total_cases'), gb.max('total_deaths')])
	            .project(undefined,
	                     {continent: v => v.continent || contMap[v.location] || '', 
	                      total_cases: (v => v.total_cases ||'0'), 
	                      total_deaths: (v => v.total_deaths || '0')
	                     },
	                     true);
	var arr = infec.filter(a => a.continent === undefined).mapF(({location,continent}) => ([location, 'Asia']));
	zipToDict(arr)
	var world = infec.groupBy(['continent', gb.max('total_cases'), gb.max('total_deaths')]);
    return {corona, world};
}

function graphData(world,opts) {
	frameBarChart(world, Object.assign({width: 850},opts)
		);
}

const optsInfection = {
    		key: 'continent', 
    		value: 'total_infections',
    		title: "Coronavirus infections", 
    		axisX: 'Continents', 
    		axisY:"Infections"}

const optsDeaths = {
	 key: 'continent',
     title: "Coronavirus deaths",  
     value: 'total_deaths', 
     axisX: 'Continents', 
     axisY:"Deaths", isLog: false};