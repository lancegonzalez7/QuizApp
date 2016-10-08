angular.module('quizApp').controller('homeCtrl', function($scope, quizList){

  // console.log(pastQuizList)
  $scope.quizzes = quizList;

});
