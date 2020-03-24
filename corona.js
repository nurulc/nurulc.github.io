// Coronavirus modeler javascript #china #corrona #virus #d3

let POP = 10000000; // area population suseptable
let MAX_NEW_INFECTION = 100000; // fudge factor to limit new infections based to the population = 120;
let SIMULATION_DAYS = 140;
let SCENARIO_VERSION = "V20.03.13-3";
let SCENARIO_VERSION_NAME = 'scenario_version';
let localVersion = window.localStorage.getItem(SCENARIO_VERSION_NAME);

const DEFAULTS = Object.assign({
	chinaAdjustedData: 0, 
	reportingChange: 1.15, 
	lockdown2: baseOptions.lockdown,
	spreadReduction2: baseOptions.spreadReduction,
	preInfectPerDay: baseOptions.infectPerDay
}, baseOptions);

let BASE_DATE = "2020-01-25";
const NEW_REPORTING_DATE = "2020-02-12";
const MS_PER_DAY = 60*60*24*1000;
let USE_ADJUSTED_OFFICIAL_DATA = false;
let OPTIMIZATION_STEPS = 4000;
let LATEST_SCENARIO = "USA Mar 12";
let CUR_SCENARIO = window.localStorage.getItem('cur_scenario')||LATEST_SCENARIO;
//baseOptions = undefined; //_setScenario(curScenario());
let HAS_INITIALIZED = false;

function PICK(x) { return o => o[x]; }
const VAL = PICK('value');
const OFFICIAL = PICK('official');
let DEBUG = 0; 
let WORLD_DATA_SRC = 'https://covid.ourworldindata.org/data/full_data.csv';
const { Frame, frameFromBuffer, csvLine, arrProd, gb} = DataFrame;
let g_frame;

