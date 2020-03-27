// function createWorldData(worldDataFrame, _continents) {
// 	var contMap = {
// 	  Brunei: 'Asia',
// 	  Curacao: 'North America',
// 	  'Democratic Republic of Congo': 'Africa',
// 	  'Faeroe Islands': 'Europe',
// 	  International: 'Asia',
// 	  Palestine: 'Asia',
// 	  Russia: 'Europe',
// 	  'Saint Barthlemy': 'North America',
// 	  'Saint Martin (French part)': 'North America',
// 	  'South Korea': 'Asia',
// 	  'United Kingdom': 'Europe',
// 	  'United States': 'North America',
// 	  Vatican: 'Europe',
// 	  World: 'World'
// 	};


// 	const projCols = arrProd('1.', worldDataFrame.columns).map(r =>r[0]+r[1]).concat(['2.continent']);
// 	let conts = _continents.groupBy(['Country_Name', gb.min('Continent_Name', 'continent')])
// 		              .project(['location', 'Country_Name', 'continent'], {location: r => r.Country_Name.split(/,| \(/)[0] },true);
// 	let corona = worldDataFrame.leftJoin(conts, projCols, 'location') //;.filter(r => r.location === 'Azerbaijan');
// 							   .project(undefined, {continent: v => v.continent || contMap[v.location] || ''}, true);

// 	let worldSummary = corona.groupBy(['location', 'continent', gb.max('total_cases'), gb.max('total_deaths')])
// 				            .project(undefined,
// 				                     {  total_cases: (v => v.total_cases ||'0'),
// 				                    	total_deaths: (v => v.total_deaths || '0')
// 				                     },
// 				                     true);
// 	//let arr = infec.filter(a => a.continent === undefined).mapF(({location,continent}) => ([location, 'Asia']));
// 	//zipToDict(arr)
// 	let continentSummary = worldSummary.groupBy(['continent', gb.max('total_cases'), gb.max('total_deaths')]);
//     return {corona, continentSummary, worldSummary};
// }

// 
// coronaWorldInfections.columns - dateRep,day,month,year,cases,deaths,countriesAndTerritories,geoId,countryterritoryCode,popData2018
// continents -
function organizeData(coronaWorldInfections, _continents) {
        const ZERO = () => '0';
        const DATE = colName => r => r[colName].replace(/(\d\d)\/(\d\d)\/(\d\d\d\d)/,"$3-$2-$1");
        const Country_Name =  l => l === 'CANADA'?'Canada': l;
        const others = new Frame(
                    [
                      [
                        'Asia',
                        'cases on an international conveyance Japan',
                        'JPG11668'
                      ],
                      [ 'Ocenia', 'French Polynesia', 'PYF' ],
                      [ 'Europe', 'Greece', 'EL' ],
                      [ 'Europe', 'Kosovo', 'XK' ],
                      [ 'Europe', 'United Kingdom', 'UK' ],
                      [ 'World', 'World', 'WORLD' ]
                    ],
                    ['Continent_Name', 'Country_Name', 'Two_Letter_Country_Code' ]);
  
        let continents = _continents.groupBy(['Continent_Name', 'Country_Name', 'Two_Letter_Country_Code' ])
                              .concat(others)
                              .groupBy(['Country_Name', 'Two_Letter_Country_Code', 
                                         gb.min('Continent_Name', 'continent')]);
       
        function toNum(v) {
          const nv = +v;
          if (isNaN(nv)) {
            return 0;
          }
          return nv;
        }

        function accum(group, name) {
            let accum = 0, groupName=undefined;
            return (r => {
                if(r[group] !== groupName) {
                    accum = 0;
                    groupName = r[group]
                }
                let val = toNum(r[name]);
                return (accum += val);
            })
        } 
//         let continents = continents.groupBy(['Country_Name', 'Two_Letter_Country_Code', gb.min('Continent_Name', 'continent')]);
//        console.log(continents.columns)
        return coronaWorldInfections.project(undefined, {"countriesAndTerritories": Country_Name}).sort(['countriesAndTerritories', 'year', 'month', 'day'])
            .project([
                  'dateRep=date', 'cases=new_cases',
                  'deaths=new_deaths', 'countriesAndTerritories=location',
                  'geoId', 'total_cases', 'total_deaths'
                ], 
                {total_cases: accum('geoId', 'cases'), 
                 total_deaths: accum('geoId', 'deaths'),
                 date: DATE('dateRep'),
                 location: r => r['countriesAndTerritories'].replace(/_/g, ' ')
                }, 
                true
            ).leftJoin(continents, ['continent', 'location', 'date', 'new_cases' ,
                        'new_deaths', 'total_cases', 'total_deaths', 'geoId=tlc'
                       ], 'geoId==Two_Letter_Country_Code')
            
}

function graphData(world,id, opts) {
	frameBarChart(world, id, Object.assign({width: 850},opts) );
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
     axisY:"deaths", isLog: false};