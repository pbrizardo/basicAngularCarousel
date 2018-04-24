
angular.module('basicAngularCarousel',[])
.directive('myList', function($timeout) {
  return {
    restrict:'A',
    templateUrl:'myListTpl.html', 
    transclude: true,
    link: function(scope, el, attr) {
      var offset,
          percOffset,
          trackEl,
          sections = 4,
          sectionsPerc,
          scrollCount,
          listContainerEl,
          listTrackEl,
          numOfItems; 

      var newLine;
      var feature2;
          
      // find width
     
      $timeout(function() { 
        var width = el[0].clientWidth;
        var section = width/sections;
        sectionsPerc = 100/sections;
        
        // get list container element
        listContainerEl = el[0].querySelector('.my-list');
        listTrackEl = listContainerEl.querySelector('.my-list-track');
        numOfItems = listTrackEl.children.length;

        var fullWidth = section * listTrackEl.children.length;
        var fullWidthPerc = (100*fullWidth/width).toString() + '%';
        var fullSectionPerc = (100*section/fullWidth).toString() +'%';
        
        listTrackEl.style.width = fullWidthPerc;  
        for (var i = 0; i < numOfItems; i++) {
          listTrackEl.children[i].style.width = fullSectionPerc;
        }  
         
        percOffset = (listTrackEl.children.length % sections)/sections * 100; 
          
      });
      
      
      scope.scrollLeft = function() {
        var width = el[0].clientWidth;
        var section = width/sections;
        var currentLeft = parseFloat(listTrackEl.style.left) || 0;
        var newLeft = currentLeft + sectionsPerc;
        
        if (newLeft <= 0) {
          listTrackEl.style.left = newLeft + '%';
        }
      };
      
      scope.scrollRight = function() {   
        var width = el[0].clientWidth; 
        var section = width/sections;   
        var fullWidth = section * numOfItems;
        var currentLeft = parseFloat(listTrackEl.style.left) || 0;

        var newLeft = currentLeft - sectionsPerc;

        if (Math.abs(newLeft) <= percOffset) {  
          listTrackEl.style.left = newLeft + '%';
        }

      };
    }
  };
});