function finalizeData(_corona, _continents){
	let corona = frameFromBuffer(_corona, '', csvLine),
	    continents = frameFromBuffer(_continents, '', csvLine);

	let projCols = arrProd('1.', corona.columns).map(r =>r[0]+r[1]).concat(['2.continent']);
    let conts = continents.groupBy(['Country_Name', gb.min('Continent_Name', 'continent')]);
    conts = conts.project(['location', 'Country_Name', 'continent'], {location: r => r.Country_Name.split(/,| \(/)[0] },true)
    var _corona = corona.leftJoin(conts, projCols, 'location');//.filter(r => r.location === 'Azerbaijan');
    showFrame(_corona.groupBy(['location', 'continent', gb.max('total_cases'), gb.max('total_deaths')]))
    g_frame = _corona;
}

function showFrame(aFrame,name='world') {
  var aDiv = document.getElementById(name);
  if(!aDiv) {
  	aDiv = document.createElement("div");
	aDiv.id = name;  
	aDiv.class = 'data-frame';
	document.body.appendChild(aDiv);
	aDiv = ID(name);
  }
  aDiv.innerHTML = aFrame.sort(['-total_cases', 'location'])._toHtml();
  
}

function isObj(o) {
	if(Array.isArray(o)) return false;
	return typeof o === 'object';
}

const div = makeElem('div',undefined,'\n'),
    element = makeElem(),
	span = makeElem('span'),
	input = makeElem('input'),
	textarea = makeElem('textarea'),
	h1 = makeElem('h1'),
	h2  = makeElem('h2'),
	h3  = makeElem('h3'),
	h4  = makeElem('h4'),
	h5  = makeElem('h5'),
	p  = makeElem('p'),
	small =  makeElem('small'),
	label = (labName,text) => element('label', {for: labName}, text),
	button = makeElem('button',{type: 'button'}),
	makeIcon = (name) => `<i class="fa ${name}"></i>`;
const	ico_down = makeIcon('fa-arrow-circle-o-down fa-lg'),
		ico_up = makeIcon('fa-arrow-circle-o-up fa-lg'),
		ico_edit = makeIcon("fa-pencil fa-lg"),
		ico_recycle = makeIcon("fa-recycle");

function toData(arr) { return arr.map((v,i) => ({date: addDays(new Date("2020-01-20"),i).getTime(), official: v})); }

const {notChina, world, china, chinaAdjusted, usa, italy, spain, britain, korea}= covid19;
 
// const notChinaData = [
//    // 1/20    1/21     22    23     24      25     26    27    28       29     30     31      1      2      3      4      5      
// 	   0,       0,     9,   15,    30,     40,    56,   66,   84,     102,   131,   159,   173,    186,   190,  221,   248,
//   //   2/6      7      8      9     10      11     12    13    14       15     16     17     18     19     20     
// 	   278,   330,    354,   382,  461,    481,   526,  587,  608,     697,   781,   896,   999,   1124,  1212, 
//   //    21     22      23     24      25     26    27      28     29   3/1    02       03     04     05     06     07
// 	  1385,  1715,   2055,  2429,   2764,  3323, 4288,   5364,  6780, 8555,10288,   12742, 14906, 17872, 21398,  25403,
//   //    08
//      29256
// ];

// let worldData = [
//      // 1/20 1/21  22  23    24    25    26    27    28    29    30     31      1      2      3      4      5      
// 		282, 362, 555, 653, 941, 2040, 2757, 4464, 6057, 7783, 9821, 11948, 14551, 17387, 20900, 24641, 28365,   //2020-02-05
//      //   2/6      7      8      9     10     11     12     13     14     15     16     17     18     19     20
// 		31532, 34958, 37552, 40553, 43099, 45134, 59287, 64438, 67100, 69197, 71329, 73332, 75184, 75700, 76677, //2020-02-20
//      //    21     22     23     24      25     26    27      28     29   3/1    02       03     04     05     06       07
// 		77673, 78651, 79205, 80087,  80828, 81820, 83112, 84615, 86604, 88581, 90439, 93012, 95310, 98419, 102046, 106103,  //2020-03-07
// 	//     08
// 	   109991	
// ];


// const chinaAdjustedData = toData(sum([
// 	  359,   461,    707,   831,  1198,  2599,  3512, 5687, 
// 	  7717, 9916,  12513, 15223, 18539, 22152, 26628, 31395, 
// 	 36140, 40175, 44540, 47846, 52696, 54921, 57552, 59283, 
// 	 64437, 67100, 69169, 71329, 73332, 75198, 75700, 76677, 
// 	 77673, 78651, 79619, 80088, 80828, 81828, 83112, 84615, 
// 	 86604, 88581, 90439, 93012, 95310, 98419, 102046, 106103,
// 	 109991
// ],negate(notChinaData)) );

const chinaAdjustedData = toData(chinaAdjusted)
const chinaOfficialData = toData(china);
const restOfTheWorldData = toData(notChina.map(x => x<=1?1:+x));
const usaData = toData(usa.map(x => x<=1?1:+x)).slice(26);
const italyData = toData(italy.map(x => x<=1?1:+x)).slice(26);
const spainData = toData(spain.map(x => x<=1?1:+x)).slice(26);
const britainData = toData(britain.map(x => x<=1?1:+x)).slice(26);
const koreaData = toData(korea.map(x => x<=1?1:+x)).slice(26);

let g_officialData = chinaOfficialData;
let g_reportingPercent = chinaReportingPrecentage;
let g_ignore = 0; // how much initial data to ignore while iptimizing
let g_model = 'china';




function officialData() {
	return g_officialData;
}
  
function OPTS(opts) { return fixOptions(Object.assign(Object.assign({}, DEFAULTS), opts))} 
let _reportingIndex = -1;
let _cachedOffset = -1; 
function chinaReportingPrecentage(props,  day) {
    if(_cachedOffset !== props.dateAdjust) {
		let newReportingChangeOverDate = new Date(NEW_REPORTING_DATE);
		let indexDate = new Date(BASE_DATE);
		let diff = (newReportingChangeOverDate.getTime() - indexDate.getTime())/MS_PER_DAY;
		_reportingIndex = props.dateAdjust + diff;
		_cachedOffset = props.dateAdjust;
    }
    if( day < _reportingIndex) return [props.percentRecorded, 0];
    return [props.reportingChange * props.percentRecorded, 15000-6700];
}

function stdReportingPrecentage(props,  day) {
    return [props.percentRecorded, 0];
}


let scenarios = 		[
			{
	        desc: "USA Mar 21",
	        more: "Investigate lower R0 value, with known best parameters and medical relevance  ",
	        modelName: "usa",
	        opts: {
	            reportingChange: 1,
	            lockdown2: 49.6,
	            spreadReduction2: 0.85,
	            preInfectPerDay: 0.8972534497790626,
	            initial: 23.149478813713003,
	            daysOfSickness: 18,
	            becomeSpreader: 2.858880667328703,
	            daysAsSpreader: 4.981746061843874,
	            symptomsAppear: 4.879512567716735,
	            infectPerDay: 0.9852000997447226,
	            percentRecorded: 0.1532750815257626,
	            lockdown: 34.2,
	            spreadReduction: 0.5085612906294338,
	            percentRecorded2: 0.02,
	            administrativeDelay: 5.158651167418018,
	            dateAdjust: 14,
	            susceptible: 13599999.99363755,
	            maxNewInfection: 580000,
	            daysOfSimulation: 140,
	            showReal: 1,
	            official: 1,
	            simulated: 1,
	            isLog: 1,
	            newCases: 1,
	            ticks: 4,
	            predictionDate: "2020-03-24"
	        }
	    },
	    {
	        desc: "Italy Mar 23",
	        more: "Investigate lower R0 value, with known best parameters and medical relevance  ",
	        modelName: "italy",
	        opts: {
	            reportingChange: 1,
	            lockdown2: 49.900000000000006,
	            spreadReduction2: 0.849278721488994,
	            preInfectPerDay: 0.6751452824257126,
	            initial: 4.99604218071108,
	            daysOfSickness: 18,
	            becomeSpreader: 3.03096362552534,
	            daysAsSpreader: 4.803429565599486,
	            symptomsAppear: 6.287021965950596,
	            infectPerDay: 1.11022686901541,
	            percentRecorded: 0.275435782000202,
	            lockdown: 42.400000000000006,
	            spreadReduction: 0.6405893118555303,
	            percentRecorded2: 0.02,
	            administrativeDelay: 5.205948185178992,
	            dateAdjust: 33,
	            susceptible: 13599999.960859245,
	            maxNewInfection: 580000,
	            daysOfSimulation: 140,
	            showReal: 1,
	            official: 1,
	            simulated: 1,
	            isLog: 1,
	            newCases: 1,
	            ticks: 4,
	            predictionDate: "2020-03-24"
	        }
	    },
	    {
	        desc: "Spain Mar 23",
	        more: "Investigate lower R0 value, with known best parameters and medical relevance  ",
	        modelName: "spain",
	        opts: {
	            reportingChange: 1,
	            lockdown2: 65.10000000000001,
	            spreadReduction2: 0.89,
	            preInfectPerDay: 0.6027914500469217,
	            initial: 5.020754855977671,
	            daysOfSickness: 18,
	            becomeSpreader: 2.9607129913871226,
	            daysAsSpreader: 5.081446001361306,
	            symptomsAppear: 4.946436628606478,
	            infectPerDay: 1.0287012965647013,
	            percentRecorded: 0.19411561083628656,
	            lockdown: 42.5,
	            spreadReduction: 0.79,
	            percentRecorded2: 0.02,
	            administrativeDelay: 5.16188732152938,
	            dateAdjust: 24,
	            susceptible: 13599999.960729782,
	            maxNewInfection: 580000,
	            daysOfSimulation: 140,
	            showReal: 1,
	            official: 1,
	            simulated: 1,
	            isLog: 1,
	            newCases: 1,
	            ticks: 4,
	            predictionDate: "2020-03-24"
	        }
	    },
	    {
	        desc: "United Kingdom Mar 23",
	        more: "Investigate lower R0 value, with known best parameters and medical relevance  ",
	        modelName: "britain",
	        opts: {
	            reportingChange: 1,
	            lockdown2: 45.1,
	            spreadReduction2: 0.84,
	            preInfectPerDay: 0.582697581331223,
	            initial: 4.3968701321971215,
	            daysOfSickness: 18,
	            becomeSpreader: 2.8586468835909633,
	            daysAsSpreader: 5.288416613721393,
	            symptomsAppear: 4.621480280624435,
	            infectPerDay: 0.9937366016982405,
	            percentRecorded: 0.3967099933343006,
	            lockdown: 29.900000000000002,
	            spreadReduction: 0.5689982992656496,
	            percentRecorded2: 0.02,
	            administrativeDelay: 9.620592089544454,
	            dateAdjust: 19,
	            susceptible: 13599999.966041742,
	            maxNewInfection: 580000,
	            daysOfSimulation: 140,
	            showReal: 1,
	            official: 1,
	            simulated: 1,
	            isLog: 1,
	            newCases: 1,
	            ticks: 4,
	            predictionDate: "2020-03-24"
	        }
	    },
	    {
	        desc: "South Korea Mar 23",
	        more: "Investigate lower R0 value, with known best parameters and medical relevance  ",
	        modelName: "korea",
	        opts: {
	            reportingChange: 1,
	            lockdown2: 69.3,
	            spreadReduction2: 0.85,
	            preInfectPerDay: 0.8315909159896749,
	            initial: 44.49173866022446,
	            daysOfSickness: 18,
	            becomeSpreader: 3.1052016695411724,
	            daysAsSpreader: 5.167493833964603,
	            symptomsAppear: 6.243603812613363,
	            infectPerDay: 0.9789818474670522,
	            percentRecorded: 0.5131890504544738,
	            lockdown: 21.400000000000002,
	            spreadReduction: 0.9014685093560951,
	            percentRecorded2: 0.02,
	            administrativeDelay: 5.157198064687128,
	            dateAdjust: 23,
	            susceptible: 13599999.954929361,
	            maxNewInfection: 580000,
	            daysOfSimulation: 80,
	            showReal: 1,
	            official: 1,
	            simulated: 1,
	            newCases: 1,
	            ticks: 4,
	            predictionDate: "2020-03-24"
	        }
	    },
	    {
	        desc: "China Best Fit Mar 23",
	        more: "Investigate lower R0 value, with known best parameters and medical relevance  ",
	        modelName: "china",
	        opts: {
	            reportingChange: 1,
	            lockdown2: 41.32062112158201,
	            spreadReduction2: 0.9066365883720847,
	            preInfectPerDay: 0.6414265128852222,
	            initial: 199.97803683349372,
	            daysOfSickness: 21,
	            becomeSpreader: 3.2729370557773354,
	            daysAsSpreader: 5.1839402448153695,
	            symptomsAppear: 6.1345259648194554,
	            infectPerDay: 0.6409509812817421,
	            percentRecorded: 0.2645724271643967,
	            lockdown: 31.759954506281773,
	            spreadReduction: 0.7183059123557469,
	            percentRecorded2: 0.02,
	            administrativeDelay: 2.225814707029591,
	            dateAdjust: 30,
	            susceptible: 19999999.999295365,
	            maxNewInfection: 580000,
	            daysOfSimulation: 120,
	            official: 1,
	            simulated: 1,
	            newCases: 1,
	            ticks: 4,
	            predictionDate: "2020-03-24"
	        }
	    },
	    {
	        desc: "Rest of World except China Mar 23",
	        more: "Investigate lower R0 value, with known best parameters and medical relevance  ",
	        modelName: "restOfWorld",
	        opts: {
	            reportingChange: 1.1,
	            lockdown2: 69.3,
	            spreadReduction2: 0.85,
	            preInfectPerDay: 0.5086884991954898,
	            initial: 23.207668981168617,
	            daysOfSickness: 18,
	            becomeSpreader: 3.1539301593134783,
	            daysAsSpreader: 5.218438275286159,
	            symptomsAppear: 6.015113496639349,
	            infectPerDay: 0.805244569784979,
	            percentRecorded: 0.09839093245727229,
	            lockdown: 52.9,
	            spreadReduction: 0.19466840772165614,
	            percentRecorded2: 0.02,
	            administrativeDelay: 5.806308244100268,
	            dateAdjust: 18,
	            susceptible: 13599999.708255555,
	            maxNewInfection: 580000,
	            daysOfSimulation: 140,
	            showReal: 1,
	            official: 1,
	            simulated: 1,
	            newCases: 1,
	            ticks: 4,
	            predictionDate: "2020-03-24"
	        }
	    }
		];

	// {
	// desc: "Best Fit Feb 23 -Lower R0",
	// more: "Investigate lower R0 value  ",
	// modelName: 'china',
	// opts: {
	// 	predictionDate: "2020-02-23",
	// 	reportingChange: 1.0,
	// 	initial: 199.96552019856895,
	// 	daysOfSickness: 20,
	// 	becomeSpreader: 3.6523358014878746,
	// 	daysAsSpreader: 4.480829449730893,
	// 	symptomsAppear: 4.999030349094735,
	// 	infectPerDay: 1.2356284801303503,
	// 	percentRecorded: 0.0372689773809136,
	// 	lockdown: 30.3,
	// 	spreadReduction: 0.8392755893353386,
	// 	lockdown2: 30.3,
	// 	spreadReduction2: 0.8392755893353386,
	// 	administrativeDelay: 3.7407153249497216,
	// 	dateAdjust: 30,
	// 	susceptible: 4399999.3565237215,
	// 	maxNewInfection: 329999.35476055363,
	// 	daysOfSimulation: 90,
	// 	official: 1,
	// 	simulated: 1,
	// 	newCases: 1,
	// 	isLog: 0,
	// 	ticks: 4}
	// },




const models = {
	china: {
		official: chinaOfficialData,
		reportingPercent: chinaReportingPrecentage,
		baseDate: "2020-01-25",
		ignore: 0
	},
	china2: {
		official: chinaAdjustedData,
		reportingPercent: stdReportingPrecentage,
		baseDate: "2020-01-25",
		ignore: 0
	},
	restOfWorld: {
		official: restOfTheWorldData,
		reportingPercent: stdReportingPrecentage,
		baseDate: "2020-01-25",
		ignore: 0
	},
	usa: {
		official: usaData,
		reportingPercent: stdReportingPrecentage,
		baseDate: "2020-02-20",
		ignore: 15
	},
	italy: {
		official: italyData,
		reportingPercent: stdReportingPrecentage,
		baseDate: "2020-02-20",
		ignore: 15
	},
	britain: {
		official: britainData,
		reportingPercent: stdReportingPrecentage,
		baseDate: "2020-02-20",
		ignore: 15
	},
	korea: {
		official: koreaData,
		reportingPercent: stdReportingPrecentage,
		baseDate: "2020-02-20",
		ignore: 15
	},
	spain: {
		official: spainData,
		reportingPercent: stdReportingPrecentage,
		baseDate: "2020-02-20",
		ignore: 15
	}
};



function dupObj(o) {
	if(Array.isArray(o)) return o.map(dupObj);
	if(typeof o === 'object') return Object.assign({}, o);
	return o;
}

  const BASE_SCENARIOS = scenarios.map(s => Object.assign({}, s));

window.factoryScenarios = function () {
	if(confirm("Factory Reset - removes all your scenarios")){
	  	scenarios = dupObj(BASE_SCENARIOS);
	  	window.localStorage.setItem('scenarios', JSON.stringify(scenarios));
	  	window.localStorage.setItem('baseOptions','');
	  	//console.log(scenarios);
	  	//selScenario(scenarios[0]);
	  	window.location = window.location;
	}
}

 function _resetScenarios(flag) {
 	if(flag) {
 		if(CUR_SCENARIO !== LATEST_SCENARIO) {
 			CUR_SCENARIO = LATEST_SCENARIO;
 		}
 	}
	let _scenarios = scenarios.filter( s => !BASE_SCENARIOS.find( s1 => s1.desc === s.desc)); // remove all the base scenarios
	//_scenarios = BASE_SCENARIOS.slice(0).concat(_scenarios)
	_scenarios = _scenarios.concat( BASE_SCENARIOS );
	//_scenarios = scenarios.map(getBase);
	window.localStorage.setItem('scenarios', JSON.stringify(_scenarios));
	scenarios = dupObj(_scenarios).map(fixScenario);

	//createScenarios();
	let cur = curScenario() || curScenario(LATEST_SCENARIO);
	baseOptions = OPTS((cur||BASE_SCENARIOS[0]).opts);
	window.localStorage.setItem('scenarios', JSON.stringify(scenarios));
	if(localVersion !== SCENARIO_VERSION){
		localVersion = SCENARIO_VERSION;
		window.localStorage.getItem(SCENARIO_VERSION_NAME, localVersion);
		cur = curScenario(LATEST_SCENARIO);
		_setScenario(cur);
		
	}
	return cur;
 } 


 window.resetScenarios =  function () {
  	 //loadScenarios();
  	 // function getBase(s) {
  	 // 	let b = BASE_SCENARIOS.find(bs => bs.desc === s.desc) || s;
  	 // 	return Object.assign({},b);
  	 // }
  	
  	 if(confirm("Reset standard scenarios\nBut keep your own scenarios")) {
  	 	window.localStorage.setItem('baseOptions', ''); // do not pick up local changes to baseOptions for BASE scenarios;  	 	
  	 	window.location = window.location;
  	 }
  	 return true;
  }

  function selScenario(aScenario, update=true) {
  	    if(update && HAS_INITIALIZED) {
  	    	let sc = curScenario();
  	    	if( sc ) {
  	    		sc.opts = OPTS(baseOptions);
  	    	}
  	    }
  	    aScenario = aScenario || curScenario(CUR_SCENARIO) || curScenario(LATEST_SCENARIO);
  	    //if( CUR_SCENARIO !== aScenario.desc && aScenario.desc) {
  	    baseOptions = _setScenario(aScenario);
  	    window.localStorage.setItem('cur_scenario', CUR_SCENARIO);
 		let _curScenario = CUR_SCENARIO;
		saveCurrentProps();

		//console.log('modelToUse', modelToUse, modelToUse.reportingPercent);

		renderScenarioActions();
		//let sct = ID("sctitle");
		//console.log({sct});
		 //if( sct /*&& sct.value !== CUR_SCENARIO */) sct.defaultValue="nurul";//sct.defaultValue = CUR_SCENARIO;
		if(update) setTimeout( () =>{
				//uiForAddScenario(CUR_SCENARIO, more||'')
				_setScenario(curScenario(_curScenario));
				renderScenarioActions();
				setOptionValues();
				simulate();
		},0);
  }

function _setScenario(aScenario) {
    aScenario = aScenario || curScenario(LATEST_SCENARIO);
	baseOptions = OPTS(aScenario.opts);
	fixScenario(aScenario);
	//USE_ADJUSTED_OFFICIAL_DATA =  aScenario.modelName === 'china2' ;
	// console.log(models);
	// console.log(aScenario, aScenario.modelName, models[aScenario.modelName||'china']);
	g_model = aScenario.modelName||'china';
	let modelToUse = models[g_model];

	g_officialData =  modelToUse.official;
	g_ignore = modelToUse.ignore;
	BASE_DATE = modelToUse.baseDate;
	g_reportingPercent = modelToUse.reportingPercent;
	CUR_SCENARIO = aScenario.desc;
	return OPTS(aScenario.opts);
}

function fixOptions(opts) {
	if(opts.lockdown2 === undefined) opts.lockdown2 = opts.lockdown;
	if(opts.spreadReduction2 === undefined) opts.spreadReduction2 = opts.spreadReduction;
	if(opts.preInfectPerDay === undefined)  opts.preInfectPerDay = opts.infectPerDay;
	return opts;
}

function fixScenario(aScenario) {
	let opts = aScenario.opts;
	if(aScenario.modelName === undefined) {
		aScenario.modelName = opts.chinaAdjustedData?'china2':'china';
	}
    aScenario.opts = fixOptions(opts);
    return aScenario;
}

function  curScenario(name=CUR_SCENARIO) {
	return scenarios.find(e => e.desc === name) || scenarios[0];
}

  function createScenarios() {
	var array = scenarios.map( s=> s.desc);
	let parent = ID("scenario_div");
	if( !parent ) throw new Error(scenario_div+" not found");
	parent.innerHTML = null;
	scenarios.forEach(fixScenario);
	
	//Create and append select list
	//console.log("CREATE SCENARIOS")
	var selectList = document.createElement("select");
	selectList.id = "scenarios";
	selectList.onchange = () =>{
		//alert("hello "+selectList.value);
		let aScenario = curScenario(selectList.value);
		if(!aScenario) { console.log("scenario ", selectList.value, " not found"); return false; }
		selScenario(aScenario);		
	};
	
	parent.appendChild(selectList);

	//Create and append the options
	for (var i = 0; i < array.length; i++) {
		var option = document.createElement("option");
		option.value = array[i];
		option.text = array[i];
		selectList.appendChild(option);
		if(array[i] === CUR_SCENARIO) option.selected = true;
	}
	renderScenarioActions();
  }

function AB(name,click,klass, target, btnClass="btn-primary") {
	klass = klass || '';
	let opts ={klass: "btn "+btnClass}
	if(target !== undefined) {
		opts['data-toggle'] = 'collapse';
		opts['data-target'] = '#'+target;
	}
	if(click) opts.onclick = click; 
	return div(klass, ['&nbsp;', button(opts,name)]);
}  
//["Show Add Scenario", ico_down]



function renderScenarioActions() {
	let curScenario = CUR_SCENARIO;
	let {more} = scenarios.find(s=> s.desc === curScenario) || {more: '&nbsp;'};
	more = more.replace(/<br>/g, "\n");
	let str = makeModalButton('explainSc', `Scenario Info\t - <i>${curScenario}</i>`,
		[div("row btn-group-justified", [
			AB(["Show Add Scenario",'&nbsp;' ,ico_down],'','','scform1' ), 
			AB("Reset Scenario","resetScenarios()"),
			AB("Std Scenario","factoryScenarios()"),
			AB("Delete Scenario &nbsp;"+ico_recycle,'','','','btn-danger')]),
		 element('form', {id: "scform1", klass: "row collapse", style: "margin-left: 1rem; margin-right: 1rem"}, [
			div("col-md-12",inp("sctitle",{value: curScenario, lab: "Scenario Title", desc: "This is the label in the scenario dropdown"})),
			div("col-md-12",
				inp("scdesc",{ lab: "Scenario Description", desc: "A description of the scenario", rows: 4, cols: 60, value: (more||"&nbsp;"), style: "height: 100px"}, textarea)
			),
			div("row",[
				div("col-md-3",button({id: 'add_scenario_action1', klass: "btn btn-primary", style: "width: 7rem;", 'data-dismiss': "modal", onclick: "addScnearioAction()"},"Add &nbsp;"+ico_edit)),
				div("col-md-6 text-right ",`<small  class="link my-tooltip text-muted" data-toggle="collapse" data-target="#option_list">Scenario Parameters</small>
					&nbsp;<i class="fa fa-road"></i>` ),
				div("col-md-3",button({ klass: "btn btn-secondary", style: "width: 7rem;", "data-toggle":"collapse", "data-target": "#scform1"},"Close &nbsp;"+ico_up))
			]),
			div({ id: "option_list", klass: "col-md-12 overflow-auto collapse", style:"height: 15rem; width: 50rem;"}, ["<br>",...renderBaseOptions()])
		]),
		'<hr><br><br>',
		h2({klass:"text-muted"},"Scenarios"),
		div({id:"scenario_desc", klass:"overflow-auto", style:"height: 30rem; width: 50rem;"},scenarioContent())]); 

	ID("scenario_div_explain").innerHTML = str;
}

function scenarioContent(){
	const modified = (s) => scenarios.find( ss => ss.desc === s.desc && ss.opts.predictionDate !== s.opts.predictionDate);
	const klass = name => (BASE_SCENARIOS.find(s => s.desc === name && !modified(s))? "text-info" : "text-dark")
	return scenarios.map(({desc,more, opts}) => `<h4 class="${klass(desc)}">${desc}</h4><small class="text-muted font-italic">${opts.predictionDate}</small><p>${more}</p>`);
}

// function renderBaseOptions(id) {
// 	function showOpts() {
// 		return Object.keys(baseOptions).map(k => div("col-sm-6", `<span class="text-info">${k}:</span> <span class="text-right text-italic">${baseOptions[k]}</span>`)).join("\n");
// 	}
// 	console.log("renderBaseOptions");
// 	return div({klass: "col-md-12 collapse", id}, showOpts );
// }
function renderBaseOptions() {
	let bo = baseOptions;
	if( !bo) {
		bo = OPTS(curScenario().opts)
	}
	return Object.keys(bo).map(k => div("col-sm-6", `<span class="text-info">${k}:</span> <span class="text-right text-italic">${bo[k]}</span>`));
}

window.addScnearioAction = function () {
    //alert("aaa");
	let title = ID('sctitle').value, desc = ID('scdesc').value;
	if(!title) return false;
	if(confirm("Add scenario: "+title)){
		setTimeout( () => addScenario(title,desc, baseOptions), 0);
		return true;
	}
	return false;
}

   


  
  
const digits = scale => { 
  if(!scale || scale <= 10) return v => v.toString().slice(0,5); 
  return d3.format(".3s");
}
const formatNum = (val,percent,scale) => percent ? d3.format(".0%")(val) : digits(scale)(val);
console.log(JSON.stringify(baseOptions));

/**
 * AT STARTUP
 * 
 */
//setTimeout(() => {
worldData.then(([_corona, _contiments]) => {
	    CUR_SCENARIO = window.localStorage.getItem('cur_scenario')||LATEST_SCENARIO;
	    let _opts = window.localStorage.getItem('baseOptions'),
	        opts;
	    try {
	    		opts = JSON.parse(opts);
	    		if(typeof opts !== 'object' || !Object.keys(opts).contains('daysOfSimulation'))
	    			opts = undefined;
	    } catch (e) {
	    	
	    }
	    if(!opts) opts = curScenario().opts;
	    setOptionValues(opts);

	    loadScenarios(true);
	    if(localVersion !== SCENARIO_VERSION) {
	    	_resetScenarios(true);
	    	localVersion = SCENARIO_VERSION;
	    	window.localStorage.setItem(SCENARIO_VERSION_NAME, localVersion);
	    	window.localStorage.setItem('baseOptions', '');
	    	window.localStorage.setItem('cur_scenario', LATEST_SCENARIO);
	    	window.localStorage.setItem('scenarios', JSON.stringify(scenarios));
	    	CUR_SCENARIO = LATEST_SCENARIO;
	    	opts = undefined;
	    } 
		//_resetScenarios(true);
		buildInterface();

		//setOptionValues();

		finalizeData(_corona, _contiments);
		selScenario(curScenario(),false);
		HAS_INITIALIZED = true;
	    if(opts) {
	    	try {
	    		let bo = JSON.parse(opts);
	    		if( bo ) baseOptions = bo;
	    		console.log("BASE OPTIONS", bo)
	    	}
	    	catch(e) {
	    		console.log("failed to load baseOptions")
	    	}
	    }
		let optimizer = ID("optimize_button");
		optimizer.onclick = () => optimize(0.0001);

	  	simulate();
	  	setInterval(saveCurrentProps, 5*1000)
	}, 
100);



function saveCurrentProps() {
	 if( baseOptions.lockdown2 === undefined) baseOptions.lockdown2 = baseOptions.lockdown;
	 if( baseOptions.spreadReduction2 === undefined) baseOptions.spreadReduction2 = baseOptions.spreadReduction;
	 window.localStorage.setItem('baseOptions', JSON.stringify(baseOptions));
	 console.log("save baseOptions");
} 

function loadScenarios(flag) {
 	let sc = window.localStorage.getItem('scenarios');
 	if( !sc ) sc = scenarios;
 	else {
 		try {
 			sc = JSON.parse(sc);
 		} catch(e) {
 			sc = scenarios;
 		}
 	}
    //sc = undefined;  //debug delete this line

 	if( sc) scenarios = sc;//localVersion = window.localStorage.getItem(SCENARIO_VERSION_NAME);
 	if(localVersion !== SCENARIO_VERSION || !curScenario(LATEST_SCENARIO)) {
 		// new standard scenarios added, perform a reset scenarios
 		 CUR_SCENARIO = LATEST_SCENARIO;
 		let cur = _resetScenarios(flag);
 		window.localStorage.setItem('scenarios', JSON.stringify(scenarios));
 		_setScenario(cur);
 		// baseOptions = OPTS(cur.opts);
 		// console.log("***baseOptions",{cur}, baseOptions);
 		// saveCurrentProps();
 	}
 	createScenarios(scenarios);
}

const MODEL = PICK('modelName');

function  addScenario(desc, more, opts, modelName) {
 	if(!opts)return;
 	modelName = modelName || g_model || 'china';
 	let today = dateFormatter(new Date());
 	opts = Object.assign({}, opts, { predictionDate: today});
 	let f = scenarios.find(o => o.desc === desc);
 	if( f ) {
 		f.more = (more||"nbsp;").replace(/\n/g, "<br>");
 		f.opts = opts;
 	}
 	else scenarios.push({ desc,more, modelName, opts});
 	window.localStorage.setItem('scenarios', JSON.stringify(scenarios));
 	CUR_SCENARIO = desc;
 	ID("scenario_desc").innerHTML = scenarioContent();
 	createScenarios();
}
	
  
function round(val, scale=0.001) {
	return (Math.round(val/scale)*scale).toString().substr(0,6);
}

function _simulate(opts) { 
	let o = Object.assign({}, baseOptions);
	if(opts) o = Object.assign(o, opts);
	SIMULATION_DAYS = o.daysOfSimulation; // run simulation for this number of days
	POP = o.susceptible; // area population suseptable
	MAX_NEW_INFECTION = o.maxNewInfection; 
	let _officialData = officialData()
	//console.log({POP});
	let res = computeData(SIMULATION_DAYS, o);
	//let err = Math.sqrt(error(_officialData, res))/_officialData.length*100;
	let err = error(_officialData, res);
	return [res, err];
} 

function simulate(opts) {
	let [res, err] = _simulate(opts);   
	let span = ID("error_val");
	if(span) span.innerHTML = err;//round(err,0.00001);
	  lineChart(res, true, baseOptions.tick, 1200, 600, baseOptions);
}

let USE_NEW = 1
function computeData(lenOfRun, baseOptions) {
	let res = _doRun(lenOfRun, baseOptions);
	  let testData = res.map(({
		date,
		value
	  }) => ({
		date: new Date(date).getTime(),
		value: value[0] || 0.1,
		realValue: value[2] || 0.1,
		newCases: value[3] || 0.1,
		perDay: value[4]
	  }));
	return testData;
}
  


function setUp() {

}
	//console.log(addDays(new Date(2020, 0, 25), -5))

function range(start, end) {
	if (end === undefined) {
		end = start;
		start = 0;
	}
	let res = []; //newArray(end-start,0);
	start = start | 0;
	for (let i = start; i < end; i++) res.push(i);
	return res;
}

function derivitive(arr, delta=1) {
	  let len = arr.length;
	  let res = [];
	  for(let i=0; i < len-1; i++) {
	    res.push( (arr[i+1]-arr[i])/delta); 
	  }
	  if( len > 3 ) {
	    res[len-1] = res[len-2] + (res[len-3]-res[len-4 ]); 
	  }
	  return res;
}

function last(array) {
	 if(!array || !array.length) return undefined;
	 return array[array.length-1];
}


  // Perform array sum from fractional start and fractional length
  // examples arrSum([2,3,5]) => 2+3+5 => 10
  //          arrSum([2,3,5], 0, 3) => 2+3+5 =>10
  //          arrSum([2,3,5], 0, 1.5) =>  2 + (3*0.5) => 3.5
  //          arrSum([2,3,5], 0.5, 1.5) => (2*0.5) + 3 => 4
  //  so a start of 2.5 will take half the value in index 2 of the array
function arrSum(arr, start, len) {
	const trunc = Math.trunc;
	if(!start) start = 0;
	if(!len) len = arr.length-start;
	len = Math.min( len, arr.length-start ); 
	let trunc_start = trunc(start);
	let delta = start- trunc_start;
	let sum = 0;
	if(delta > 0 ) {
		let fraction = (1.0-delta);
		sum = arr[trunc_start] * fraction;
		start = trunc_start+1;
		len = len - fraction;
	}
	let delta1 = len- trunc(len);
	if( delta1 > 0 ) {
		  sum += arr[start+trunc(len)]*delta1;
		  len--;
	 }
	 for(let i= start; i<start+len; i++) sum += arr[i];
	return sum;
}

function objSum(obj) {
	return arrSum(Object.keys(obj).map(key => obj[key]));
}

function sumOf(objOrArray) {
	if( Array.isArray(objOrArray) ) return arrSum(objOrArray);
	if( typeof objOrArray === 'object') return objSum(objOrArray);
	return 0;
}


/* function addDays(d, days) {
  return new Date(d.getTime() + days * 24 * 60 * 60 * 1000);
}
 */
function addDays(date, days) {
	const copy = new Date(Number(date))
	copy.setDate(date.getDate() + days)
	return copy
}

// Creates an array of elements representing the days of an infection
// each entry represents the in each infection day relative to the start of their infection
// In the simulation we move all the cells 1 place to the right, and the rightmost element drops off
function init(initialInfection, daysOfSickness,n=0) {
  var model = range(n+daysOfSickness).map(() => 0); // create a model array all zeros
  model[n] = initialInfection;
  return model;
}



/* NEW EFFICIENT Simulation ************************************** */

    function getReduction(day, lockdown, spreadReduction) {
    	return Math.max(Math.exp(-(day - lockdown)), (1 - spreadReduction));
    }
	function _modelForNextDay(state) {
		let {model, day, pos, infectPerDay, preInfectPerDay, preSpreaders, spreaders, spreaderRange, preSpreaderRange,
			 lockdown, spreadReduction,
			 lockdown2, spreadReduction2
			} = state;
		let reduction1 = () => day < lockdown ? 1 : getReduction(day, lockdown,spreadReduction);
		let reduction = () => day < lockdown2 ? reduction1() : getReduction(day, lockdown2,spreadReduction2);
		let perDay = reduction() * infectPerDay; //number pof people infected per day per infected person
		let prePerDay = reduction() * preInfectPerDay
		let newInfections =  (preSpreaders * prePerDay) + (spreaders * perDay);
		model[pos-1] = Math.min(MAX_NEW_INFECTION,newInfections);
		if( !DEBUG) {
			state.spreaders = prevSumRange(model, spreaderRange, spreaders); 
			state.preSpreaders = prevSumRange(model, preSpreaderRange, preSpreaders); 
		}
		else {
				//let xspreaders = prevSumRange(model, spreaderRange, spreaders); 
				let pspreaders = arrSumRange(model, decRange(arrRange(preSpreaderRange)));
				state.preSpreaders = pspreaders;

				let postSpreaders = arrSumRange(model, decRange(arrRange(spreaderRange)));
				state.spreaders = postSpreaders;
		}

		decRange(preSpreaderRange); // move range forward by a day
		decRange(spreaderRange); // move range forward by a day
		
		state.perDay = perDay;
		state.prePerDay = prePerDay;
		return state;
	}


	function _doRun(n, options) {
	  const defaults = Object.assign({},DEFAULTS);
	  const opts =  adjustValues(Object.assign(defaults, options));
	  let {
		initial,
		daysOfSickness,
		becomeSpreader,
		infectPerDay,
		preInfectPerDay,
		daysAsSpreader,
		symptomsAppear,
		percentRecorded,
		administrativeDelay,
		lockdown,
		spreadReduction,
		lockdown2,
		spreadReduction2,
		dateAdjust
	  } = opts;
	  const today = new Date(BASE_DATE);

	  const asDate = n => addDays(today, n - dateAdjust);
	  //console.log("Test date"+asDate(0))
	  let model = init(initial, daysOfSickness,n);
	  let sickAcc = 0;
	  let accInfected = 0 ;
	  let pos = n;
	  POP = opts.susceptible; // area population suseptable
	  MAX_NEW_INFECTION = opts.maxNewInfection;
	  let startSpreader  = Math.min(becomeSpreader,symptomsAppear);
	  let preSymptomsSpreaderDays = Math.min(symptomsAppear-becomeSpreader, daysAsSpreader);
	  let postSymptomsStart = Math.max(becomeSpreader,symptomsAppear);
	  let postSymptomsSpreaderDays = Math.max(daysAsSpreader-preSymptomsSpreaderDays, 0);

	  let state = {
	  	model, 
	  	pos,
	  	day:0,
	  	preInfectPerDay,
	  	infectPerDay, 
	  	preSpreaderRange: arrRange(startSpreader+pos, preSymptomsSpreaderDays), 
	  	spreaderRange: arrRange(postSymptomsStart+pos, postSymptomsSpreaderDays),
	  	preSpreaders: 0,
	  	spreaders: 0, 
	  	lockdown, 
	  	spreadReduction,
	  	lockdown2,
	  	spreadReduction2
	  };
//console.log('g_reportingPercent', g_reportingPercent);
	  let sickRange = arrRange(symptomsAppear+state.pos, daysOfSickness-symptomsAppear);
	  let sick = 0;
	  let newCaseRange = arrRange(symptomsAppear + administrativeDelay+state.pos, 1);
	  let newCases = 0;
	  let warningSeen = false;
	  return range(n).map((day) => {
			  if(!model) throw Error("no model");
			  let _newCases = newCases;
			  let _sick = sick;
			  let [_percentRecorded, jump] = g_reportingPercent(opts,  day);
			  if(!warningSeen && _percentRecorded !== percentRecorded) {
			  	//.log({day, date: asDate(day), percentRecorded, _percentRecorded});
			  	warningSeen = true;
			  }
			  sickAcc += _newCases;
			  accInfected += model[state.pos];
			  
			  let rateLimit = (POP-accInfected) / POP;  // spread limited by population, as more people are infected the the the effective population reduces
			  state.infectPerDay = infectPerDay*rateLimit;
			  state.day = day;

			  _modelForNextDay(state);
			  if(!DEBUG) {
	  			  sick = prevSumRange(model,sickRange,sick); decRange(sickRange);
	  			  newCases = prevSumRange(model,newCaseRange,newCases); decRange(newCaseRange);
			  }
			  else {
			  		sick = arrSumRange(model,decRange(sickRange));
			  		newCases = arrSumRange(model,decRange(newCaseRange));
			  }
			  //console.log(state.pos,state.model.slice(state.pos))
		      state.pos--;
			  if(!model) throw Error("no model");
				return {
				  day,	
				  date: asDate(day),
				  value: [
				  		Math.round(sickAcc * _percentRecorded)+jump,
						Math.round(_sick * _percentRecorded)+jump, 
					    _sick, 
					    Math.round(_newCases*_percentRecorded),
					    state.perDay
					  ]
				};
			  })
	}



/* END NEW EFFICIENT Simulation ************************************** */

/* ---------- OPTIMIZER --------- Gradient descent optimization of various baseOptions  */
/* =====================================================================================*/
function less(a,b) {
   return a.date < b.date;
}
  
function square(a) { return a*a; }

function rms(a,b, weight) {
	let len = Math.min(a.length, b.length);
	let sum = 0;
	if(weight) {
		let scale = len*len*weight+1;
		for(let i=0; i<len; i++ ) sum += (i*weight+1)*(square(a[i]-b[i]));
		sum /= scale;
	}
	else for(let i=0; i<len; i++ ) sum += square(a[i]-b[i]);
	return len ?(sum/len): 0;
}


function Identity(x) { return x; }
function arrMax(arr,fn=Identity) {
	let mx = fn(arr[0])
	for(let i=1; i<arr.length; i++) {
		let v = fn(arr[i]);
		if(mx < v) mx = v;
	}
	return mx;
}
  
function error(_officialData, simulatedData) {
	let i=0;
	const SCALE = 0.2;  //1,  10000.0
	const adjFn =  Identity; //Identity; // Math.log
	for(; less(simulatedData[i],_officialData[0]); i++);
	let _off = _officialData.map(OFFICIAL);
    let _logOff = _off.map( adjFn ).slice(g_ignore);
    let _sim = simulatedData.slice(i, i+_officialData.length).map(VAL);
    let _logSim = _sim.map(adjFn).slice(g_ignore);
    let mx = Math.log(arrMax(simulatedData, x => x.realValue));
    const  WEIGHT_DATA=0.7, WEIGHT_SLOPE=0.3, WEIGHT_MAX = 0;

    //mx=0;
    return Math.log(
      WEIGHT_DATA*rms(_logOff, _logSim, 1.0)+
      //Math.log(WEIGHT_DATA*rms(_off, _sim, 1.0))+
      WEIGHT_MAX*mx+ 
      WEIGHT_SLOPE*rms(derivitive(_logOff), derivitive(_logSim), 6)
    )*SCALE/(WEIGHT_DATA+WEIGHT_SLOPE+WEIGHT_MAX);
	//return _officialData.reduce( (sum, v, j) => sum+square(Math.log(v.official)-Math.log(simulatedData[i+j].value)), 0);
}


function computeError(opts, prop, delta) {
	let o = opts? ({}) : Object.assign({}, baseOptions);
	let _officialData = officialData();
	if(opts) o = Object.assign(o, opts);
	if(prop) o[prop] += delta
	SIMULATION_DAYS = o.daysOfSimulation; // run simulation for this number of days
	POP = o.susceptible; // area population suseptable
	MAX_NEW_INFECTION = o.maxNewInfection; 
	
	//console.log({POP});
	let res = computeData(SIMULATION_DAYS, o);
	//let err = Math.sqrt(error(_officialData, res)/_officialData.length)*100;
	let err = error(_officialData, res);
	return err;
}


const propsToProcess =[
	["infectPerDay", 0.00001 ,1],
	["preInfectPerDay", 0.00001 ,1],
	["becomeSpreader", 0.00001, 1],
	["daysAsSpreader", 0.0001, 1],
	["symptomsAppear", 0.0001, 1],
	["percentRecorded", 0.0000001, 0.001],
//	["lockdown", 0.1, 0.25],
//	["lockdown2", 0.1, 0.25],
	["administrativeDelay", 0.0001, 0.25],
	["spreadReduction", 0.0000001, 0.25],
	["spreadReduction2", 0.0000001, 0.25],
	["initial", 0.00001, 0.01],
	["susceptible", 2000, 10000],
	["maxNewInfection", 20, 100]
].map( ([pName, pStep, scale]) => {
	let {min, max} = getInterfaceValue(pName);
		return [pName, pStep, min, (pName==="spreadReduction" || pName==="spreadReduction2")?max*0.92:max, scale];
		
	}
);


function testGradients(delta=1) { 
    let props = Object.assign({}, baseOptions);
			let lastError = computeError(props);
			let gradients = computeGradientsAdam(propsToProcess, lastError,props, 1*delta);
    let grads1 = computeGradientsAdam(propsToProcess, lastError,props, -1*delta);
    return [gradients.map((v,i) => v - grads1[i]), gradients, grads1]
}

/*


const propsToProcess =[
	["infectPerDay", 0.01 ,0.25],
	["becomeSpreader", 0.001, 0.25],
	["daysAsSpreader", 0.001, 0.25],
	["symptomsAppear", 0.001, 0.025],
	["percentRecorded", 0.001, 0.001],
//	["lockdown", 0.1, 0.25],
	["administrativeDelay", 0.01, 0.25],
	["spreadReduction", 0.01, 0.25],
	["initial", 0.1, 0.1],
	["susceptible", 2000000, 0.001],
	["maxNewInfection", 20000, 0.001]
].map( ([pName, pStep, scale]) => {
	let {min, max} = getInterfaceValue(pName);
		return [pName, pStep, min, (pName==="spreadReduction")?max*0.92:max, scale];
		
	}
);
*/

function random(range,offset=0) {
	return (Math.random()-offset)*range
}

function randomI(range,offset=0) {
	return Math.trunc((Math.random()-offset)*range);
}

function randomPerterb(opts,propsToProcess, percent=0.1) {
	let count = randomI(4)
	for(let i=0; i< count; i++){
		let ix = randomI(4);
		opts[propsToProcess[ix][0]] *= (1.0+random(percent, 0.5));
	}
}


function getGradientDescent(computeGradients, incrProps) {
	return function (propsToProcess, steps, learningRate, display = (opts => 0), decayOfLearningRate = 0.9995) {
			
			let original = Object.assign({}, baseOptions);
			let props = Object.assign({}, baseOptions);
			let lastError = computeError(props);
			let gradients = computeGradients(propsToProcess, lastError,props);
			let backup = Object.assign({}, baseOptions);
			let bestErr = lastError;propsToProcess
			let bestOpts = Object.assign({}, props);
			
			randomPerterb(props, propsToProcess,  0.1)
			let cumChange = 0;
			function aStep(i) {
				let newProps = incrProps(props, propsToProcess, gradients, learningRate, backup);
				let err = computeError(newProps);
				backup = props;
				props = newProps;
				if(err < bestErr) {
					bestErr = err;
					bestOpts = Object.assign(bestOpts, props);
					bestOpts.predictionDate= dateFormatter(new Date());
				}
				if(Math.abs(err-lastError) < 0.0000000001 && i > 0.25*steps) return false;
				//if(i && (i%100) === 0 ) display(props);
				lastError = err;
				gradients = computeGradients(propsToProcess,err,props);
				return true;
			}
			let i=0;
			function optGroup() {
				Object.assign(baseOptions,props);
				setOptionValues();
				simulate();

				let meanErr =0, baseErr = lastError;
//				console.log("MEAN ERROR: " + (meanErr/100) + " " + lastError + " ------------------------------");
				for(let j=0; j<100; j++, i++){
						  if( !aStep(i) ) { i = steps; break; }
						  learningRate *= decayOfLearningRate;
						  meanErr += lastError;
				}
				if(meanErr/baseErr > 100 ) learningRate /= 2.0;
//				console.log("MEAN ERROR: " + (meanErr/100) + " " + lastError + " *******************************");
				if(i < steps) setTimeout(optGroup,0);
				else {
					Object.assign(baseOptions,bestOpts);
					setOptionValues();
					simulate();
					let button =ID("optimize_button");
					button.innerHTML = "Optimize Parameters";
					button.disabled = false;
					document.body.style.cursor = 'default';
		      		console.log("OPTIMIZED:")
					console.log(JSON.stringify(bestOpts));
				} 
			}
			optGroup();
		};
}

/*    ------- SIMPLE GRADIENT SESCENT ----------------------------- */

// each elenemt of the propArray [[nme, delta]...]
function computeGradients(propArray,err,props) {
	err = err || computeError(props); // base error;
	let sum = 0;
	let gradients = propArray.reduce((gradients, [name, delta, scale]) =>{
		    let dy = scale*(computeError(props,name,delta)-err)/delta;
		    if( dy === 0) {
		    	dy = -(computeError(props,name,-2*delta)-err); ///(2*delta);
		    	//console.log(name+" low "+dy);
		    }
			gradients[name] = dy;
			//sum += Math.abs(dy);
			sum += dy;
			return gradients;
	}, {});

	if(sum > err) {
		let prod = err/sum;
		Object.keys(gradients).forEach( k => gradients[k] = gradients[k]*prod*0.25)
	}
	return gradients;
}


function incrProps(props, propsToProcess, gradients, learningRate, backup) {
	propsToProcess.forEach( ([name,step, min, max, scale]) => {
			let newVal = props[name]-(gradients[name]*learningRate)/scale;
			//if(name === "percentRecorded") console.log("%", props[name], newVal,gradients[name],learningRate,scale);
			if(newVal >= min && newVal <= max)
				backup[name] = newVal;
			//else console.log("invalid val", name, gradients[name], newVal);
		} );
	return backup;
}
/*    END ------- SIMPLE GRADIENT SESCENT ----------------------------- */


/*   -------------------- ADAM OPTIMIZER ----------------------------- */

class Adam {
    constructor(nparams, beta_1=0.9, beta_2=0.999, epsilon=1e-8) {
        this.nparams= nparams;
        this.beta_1= beta_1;
        this.beta_2= beta_2;
        this.epsilon= epsilon;

        this.m= []; 
        this.v= [];
        for(var i= 0 ; i < this.nparams ; ++i) {
            this.m[i]= 0; // Initialize 1st moment vector
            this.v[i]= 0; // Initialize 2nd moment vector
        }
        this.t = 0; //Initialize timestep
        this.b1t = beta_1;
        this.b2t = beta_2;
        this.updates = new Array(this.nparams);
    }

    init() {
 		for(var i= 0 ; i < this.nparams ; ++i) {
            this.m[i]= 0; // Initialize 1st moment vector
            this.v[i]= 0; // Initialize 2nd moment vector
        }
        this.t = 0; //Initialize timestep
        this.b1t = this.beta_1;
        this.b2t = this.beta_2;   	
    }
    
    // g is a function that returns the gradient of the i(th) parameter
    get_update(alpha, g) { // alpha is the learning rate, g is the gradient vector (array oflength 'nparams')
        this.t += 1;
        let updates= this.updates;
        const {m,v,b,beta_1,beta_2, b1t, b2t, epsilon, nparams} = this;
         
        for(var i= 0 ; i < nparams ; ++i) {
        	let grad = g[i];
            m[i]= beta_1*m[i] + (1-beta_1)*grad; // Update biased first moment estimate
            v[i]= beta_2*v[i] + (1-beta_2)*grad*grad; // Update biased second raw moment estimate
            var mub= m[i]/(1 - b1t); // Compute bias-corrected first moment estimate
            var vub= v[i]/(1 - b2t); // Compute bias-corrected second raw moment estimate
            updates[i]= - alpha * mub / ( Math.sqrt(vub) + epsilon  ); // Return parameter updates
        }
        this.b1t *= beta_1*beta_1;
        this.b2t *= beta_2*beta_2;
        return updates;
    };
}


const adam = new Adam(propsToProcess.length);

function computeGradientsAdam(propArray,err,props, ds=1) {
	err = err || computeError(props); // base error;
	let sum = 0;
	let gradients = propArray.map(([name, delta, scale]) =>{
		    delta = delta*ds;
		    let dy = scale*(computeError(props,name,delta)-err)/delta;
		    if( dy === 0) {
		    	dy = -(computeError(props,name,-2*delta)-err); ///(2*delta);
		    	//console.log(name+" low "+dy);
		    }
			//sum += Math.abs(dy);
			sum += dy;
			return dy;
	});
	return gradients;
}

function printGrads(propArray, gradients) {
	let str = "";
	for(let i=0; i< gradients.length; i++) {
		str += propArray[i][0]+': '+gradients[i]+";  ";
	}
	console.log(str)
}


function incrPropsAdam(props, propsToProcess, gradients, learningRate, backup) {
	let updates = adam.get_update(learningRate,gradients);
///****/console.log({gradients, updates});
	propsToProcess.forEach( ([name,step, min, max, scale],ix) => {
			let newVal = props[name]+updates[ix];

			if(newVal >= min && newVal <= max)
				backup[name] = newVal;
///****/console.log(name, props[name], backup[name], updates[ix]);
		} );
	return backup;
} 




/*   END----------------- ADAM OPTIMIZER ----------------------------- */



function optimize(learningRate=0.08, learningDecay=0.9999999) {
	let gradDesc = getGradientDescent(computeGradientsAdam, incrPropsAdam);
	adam.init();
	let button = ID("optimize_button");
			button.innerHTML = "working...";
			button.disabled = true;
			document.body.style.cursor = 'wait';
	return gradDesc(propsToProcess,OPTIMIZATION_STEPS, learningRate, (props) => { 
		baseOptions = Object.assign({},props);
		setOptionValues();
		simulate();
		baseOptions = backup;
	},learningDecay);
}


/* END------- OPTIMIZER --------- Gradient descent optimization of various baseOptions  */
/* END==================================================================================*/

function adjustData(baseOptions) {
	 if (baseOptions.becomeSpreader >= baseOptions.daysOfSickness)
		baseOptions.becomeSpreader = baseOptions.daysOfSickness - 1;
	  if (baseOptions.symptomsAppear >= baseOptions.daysOfSickness)
		baseOptions.symptomsAppear = baseOptions.daysOfSickness - 1;
	  if (baseOptions.becomeSpreader + baseOptions.daysAsSpreader >= baseOptions.daysOfSickness)
		baseOptions.daysAsSpreader = baseOptions.daysOfSickness - 1 - baseOptions.becomeSpreader;
	  if (baseOptions.symptomsAppear + baseOptions.administrativeDelay >= baseOptions.daysOfSickness)
		baseOptions.administrativeDelay = baseOptions.daysOfSickness - 1 - baseOptions.symptomsAppear;
	  return baseOptions;
}


window.updateData = function(name, value, scale = 1) {
	  if (baseOptions[name] === undefined) {
		console.log(`${name} not found in options`);
	  }
	  else baseOptions[name] = value * scale;
	  baseOptions = adjustData(baseOptions);
	  simulate();
	  return baseOptions;
	}


/*  --------------------------------D3 VISUALIZER ------------------------------------*/	
//official simulated showReal

const LAB = { 
			"Reported Infected" : "simulated" , 
	  "All Infected" : "showReal", 
	  "Newly Infected (recorded)" :"simulated" , 
	  "Official Numbers" : "official"
 };

function lineChart(data, _, tickCount = 4, _width = 1000, _height = 700,opts ={}) {
	let {showReal, official, simulated, isLog, newCases, lockdown, lockdown2} = opts;
	let _officialData = officialData();
	//console.log({showReal, official, simulated})
	  function processData(data, modFn, process) {
		process(data.map(modFn))
	  }

	  function positive(x) {
		if (!isLog) return Math.max(0,x||0);
		if (!x) return 1;
		if (x <= 1) return 1;
		return x;
	  }
	function num(x) {
		 //console.log("newCases"+ x);
		 if(isNaN(x)) return 0;
		 return 0;
	 }
	  
	  // set the dimensions and margins of the graph
	  var margin = {
		  top: 40,
		  right: 120,
		  bottom: 30,
		  left: 60
		},
		width = _width - margin.left - margin.right,
		height = _height - margin.top - margin.bottom;

	  // append the svg object to the body of the page
	  let div = ID("model_target");
	  div.innerHTML = null;
	  var svg = d3.select("#model_target")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
		  "translate(" + margin.left + "," + margin.top + ")");


	  
	  function legend(svg) {
		  var ordinal = d3.scaleOrdinal()
			.domain(["Reported Infected", 
							 "All Infected", 
					 "Newly Infected (recorded)", 
					 "Official Numbers"])
			.range([ "darkcyan", "red", "grey", "darkorange"]);

		  var svg = d3.select("svg");

		  svg.append("g")
			.attr("class", "legendOrdinal")
			.attr("transform", "translate(120,50)");

		  var legendOrdinal = d3.legendColor()
			.shape("path", d3.symbol().type(d3.symbolSquare).size(100)())
			.shapePadding(1.5)
			//use cellFilter to hide the "e" cell
			.cellFilter(d => !!opts[LAB[d.label]])
			.scale(ordinal);

		  svg.select(".legendOrdinal")
			.call(legendOrdinal);
		}
	 
	  //Read the data
	  //d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
	  processData(data,

		// reformat the data if necessary
		d => ({
		  date: +d.date,
		  value: positive(+d.value || 1),
		realValue: positive(+d.realValue || 1),
		newCases: positive(+d.newCases || 1),
		perDay: d.perDay
		}), //
		//return { date : d3.timeParse("%Y-%m-%d")(d.date), value : positive(+d.value) }


		// Now I can use this dataset:
		function(data) {
		  //console.log(data);
		  // Add X axis --> it is a date format

			var x = d3.scaleTime()
				.domain(d3.extent(data, function(d) {
				  return d.date;
				}))
				.range([0, width]);
			legend(svg);
			svg.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));

			  // Add Y axis
			let minVal = isLog ? 1 : 0;
      let max1 = d3.max(_officialData, d => d.official), 
          max2 = d3.max(data, d => showReal ? d.realValue: d.value);
			var y = (isLog ? d3.scaleLog() : d3.scaleLinear())
				.domain([minVal, Math.max(max1,max2)])
				.range([height, 0]);
		 
		const LL =(text, color, x, y) => lineLabel(svg,text, color, x, y);
		const UPPER = 30;  
		svg.append('rect')
				.attr("width", width)
			.attr("height", height+UPPER)
			.attr("x", 0)
			.attr("y", -UPPER)
			.attr("fill", 'white'); // set backgrouns

		let lab1 = lockdownArea(svg,data,lockdown,UPPER, width, height, x, y, positive);
		if(Math.abs(lockdown-lockdown2)  > 1.1) {
			let lab2 = lockdownArea(svg,data, lockdown2, UPPER, width, height, x, y, positive, "#efffef", 'Enhanced ', 30);
			lab2();
		}
		lab1();

		//console.log({lockdown, lockdown2});
		// const UPPER = 30;  
		//  svg.append('rect')
		// 		.attr("width", width)
		// 	.attr("height", height+UPPER)
		// 	.attr("x", 0)
		// 	.attr("y", -UPPER)
		// 	.attr("fill", 'white'); // set backgrouns
			
		// let lockdownDate = data[Math.trunc(lockdown+4)].date;
		// let xLockdown = x(lockdownDate);
		// svg.append('rect')
		// 		.attr("width", width-xLockdown)
		// 	.attr("height", height+UPPER)
		// 	.attr("x", xLockdown)
		// 	.attr("y", -UPPER)
		// 	.attr("fill", '#efefffff');
			
		// const yL = positive(28-Math.trunc(lockdown))*((height+UPPER)-20)/28-UPPER; 
		// svg.append("text")
		//    // .attr("transform", "rotate(-90)")
		// 	.attr("y", yL)
		// 	.attr("x", xLockdown+10)
		// 	.attr("dy", ".81em")
		// 	//.style("text-anchor", "end")
		// 	.style("font-size", "0.8rem")
		// 	.style('font-weight', 700)
		// 	.attr('fill', "darkblue")
		// 	.text("Lockdown "+dateFormatter(lockdownDate));
		  
		  svg.append("g")
			.call(
			  d3.axisLeft()
			  .scale(y)
			  .tickFormat(d3.format(","))
			  .ticks(tickCount)

			);
		 svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 4)
			.attr("x", "-.25rem")
			.attr("dy", ".81em")
			.style("text-anchor", "end")
			.style("font-size", "0.75rem")
			.text("Number of Infections");

		svg.append("text")
			.attr("y", 150)
			.attr("x", "2rem")
			.attr("dy", ".81em")
			.attr("fill", "blue")
			//.style("text-anchor", "end")
			.style("font-size", "2rem")
			.text(isLog?"Log scale":"Linear Scale");


		  // Add  line

		  // Add the line
		let labelD = data[Math.trunc(data.length*0.95)];
		let labelR = data[Math.trunc(data.length*0.50)];
		let labelC = _officialData[Math.trunc(_officialData.length*0.70)];
		if( simulated ){
		  svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "darkcyan")
			.attr("stroke-dasharray","4,1")
			.attr("stroke-width", 2.5)
			.attr("d", d3.line()
			  .x(d => x(d.date))
			  .y(d => y(d.value))
			);

		   LL("Predicted infections (reported)", "darkcyan", x(labelD.date)-50, y(labelD.value), "start");
		}
		if( official ) {
		   svg.append("path")
			 .datum(_officialData)
			 .attr("fill", "none")
			 .attr("stroke", "darkorange")
			 .attr("stroke-width", 3.5)
			 .attr("d", d3.line()
				   .x(d => x(d.date))
				   .y(d => y(positive(d.official)))
				  );
		   svg.selectAll("dot")
			 .data(_officialData)
			 .enter().append("circle")
			 .attr("r", 2)
			 .attr("cx", function(d) { return x(d.date); })
			 .attr("cy", function(d) { return y(positive(d.official)); });
			 LL("Official Infections", "darkorange", x(labelC.date)-4, y(labelC.official));
		} 
		
		if(showReal){  
		  svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "red")
			.attr("stroke-dasharray","5,2")
			.attr("stroke-width", 1.5)
			.attr("d", d3.line()
			  .x(d => x(d.date))
			  .y(d => y(d.realValue))
			);
		   LL("Predicted infections (actual)", "red", x(labelR.date)+(isLog?40:100), y(labelR.realValue)-15, "start");

		  }
		if( simulated ) {
		  svg.append("path")
		  .datum(data)
		  .attr("fill", "none")
		  .attr("stroke", "grey")
		  .attr("stroke-dasharray","2,2")
		  .attr("stroke-width", 1.5)
		  .attr("d", d3.line()
			.x(d => x(d.date))
			.y(d => y(d.newCases))
		  );
		  if(isLog) LL("New cases/ day (predicted)", "grey", x(labelD.date)-50, y(labelD.newCases)-5);

				  
		};
		addTooltip(svg,x,y,data, _officialData, opts, width, height);

		});
}

