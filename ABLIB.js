/*
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/adhmelbourai/myfile@master/ABLIB.js"></script>
*/
var MAX_REQUESTS=3;
var MY_REQUESTS=[];
function IsFull()
{
    if(MY_REQUESTS.length>=MAX_REQUESTS)
    {
        SetAlert(' 🤗 الاتصال بالسيرفر ضعيف');
        return true;
    }
    else{return false;}
}
function Splash()
{
    var SplashScreen = document.getElementById("SplashScreen");
    if(!SplashScreen)
    {
        //opacity:0.9;
        var elemDiv = document.createElement('div');
        elemDiv.id='SplashScreen';
        elemDiv.style.cssText='position:fixed;width:100%;height:100%;z-index:9999;background:#212529;right:0;bottom:0;';
        elemDiv.innerHTML='<img src="http://placehold.co/640x640/orange/white?font=open-sans&text=AB%20System" class="rounded-pill" style="margin:0;position:absolute;top:50%;left:50%;-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);max-width:100%;">';
        document.body.appendChild(elemDiv);
        document.body.style.display='';
    }
    window.onload=function(){setTimeout(function(){$("#SplashScreen").fadeOut(250);},250);}
}
function abtoast()
{
    var elemDiv=document.createElement('div');
    elemDiv.style.cssText='position:fixed;z-index:999';
    elemDiv.classList='bottom-0 end-0 p-3';
    elemDiv.innerHTML='<div id="ABTOAST" class="toast fade" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><img src="/favicon.ico" class="rounded me-2" alt="ABSYSTEM"><strong class="me-auto">AB SYSTEM</strong><small id="ABTOASTH"></small></div><div class="toast-body h3" id="ABTOASTB"></div></div>';
    document.body.appendChild(elemDiv);
}
Splash();
abtoast();
function httpGets(theUrl,cFunction)
{
    if (IsFull()){return false;}
    const xhttp = new XMLHttpRequest();
    xhttp.onload=function() {cFunction(this);MY_REQUESTS.pop();}
    xhttp.ontimeout=function() {console.error(theUrl+' TimeOut');MY_REQUESTS.pop();}
    xhttp.open("GET",theUrl,true); // false for synchronous request
    xhttp.withCredentials = true;
    xhttp.timeout=5000;
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
    MY_REQUESTS.push(theUrl);
}
function httpGet(theUrl)
{
    const xhttp=new XMLHttpRequest();
    xhttp.open("GET",theUrl,false);
    xhttp.ontimeout=function() {console.error(theUrl+' TimeOut');MY_REQUESTS.pop();}
    xhttp.withCredentials = true;
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
    xhttp.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.send();
    return xhttp.responseText;
}

function httpPost(url, data)
{
    return fetch(url, {method: "POST",
        credentials:'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, body: JSON.stringify(data)});
}
function httpJSON(url, data)
{
    return fetch(url, {method:"POST",
        credentials:'include',
        headers: {'Content-Type': 'application/json','accept':'application/json'},
        body: JSON.stringify(data)});
}

function Open(url)
{
    window.open(url, "AB TAB", "toolbar=no");
}
function LogOut()
{
    const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`));
    localStorage.clear();
    window.location.href='/logout';
}
function GetById(name)
{
    return document.getElementById(name);
}

function SetAlert(bod='',head='')
{
    GetById('ABTOASTB').innerText=bod;
    GetById('ABTOASTH').innerText=head;
    $('#ABTOAST').toast('show');
}
function sysinfo(response=null)
{
    if (!response)
    {
        httpGets('/sysinfo.txt',sysinfo)
        return true;
    }
    try
    {
        const obj=JSON.parse(response.responseText);
        for (let [key, value] of Object.entries(obj)) {
            GetById(`ServerStatus_${key}`).innerText=`${value}`;
        }
    } catch (e) {

    }
}

function notifyMe(msg='Welcome Message From AB SYSTEM !')
{
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification(msg);
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted")
        {
          const notification = new Notification(msg);
          // …
        }
        else if (permission === "denied")
        {
            SetAlert(msg);
            // …
        }
        else
        {
            console.error(permission);
        }
      });
    } 
}
function themeDark()
{

    for (const el of document.getElementsByTagName('body'))
    {
        el.classList.add('bg-dark');
        el.classList.add('text-center');
        el.classList.add('text-white');
    }
    for (const el of document.getElementsByTagName('a'))
    {
        el.classList.add('bg-dark');
        el.classList.add('text-center');
        el.classList.add('text-white');
    }
    for (const el of document.getElementsByTagName('textarea'))
    {
        el.classList.add('bg-dark');
        el.classList.add('text-center');
        el.classList.add('text-white');
    }
    for (const el of document.getElementsByTagName('select'))
    {
        el.classList.add('bg-dark');
        el.classList.add('text-center');
        el.classList.add('text-primary');
    }
    for (const el of document.getElementsByTagName('input'))
    {
        el.classList.add('bg-dark');
        el.classList.add('text-center');
        el.classList.add('text-primary');
    }
}

//import { hello } from './module.js';
