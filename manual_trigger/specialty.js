!js
	var specialty = [
	"Primary Care",
	"Allergy",
	"Breast Surgery",
	"Cardiology",
	"Endocrinology",
	"Family Medicine",
	"Gastroenterology",
	"Gynecology",
	"Liver Medicine",
	"Neurology",
	"Orthopedics",
	"Physiatry",
	"Pediatric Sports Medicine",
	"Podiatric Medicine",
	"Surgery",
	"Urology"];

var doctors	= [

Michael Frey, MD:  
Leeba Babu, MD:  
Sahil Khera, MD

];


function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % Number.MAX_SAFE_INTEGER;
  }
  return hash;
}

function createRecord(name) {
	var hash = hashStr(name)
}