function lineLabel(svg, text,color, x,y, end="end" ) {
	svg.append("text")
	.attr("y", y)
	.attr("x", x)
	.attr("dy", "-0.5rem")
	.style("text-anchor", end)
	.style("font-size", "0.6rem")
	//.style('font-weight', 700)
	.attr('fill', color)
	.text(text);
}
   
function dateFormatter(time) {
	const pad = num => ('000' + num).slice(-2); 
	var dateObj = new Date(time);
	
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	return year + "-" + pad(month) + "-" + pad(day);
}
  
  function addTooltip(svg,x,y,data,china, opts, width,height) {
		 const {daysAsSpreader}  = opts;
		 const bisectDate = d3.bisector(function(d) { return d.date; }).left,
					 formatValue = d3.format(","),
					 TOOLTIP_HEIGHT =120,
					 TOOLTIP_WIDTH = 270,
			   dateFormatterD3 = d3.timeFormat("%m/%d/%y");

		const color = {R : (opts.showReal?"red":null), S: (opts.simulated?"steelblue":null), O: (opts.official?"darkorange":null) }; //official, simulated

		 // let dot = svg.append("circle")
			// .attr("r", 50)
			// .attr("class", "focus-d3")
			//.style("display", "none")
			;

		 let focus = svg.append("g")
			.attr("class", "focus-d3")
			.style("display", "none");

		let dot = focus.append("circle")
		 	.attr("r", 5)
		 	.style('display', !color.S?"none":null);
		let real = focus.append("circle")
		    .attr("r", 5)
		    .style("fill", "red")
		    .style('display', !color.R?"none":null);
		let official = focus.append("circle")
		    .attr("r", 5)
		    .style("fill", "darkorange")
		    .style('display', !color.O?"none":null);

		let rct = focus.append("rect")
			.attr("class", "tooltip-d3")
			.attr("width", TOOLTIP_WIDTH)
			.attr("height", TOOLTIP_HEIGHT)
			.attr("fill", "#ddddddff")
			.attr("x", 10)
			.attr("y", -22)
			.attr("rx", 4)
			.attr("ry", 4);
 
        
		
		"date,,Date\tofficial,O,Official\tvalue,S,Reported\tnewCases,,New Cases\trealValue,R,All Infection\tperDay,,New Infections R0".split("\t")
		  .map(s => s.split(',')).map(([key,typ,label],i) => {
			  focus.append("text")
				  .attr("class", 'tooltip-label')
				  .attr("x", 18)
				  .attr("y", 18*(i)-2)
				  .text(label);

			 let colr = color[typ];
			 if(colr) {
			 	focus.append('circle')
			 	  .attr('r', 5)
			 	  .attr('cx', 140-8)
			 	  .attr('cy', 18*(i)-7)
			 	  .style('fill',colr )
			 }

			  focus.append("text")
				  .attr("class", "tooltip-d3-"+key)
				  .attr("x", 140)
				  .attr("y", 18*(i)-2);
				
				});
		svg.append("rect")
			.attr("class", "overlay-d3")
			.attr("width", width)
			.attr("height", height)
			.on("mouseover", function() { focus.style("display", null); dot.style("display", null); })
			.on("mouseout", function() { focus.style("display", "none"); dot.style("display", "none");})
			.on("mousemove", mousemove);
		function getItem(arr, x0) {
				let i = bisectDate(arr, x0, 1),
						d0 = arr[i - 1],
						d1 = arr[i];
				return x0 - d0.date > d1.date - x0 ? d1 : d0;
		}
		
		let Y = yv => Math.max(Math.min(height-120,yv),0)

		function mousemove() {
			let x0 = x.invert(d3.mouse(this)[0]),
				d = getItem(data,x0);
			let odIx = china.findIndex(v => dateFormatter(d.date) === dateFormatter(v.date));
			
			let od = china[odIx];
			let officialNewCases = odIx<0?0:(odIx===0?od.official:(od.official- china[odIx-1].official));
			let strOfficialNewCases = odIx >=0 ? ' / '+formatValue(Math.round(officialNewCases))+' (official)' : '';
			
			let yPosB = y(d.value);
			let yPos =  Math.min(yPosB, height-TOOLTIP_HEIGHT);

			dot.attr("transform", "translate(" + 0 + "," + (yPosB-yPos) + ")");
			real.attr("transform", "translate(" + 0 + "," + (y(d.realValue)- yPos) + ")");
			   
			if(od && opts.official) {
				//console.log("opts.official", opts.official);
				official.attr("transform", "translate(" + 0 + "," + (y(od.official)- yPos) + ")");
				if(Math.abs(y(od.official)-y(d.value))<5) {
					official
						.style("fill","none")
						.style("stroke", "darkorange")
						.style('stroke-width', 3.5);
				}
				else official.style("fill","darkorange").style("stroke",null);
				official.style("display",null);
			   		
			} else official.style("display", "none");

			focus.attr("transform", "translate(" + x(d.date) + "," + yPos + ")");
			focus.select(".tooltip-d3-date").text(dateFormatter(d.date));
			focus.select(".tooltip-d3-value").text(formatValue(Math.round(d.value))).attr("fill", "steelblue");
			focus.select(".tooltip-d3-realValue").text(formatValue(Math.round(d.realValue))).attr("fill", "red");
			focus.select(".tooltip-d3-newCases").text(formatValue(Math.round(d.newCases))+strOfficialNewCases);
			focus.select(".tooltip-d3-official")
			   .text((od && od.official)?formatValue(Math.round(od.official)):'').attr("fill", "darkorange");
			focus.select(".tooltip-d3-perDay").text(formatValue(Math.round(d.perDay*100*daysAsSpreader)/100)+" /spreader").attr("fill", "steelblue");

		}
  }

  function lockdownArea(svg,data,lockdown,UPPER, width, height, x, y, positive, color= "#efefffff", prefix = '', offset=0) {

			
		let lockdownDate = data[Math.trunc(lockdown+4)].date;
		let xLockdown = x(lockdownDate);
		console.log("lockdown", offset, xLockdown, lockdown)
		svg.append('rect')
			.attr("width", width-xLockdown)
			.attr("height", height+UPPER)
			.attr("x", xLockdown)
			.attr("y", -UPPER)
			.attr("fill", color);
			
		return (() => {	
			const yL = positive(28-Math.trunc(lockdown))*((height+UPPER)-20)/28-UPPER +offset; 
			svg.append("text")
			   // .attr("transform", "rotate(-90)")
				.attr("y", yL)
				.attr("x", xLockdown+10)
				.attr("dy", ".81em")
				//.style("text-anchor", "end")
				.style("font-size", "0.8rem")
				.style('font-weight', 700)
				.attr('fill', 'darkblue')
				.text("Lockdown "+dateFormatter(lockdownDate));
			});	
  }
  
  function ID(name) { return document.getElementById(name) || {}; }
  
  function adjustValues(opts) {
	  return opts; // do nothing for now
  }
  
  function validName(obj) {
  	return obj && obj.name !== '_';
  }

  function setOptionValues(opts) {
	 let b = opts || fixOptions(baseOptions);
	 if(typeof b === 'string') throw new Error('Object expected but recieved a string: "'+b+'"');
	 getInterfaceInfo(true).forEach((e) => {
		let {name, step, percent} = e;
		step = step || 1;
		let actualV = b[name];
		if(actualV === undefined) {
			console.log({name, actualV, b, bval: b[name]},b);
			return;
		}
		let val = Math.round(actualV/step);
		ID(name+'_val').innerHTML = formatNum(actualV,percent, step);
		ID(name+"_slider").value = val;
	 });
	 ID('showLog').checked = b.isLog != 0;
	 ID('showReal').checked = b.showReal != 0;
  }

