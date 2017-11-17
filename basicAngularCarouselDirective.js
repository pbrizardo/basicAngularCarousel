
angular.module('basicAngularCarousel',[])
.directive('myList', function($timeout) {
  return {
    restrict:'A',
    templateUrl:'myListTpl.html', 
    scope: {
      myList: '='
    },
    link: function(scope, el, attr) {
      var offset,
          percOffset,
          trackEl,
          speed = 0.001,
          sections = 4,
          sectionsPerc; 
          
      // find width
      if (scope.myList) {
        $timeout(function() { 
          var width = el[0].clientWidth;
          var section = width/sections;
          sectionsPerc = 100/sections;
          var fullWidth = section * scope.myList.length;
          var fullWidthPerc = (100*fullWidth/width).toString() + '%';
          var fullSectionPerc = (100*section/fullWidth).toString() +'%';
          
          trackEl = el[0].children[0].children[0];
          trackEl.style.width = fullWidthPerc; 
          for (var i = 0; i < trackEl.children.length; i++) {
            trackEl.children[i].style.width = fullSectionPerc;
          } 
          
          percOffset = (scope.myList.length % sections)/sections * 100; 
            
        });
      }
      
      scope.scrollLeft = function() {
        var width = el[0].clientWidth;
        var section = width/sections;
        var currentLeft = parseFloat(trackEl.style.left) || 0;
        var newLeft = currentLeft + sectionsPerc;
        
        if (newLeft <= 0) {
          trackEl.style.left = newLeft + '%';
        }
      };
      
      scope.scrollRight = function() {   
        var width = el[0].clientWidth; 
        var section = width/sections;   
        var fullWidth = section * scope.myList.length;
        var currentLeft = parseFloat(trackEl.style.left) || 0;

        var newLeft = currentLeft - sectionsPerc;

        if (Math.abs(newLeft) <= percOffset) {  
          trackEl.style.left = newLeft + '%';
        }

      };
    }
  };
