define([
    'backbone',
    'underscore',
    'jquery',
    'i18n!find/nls/bundle',
    'find/app/model/document-model',
    'text!find/templates/app/page/search/preview-mode-view.html',
    'text!find/templates/app/page/search/preview-mode-metadata.html',
    'text!find/templates/app/page/search/preview-mode-document.html',
    'text!find/templates/app/page/view/media-player.html'
], function(Backbone, _, $, i18n, DocumentModel, template, metaDataTemplate, documentTemplate, mediaTemplate) {
    "use strict";

    return Backbone.View.extend({
        template: _.template(template),
        metaDataTemplate: _.template(metaDataTemplate),
        documentTemplate: _.template(documentTemplate),
        mediaTemplate: _.template(mediaTemplate),

        render: function() {
            this.$el.html(this.template({
                i18n:i18n
            }));

            var $main = $('.main-content');

            $main.scroll(_.bind(function() {
                var $viewServerPage = this.$('.preview-document-frame');
                if (this.$el.offsetParent().offset().top < 0) {
                    this.$el.css('margin-top', Math.abs(+this.$el.offsetParent().offset().top) + 15);
                } else {
                    this.$el.css('margin-top', 0);
                }
                $viewServerPage.css('height', $(window).height() - $viewServerPage.offset().top - 30);
            }, this));
        },

        renderView: function(args) {

            var model = args.model;

            this.$('.preview-mode-metadata').html(this.metaDataTemplate({
                i18n:i18n,
                model: model,
                arrayFields: DocumentModel.ARRAY_FIELDS,
                dateFields: DocumentModel.DATE_FIELDS,
                fields: ['index', 'reference', 'contentType', 'url']
            }));

            var $preview = this.$('.preview-mode-document');

            if (args.media) {
                $preview.html(this.mediaTemplate({
                    i18n: i18n,
                    offset: args.offset,
                    media: args.media,
                    url: args.url
                }));
            } else {
                $preview.html(this.documentTemplate({i18n: i18n}));

                var $viewServerPage = this.$('.preview-document-frame');

                $viewServerPage.on('load', _.bind(function() {
                    this.$('.view-server-loading-indicator').addClass('hidden');
                    $viewServerPage.removeClass('hidden');
                }, this));

                $viewServerPage.attr("src", args.src);
                $viewServerPage.css('height', $(window).height() - $preview.offset().top - 30);
            }
        }
    });

});