function getInterfaceInfo(flag) {
   
	let res =  [
	  {name: "becomeSpreader", val: 4, min: 0, max:15, title: "Day infected starts spreading ", step: 0.1,
		description: "Days after infection the person become a spreader"},
	  {name: "preInfectPerDay", val: 2.3, min: 0, max:10.0, step: 0.001, title: "Infect/Day Before Symptoms Appear",
		description: " How may people a spreader infects every day, before symptoms appear (note this is not R<sub>0</sub>) this is just the base for computing the actual new infections per spreader. This value depends on the lockdown factor and the total population seceptable to infection. Hover ove the graph to see the actual new infections created by each spreader"},
	  {name: "symptomsAppear", val: 9,min: 2, max:15, title: "Day Symptoms Appear ", step: 0.1,
		description: "Days after infection visible symptoms appear (recognized as beeing infected)"},

	  {name: "daysAsSpreader", val: 6,min: 2, max:15, title: "Days as Spreader ", step: 0.1,
		description: "How many days you a spreader can infect new people before he/she gets too sick to spread"},
	  {name: "infectPerDay", val: 2.3, min: 0, max:10.0, step: 0.001, title: "Infect/Day After Symptoms ",
		description: " How may people a spreader infects every day after symptoms appear, (note this is not R<sub>0</sub>) this is just the base for computing the actual new infections per spreader. This value depends on the lockdown factor and the total population seceptable to infection. Hover ove the graph to see the actual new infections created by each spreader"},
      {name: "daysOfSickness", val: 30, min: 13, max:100, title: "Days of Sickness", 
		description: "Days from infection to recovery"},

	  {name: "administrativeDelay", val: 2,min: 0, max:10, title: "Delay recording infection", step: 0.1,
		description: "Days after symptom appears and hospital authorities record/report the infection"},
	  {name: "percentRecorded", val: 0.02, percent: true, min: 0, max: 1.0, step: 0.01, title: "Percent Recorded ", 
		description: " Percent of infected people that are recorded/reported as infected"},
	  {name: '_'},

	  {name: "lockdown", val: 28,min: 0, max:100, title: "Initial Lockdown day ", step: 0.1,
		description: "Day of initial lockdown from original start date for simulation"},
	  {name: "spreadReduction", val: 0.99, percent: true, min: 0, max:1.0, step: 0.01, title: "Effectivness of Initial Lockdown", 
		description: "Reduction in spreading after lockdown"},
	  {name: '_'},

	  {name: "lockdown2", val: 28,min: 0, max:100, title: "Enhanced Lockdown day ", step: 0.1,
		description: "Day of when enhanced lockdown starts from original start date for simulation"},
	  {name: "spreadReduction2", val: 0.99, percent: true, min: 0, max:1.0, step: 0.01, title: "Effectivness of Enhanced Lockdown", 
		description: "Reduction in spreading after after enhanced lockdown"},
	  {name: '_'},	
	  
	  {name: "initial",        val: 60, min: 1, max:600, title: "Initially infected (from other sources)", step: 0.1,
	     description: "The number of people initially infected from external sources. That is, not from community spreading"},
	  {name: "susceptible",    val: 1000000, min:1000000, max: 20000000, step: 200000, title: "Sucep. Pop", 
		description: "Total number of people succeptable to infection" },
	  {name: "maxNewInfection", val: 100000, min: 20000,  max: 2000000,  step: 10000,   title: "Max Infec/Day",
		description: "Limit on new infection per day" },

	  {name: "daysOfSimulation", val: 190,    min: 50,     max: 300,  step: 10, title: "Simul. Len", 
		description: "How many days to simulate the spread of infrction" },
	  {name: "dateAdjust", val: 33,min: -20, max:100, title: "Align against actual", 
		description: "Align the sickness daily list to align with actual statistics date"},
	  {name: "ticks", val: 4, min: 2, max:6, title: "ticks", description:"Chart tick count"}
  ];

  return flag ? res.filter(validName): res;
}

