

function makeScrollableTables(name='data-frame') {
    document.querySelectorAll('.'+name).forEach(el => {
    	    console.log(el);
    	    el.addEventListener("scroll", __tableFixHead);
    	}
	);
	function __tableFixHead (e) {
		
	    const el = e.target,
	          sT = el.scrollTop;
	    //console.log("scroll "+ el.scrollTop);
	    el.querySelectorAll("thead th").forEach(th => 
	      th.style.transform = `translateY(${sT}px)`
	    );
	}
	
}