"use strict"
import View from "./view.js"
import Handlebars from "handlebars"
import Control from "./control.js"





const Model = {
    //создание запроса  к api
        init: () => {
            return new Promise((resolve) => {
                localStorage.setItem('mainUrl', 'https://api.hh.ru/vacancies?area=43&clusters=true&per_page=100');
                let xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://api.hh.ru/vacancies?area=43&clusters=true&per_page=100', false);
                xhr.setRequestHeader('User-Agent', 'test (sergladkov@outlook.com)');
                xhr.send();
                if (xhr.status != 200) {
                    console.log("ошибка"); // пример вывода: 404: Not Found
                } else {
                // вывести результат
                resolve(JSON.parse(xhr.responseText)); // responseText -- текст ответа.
                }
            })
        },
    //инициализация фльтров через запрос к api
        filterInit:(url)=>{
            return new Promise((resolve) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                xhr.setRequestHeader('User-Agent', 'test (sergladkov@outlook.com)');
                xhr.send();
                if (xhr.status != 200) {
                    console.log("ошибка"); // пример вывода: 404: Not Found
                } else {
                // вывести результат
                resolve(JSON.parse(xhr.responseText)); // responseText -- текст ответа.
                }
            })
        },
    //визуализация списка вакансий
        searchResult:(data)=>{
            let source = View.searchList();
            let template = Handlebars.compile(source);
            let main = template({items:data.items});
            document.getElementById("result").innerHTML = main;
        },
    //визуализация фильтра вакансий
        createFilter:(data)=>{
            let source = View.filterList();
            let template = Handlebars.compile(source);
            let main = template({clusters:data.clusters});
            document.getElementById("filters").innerHTML = main;

            let filterItems = document.querySelector(".filters");
            filterItems.addEventListener("click",(e)=>{
                e.preventDefault();
                Control.filterClickControl(e)
            },true)
        },
    //визуализация выбранного фильтра
        createFilterLabel:(filter,name)=>{
            let label = document.createElement("div");
            label.classList.add("filter-container");
            label.innerHTML ="<span class=\'filter-label\' data-filter="+filter+">"+name+"</span>" +"<span class=\'filter-close\'>X</span>"
            checkFilter.appendChild(label);

        },
    //визуализация общего числа вакансий по данному запросу
        staticData:(data)=>{
            statisticCount.innerHTML = data.found;
        }

};

export default Model;