function getInterfaceValue(name) {
	return getInterfaceInfo(true).find( e => e.name === name);
}


function buildInterface() {
	let interface = getInterfaceInfo();
	let str = getInterface(interface);
	var _div = ID("interface");
	
		 
	_div.innerHTML = str;
		interface.forEach(({name,step,percent}) => {
		step = step || 1;
		var slider =  ID(name+ '_slider');
		var output = ID(name+ '_val');
		output.innerHTML = (slider.value)*step;

		slider.oninput = function() {
				output.innerHTML = formatNum(this.value*step,percent,step);
				updateData( name , (+this.value), step);
			}
	});
	setOptionValues();
}

/*________________________________________ */
/*     UI Building Utilities               */

function _strContent(v,sep) {
	if(!v) return "";
	if(typeof v === 'function') return v() || '';
	if(Array.isArray(v)) {
		return v.map( str => _strContent(str, sep)).join(sep||"");
	}
	if(typeof v === 'string') return v || '';
	
	return ""+v;
}

function empty(v) {
	if(!v) return true;
	if(Array.isArray(v) && v.length === 0) return true;
	if(typeof v === 'object' && Object.keys(v).length == 0) return true;
	return false;
}


function makeElem(name, dflt, sep='') {
	    if(!dflt) dflt = {};
	    else if(!isObj(dflt)) throw new Error("invalid default type: "+dflt);
	    if(name === undefined) return element;
		//if(!dflt) return (props,c) => element(name, props,c,sep||''); 
		else {
			return (props,c) => {
				if(typeof props === 'string' && c === undefined) {
					c = props;
					props = {};
				} else props = asProps(props);
				return element(name, Object.assign({}, dflt, props) ,c,sep);
			}
		} 
		//else throw Error("Make elem - default  if non object not yet implemented");

	function asProps(props) {
		if(typeof props === 'string') { 
			if(props[0] === '#')
				props = {id: props.substr(1)};
			else props = { klass: props};
		}
		return props;
	}

 

   function element(name, props, content,sep='') {
		if(content === undefined && !isObj( props ) ) {
			content = props;
			props = {};
		}
		else if(content !== undefined && typeof props === 'string') {
			props = asProps(props);
			//console.log("element ", {content, props});
		}

		return `<${name}${genProps(props,name,content,sep)}`
	}
	

	function genProps(props,name,content, sep1) {
		if(empty(props) && empty(content)) return "/>";
		let s = Object.keys(props).map(key => setProp(key, props[key])).join(' ');
		if(s) s = ' '+s;
		if( empty(content) ) return s+"/>";
		return `${s}>${sep1||''}${strContent(content)}${sep1||''}</${name}>`
	}
	
	function setProp(name, value) {
		//console.log({name, value})
		if(!name) return "";
		if(name === 'klass') name = 'class';
		let v = strContent(value, ' ').replace(/"/g, '\\"');
		if(!value) return "";
		return `${name}="${v}"`;
	}
	
	function strContent(v,sep) {
		
		return _strContent(v,sep);
	}
	
}


function divs(list, content) {
	 if(typeof list === "string") list = list.split(" "); 
	if(list.length === 0) return _strContent(content);
	let rest = divs(list.slice(1), content);
	if( typeof list[0] === 'string')return div({klass: list[0]},rest);
	return div(list[0], rest)
}

function inp(id, opts, atype=input) {
	let {lab, place, desc, value, klass, type, style, rows, cols} = Object.assign({lab: "heading", desc: "This is a short description"}, opts || {} )
	klass = klass || '';
	return div("form-group",[
		label(id, lab),
		atype( {type , klass:"form-control "+klass, id, placeholder: place, value, style, rows, cols },atype !== input?value:undefined),
		small( {id: 'help'+id, klass: "form-text text-muted"}, desc)
	])
}

//window.divs = divs;

/* ----------------------------------------------*/

function getInterface(interface) {

	function toRows(arr, n) {
		if(!n) return [arr];
		let res = [];
		for(let i=0; i<arr.length; i += n) {
			res.push(arr.slice(i,Math.min(i+n, arr.length)));
		}
		return res;
	}

	function genSlider(opts){
		if(opts === undefined) return "";
		let {name, val, min, max, title, description, step,percent} = opts;
		if( name === '_') {
			return div({klass: 'col-md-4'}, '&nbsp;');
		}
		step = step || 1;
		val = Math.round(val/step);
		min = Math.round(min/step);
		max = Math.round(max/step);
		return div({klass: 'col-md-4'}, () => 
			[div({klass: "my-tooltip"},[
				title+':&nbsp;', 
				span({klass: "my-bold-text", id: name+'_val'},formatNum(val,percent,step)),
				`&nbsp;(${name})`,
				span({klass: "my-tooltiptext"}, description),
				
				]),
				div({klass: 'my-slidecontainer'},[
				  input({type: 'range', 
						 klass:  "my-slider", 
						 id:`${name}_slider`,
						 min, max, value: val,
						 name}, null),
				  p()
				])
		]);
	}
   
	return toRows(interface,30).map( row => 
				div({klass: 'row'},  () => row.map(genSlider).join("\n"))
		).join('\n')
}

function makeModalButton(name, title, contents, btns=[]) {
	let [main, aux] = title.split("\t");
	title = title.replace(/\t/g,'')
	return div({ id: name+"_div"}, [
		button({id: name, klass: "btn btn-info", "data-toggle": "modal", "data-target": "#"+name+"Explain"}, main+"&nbsp;"+ico_down ),

		div( {klass:"modal fade", id: name+"Explain", tabindex:"-1", role:"dialog", 'aria-labelledby':"exampleModalLabel", 'aria-hidden':"true"}, 
			div({klass:"modal-dialog", role:"document"}, 
				div({klass: "modal-content", style: "width: fit-content;"}, [
					div("modal-header", [
						h5( {klass: "modal-title", id: name+"ModalLabel"}, main+`<small>${aux||''}</small>`),
					  	button({klass:"close", 'data-dismiss': "modal", 'aria-label': "Close"}, span({'aria-hidden':"true"}, "&times;"))
					  	] 
					),
					div('modal-body', contents),
					div('modal-footer', [button({klass: "btn btn-secondary", 'data-dismiss': "modal" },"Close"), ...btns])
					
				])
			)
		)
	] )
}



function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}
   
