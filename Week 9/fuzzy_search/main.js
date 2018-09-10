const target = "http://ict.neit.edu/evanrense/salaries.php";
qs("#search input").oninput = (e)=>{
    f(target, 
        {
            method: "GET",
        }
    )
    .then(res => res.json())
    .then(res => {
        let results = new Map();
        //let old_results = res.filter(person =>(`${person.name["first"]} ${person.name["last"]}`).match(e.target.value) )
        for(i=0;i<res.length;i++){
            let str = `${res[i].name["first"]} ${res[i].name["last"]}`;
            results.set( JaroWinkler.Distance(e.target.value, str), res[i]);
        }
        results = new Map( [...results.entries()].sortByKey().reverse() );
        

        while (qs("#search").nextElementSibling.qs(".output").firstChild) {
            qs("#search").nextElementSibling.qs(".output").removeChild(qs("#search").nextElementSibling.qs(".output").firstChild)
        }
        results.forEach((row) => {
            for (i in row) {
                var column = ce("column");
                if (i == "name") {
                    column.ac(ctn(`${row[i].first} ${row[i].last}`))
                } else column.ac(ctn(row[i]));
                qs("#search").nextElementSibling.qs(".output").ac(column);
            }
        });
    });  
}

function leven(a, b){
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 
  
    var matrix = [];
  
    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }
  
    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }
  
    return matrix[b.length][a.length];
    //return matrix;
};


var JaroWinkler=function(){var t=function(){this.p=.1,this.l=4,this.bt=.7};t.prototype.Distance=function(t,r){var n=t.length,a=r.length,h=this._matching(t,r),e=this._transpositions(t,r),i=this._prefix(t,r);if(h>0){var o=(h/n+h/a+(h-e)/h)/3;return o<this.bt?o:o+i*this.p*(1-o)}return 0},t.prototype._matching=function(t,r){for(var n=0,a=(Math.max(t.length,r.length),Math.floor(Math.max(t.length,r.length)/2)-1),h=[],e=0;e<t.length;e++)for(var i=Math.max(0,e-a);i<=Math.min(r.length,e+a);i++)if(t[e]==r[i]&&!h[i]){h[i]=!0,n++;break}return n},t.prototype._transpositions=function(t,r){for(var n=0,a=(Math.max(t.length,r.length),Math.floor(Math.max(t.length,r.length)/2)-1),h="",e="",i=[],o=0;o<t.length;o++)for(var l=Math.max(0,o-a);l<=Math.min(r.length,o+a);l++)if(t[o]==r[l]&&null==i[l]){h+=t[o],i[l]=!0;break}i=[];for(var o=0;o<r.length;o++)for(var l=Math.max(0,o-a);l<=Math.min(t.length,o+a);l++)if(r[o]==t[l]&&null==i[l]){e+=r[o],i[l]=!0;break}for(var o=0;o<h.length;o++)h[o]!=e[o]&&n++;return Math.floor(n/2)},t.prototype._prefix=function(t,r){var n=0;for(n=0;n<this.l;n++)if(t[n]!=r[n])return n;return++n};var r=new t;return r}();
Array.prototype.sortByKey = function(key){
    return  this.sort( (a,b) => ( ( a < b ) ? -1 : ( ( a > b ) ? 1 : 0 ) ) ) 
  }