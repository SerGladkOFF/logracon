/**
 * Created by Se on 27.09.2016.
 */
"use strict"
import Model from "./model.js"


let Const = {
    //обработка клика по фильтру
    filterClickControl:(e)=>{
        if (e.target.classList.contains("filter")) {
            let filterSubitems = e.target.querySelector(".filter-subitems");
            filterSubitems.classList.toggle("visible-f");
        }

        if (e.target.closest(".subitem")) {
            let subitemName = e.target.closest(".subitem");
            let getUrl=localStorage.getItem("newUrl");
            let specialization = new RegExp("specialization=\.*?&\\b","i");

            if (localStorage.getItem("newUrl")) {

                getUrl += "&"+ subitemName.getAttribute("data-url");

                if (subitemName.getAttribute("data-url").match("specialization")){
                    getUrl = getUrl.replace(specialization,"");
                }

                localStorage.setItem("newUrl",getUrl);

            } else {
                getUrl = localStorage.getItem("mainUrl")+"&"+subitemName.getAttribute("data-url");
                localStorage.setItem("newUrl",getUrl);
            }
            Model.createFilterLabel(subitemName.getAttribute("data-url"),
                subitemName.querySelector(".subitem__name").innerHTML);

            let newData= Model.filterInit(getUrl);
            newData.then((newData)=>{
                        Model.staticData(newData);
                        Model.createFilter(newData);
                        Model.searchResult(newData);
            });
        }
    },
    //закрытие лейбл-фильтра
    filterCheckClose:(e)=>{

        if (e.target.classList.contains("filter-close")){

            let filter =e.target.parentNode.querySelector(".filter-label").getAttribute("data-filter");

            let url = localStorage.getItem("newUrl");
            let re = new RegExp("&"+filter+"","i");
            let newUrl = (url.replace(re,""));

            checkFilter.removeChild(e.target.parentNode);
            localStorage.setItem("newUrl",newUrl);
            let newData= Model.filterInit(newUrl);

            newData.then((newData)=>{
                                    Model.staticData(newData);
                                    Model.createFilter(newData);
                                    Model.searchResult(newData);
                  });
        }

    },
    //обработка(через поле для ввода) нажатия на кнопку
    searchControl:()=>{

        let val=document.querySelector(".search-form__field").value;
        if (!val) return;
        let getUrl;
        if (localStorage.getItem("newUrl")) {
              getUrl = localStorage.getItem("newUrl")+"&text="+val;
              localStorage.setItem("newUrl",getUrl);
        } else {
              getUrl = localStorage.getItem("mainUrl")+"&text="+val;
              localStorage.setItem("newUrl",getUrl);
        }
        Model.createFilterLabel("text="+val,val);
        let newData= Model.filterInit(getUrl);
        newData.then((newData)=>{
                Model.staticData(newData);
                Model.createFilter(newData);
                Model.searchResult(newData);
        });
    }
}

export default Const;