function downloadJSON(data,name, mime_type) {

	mime_type = mime_type || 'application/json';

	let blob = new Blob([data], {type: mime_type});	
	let link = document.createElement('a');
	link.setAttribute('href', window.URL.createObjectURL(blob));
	link.setAttribute('download', name+'.json');
	link.onclick = function(e) {
	  var that = this;
	  setTimeout(function() {
		window.URL.revokeObjectURL(that.href);
	  }, 1500);
	};
	document.body.appendChild(link); // Required for FF
	link.click();
	link.remove();
}

function fracPart(x) { return x-Math.trunc(x);}


function arrRange(start, len) {
    if(len === 0 && !Array.isArray(start)) return [ start, 0 ];
    
	if(Array.isArray(start) && start.length <= 4) return [...start]; // copy an existing range
    
    const trunc = Math.trunc;
    let trunc_start = trunc(start);
    if(trunc_start === trunc(start+len)) return [ len, trunc_start, trunc_start, 0];
    return [1-fracPart(start),trunc_start, trunc(start+len), fracPart(start+len) ]
}

function arrSumRange(arr, range) {
    if(range === undefined || range.length < 4) return 0;
    let sum = arr[range[1]]*range[0] + (range[3]?arr[range[2]]*range[3]:0) 
    for(let i= range[1]+1; i<range[2]; i++) sum += arr[i];
    return sum;
}


