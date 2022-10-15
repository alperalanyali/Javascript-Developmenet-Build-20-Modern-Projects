setInterval(()=>{
    time = new Date();
    htime = time.getHours();
    mintime = time.getMinutes();
    secondTime = time.getSeconds();
    
    hrotation = 30*htime +   mintime/2
    mrotation = 6*mintime;
    secrotation = 6*secondTime;

    hour.style.transform =  ` rotate(${hrotation}deg)`
    min.style.transform=`rotate(${mrotation}deg)`
    seconds.style.transform = `rotate(${secrotation}deg)`
},1000)