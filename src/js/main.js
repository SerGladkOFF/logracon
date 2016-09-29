"use strict"
import Model from "./model.js"
import Handlebars from "handlebars"
import Control from "./control.js"


Handlebars.registerHelper("clusterItems",function(context, options){
        let ret ="";

        for (let i=0;i<context.length;i++) {
            ret += "<li class=\'filter \' data-id=" + context[i].id + ">" + context[i].name + "<ul class=\"filter-subitems\">";
            for (let j = 0; j < context[i].items.length; j++) {

                let str = context[i].items[j].url;
                let target = context[i].id
                if (target == "professional_area") {
                 target = "specialization";
                }

                let re = new RegExp(""+target+"=\.*?&\\b","i")
                let found = str.match(re);

                ret += "<li class=\"subitem clearfix\"  data-url="+found+">" +
                    "<span class=\"subitem__name\">" + context[i].items[j].name + "</span>" +
                    "<span class=\"subitem__count\" >" + context[i].items[j].count + "</span>" +
                    "</li>"
            }
            ret += "</ul></li>"
        }

        return ret;
             });

//подгружаем данные по Калуге с базы HH
let _data = Model.init();

//отображаем полученные данные
_data.then((data)=> {
    localStorage.setItem("newUrl","")

    Model.staticData(data);
    Model.searchResult(data);
    Model.createFilter(data);

    checkFilter.addEventListener("click",(e)=>{
         Control.filterCheckClose(e);
    });

    searchBtn.addEventListener("click",()=>{
        Control.searchControl();
    })
})