function prevSumRange(arr, rangez, sum) {
    if(rangez === undefined || rangez.length < 4) return 0;
	if( sum === undefined) throw new Error("Missing prev sum");

	let [frac1, start, end, frac2] = rangez;
	if( start === 0) return sum - arr[start]*frac1;
    if(frac1 === 1 && frac2 === 0) {
    	sum  += arr[start-1]-arr[end-1];
    }
    else {
    	if(start !== end && frac2 === 0) sum -= arr[end-1];
    	else sum += -arr[end]*frac2 + arr[end-1]*(frac2-1);
    	sum += arr[start-1]*frac1 + arr[start]*(1-frac1); 
    } 
    return sum;
}

function addRange(range, days) {
    if(range === undefined) return undefined;
    if(!Array.isArray(range)) throw new Error("A range has to be an array");
    if(range.length === 1) return arrRange(start[0], len);
    if( Math.trunc(days) === days) return [range[0], range[1]+days, range[2]+days, range[3]];
    let start = range[1]+(1-range[0])+days;
    let len = (1-range[0])+range[2]-range[1]+range[3];
    return arrRange(start, len);
}

function decRange(range) {
    if(!Array.isArray(range)) return range;
    if(range.length < 4) {
        range[0]--;
    }
    range[1]--;
    range[2]--;
    return range;
}
//optimize_button

