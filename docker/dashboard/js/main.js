$(function() {
    var domain = window.location.hostname;
    urls = {};
    switch(domain) {
        case "local.adbm.fr":
            urls = {
              "img/admin": "http://admin.local.adbm.fr/",
              "img/pim": "http://pim.local.adbm.fr/admin",
                "img/cms": "http://www.local.adbm.fr",
//              "img/html": "https://www.adbm.fr.aws.projects.clever-age.net",
                "img/phpmyadmin": "http://phpmyadmin.local.adbm.fr",
                "img/kibana": "http://local.adbm.fr:5601/app/kibana#/dashboard/001?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now%2Fw,mode:quick,to:now%2Fw))&_a=(description:'',filters:!(),options:(darkTheme:!f),panels:!((col:1,columns:!(level,channel,message,request_uri),id:'001',panelIndex:1,row:1,size_x:6,size_y:12,sort:!('@timestamp',desc),type:search),(col:7,columns:!(ctxt_uri,ctxt_duration),id:'002',panelIndex:2,row:1,size_x:6,size_y:12,sort:!('@timestamp',desc),type:search)),query:(match_all:()),timeRestore:!f,title:SymfonyLogs,uiState:(),viewMode:view)",
                "img/elastic": "http://local.adbm.fr:9200/_cat/indices",
                "img/rundeck": "http://local.adbm.fr:4440"
            };
            break;
        case "adbm.fr.aws.projects.clever-age.net":
            urls = {
              "img/admin": "https://flux.adbm.fr.aws.projects.clever-age.net/",
              "img/pim": "https://pim.adbm.fr.aws.projects.clever-age.net/admin",
              "img/cms": "https://www.adbm.fr.aws.projects.clever-age.net",
              "img/html": "https://html.adbm.fr.aws.projects.clever-age.net/integration",
                "img/phpmyadmin": "http://adbm.fr.aws.projects.clever-age.net/phpmyadmin/",
                "img/kibana": "https://kibana.adbm.fr.aws.projects.clever-age.net",
                "img/elastic": "https://es.adbm.fr.aws.projects.clever-age.net/_cat/indices",
              "img/rundeck": "https://tasks.adbm.fr.aws.projects.clever-age.net"
            };
            break;
    }
    for (var app in urls) {
        $("img[src*='" + app + "']").parent().attr('href', urls[app]);
    }
});

