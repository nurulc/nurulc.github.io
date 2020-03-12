window.covid19 = (function() {
	const notChina = [
  // 1/20    1/21     22    23     24      25     26    27    28       29     30     31      1      2      3      4      5      
	0,       0,     9,   15,    30,     40,    56,   66,   84,     102,   131,   159,   173,    186,   190,  221,   248,
  //   2/6      7      8      9     10      11     12    13    14       15     16     17     18     19     20     
       278,   330,    354,   382,  461,    481,   526,  587,  608,     697,   781,   896,   999,   1124,  1212, 
  //    21     22      23     24      25     26    27      28     29   3/1    02       03     04     05     06     07
      1385,  1715,   2055,  2429,   2764,  3323, 4288,   5364,  6780, 8555,10288,   12742, 14906, 17872, 21398,  25403,
  //    08
     29256
	];

	const world = [
  // 1/20 1/21  22  23    24    25    26    27    28    29    30     31      1      2      3      4      5      
      282, 362, 555, 653, 941, 2040, 2757, 4464, 6057, 7783, 9821, 11948, 14551, 17387, 20900, 24641, 28365,   //2020-02-05
  //   2/6      7      8      9     10     11     12     13     14     15     16     17     18     19     20
     31532, 34958, 37552, 40553, 43099, 45134, 59287, 64438, 67100, 69197, 71329, 73332, 75184, 75700, 76677, //2020-02-20
  //    21     22     23     24      25     26    27      28     29    3/1    02       03    04     05     06       07
      77673, 78651, 79205, 80087,  80828, 81820, 83112, 84615, 86604, 88581, 90439, 93012, 95310, 98419, 102046, 106103,  //2020-03-07
  //     08
     109991	
       ];
	const chinaAdjusted = sum([
		  359,   461,    707,   831,  1198,  2599,  3512, 5687, 
		  7717, 9916,  12513, 15223, 18539, 22152, 26628, 31395, 
		 36140, 40175, 44540, 47846, 52696, 54921, 57552, 59283, 
		 64437, 67100, 69169, 71329, 73332, 75198, 75700, 76677, 
		 77673, 78651, 79619, 80088, 80828, 81828, 83112, 84615, 
		 86604, 88581, 90439, 93012, 95310, 98419, 102046, 106103,
		 109991
	],negate(notChina));
	
	
	const italy = [
			// 2                             3  0                     1
			// 0  1  2  3  4  5  7  8  9, 0  1  1  2  3  4  5 6 7 8 9 0 1 2 3 4 
			   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,
			// 1              2 
			// 5  6  7  8  9  0  
			   3, 3, 3, 3, 3, 4, 21, 79, 157, 229, 323, 470, 655, 
			   889, 1128, 1701, 2036, 2502, 3089,3858, 4636, 5883, 7375, 9172, 10149,
			   12462
	   ];


	const usa = [
			// 2                             3  0                     1
			// 0  1  2  3  4  5  7  8  9, 0  1  1  2  3  4  5 6 7 8 9 0 1 2 3 4 
			   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,
			// 1              2 
			// 5    6  7    8   9   0  
			   15, 15, 15, 15, 15,  15, 35, 35, 35, 53, 57, 60, 60, 63, 68, 75, 
			   100, 124, 158, 221, 319, 435, 541, 704, 994, 1301 
	   ];
	 let spain = [
		// 2                             3  0                     1
		// 0  1  2  3  4  5  7  8  9, 0  1  1  2  3  4  5 6 7 8 9 0 1 2 3 4 
		   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,
		// 1                    2                                       3
		// 5    6  7    8   9   0   1   2   3                           1
		   2,  2,  2,   2,  2,  2,  2,	2,  2,  3,  9, 13, 25, 33,  58, 84,
		   120, 165, 228, 282, 401, 525, 674, 1231, 1695, 2277
		 ];
	
           const china = sum(world, negate(notChina));

     return { italy: italy, usa: usa, notChina: notChina, chinaAdjusted: chinaAdjusted, china: china, spain: spain};
	
     /* *********************************************************************************************************** */
	function Identity(x) { return x; }
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
})();
