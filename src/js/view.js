const View = {
    //шаблон списка
    searchList:()=>{
        let source = "<ul class='search-list'>{{#each items}}<ul class='search-list__items vacancy'>" +
            "<li class='vacancy__name'>{{name}}</li>"+
            "{{#if salary.to}}<li class='vacancy__salary'>от {{salary.from}} до {{salary.to}}</li>" +
            "{{else}}"+
            "{{#if salary}}<li class='vacancy__salary'>{{salary.from}}</li>{{/if}}" +
            "{{/if}}"+
            "<li class='vacancy__description'>{{snippet.requirement}}</li>"+
            "<li class='employer'>{{employer.name}}</li>" +
            "{{#if address.city}}<li class='vacancy__town'>{{address.city}}{{/if}} </li> " +

            "<li>Дата публикации:{{published_at}}</li>" +
            "</ul>{{/each}}</ul>"
        return source
    },
    //шаблон фильтра
    filterList:()=>{
        let source="<ul class=\'filters\'>{{#clusterItems clusters}}{{/clusterItems}}</ul>";
        return source
    }
}
export default View;