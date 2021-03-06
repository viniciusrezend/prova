module = angular.module("Trabalho", []);

module.controller("DisciplinaController", ["$scope", "$http", DisciplinaController]);

function DisciplinaController($scope, $http) {
    $scope.iniciar = funcaoIniciar;
    $scope.salvar = funcaoSalvar;
    $scope.editar = funcaoEditar;
    $scope.excluir = funcaoExcluir;

    $scope.disciplinas = [];
    $scope.disciplina = {};
    $scope.isNovo = true;

  function funcaoIniciar() {
        funcaoCarregar();
        console.log("Disciplinas carregadas!!!!");
    }
    
   function funcaoSalvar() {
        if ($scope.isNovo) {
            $http.post("/disciplinas").success(onSuccess).error(onError);
        } else {
            $http.put("/disciplinas").success(onSuccess).error(onError);
        }

        function onSuccess(data, status) {
            funcaoCarregar();
            $scope.log(data);
            $scope.disciplina = {};
            $scope.isNovo = true;
        }

        function onError(data, status) {
            alert("Deu erro" + data);
        }
    }

    function funcaoEditar(vitima) {
        $scope.disciplina = angular.copy(vitima);
        $scope.isNovo = false;
    }

    function funcaoExcluir(vitima) {
        $http.delete("/disciplinas/" + vitima.id).success(onSuccess).error(onError);
        function onSuccess(data, status) {
            funcaoCarregar();
            console.log(data);
            
        }

        function onError(data, status) {
            alert("Deu erro!!!" + data);
        }
    }

    function funcaoCarregar() {
        $http.get("/disciplinas").success(onSuccess).error(onError);

        function onSuccess(data, satatus) {
            $scope.disciplinas = data;
            console.log(data);
        }

        function onError(data, status) {
            alert("Deu erro !!!" + data);
        }
    }

  
}
