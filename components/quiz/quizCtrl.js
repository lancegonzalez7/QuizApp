angular.module('quizApp').controller('quizCtrl', function($scope, quizService, $stateParams, questions) {
    $scope.quizName = $stateParams.quizName;
    //$scope.quizName = 'Angular';
    console.log($scope.quizName);
    $scope.questions = questions;
    $scope.answers = {};
    $scope.results = {};
    $scope.currentQuestion = $scope.questions[0];

    $scope.nextQuestion = function() {
        var idx = $scope.questions.indexOf($scope.currentQuestion);
        if ($scope.questions[idx + 1]) {
            $scope.currentQuestion = $scope.questions[idx + 1];
        } else {
            return;
        }
    }

    $scope.handleEnter = function(ev, answer) {
        if (ev.keyCode === 13) {
            $scope.saveAnswer(answer);
        }
    };

    $scope.setCurrentQuestion = function(question) {
        $scope.currentQuestion = question;
    };

    $scope.reset = function() {
        $scope.answers = [];
        $scope.currentQuestion = $scope.questions[0];
    };

    $scope.saveAnswer = function(answer) {
        $scope.answers[$scope.currentQuestion.id] = answer;
        $scope.nextQuestion();
        console.log($scope.answers);

        if ($scope.results.done) {
            $scope.checkMyAnswers();
        }
    };

    $scope.checkMyAnswers = function() {
        quizService.checkMyAnswers($scope.questions, $scope.answers).then(function(response) {
            $scope.results = response;
            console.log($scope.results);
        });
    }

    $scope.update = function(selected) {
        $scope.selected = selected;
    }
});
