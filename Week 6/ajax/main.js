const target = "http://ict.neit.edu/evanrense/salaries.php";


f(target, {
  method: "GET",
})
  .then(res => res.json())
  .then(people => {
    console.log(people.filter(peep => peep.name.first == "Johnson"))
    let dbas = people.filter(prsn => prsn.jobTitle == "Database Analyst");
    let wds = people.filter(prsn => prsn.jobTitle == "Web Developer");
    let swds = people.filter(prsn => prsn.jobTitle == "Software Developer");
    let highest = {};
    let reducer = (accumulator, currentVal) => accumulator + currentVal;
    dbas.sort( (a,b) => ( ( Number(a["salary"]) < Number(b["salary"]) ) ? -1 : ( ( Number(a["salary"]) > Number(b["salary"]) ) ? 1 : 0 ) ) );
    for (let i = 0; i < dbas.length -1; i++) {
      let dba = dbas[i];
      if (Number(dba.salary) < Number(dbas[i + 1].salary)) {
        highest.dba = dbas[i + 1];
      } else {
        highest.wd = dba;
      }
    }
    highest.dba.average = Math.ceil(dbas.map(el => Number(el.salary)).reduce(reducer) / dbas.length);
    wds.sort( (a,b) => ( ( Number(a["salary"]) < Number(b["salary"]) ) ? -1 : ( ( Number(a["salary"]) > Number(b["salary"]) ) ? 1 : 0 ) ) );
    for (let i = 0; i < wds.length - 1; i++) {
      let wd = wds[i];
      if (Number(wd.salary) < Number(wds[i + 1].salary)) {
        highest.wd = wds[i + 1];
      } else {
        highest.wd = wd;
      }
    }
    highest.wd.average = Math.ceil(wds.map(el => Number(el.salary)).reduce(reducer) / wds.length);
    swds.sort( (a,b) => ( ( Number(a["salary"]) < Number(b["salary"]) ) ? -1 : ( ( Number(a["salary"]) > Number(b["salary"]) ) ? 1 : 0 ) ) );
    for (let i = 0; i < swds.length - 1; i++) {
      let swd = swds[i];
      if (Number(swd.salary) < Number(swds[i + 1].salary)) {
        highest.swd = swds[i + 1];
      } else {
        highest.swd = swd;
      }
    }
    highest.swd.average = Math.ceil(swds.map(el => Number(el.salary)).reduce(reducer) / swds.length);
    highest.average = ( 
      (highest.dba.average > highest.wd.average)&&(highest.dba.average > highest.swd.average) 
      ? highest.dba.average 
      : ( (highest.wd.average > highest.swd.average)&&(highest.wd.average > highest.dba.average) )
        ? highest.wd.average
        : (( (highest.swd.average > highest.wd.average)&&(highest.swd.average > highest.dba.average) ))
          ? highest.swd.average
          : 0
    ); 
    let jobs = ["dba", "wd", "swd"];
    let $jobs = qs("#main-content").children;
    for (i in $jobs) {
      if (i <= $jobs.length - 1) with ($jobs[i]) {
        qs(".first").innerHTML = highest[jobs[i]].name.first;
        qs(".last").innerHTML = highest[jobs[i]].name.last;
        qs(".highest").innerHTML = `\$${highest[jobs[i]].salary}`;
        qs(".average").innerHTML = `\$${highest[jobs[i]].average}`;
        if(highest[jobs[i]].average == highest.average){
          qs(".average").style.background = "#dfef00";
        }
      }
    }
  });

Array.prototype.forEach.call(qs("#search").children, element => {
  element.oninput = (e) => {
    f(target, {
      method: "GET"
    }).then(res => res.json())
      .then(res => {
        let results = res.filter(person => (`${person.name["first"]} ${person.name["last"]}`).match(e.target.value) )
        //console.log(results)
        while (qs("#search").nextElementSibling.qs(".output").firstChild) {
          qs("#search").nextElementSibling.qs(".output").removeChild(qs("#search").nextElementSibling.qs(".output").firstChild) 
        }
        results.forEach((row) => {
          for (i in row) {
            var column = ce("column");
            if(i=="name"){  column.ac( ctn(`${row[i].first} ${row[i].last}`) )  }
            else column.ac( ctn(row[i]) );
            qs("#search").nextElementSibling.qs(".output").ac( column );
          }
        });
      });
  }
})

let buttons = qs("#list-area").firstElementChild.children;

for(i in buttons){
  element = buttons[i];
  element.onclick = (e) => {
    f(target, {
      method: "GET"
    }).then(res => res.json())
      .then(res => {
        let results = res.filter(person => person["jobTitle"].match(e.target.getAttribute("data-param")) );
        console.log(results)
        while (qs("#list-area").qs(".output").firstChild) {
          qs("#list-area").qs(".output").removeChild(qs("#list-area").qs(".output").firstChild) 
        }
        results.forEach((row) => {
          for (i in row) {
            var column = ce("column");
            if(i=="name"){  column.ac( ctn(`${row[i].first} ${row[i].last}`) )  }
            else column.ac( ctn(row[i]) );
            qs("#list-area").qs(".output").ac( column );
          }
        });
      });
  }

}