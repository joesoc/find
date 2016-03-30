/*
 * Copyright 2015 Hewlett-Packard Development Company, L.P.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 */

define([
    'find/app/app',
    'find/hod/app/hod-pages'
], function(BaseApp, Pages) {

    'use strict';

    return BaseApp.extend({
        constructPages: function() {
            return new Pages();
        }
    });

});