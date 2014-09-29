app.directive('ngSocialTwitter', function() {
    'use strict';

    var options = {
        counter: {
            url: 'http://urls.api.twitter.com/1/urls/count.json?url={url}&callback=JSON_CALLBACK',
            getNumber: function(data) {
                return data.count;
            }
        },
        popup: {
            url: 'http://twitter.com/intent/tweet?url={url}&text={title}&via={via}&hashtags={hashtags}',
            width: 600,
            height: 450
        },
        click: function(options) {
            // Add colon to improve readability
            if (!/[\.:\-–—]\s*$/.test(options.pageTitle)) options.pageTitle += ':';
            return true;
        },
        track: {
            'name': 'twitter',
            'action': 'tweet'
        }
    };
    return {
        restrict: 'C',
        require: '^?ngSocialButtons',
        scope: true,
        replace: true,
        transclude: true,
        template: '<li> \
                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button"> \
                        <span class="ng-social-icon"></span> \
                        <span class="ng-social-text" ng-transclude></span> \
                    </a> \
                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \
                   </li>',
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
            element.addClass('ng-social-twitter');
            if (!ctrl) {
                return;
            }
            scope.options = options;
            // https://dev.twitter.com/web/intents
            options.urlOptions = {
                hashtags: attrs.hashtags,
                via: attrs.via
            };
            scope.ctrl = ctrl;
            ctrl.init(scope, element, options);
        }
    }
});