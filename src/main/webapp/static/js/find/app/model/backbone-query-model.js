define([
    'backbone'
], function(Backbone) {

    var Sort = {
        date: 'date',
        relevance: 'relevance'
    };

    return Backbone.Model.extend({
        defaults: {
            queryText: '',
            indexes: [],
            fieldText: null,
            minDate: null,
            maxDate: null,
            sort: Sort.relevance
        },

        getIsoDate: function(type) {
            var date = this.get(type);
            if(date) {
                return date.toISOString();
            } else {
                return null;
            }
        },

        refresh: function(queryText) {
            if(this.get('queryText') === queryText) {
                this.trigger('refresh');
            } else {
                this.set('queryText', queryText)
            }
        }
    }, {
        Sort: Sort
    });
});