function arrowLine(svg, x1,y1, x2,y2) {
	svg.append("g")
      .selectAll("line")
      .enter()
      .append("line")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("marker-end", "url(#triangle)") // add the marker
      .style("stroke", "brown")           // colour the line
      .style("stroke-width", 4)          // adjust line width
      .style("stroke-linecap", "square") // stroke-linecap type
               ;

	svg.append("svg:defs")
      .append("svg:marker") 
      .attr("id", "triangle")
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 6)
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('orient', 'auto')
      .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
                 ;
}

function negate(fn) {
	fn = fn || Identity;
	if(typeof fn !== 'function') return negate()(fn);
	return (...args) => {
		let arrOrItem = fn(...args);
		let arr = typeof arrOrItem === 'function' ? arrOrItem() : arrOrItem;
		if(Array.isArray(arr)) return arr.map(v => -v);
		return -arr;
	}
}

function sum(a,b) {
	if(Array.isArray(a) && Array.isArray(b)) 
		return a.length>= b.length ? a.map((v,i) => v + (b[i] || 0)) : sum(b,a);
	else if(!Array.isArray(a) && !Array.isArray(b)) return (a||0)+(b||0);
	else if(Array.isArray(b)) return sum(b,a);
	return a.map(v => (v||0) + (b||0));
}

function simplifyObj(o, dflt) {
	function add(obj, k) {
		if(Array.isArray(o)) return o.map(v => simplifyObj(v,dflt));
		if(typeof o === 'object') {
			return Object.keys(o).reduce((res,k) => {
			   if(o[k] !== dflt[k]) res[k] = simplifyObj(o[k], dflt);
			   return res; 
			}, {})
		}
		return o;
	}
}




function printObj(o,dflt=DEFAULTS) {
	if(o === undefined) return undefined;
	if(Array.isArray(o)) {
		return `[\n\t${o.map(v => printObj(v,dflt)).join(",\n\t")}]`
	}
	if(typeof o === 'object') {
		let ro = simplifyObj(o, )
		return `{\n\t${Object.keys(o).map(k => o[k]?(k + ": " + printObj(o[k], dflt)):undefined).filter(x => x !== undefined).join(",\n\t")}}`	
	}
	return JSON.stringify(o);
}

window.printScenario = function (s) {
    console.log(printObj(s));
};


function fetchWorldData() {
	var inp = fetch("https://covid.ourworldindata.org/data/full_data.csv");
	inp.then( s=> s.text()).then(s => frame = frameFromBuffer(s, DataFrame.csvLine))
}