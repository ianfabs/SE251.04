class Calendar {
  constructor(ctx = "", cb) {
    this.d=document,this.ctx = document.querySelector(`${ctx}.calendar`);
    this.daysInMonth = () => new Date(this.date.getYear(),this.date.getMonth() + 1,0).getDate()
    this.daysOfTheWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    this.init((new Date()).getMonth()+1,(new Date()).getFullYear());
    this.cb = cb;
    this.renderCalendar();
    this.$days = document.querySelectorAll(".current:not(.head)");
    this.cb(this);
  }
  init(month,year) {this.mth = month;this.yr = year;this.date=new Date(this.mth+"/1/"+this.yr);this.numberOfDaysInMonth=this.daysInMonth(this.date);this.firstDayOfWeek=this.date.getDay();}
  createHeader() {
    for (let i=0;i<7;i++) {
      let dh = document.createElement("div");
      dh.classList.add("day", "head");dh.appendChild(document.createTextNode(this.daysOfTheWeek[i]));this.ctx.appendChild(dh);
    }
  }
  createDays(n) {
    for (let i=-this.firstDayOfWeek+1;i<=n;i++) {
      let day = this.d.createElement("div");day.classList.add("day");let daySpan = document.createElement("div");
      if (i > 0) {daySpan.appendChild(document.createTextNode(i));day.appendChild(daySpan);day.classList.add("current");} 
      else daySpan.appendChild(document.createTextNode("\n"));
      day.appendChild(daySpan);this.ctx.appendChild(day);
    }
  }
  dayAvailable(d, avail = null) {
    let day = this.ctx.querySelectorAll(".day.current")[d - 1];
    if (avail != null) {
      if (avail) {day.classList.remove("off");day.classList.add("on");}
      else if (!avail) day.classList.remove("on");day.classList.add("off");
    } else {
      if (!day.classList.contains("on") && !day.classList.contains("off")) {
        day.classList.remove("off");
        day.classList.add("on");
      } else if (day.classList.contains("on")) {day.classList.remove("on");day.classList.add("off");
      } else if (day.classList.contains("off")) day.classList.remove("off"); 
    }
  }
  clearContext() {while (this.ctx.firstChild) this.ctx.removeChild(this.ctx.firstChild)}
  renderCalendar() { this.clearContext();this.createHeader();this.createDays(this.numberOfDaysInMonth); }
  reRenderCalendar(month,year) {this.init(month,year);this.renderCalendar();this.cb(this);}
} let calendar = new Calendar("#calendar", c => {c.d.querySelectorAll(".day:not(.head)").forEach(elem => elem.onclick = e => c.dayAvailable(e.path[0].firstChild.innerHTML));c.d.querySelector("#allAvailable").onclick = e => c.$days.forEach(el => c.dayAvailable(el.firstChild.innerHTML, true));c.d.querySelector("#allUnavailable").onclick = e => c.$days.forEach(el => c.dayAvailable(el.firstChild.innerHTML, false));});
document.querySelector("#month").onchange = e => calendar.reRenderCalendar(e.target.value,document.querySelector("#year").value)
document.querySelector("#year").onchange = e => calendar.reRenderCalendar( document.querySelector("#month").value,e.target.value)