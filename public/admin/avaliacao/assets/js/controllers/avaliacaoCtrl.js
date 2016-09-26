(function(){
	'use strict';

	angular
	.module('PDIAPav')
	.controller('avaliacaoCtrl', function($scope, $rootScope, $mdDialog, avaliacaoAPI) {

		$scope.projetos = [];
		$scope.searchProject = "";

		let carregarProjetos = function() {
			avaliacaoAPI.getTodosProjetos()
			.success(function(projetos) {
				angular.forEach(projetos, function (value, key) {
					if (value.aprovado === true) {
						if (value.avaliacao !== undefined && value.avaliacao.length > 0) {
							var avaliacao = value.avaliacao;
							var avaliado = true;
						} else {
							var avaliacao = [];
							var avaliado = false;
						}
						let obj = ({
							_id: value._id,
							numInscricao: value.numInscricao,
							nomeProjeto: value.nomeProjeto,
							nomeEscola: value.nomeEscola,
							categoria: value.categoria,
							eixo: value.eixo,
							avaliacao: avaliacao,
							avaliado: avaliado
						});
						$scope.projetos.push(obj);
					}
				});
				console.log($scope.projetos.length);
			})
			.error(function(status) {
				console.log(status);
			});
		};
		$scope.carregarProjetos = carregarProjetos;

		// $scope.querySearch = function querySearch(query) {
		// 	let deferred = $q.defer();
		// 	return deferred;
		// }

		$scope.visualizarDetalhes = function(projeto,ev) {
			$mdDialog.show({
				controller: function dialogController($scope, $mdDialog, $mdToast, avaliacaoAPI) {
					$scope.details = projeto;
					$scope.desempate = false;
					$scope.habilitaDesempate = function() {
						$scope.desempate = !$scope.desempate;
					}
					$scope.addNotas = function(id,notas) {
						console.log(notas);
						avaliacaoAPI.putAvaliacao(id,notas)
						.success(function(data, status) {
							$scope.toast('Avaliação realizada com sucesso!','success-toast');
						})
						.error(function(status) {
							$scope.toast('Falha.','failed-toast');
							console.log('Error: '+status);
						});
					}
					$scope.toast = function(message,tema) {
						var toast = $mdToast.simple().textContent(message).action('✖').position('top right').theme(tema).hideDelay(4000);
						$mdToast.show(toast);
					};
					$scope.hide = function() {
						$mdDialog.hide();
					};
					$scope.cancel = function() {
						$mdDialog.cancel();
					};
				},
				templateUrl: 'admin/avaliacao/views/details.projetos.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: false,
				fullscreen: true // Only for -xs, -sm breakpoints.
			});
		};

		$rootScope.ordenacao = ['categoria','eixo'];
		$rootScope.ordenarPor = function(campo) {
			$rootScope.ordenacao = campo;
		}

		$scope.query = 'nomeProjeto';
		$scope.setBusca = function(campo) {
			$scope.query = campo;
		}

		carregarProjetos();

	});
})();