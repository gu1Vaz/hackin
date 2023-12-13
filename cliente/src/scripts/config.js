let  url;
if(window.location.origin.includes("localhost")){
    url = window.location.origin+"/";
}
const idUrl = window.location.href.substr(-1)


export {url}
export {idUrl}
